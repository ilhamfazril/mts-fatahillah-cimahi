import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake,
  Monitor,
  Sliders
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { HeroSlideContent, DEFAULT_HERO_SLIDES } from '../services/siteContentService';

interface HeroProps {
  onExploreClick: () => void;
  onPsbClick: () => void;
  slidesData?: HeroSlideContent[];
  isAdmin?: boolean;
  onOpenAdminDashboard?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreClick, 
  onPsbClick,
  slidesData,
  isAdmin = false,
  onOpenAdminDashboard
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Active slides from Firestore real-time content or fallback
  const slides = (slidesData && slidesData.length === 4) ? slidesData : DEFAULT_HERO_SLIDES;

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentSlide] || slides[0];

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white">
      {/* Background Image Carousel */}
      <div className="relative h-[560px] sm:h-[620px] lg:h-[680px] w-full group">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.bgImage}
              alt={slide.alt || slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-100 transition-transform duration-[8000ms] ease-out"
            />
            {/* Contrast Gradient Overlays for optimal readability and photo beauty */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl pt-6 sm:pt-0">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-md border border-emerald-500/50 text-amber-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{activeSlide.badge}</span>
              <span className="text-emerald-400">•</span>
              <span className="text-emerald-100">SMP PGRI 5 Cimahi</span>
            </div>

            {/* Main Headline (Synced via Firestore in real-time) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-[1.15]">
              {activeSlide.title}
            </h1>

            {/* Subtitle (Synced via Firestore in real-time) */}
            <div className="mt-3 text-amber-400 text-sm sm:text-lg font-bold tracking-wide flex items-center gap-2">
              <span>{activeSlide.subtitle}</span>
            </div>

            {/* Description Paragraph */}
            <p className="mt-4 text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              {activeSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                id="btn-hero-primary"
                onClick={onPsbClick}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-black px-6 py-3.5 rounded-xl shadow-xl hover:shadow-emerald-600/30 transition-all flex items-center gap-2 text-sm sm:text-base border border-emerald-500/40 hover:scale-105"
              >
                <GraduationCap className="w-5 h-5 text-amber-300" />
                <span>{activeSlide.primaryBtn || 'Pendaftaran PPDB'}</span>
              </button>

              <button
                id="btn-hero-secondary"
                onClick={onExploreClick}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold px-6 py-3.5 rounded-xl border border-white/25 hover:border-white/40 transition-all flex items-center gap-2 text-sm sm:text-base hover:scale-105"
              >
                <span>{activeSlide.secondaryBtn || 'Jelajahi Profil'}</span>
                <ChevronRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>

            {/* Quality Seals */}
            <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-white">Akreditasi B BAN-S/M</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-white">NPSN: 20224096</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold text-white">Laboratorium Komputer ANBK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-white">Sekolah Ramah Anak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Carousel Controls */}
        <div className="absolute right-6 bottom-8 z-30 hidden sm:flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-emerald-700 text-white backdrop-blur border border-white/20 flex items-center justify-center transition-colors"
            title="Foto Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 px-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-amber-400 shadow-md' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Pindah ke slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-emerald-700 text-white backdrop-blur border border-white/20 flex items-center justify-center transition-colors"
            title="Foto Berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Admin floating quick editor badge if logged in */}
        {isAdmin && onOpenAdminDashboard && (
          <div className="absolute top-4 right-4 z-30 animate-in fade-in">
            <button
              type="button"
              onClick={onOpenAdminDashboard}
              className="bg-slate-900/90 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-500/60 shadow-xl backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-300" />
              <span>Edit Konten di Panel Admin</span>
            </button>
          </div>
        )}
      </div>

      {/* Slide Indicators for mobile */}
      <div className="flex sm:hidden justify-center items-center gap-1.5 py-3 bg-slate-950">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-slate-600'
            }`}
            aria-label={`Pindah ke slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Quick Statistics Banner */}
      <div className="w-full bg-slate-900 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              {SCHOOL_INFO.stats.students}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Peserta Didik Aktif
            </div>
          </div>

          <div className="p-3 border-l border-slate-800">
            <div className="text-2xl sm:text-4xl font-black text-white">
              {SCHOOL_INFO.stats.teachers}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Tenaga Pendidik & Staf
            </div>
          </div>

          <div className="p-3 border-l border-slate-800">
            <div className="text-2xl sm:text-4xl font-black text-amber-400">
              {SCHOOL_INFO.stats.extracurriculars}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Kegiatan Ekstrakurikuler
            </div>
          </div>

          <div className="p-3 border-l border-slate-800">
            <div className="text-2xl sm:text-4xl font-black text-emerald-400">
              {SCHOOL_INFO.akreditasi}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Status Akreditasi Sekolah
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
