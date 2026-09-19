import React, { useState } from 'react';
import { 
  Save, 
  Upload, 
  Image as ImageIcon, 
  Eye, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Layers
} from 'lucide-react';
import { HeroSlideContent, compressImageForStorage } from '../../services/siteContentService';

interface AdminHeroSlidesTabProps {
  slides: HeroSlideContent[];
  onSaveSlides: (updatedSlides: HeroSlideContent[]) => Promise<void>;
}

export const AdminHeroSlidesTab: React.FC<AdminHeroSlidesTabProps> = ({
  slides,
  onSaveSlides,
}) => {
  const [slidesDraft, setSlidesDraft] = useState<HeroSlideContent[]>(slides);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const currentSlide = slidesDraft[selectedIndex] || slides[0];

  const handleFieldChange = (field: keyof HeroSlideContent, value: string) => {
    setSlidesDraft((prev) => {
      const updated = [...prev];
      if (updated[selectedIndex]) {
        updated[selectedIndex] = {
          ...updated[selectedIndex],
          [field]: value,
        };
      }
      return updated;
    });
    setSaveSuccess(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadStatus(`Mengoptimalkan foto slide ${selectedIndex + 1}...`);
      const optimized = await compressImageForStorage(file, 1600, 1000, 0.84);
      handleFieldChange('bgImage', optimized);
      setUploadStatus(null);
    } catch (err) {
      console.error(err);
      alert('Gagal memproses file foto. Pastikan format foto adalah JPG/PNG.');
      setUploadStatus(null);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSaveSlides(slidesDraft);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan perubahan slide ke Firestore.');
    } finally {
      setIsSaving(false);
    }
  };

  const presetPhotos = [
    { label: 'Foto 1: Gedung Sekolah', url: '/images/slide1_gedung.jpg' },
    { label: 'Foto 2: Upacara & Siswa', url: '/images/slide2_upacara.jpg' },
    { label: 'Foto 3: Lab Komputer ANBK', url: '/images/slide3_lab_komputer.jpg' },
    { label: 'Foto 4: Lapangan Serbaguna', url: '/images/slide4_lapangan.jpg' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-700" />
            <span>Pengaturan Slide Banner Hero (Beranda)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur 4 slide gambar utama dan teks sambutan yang berputar di halaman beranda.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Menyimpan ke Cloud...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Slide</span>
            </>
          )}
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Perubahan Slide Hero berhasil disimpan ke Cloud Firestore secara Real-Time!</span>
        </div>
      )}

      {/* Slide Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {slidesDraft.map((slide, idx) => {
          const isCurrent = idx === selectedIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1.5 relative overflow-hidden ${
                isCurrent
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${isCurrent ? 'text-emerald-800' : 'text-slate-700'}`}>
                  Slide {idx + 1}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {idx === 0 ? 'Utama' : `Sub-${idx}`}
                </span>
              </div>
              <div className="h-10 w-full rounded-md overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={slide.bgImage}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] text-slate-600 truncate font-medium">
                {slide.title || 'Belum ada judul'}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Slide Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Form Edit Konten Slide {selectedIndex + 1}
          </h4>

          {/* Image control */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Foto Latar Belakang Slide
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={currentSlide.bgImage}
                onChange={(e) => handleFieldChange('bgImage', e.target.value)}
                placeholder="https://... atau /images/slide1_gedung.jpg"
                className="flex-grow px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-colors whitespace-nowrap">
                <Upload className="w-3.5 h-3.5" />
                <span>Unggah Foto</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {uploadStatus && (
              <p className="text-[11px] text-emerald-700 font-medium animate-pulse">
                {uploadStatus}
              </p>
            )}

            {/* Presets */}
            <div className="pt-1">
              <span className="text-[11px] text-slate-500 font-medium mr-2">Pilihan cepat:</span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                {presetPhotos.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleFieldChange('bgImage', preset.url)}
                    className="text-[10px] bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 border border-slate-200 px-2 py-0.5 rounded font-medium transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Label Lencana (Badge Atas)
            </label>
            <input
              type="text"
              value={currentSlide.badge}
              onChange={(e) => handleFieldChange('badge', e.target.value)}
              placeholder="Contoh: Sekolah Berkarakter & Humanis"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Judul Utama Slide
            </label>
            <input
              type="text"
              value={currentSlide.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Judul besar yang menarik"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-semibold text-slate-900"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Sub-Judul
            </label>
            <input
              type="text"
              value={currentSlide.subtitle}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              placeholder="Sub judul singkat"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Paragraf
            </label>
            <textarea
              rows={3}
              value={currentSlide.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Penjelasan ringkas mengenai slide"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Buttons Labels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teks Tombol Utama
              </label>
              <input
                type="text"
                value={currentSlide.primaryBtn}
                onChange={(e) => handleFieldChange('primaryBtn', e.target.value)}
                placeholder="Pendaftaran PPDB"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teks Tombol Sekunder
              </label>
              <input
                type="text"
                value={currentSlide.secondaryBtn}
                onChange={(e) => handleFieldChange('secondaryBtn', e.target.value)}
                placeholder="Jelajahi Profil"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Preview: 5 cols */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pratinjau Slide {selectedIndex + 1}</span>
            </h4>
            <span className="text-[11px] text-slate-400">Tampilan Live</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-300 bg-slate-950 aspect-[4/3] flex flex-col justify-end p-5 text-white">
            <img
              src={currentSlide.bgImage}
              alt={currentSlide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <div className="relative z-10 space-y-2">
              <span className="inline-block bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {currentSlide.badge || 'Lencana Slide'}
              </span>
              <h5 className="text-base font-extrabold leading-tight text-white drop-shadow">
                {currentSlide.title || 'Judul Slide'}
              </h5>
              <p className="text-[11px] text-amber-200 font-medium">
                {currentSlide.subtitle}
              </p>
              <p className="text-[11px] text-slate-200 line-clamp-2 leading-relaxed">
                {currentSlide.description}
              </p>
              <div className="flex gap-2 pt-1">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded">
                  {currentSlide.primaryBtn}
                </span>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded">
                  {currentSlide.secondaryBtn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
