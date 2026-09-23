import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  GraduationCap, 
  Trophy, 
  Award, 
  Save, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  TrendingUp,
  Info
} from 'lucide-react';
import { SchoolStatsContent, saveSiteContentToFirestore, SchoolSiteContent } from '../../services/siteContentService';
import { getAdminSession } from '../../services/adminAuthService';
import { AnimatedCounter } from '../AnimatedCounter';
import { RealtimeSuccessInfo } from '../RealtimeSuccessModal';

interface AdminStatsTabProps {
  siteContent: SchoolSiteContent;
  onSuccessNotice: (info: RealtimeSuccessInfo) => void;
}

export const AdminStatsTab: React.FC<AdminStatsTabProps> = ({ siteContent, onSuccessNotice }) => {
  const initialStats: SchoolStatsContent = siteContent.stats || {
    students: '450+',
    teachers: '26',
    extracurriculars: '14',
    accreditation: 'Akreditasi B',
  };

  const [formData, setFormData] = useState<SchoolStatsContent>({ ...initialStats });
  const [isSaving, setIsSaving] = useState(false);
  const [previewKey, setPreviewKey] = useState(0); // For re-triggering test counter animation
  const [localFeedback, setLocalFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (field: keyof SchoolStatsContent, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTestAnimation = () => {
    setPreviewKey((k) => k + 1);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setLocalFeedback(null);

    try {
      const session = getAdminSession();
      const adminName = session?.username || 'admin_ilham';

      const payload: SchoolStatsContent = {
        students: formData.students.trim() || '450+',
        teachers: formData.teachers.trim() || '26',
        extracurriculars: formData.extracurriculars.trim() || '14',
        accreditation: formData.accreditation.trim() || 'Akreditasi B',
        updatedAt: Date.now(),
      };

      await saveSiteContentToFirestore({ stats: payload }, adminName);

      setLocalFeedback({
        type: 'success',
        message: '4 Matriks Sekolah berhasil disimpan dan tersinkronisasi real-time ke Cloud Firestore!',
      });

      onSuccessNotice({
        title: '4 Matriks Sekolah Berhasil Diperbarui',
        message: 'Data statistik utama sekolah dan animasi angka naik telah tersimpan di Cloud Firestore & disiarkan secara real-time ke semua perangkat pengunjung.',
        sectionName: 'Matriks & Statistik Sekolah',
        syncDetails: [
          `Peserta Didik Aktif: ${payload.students}`,
          `Tenaga Pendidik & Staf: ${payload.teachers}`,
          `Kegiatan Ekstrakurikuler: ${payload.extracurriculars}`,
          `Status Akreditasi: ${payload.accreditation}`,
        ],
      });
    } catch (err: any) {
      console.error('Error saving school stats:', err);
      setLocalFeedback({
        type: 'error',
        message: 'Gagal menyimpan matriks: ' + (err?.message || 'Terjadi kesalahan sistem'),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header info */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/20 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                4 Matriks Utama Sekolah (Statistik & Akreditasi)
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Real-Time & Animasi
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Ubah data 4 matriks yang tampil di banner beranda. Setiap angka akan otomatis beranimasi naik secara cepat saat halaman dimuat atau data diubah oleh admin.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTestAnimation}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
            title="Uji coba animasi counter naik cepat"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Test Animasi Naik Cepat</span>
          </button>
        </div>
      </div>

      {/* Live Preview of 4 Matrix Cards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Live Preview Tampilan Beranda</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Preview otomatis saat Anda mengetik
          </span>
        </div>

        <div key={previewKey} className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {/* 1. Siswa */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 relative group">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              <AnimatedCounter value={formData.students || '0'} duration={800} />
            </div>
            <div className="text-xs text-slate-300 font-semibold mt-1">
              Peserta Didik Aktif
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Siswa Terdidik
            </div>
          </div>

          {/* 2. Tenaga Pendidik & Staf */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 relative group">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center mx-auto mb-2">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              <AnimatedCounter value={formData.teachers || '0'} duration={800} />
            </div>
            <div className="text-xs text-slate-300 font-semibold mt-1">
              Tenaga Pendidik & Staf
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Guru & Karyawan
            </div>
          </div>

          {/* 3. Ekstrakurikuler */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 relative group">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              <AnimatedCounter value={formData.extracurriculars || '0'} duration={800} />
            </div>
            <div className="text-xs text-slate-300 font-semibold mt-1">
              Kegiatan Ekstrakurikuler
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Pengembangan Bakat
            </div>
          </div>

          {/* 4. Status Akreditasi */}
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 relative group">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-lg sm:text-2xl font-black text-emerald-400 break-words">
              <AnimatedCounter value={formData.accreditation || 'Akreditasi B'} duration={800} />
            </div>
            <div className="text-xs text-slate-300 font-semibold mt-1">
              Status Akreditasi Sekolah
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              BAN-S/M Kemendikbudristek
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Formulir Edit Nilai 4 Matriks
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Anda dapat memasukkan angka murni atau angka bersimbol seperti <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-semibold">450+</code> atau <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-semibold">1.250+</code>. Sistem secara cerdas akan mengekstrak angkanya untuk dianimasikan naik secara cepat.
          </p>
        </div>

        {localFeedback && (
          <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
            localFeedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{localFeedback.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Matriks 1: Siswa */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-600" />
              <span>1. Jumlah Peserta Didik Aktif (Siswa Terdidik)</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.students}
              onChange={(e) => handleInputChange('students', e.target.value)}
              placeholder="Contoh: 450+ atau 1.250+"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-semibold text-slate-800"
            />
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Preset cepat:</span>
              {['450+', '500+', '850+', '1.250+'].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleInputChange('students', val)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded font-medium text-[10px]"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Matriks 2: Tenaga Pendidik & Staf */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>2. Jumlah Tenaga Pendidik & Staf</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.teachers}
              onChange={(e) => handleInputChange('teachers', e.target.value)}
              placeholder="Contoh: 26 atau 45+"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold text-slate-800"
            />
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Preset cepat:</span>
              {['26', '32', '45+', '50'].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleInputChange('teachers', val)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-900 rounded font-medium text-[10px]"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Matriks 3: Ekstrakurikuler */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>3. Jumlah Kegiatan Ekstrakurikuler</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.extracurriculars}
              onChange={(e) => handleInputChange('extracurriculars', e.target.value)}
              placeholder="Contoh: 14 atau 18+"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-semibold text-slate-800"
            />
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Preset cepat:</span>
              {['14', '16', '18+', '20'].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleInputChange('extracurriculars', val)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 rounded font-medium text-[10px]"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Matriks 4: Status Akreditasi */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>4. Status Akreditasi Sekolah</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.accreditation}
              onChange={(e) => handleInputChange('accreditation', e.target.value)}
              placeholder="Contoh: Akreditasi B atau Akreditasi A Unggul"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-800"
            />
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Pilihan cepat:</span>
              {['Akreditasi B', 'Akreditasi A Unggul', 'Akreditasi A (94)'].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleInputChange('accreditation', val)}
                  className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 rounded font-medium text-[10px]"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Perubahan langsung tersinkronisasi ke seluruh pengunjung website via <strong>Cloud Firestore</strong>.
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 active:scale-95"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Menyimpan ke Cloud Firestore...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan 4 Matriks Real-Time</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
