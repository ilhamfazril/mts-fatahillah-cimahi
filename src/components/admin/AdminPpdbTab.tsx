import React, { useState, useEffect } from 'react';
import { 
  Search, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Phone, 
  Mail, 
  FileText, 
  Download, 
  RefreshCw,
  Eye,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { 
  PPDBRegistrationRecord, 
  subscribeToPpdbRegistrations, 
  updatePpdbRegistrationStatus, 
  deletePpdbRegistration 
} from '../../services/siteContentService';

export const AdminPpdbTab: React.FC = () => {
  const [registrations, setRegistrations] = useState<PPDBRegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [trackFilter, setTrackFilter] = useState<string>('Semua');
  const [selectedItem, setSelectedItem] = useState<PPDBRegistrationRecord | null>(null);
  const [itemToDelete, setItemToDelete] = useState<PPDBRegistrationRecord | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Subscribe in real-time to Firestore PPDB collection
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToPpdbRegistrations((data) => {
      setRegistrations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusChange = async (docId: string, newStatus: PPDBRegistrationRecord['status']) => {
    try {
      setIsUpdating(true);
      await updatePpdbRegistrationStatus(docId, newStatus);
      showToast(`Status berhasil diperbarui menjadi "${newStatus}" secara real-time.`);
      if (selectedItem && selectedItem.id === docId) {
        setSelectedItem({ ...selectedItem, status: newStatus });
      }
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui status di Firebase.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete || !itemToDelete.id) return;
    try {
      setIsUpdating(true);
      await deletePpdbRegistration(itemToDelete.id);
      showToast('Data pendaftaran berhasil dihapus dari Firebase.');
      setItemToDelete(null);
      if (selectedItem?.id === itemToDelete.id) {
        setSelectedItem(null);
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus data dari Firebase.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert('Belum ada data pendaftar untuk diekspor.');
      return;
    }

    const headers = [
      'Kode Registrasi',
      'Nama Calon Siswa',
      'Asal Sekolah',
      'NISN',
      'Jenis Kelamin',
      'Nama Orang Tua',
      'No. HP Orang Tua',
      'Email',
      'Jalur Pendaftaran',
      'Status',
      'Waktu Daftar',
      'Catatan'
    ];

    const rows = registrations.map((r) => [
      `"${r.registrationCode}"`,
      `"${r.candidateName}"`,
      `"${r.originSchool}"`,
      `"${r.nisn || '-'}"`,
      `"${r.gender}"`,
      `"${r.parentName}"`,
      `"${r.parentPhone}"`,
      `"${r.parentEmail || '-'}"`,
      `"${r.selectedTrack}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleString('id-ID')}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ppdb_smp_pgri_5_cimahi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchSearch = 
      r.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.registrationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.originSchool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.parentPhone.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchStatus = statusFilter === 'Semua' || r.status === statusFilter;
    const matchTrack = trackFilter === 'Semua' || r.selectedTrack === trackFilter;

    return matchSearch && matchStatus && matchTrack;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Header Info Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Data Pendaftaran PPDB / PSB Online
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Firebase Real-Time
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Data calon siswa baru yang mendaftar melalui formulir website langsung terhubung dan tersinkronisasi dengan Firestore.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-medium shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Pendaftar</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{registrations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-amber-600 font-medium">Pendaftar Baru</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {registrations.filter((r) => r.status === 'Baru').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-blue-600 font-medium">Diverifikasi</span>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {registrations.filter((r) => r.status === 'Diverifikasi').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-emerald-600 font-medium">Diterima</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {registrations.filter((r) => r.status === 'Diterima').length}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, asal SD, no HP, kode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          >
            <option value="Semua">Semua Status</option>
            <option value="Baru">Baru</option>
            <option value="Diverifikasi">Diverifikasi</option>
            <option value="Diterima">Diterima</option>
            <option value="Menunggu">Menunggu</option>
          </select>

          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          >
            <option value="Semua">Semua Jalur</option>
            <option value="Jalur Prestasi (PPSB)">Jalur Prestasi</option>
            <option value="Jalur Zonasi & Domisili">Jalur Zonasi</option>
            <option value="Jalur Afirmasi / KETM">Jalur Afirmasi</option>
            <option value="Jalur Reguler">Jalur Reguler</option>
          </select>
        </div>
      </div>

      {/* Registrations List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
            <span>Memuat data pendaftar dari Firebase Firestore...</span>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <GraduationCap className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-700">Tidak ada pendaftaran ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">
              {searchQuery || statusFilter !== 'Semua' || trackFilter !== 'Semua' 
                ? 'Coba sesuaikan filter atau kata kunci pencarian Anda.' 
                : 'Pendaftaran yang masuk melalui formulir PPDB online akan otomatis muncul di sini secara real-time.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Calon Siswa</th>
                  <th className="py-3 px-4">Asal Sekolah</th>
                  <th className="py-3 px-4">Jalur</th>
                  <th className="py-3 px-4">Kontak Ortu</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRegistrations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.candidateName}</div>
                      <div className="text-xs text-slate-500 font-mono">{item.registrationCode}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{item.originSchool}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700 font-medium">
                        {item.selectedTrack}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800">{item.parentName}</div>
                      <div className="text-xs text-slate-500">{item.parentPhone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        item.status === 'Diterima'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Diverifikasi'
                          ? 'bg-blue-100 text-blue-800'
                          : item.status === 'Baru'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setItemToDelete(item)}
                        className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base">Detail Pendaftaran PPDB</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-slate-300 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="text-xs text-slate-500">Kode Registrasi</div>
                <div className="font-mono font-bold text-base text-emerald-800">
                  {selectedItem.registrationCode}
                </div>
                <div className="text-xs text-slate-400">
                  Waktu: {new Date(selectedItem.createdAt).toLocaleString('id-ID')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-slate-500">Nama Calon Siswa</span>
                  <p className="font-bold text-slate-900">{selectedItem.candidateName}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Jenis Kelamin</span>
                  <p className="font-semibold text-slate-800">{selectedItem.gender}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Asal SD/MI</span>
                  <p className="font-semibold text-slate-800">{selectedItem.originSchool}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">NISN</span>
                  <p className="font-semibold text-slate-800">{selectedItem.nisn || '-'}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Orang Tua / Wali</span>
                  <p className="font-semibold text-slate-800">{selectedItem.parentName}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Nomor Telepon</span>
                  <p className="font-semibold text-slate-800">{selectedItem.parentPhone}</p>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500">Jalur Pendaftaran</span>
                <p className="font-semibold text-emerald-800">{selectedItem.selectedTrack}</p>
              </div>

              {selectedItem.notes && (
                <div>
                  <span className="text-xs text-slate-500">Catatan Tambahan</span>
                  <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    {selectedItem.notes}
                  </p>
                </div>
              )}

              {/* Status Updater */}
              <div className="pt-3 border-t border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Ubah Status Pendaftaran (Firebase Real-Time):
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['Baru', 'Diverifikasi', 'Diterima', 'Menunggu'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={isUpdating || selectedItem.status === st}
                      onClick={() => selectedItem.id && handleStatusChange(selectedItem.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        selectedItem.status === st
                          ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-400'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-slate-900 text-base">Hapus Data Pendaftar?</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Apakah Anda yakin ingin menghapus data pendaftaran atas nama{' '}
              <strong className="text-slate-900">{itemToDelete.candidateName}</strong> ({itemToDelete.registrationCode})? Data akan terhapus dari Firebase secara permanen.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleDelete}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
