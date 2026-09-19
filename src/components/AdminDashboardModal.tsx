import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  Save, 
  Upload, 
  RefreshCcw, 
  Layers, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Cloud, 
  Sparkles,
  Eye,
  Camera,
  FileText,
  Trash2
} from 'lucide-react';
import { 
  SchoolSiteContent, 
  HeroSlideContent, 
  saveSiteContentToFirestore, 
  resetSiteContentToDefaultInFirestore,
  compressImageForStorage,
  DEFAULT_HERO_SLIDES,
  DEFAULT_PRINCIPAL_CONTENT
} from '../services/siteContentService';
import { logoutAdmin, getAdminSession } from '../services/adminAuthService';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteContent: SchoolSiteContent;
  onLogout: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  siteContent,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'slides' | 'principal' | 'sync'>('slides');
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number>(0);
  
  // Working local state before saving to Firestore
  const [slidesDraft, setSlidesDraft] = useState<HeroSlideContent[]>([]);
  const [principalDraft, setPrincipalDraft] = useState(siteContent.principal);

  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const session = getAdminSession();

  // Sync draft whenever siteContent changes from Firestore or modal opens
  useEffect(() => {
    if (isOpen) {
      setSlidesDraft(JSON.parse(JSON.stringify(siteContent.heroSlides)));
      setPrincipalDraft(JSON.parse(JSON.stringify(siteContent.principal)));
      setSaveSuccessMsg(null);
      setErrorMsg(null);
    }
  }, [isOpen, siteContent]);

  if (!isOpen) return null;

  const currentSlide = slidesDraft[selectedSlideIndex] || DEFAULT_HERO_SLIDES[0];

  const handleSlideFieldChange = (field: keyof HeroSlideContent, value: string) => {
    setSlidesDraft((prev) => {
      const updated = [...prev];
      if (updated[selectedSlideIndex]) {
        updated[selectedSlideIndex] = {
          ...updated[selectedSlideIndex],
          [field]: value,
        };
      }
      return updated;
    });
  };

  const handleSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadProgress(`Mengoptimalkan foto slide ${selectedSlideIndex + 1}...`);
      const optimizedDataUrl = await compressImageForStorage(file, 1600, 1000, 0.84);
      handleSlideFieldChange('bgImage', optimizedDataUrl);
      setUploadProgress(null);
    } catch (err) {
      console.error(err);
      setErrorMsg('Gagal memproses file foto. Silakan gunakan format JPG/PNG yang valid.');
      setUploadProgress(null);
    }
  };

  const handlePrincipalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadProgress('Mengoptimalkan foto Kepala Sekolah...');
      const optimizedDataUrl = await compressImageForStorage(file, 800, 800, 0.88);
      setPrincipalDraft((prev) => ({
        ...prev,
        photo: optimizedDataUrl,
      }));
      setUploadProgress(null);
    } catch (err) {
      console.error(err);
      setErrorMsg('Gagal memproses foto Kepala Sekolah.');
      setUploadProgress(null);
    }
  };

  const handleSaveToCloud = async () => {
    setIsSaving(true);
    setErrorMsg(null);
    setSaveSuccessMsg(null);

    try {
      await saveSiteContentToFirestore({
        heroSlides: slidesDraft,
        principal: principalDraft,
      }, session?.username || 'admin_ilham');

      setIsSaving(false);
      setSaveSuccessMsg('Berhasil! Perubahan telah tersimpan di Firestore dan otomatis tampil di seluruh pengunjung.');
      setTimeout(() => {
        setSaveSuccessMsg(null);
      }, 5000);
    } catch (err) {
      console.error('Save to Firestore error:', err);
      setIsSaving(false);
      setErrorMsg('Gagal menyimpan ke server Firestore. Periksa koneksi internet Anda.');
    }
  };

  const handleResetToDefault = async () => {
    if (!window.confirm('Apakah Anda yakin ingin mengembalikan semua slide dan profil Kepala Sekolah ke foto & teks bawaan asli?')) {
      return;
    }

    setIsResetting(true);
    setErrorMsg(null);
    try {
      await resetSiteContentToDefaultInFirestore();
      setSlidesDraft(JSON.parse(JSON.stringify(DEFAULT_HERO_SLIDES)));
      setPrincipalDraft(JSON.parse(JSON.stringify(DEFAULT_PRINCIPAL_CONTENT)));
      setIsResetting(false);
      setSaveSuccessMsg('Semua data berhasil di-reset ke pengaturan awal.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err) {
      console.error(err);
      setIsResetting(false);
      setErrorMsg('Gagal me-reset data ke cloud.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 px-6 py-4 text-white flex items-center justify-between border-b border-emerald-700/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">Panel Admin SMP PGRI 5 Cimahi</h2>
                <span className="bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Cloud className="w-3 h-3 text-emerald-300" />
                  Firestore Real-Time
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Ubah foto background, judul, dan profil kepala sekolah langsung tersinkron ke semua pengguna
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* User badge */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-100 font-semibold">{session?.username || 'admin_ilham'}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                logoutAdmin();
                onLogout();
              }}
              className="px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Keluar dari akun admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors ml-1"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-6 pt-3 flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('slides')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all border-t-2 ${
              activeTab === 'slides'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Slide Banner Hero (1 - 4)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('principal')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all border-t-2 ${
              activeTab === 'principal'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Foto & Profil Kepala Sekolah</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sync')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all border-t-2 ${
              activeTab === 'sync'
                ? 'bg-white text-emerald-800 border-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-200/60'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>Status Cloud & Reset</span>
          </button>
        </div>

        {/* Notifications */}
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 font-bold flex items-center justify-between animate-in slide-in-from-top-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
            <button onClick={() => setSaveSuccessMsg(null)} className="text-emerald-600 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="bg-rose-50 border-b border-rose-200 px-6 py-2.5 text-xs text-rose-800 font-bold flex items-center justify-between animate-in slide-in-from-top-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-600 hover:text-rose-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {uploadProgress && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-xs text-amber-900 font-semibold flex items-center gap-2">
            <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span>{uploadProgress}</span>
          </div>
        )}

        {/* Modal Body (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: SLIDE BANNER HERO */}
          {activeTab === 'slides' && (
            <div className="space-y-6">
              
              {/* Slide Selector Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Pilih Slide yang Akan Diedit:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {slidesDraft.map((slide, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSlideIndex(idx)}
                      className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        selectedSlideIndex === idx
                          ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          selectedSlideIndex === idx ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          Slide {idx + 1}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
                          {slide.badge}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {slide.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor for Currently Selected Slide */}
              <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200/80 space-y-5">
                
                {/* Photo Preview & Change Photo Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  
                  {/* Photo Preview Card */}
                  <div className="lg:col-span-5 flex flex-col space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Foto Background Slide {selectedSlideIndex + 1}
                      </label>
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 bg-slate-900 group">
                      <img
                        src={currentSlide.bgImage}
                        alt={currentSlide.alt || `Slide ${selectedSlideIndex + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                        <span className="text-[11px] text-white font-semibold truncate">
                          {currentSlide.title}
                        </span>
                      </div>
                    </div>

                    {/* Upload button for this slide */}
                    <div className="flex items-center gap-2">
                      <label className="flex-grow cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl text-center shadow transition-colors flex items-center justify-center gap-2">
                        <Camera className="w-4 h-4 text-amber-300" />
                        <span>Ganti Foto Slide {selectedSlideIndex + 1}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSlideImageUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => {
                          const defaultImg = DEFAULT_HERO_SLIDES[selectedSlideIndex]?.bgImage;
                          if (defaultImg) handleSlideFieldChange('bgImage', defaultImg);
                        }}
                        className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 text-xs font-medium"
                        title="Kembalikan foto bawaan slide ini"
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Gunakan foto asli resolusi tajam. Sistem otomatis mengoptimalkan ukuran file.
                    </p>
                  </div>

                  {/* Text Fields Editor */}
                  <div className="lg:col-span-7 space-y-4">
                    
                    {/* Badge */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Kategori / Badge Kecil Atas
                      </label>
                      <input
                        type="text"
                        value={currentSlide.badge}
                        onChange={(e) => handleSlideFieldChange('badge', e.target.value)}
                        placeholder="Contoh: Sekolah Berkarakter & Humanis"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Judul Utama */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Judul Utama Slide (Headline)
                      </label>
                      <textarea
                        rows={2}
                        value={currentSlide.title}
                        onChange={(e) => handleSlideFieldChange('title', e.target.value)}
                        placeholder="Masukkan judul utama slide..."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-snug"
                      />
                    </div>

                    {/* Subjudul */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subjudul
                      </label>
                      <input
                        type="text"
                        value={currentSlide.subtitle}
                        onChange={(e) => handleSlideFieldChange('subtitle', e.target.value)}
                        placeholder="Masukkan subjudul slide..."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Deskripsi */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Deskripsi / Paragraf Penjelas
                      </label>
                      <textarea
                        rows={3}
                        value={currentSlide.description}
                        onChange={(e) => handleSlideFieldChange('description', e.target.value)}
                        placeholder="Masukkan deskripsi penjelasan singkat..."
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                      />
                    </div>

                    {/* Tombol Utama */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Teks Tombol Utama
                        </label>
                        <input
                          type="text"
                          value={currentSlide.primaryBtn}
                          onChange={(e) => handleSlideFieldChange('primaryBtn', e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Teks Tombol Sekunder
                        </label>
                        <input
                          type="text"
                          value={currentSlide.secondaryBtn}
                          onChange={(e) => handleSlideFieldChange('secondaryBtn', e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FOTO & PROFIL KEPALA SEKOLAH */}
          {activeTab === 'principal' && (
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Photo Column */}
                <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
                  <div className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-amber-400 bg-gradient-to-br from-emerald-800 to-teal-900 p-1">
                    <img
                      src={principalDraft.photo}
                      alt={principalDraft.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <label className="cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition-colors flex items-center gap-2">
                    <Camera className="w-4 h-4 text-amber-300" />
                    <span>Upload Foto Kepala Sekolah</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePrincipalImageUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setPrincipalDraft((prev) => ({
                        ...prev,
                        photo: DEFAULT_PRINCIPAL_CONTENT.photo,
                      }));
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 underline"
                  >
                    <RefreshCcw className="w-3 h-3" />
                    <span>Reset ke foto bawaan</span>
                  </button>
                </div>

                {/* Info Fields */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap & Gelar Kepala Sekolah
                    </label>
                    <input
                      type="text"
                      value={principalDraft.name}
                      onChange={(e) => setPrincipalDraft({ ...principalDraft, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Jabatan / Keterangan Lembaga
                    </label>
                    <input
                      type="text"
                      value={principalDraft.role}
                      onChange={(e) => setPrincipalDraft({ ...principalDraft, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kutipan Sambutan Singkat (Quote)
                    </label>
                    <textarea
                      rows={4}
                      value={principalDraft.quote}
                      onChange={(e) => setPrincipalDraft({ ...principalDraft, quote: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-700 focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STATUS CLOUD & RESET */}
          {activeTab === 'sync' && (
            <div className="space-y-5">
              <div className="bg-emerald-50/80 rounded-3xl p-6 border border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 shadow">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-emerald-950">
                      Sinkronisasi Database Cloud Firestore Aktif
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                      Sistem terhubung langsung ke Firebase Firestore dengan mode <strong>Real-Time Listener (onSnapshot)</strong>. 
                      Setiap kali Anda menekan tombol <strong>"Simpan & Publikasikan"</strong>, data langsung tersebar ke seluruh HP, tablet, dan komputer pengunjung dalam hitungan milidetik.
                    </p>

                    <div className="mt-4 pt-3 border-t border-emerald-200/80 flex flex-wrap items-center gap-6 text-xs text-emerald-900">
                      <div>
                        <span className="font-semibold text-emerald-700">Project: </span>
                        <strong>decisive-emitter-hds98</strong>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-700">Terakhir Diperbarui: </span>
                        <strong>{siteContent.updatedAt ? new Date(siteContent.updatedAt).toLocaleString('id-ID') : 'Default'}</strong>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-700">Oleh: </span>
                        <strong>{siteContent.updatedBy || 'admin_ilham'}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone: Reset */}
              <div className="bg-rose-50/60 rounded-3xl p-6 border border-rose-200">
                <h4 className="text-sm font-extrabold text-rose-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  Kembalikan ke Pengaturan Default Asli
                </h4>
                <p className="text-xs text-rose-800 mt-1">
                  Jika sewaktu-waktu Anda ingin mengembalikan 4 foto slide dan teks kembali ke bawaan awal SMP PGRI 5 Cimahi, gunakan tombol di bawah ini:
                </p>

                <button
                  type="button"
                  onClick={handleResetToDefault}
                  disabled={isResetting}
                  className="mt-4 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white text-xs font-bold rounded-xl shadow transition-colors flex items-center gap-2"
                >
                  {isResetting ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <RefreshCcw className="w-4 h-4" />
                  )}
                  <span>Reset Konten ke Bawaan Default</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
            Pastikan foto dan teks sudah sesuai sebelum mempublikasikan ke seluruh pengunjung.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors"
            >
              Tutup
            </button>

            <button
              type="button"
              onClick={handleSaveToCloud}
              disabled={isSaving}
              className="flex-1 sm:flex-none bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Menyimpan ke Firestore...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>Simpan & Publikasikan ke Seluruh Pengguna</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
