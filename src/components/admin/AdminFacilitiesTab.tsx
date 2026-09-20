import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Upload,
  Check
} from 'lucide-react';
import { FacilityItem } from '../../types';
import { compressImageForStorage } from '../../services/siteContentService';

interface AdminFacilitiesTabProps {
  facilitiesList: FacilityItem[];
  onSaveFacilities: (updated: FacilityItem[], meta?: { action?: 'create' | 'update' | 'delete'; title?: string }) => Promise<void>;
}

export const AdminFacilitiesTab: React.FC<AdminFacilitiesTabProps> = ({
  facilitiesList,
  onSaveFacilities,
}) => {
  const [items, setItems] = useState<FacilityItem[]>(facilitiesList);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [editingItem, setEditingItem] = useState<FacilityItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FacilityItem | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Sync with Firestore real-time updates
  useEffect(() => {
    if (facilitiesList) {
      setItems(facilitiesList);
    }
  }, [facilitiesList]);

  const filtered = items.filter((f) => {
    const matchesCategory = selectedCategory === 'Semua' || f.category === selectedCategory;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem({
      id: `fac-${Date.now()}`,
      name: '',
      category: 'Akademik',
      description: '',
      image: '/images/slide3_lab_komputer.jpg',
      features: ['Fasilitas modern & terawat', 'AC / Ventilasi nyaman'],
    });
    setIsCreatingNew(true);
  };

  const handleOpenEdit = (item: FacilityItem) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsCreatingNew(false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.name.trim()) {
      alert('Nama fasilitas tidak boleh kosong.');
      return;
    }

    let updatedList: FacilityItem[];
    if (isCreatingNew) {
      updatedList = [editingItem, ...items];
    } else {
      updatedList = items.map((f) => (f.id === editingItem.id ? editingItem : f));
    }

    setItems(updatedList);
    const actionType = isCreatingNew ? 'create' : 'update';
    const itemTitle = editingItem.name;
    setEditingItem(null);

    try {
      setIsSaving(true);
      await onSaveFacilities(updatedList, { action: actionType, title: itemTitle });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan fasilitas ke Firestore.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const deletedTitle = itemToDelete.name;
    const updatedList = items.filter((f) => f.id !== itemToDelete.id);
    setItems(updatedList);
    setItemToDelete(null);

    try {
      setIsSaving(true);
      await onSaveFacilities(updatedList, { action: 'delete', title: deletedTitle });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus fasilitas dari Firestore.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    try {
      setUploadStatus('Mengompresi dan mengoptimalkan foto fasilitas...');
      const optimized = await compressImageForStorage(file, 800, 500, 0.70);
      setEditingItem({ ...editingItem, image: optimized });
      setUploadStatus('✓ Foto berhasil dikompresi hemat (<60 KB).');
      setTimeout(() => setUploadStatus(null), 3500);
    } catch (err) {
      console.error(err);
      alert('Gagal memproses gambar. Gunakan format JPG/PNG.');
      setUploadStatus(null);
    }
  };

  const handleFeaturesChange = (text: string) => {
    if (!editingItem) return;
    const featuresArr = text.split('\n').map(f => f.trim()).filter(Boolean);
    setEditingItem({ ...editingItem, features: featuresArr });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-700" />
            <span>Kelola Fasilitas (Sarana & Prasarana) ({items.length})</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tambah, perbarui, dan kelola informasi ruang belajar, laboratorium, sarana olahraga, dan fasilitas penunjang.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Fasilitas Baru</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Data Sarana & Prasarana berhasil diperbarui di Cloud Firestore secara Real-Time!</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari fasilitas berdasarkan nama atau spesifikasi..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['Semua', 'Akademik', 'Olahraga', 'Seni & Budaya', 'Penunjang'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-emerald-800/90 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-600/50">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {item.features?.slice(0, 3).map((f, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium truncate max-w-[200px]"
                    >
                      • {f}
                    </span>
                  ))}
                  {(item.features?.length || 0) > 3 && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      +{(item.features?.length || 0) - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="p-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg inline-flex items-center gap-1 transition-colors"
                title="Edit Fasilitas"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Ubah</span>
              </button>
              <button
                type="button"
                onClick={() => setItemToDelete(item)}
                className="p-2 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-lg inline-flex items-center gap-1 transition-colors"
                title="Hapus Fasilitas"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
            <Building2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-600">
              Tidak ada fasilitas yang cocok.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Gunakan kata kunci pencarian lain atau klik tombol "Tambah Fasilitas Baru".
            </p>
          </div>
        )}
      </div>

      {/* Edit / Create Modal Dialog */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h4 className="text-sm font-bold text-slate-900">
                {isCreatingNew ? 'Tambah Fasilitas Baru' : 'Ubah Data Fasilitas'}
              </h4>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-4 flex-grow text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Fasilitas *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="Contoh: Laboratorium Komputer Modern & ANBK"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kategori Fasilitas
                </label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Olahraga">Olahraga</option>
                  <option value="Seni & Budaya">Seni & Budaya</option>
                  <option value="Penunjang">Penunjang</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Foto / Gambar Fasilitas
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    placeholder="URL gambar atau /images/..."
                    className="flex-grow px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <label className="cursor-pointer px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-slate-700 font-bold inline-flex items-center gap-1 whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {uploadStatus && (
                  <p className="text-[11px] text-emerald-700 mt-1">{uploadStatus}</p>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Deskripsi Lengkap Fasilitas *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Jelaskan kapasitas, kelengkapan alat, dan kenyamanan fasilitas ini..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Daftar Fitur / Spesifikasi Utama (Satu baris per fitur)
                </label>
                <textarea
                  rows={3}
                  value={editingItem.features?.join('\n') || ''}
                  onChange={(e) => handleFeaturesChange(e.target.value)}
                  placeholder="AC & Ruangan ber-sirkulasi baik&#10;Koneksi Internet Dedicated Fiber Optic&#10;Kapasitas 40 Siswa"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan Fasilitas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="text-base font-bold text-slate-900">
                Hapus Fasilitas Sekolah?
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Apakah Anda yakin ingin menghapus data fasilitas <strong>"{itemToDelete.name}"</strong>? Data ini akan segera diperbarui ke Cloud Firestore.
              </p>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isSaving}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow transition-all"
              >
                {isSaving ? 'Menghapus...' : 'Ya, Hapus Sekarang'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
