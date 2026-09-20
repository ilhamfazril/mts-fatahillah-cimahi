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
  BookOpen, 
  Upload, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ProgramUnggulan } from '../../types';
import { compressImageForStorage } from '../../services/siteContentService';

interface AdminProgramsTabProps {
  programs: ProgramUnggulan[];
  onSavePrograms: (updated: ProgramUnggulan[], meta?: { action?: 'create' | 'update' | 'delete'; title?: string }) => Promise<void>;
}

export const AdminProgramsTab: React.FC<AdminProgramsTabProps> = ({
  programs,
  onSavePrograms,
}) => {
  const [items, setItems] = useState<ProgramUnggulan[]>(programs);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<ProgramUnggulan | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ProgramUnggulan | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Synchronize items with incoming Firestore real-time updates
  useEffect(() => {
    if (programs) {
      setItems(programs);
    }
  }, [programs]);

  // Filtered items
  const filtered = items.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingItem({
      id: `prog-${Date.now()}`,
      title: '',
      badge: 'Program Baru',
      shortDesc: '',
      fullDesc: '',
      icon: 'Sparkles',
      image: '/images/slide1_gedung.jpg',
      highlights: ['Keunggulan program 1', 'Keunggulan program 2'],
    });
    setIsCreatingNew(true);
  };

  const handleOpenEdit = (item: ProgramUnggulan) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsCreatingNew(false);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.title.trim()) {
      alert('Judul program tidak boleh kosong.');
      return;
    }

    let updatedList: ProgramUnggulan[];
    if (isCreatingNew) {
      updatedList = [editingItem, ...items];
    } else {
      updatedList = items.map((p) => (p.id === editingItem.id ? editingItem : p));
    }

    setItems(updatedList);
    const actionType = isCreatingNew ? 'create' : 'update';
    const itemTitle = editingItem.title;
    setEditingItem(null);

    // Save directly to Firestore
    try {
      setIsSaving(true);
      await onSavePrograms(updatedList, { action: actionType, title: itemTitle });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan program ke Firestore.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    const deletedTitle = itemToDelete.title;
    const updatedList = items.filter((p) => p.id !== itemToDelete.id);
    setItems(updatedList);
    setItemToDelete(null);

    try {
      setIsSaving(true);
      await onSavePrograms(updatedList, { action: 'delete', title: deletedTitle });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus program dari Firestore.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;

    try {
      setUploadStatus('Mengompresi dan mengoptimalkan foto program...');
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

  const handleAddHighlight = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      highlights: [...editingItem.highlights, 'Poin keunggulan baru'],
    });
  };

  const handleHighlightChange = (index: number, val: string) => {
    if (!editingItem) return;
    const updated = [...editingItem.highlights];
    updated[index] = val;
    setEditingItem({ ...editingItem, highlights: updated });
  };

  const handleRemoveHighlight = (index: number) => {
    if (!editingItem) return;
    const updated = editingItem.highlights.filter((_, i) => i !== index);
    setEditingItem({ ...editingItem, highlights: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span>Kelola Program Unggulan ({items.length})</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tambah, perbarui, dan hapus kurikulum serta program pembiasaan karakter sekolah.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Program Unggulan</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Data Program Unggulan berhasil diperbarui di Cloud Firestore secara Real-Time!</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari program unggulan berdasarkan judul atau kata kunci..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {/* Items Grid */}
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
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-emerald-800/90 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-600/50">
                  {item.badge}
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {item.shortDesc}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {item.highlights?.slice(0, 2).map((h, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium truncate max-w-[200px]"
                    >
                      ✓ {h}
                    </span>
                  ))}
                  {(item.highlights?.length || 0) > 2 && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      +{(item.highlights?.length || 0) - 2}
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
                title="Edit Program"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Ubah</span>
              </button>
              <button
                type="button"
                onClick={() => setItemToDelete(item)}
                className="p-2 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 rounded-lg inline-flex items-center gap-1 transition-colors"
                title="Hapus Program"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-slate-600">
              Tidak ada program unggulan yang cocok.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Gunakan kata kunci lain atau klik tombol "Tambah Program Unggulan".
            </p>
          </div>
        )}
      </div>

      {/* Edit / Create Modal Dialog */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h4 className="text-sm font-bold text-slate-900">
                {isCreatingNew ? 'Tambah Program Unggulan Baru' : 'Ubah Program Unggulan'}
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
                  Judul Program Unggulan *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="Contoh: Laboratorium Komputer & Kesiapan ANBK / CBT"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Label Lencana / Kategori
                  </label>
                  <input
                    type="text"
                    value={editingItem.badge}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    placeholder="Contoh: Literasi Digital"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Pilihan Ikon
                  </label>
                  <select
                    value={editingItem.icon}
                    onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Sparkles">Sparkles (Umum)</option>
                    <option value="Monitor">Monitor (Komputer/ANBK)</option>
                    <option value="Heart">Heart (Religius & Akhlak)</option>
                    <option value="ShieldCheck">ShieldCheck (Pramuka/PBB)</option>
                    <option value="Trophy">Trophy (Prestasi)</option>
                    <option value="Award">Award (Olahraga)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Foto / Gambar Program
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
                  Deskripsi Singkat (Tampil di kartu utama)
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingItem.shortDesc}
                  onChange={(e) => setEditingItem({ ...editingItem, shortDesc: e.target.value })}
                  placeholder="Ringkasan penjelasan program..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Deskripsi Lengkap (Tampil saat kartu dibuka)
                </label>
                <textarea
                  rows={4}
                  value={editingItem.fullDesc}
                  onChange={(e) => setEditingItem({ ...editingItem, fullDesc: e.target.value })}
                  placeholder="Penjelasan mendalam mengenai program unggulan..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Highlights */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-700">
                    Poin-Poin Keunggulan Utama
                  </label>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    + Tambah Poin
                  </button>
                </div>
                <div className="space-y-2">
                  {editingItem.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={hl}
                        onChange={(e) => handleHighlightChange(hIdx, e.target.value)}
                        className="flex-grow px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(hIdx)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
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
                  {isSaving ? 'Menyimpan...' : 'Simpan Program'}
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
                Hapus Program Unggulan?
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Apakah Anda yakin ingin menghapus program <strong>"{itemToDelete.title}"</strong>? Perubahan ini akan segera tersimpan ke basis data Cloud Firestore.
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
