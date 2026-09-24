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
  Award,
  Users,
  Building2,
  BookOpen,
  PhoneCall
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { HeroSlideContent, DEFAULT_HERO_SLIDES, SchoolStatsContent } from '../services/siteContentService';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onExploreClick?: () => void;
  onPsbClick?: () => void;
  slidesData?: HeroSlideContent[];
  statsData?: SchoolStatsContent;
  isAdmin?: boolean;
  onOpenAdminDashboard?: () => void;
  onNavigate?: (tab: string, subFilter?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreClick, 
  onPsbClick,
  slidesData,
  statsData,
  isAdmin = false,
  onOpenAdminDashboard,
  onNavigate
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Active slides from Firestore real-time content or fallback (supports any number of slides)
  const slides = (slidesData && slidesData.length > 0) ? slidesData : DEFAULT_HERO_SLIDES;

  // Ensure currentSlide is within bounds if slides count changes
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  // Auto slide rotation
  useEffect(() => {
    if (slides.length <= 1) return;
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

  // Specific buttons configuration matching the user requirements for SLIDE 1, 2, 3, and 4
  const getPrimaryBtnInfo = (idx: number, customLabel?: string) => {
    if (idx === 0) {
      const label = (!customLabel || customLabel.includes('2025/2026')) 
        ? 'Pendaftaran PPDB 2026/2027' 
        : customLabel;
      return {
        label,
        icon: <GraduationCap className="w-5 h-5 text-amber-300" />,
        action: () => (onNavigate ? onNavigate('psb') : onPsbClick?.())
      };
    }
    if (idx === 1) {
      return {
        label: customLabel || 'Lihat Aktivitas Kesiswaan',
        icon: <Users className="w-5 h-5 text-amber-300" />,
        action: () => (onNavigate ? onNavigate('kesiswaan') : onNavigate?.('kesiswaan'))
      };
    }
    if (idx === 2) {
      return {
        label: customLabel || 'Sarana & Fasilitas',
        icon: <Building2 className="w-5 h-5 text-amber-300" />,
        action: () => (onNavigate ? onNavigate('fasilitas') : onNavigate?.('fasilitas'))
      };
    }
    if (idx === 3) {
      return {
        label: customLabel || 'Daftar PPDB Online',
        icon: <GraduationCap className="w-5 h-5 text-amber-300" />,
        action: () => (onNavigate ? onNavigate('psb') : onPsbClick?.())
      };
    }
    // Generic fallback for any additional slides
    const text = (customLabel || '').toLowerCase();
    if (text.includes('kesiswaan') || text.includes('ekskul')) {
      return {
        label: customLabel || 'Lihat Kesiswaan',
        icon: <Users className="w-5 h-5 text-amber-300" />,
        action: () => onNavigate?.('kesiswaan')
      };
    }
    if (text.includes('sarana') || text.includes('fasilitas')) {
      return {
        label: customLabel || 'Sarana & Fasilitas',
        icon: <Building2 className="w-5 h-5 text-amber-300" />,
        action: () => onNavigate?.('fasilitas')
      };
    }
    return {
      label: customLabel || 'Pendaftaran PPDB',
      icon: <GraduationCap className="w-5 h-5 text-amber-300" />,
      action: () => (onNavigate ? onNavigate('psb') : onPsbClick?.())
    };
  };

  const getSecondaryBtnInfo = (idx: number, customLabel?: string) => {
    if (idx === 0) {
      return {
        label: customLabel || 'Jelajahi Profil Sekolah',
        icon: <ChevronRight className="w-4 h-4 text-emerald-300" />,
        action: () => (onNavigate ? onNavigate('profil') : onExploreClick?.())
      };
    }
    if (idx === 1) {
      return {
        label: customLabel || 'Daftar Sekarang',
        icon: <GraduationCap className="w-4 h-4 text-emerald-300" />,
        action: () => (onNavigate ? onNavigate('psb') : onPsbClick?.())
      };
    }
    if (idx === 2) {
      return {
        label: customLabel || 'Info Kurikulum',
        icon: <BookOpen className="w-4 h-4 text-emerald-300" />,
        action: () => (onNavigate ? onNavigate('program', 'kurikulum') : onNavigate?.('program', 'kurikulum'))
      };
    }
    if (idx === 3) {
      return {
        label: customLabel || 'Hubungi Panitia',
        icon: <PhoneCall className="w-4 h-4 text-emerald-300" />,
        action: () => (onNavigate ? onNavigate('kontak') : onNavigate?.('kontak'))
      };
    }
    // Generic fallback for any additional slides
    const text = (customLabel || '').toLowerCase();
    if (text.includes('kurikulum') || text.includes('akademik')) {
      return {
        label: customLabel || 'Info Kurikulum',
        icon: <BookOpen className="w-4 h-4 text-emerald-300" />,
        action: () => onNavigate?.('program', 'kurikulum')
      };
    }
    if (text.includes('panitia') || text.includes('kontak') || text.includes('hubungi')) {
      return {
        label: customLabel || 'Hubungi Panitia',
        icon: <PhoneCall className="w-4 h-4 text-emerald-300" />,
        action: () => onNavigate?.('kontak')
      };
    }
    return {
      label: customLabel || 'Jelajahi Profil',
      icon: <ChevronRight className="w-4 h-4 text-emerald-300" />,
      action: () => (onNavigate ? onNavigate('profil') : onExploreClick?.())
    };
  };

  const primaryBtnInfo = getPrimaryBtnInfo(currentSlide, activeSlide.primaryBtn);
  const secondaryBtnInfo = getSecondaryBtnInfo(currentSlide, activeSlide.secondaryBtn);

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white">
      {/* Background Image Carousel */}
      <div className="relative h-[560px] sm:h-[620px] lg:h-[680px] w-full group">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
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
                type="button"
                onClick={primaryBtnInfo.action}
                className="bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-black px-6 py-3.5 rounded-xl shadow-xl hover:shadow-emerald-600/30 transition-all flex items-center gap-2 text-sm sm:text-base border border-emerald-500/40 hover:scale-105 cursor-pointer"
              >
                {primaryBtnInfo.icon}
                <span>{primaryBtnInfo.label}</span>
              </button>

              <button
                id="btn-hero-secondary"
                type="button"
                onClick={secondaryBtnInfo.action}
                className="bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md text-white font-semibold px-6 py-3.5 rounded-xl border border-white/25 hover:border-white/40 transition-all flex items-center gap-2 text-sm sm:text-base hover:scale-105 cursor-pointer"
              >
                <span>{secondaryBtnInfo.label}</span>
                {secondaryBtnInfo.icon}
              </button>
            </div>

            {/* Quality Seals */}
            <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-white">Akreditasi A BAN-PDM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-white">NPSN: 20279752</span>
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

      {/* Quick Statistics Banner with Fast Animated Counters */}
      <div className="w-full bg-slate-900 border-b border-slate-800 py-6 px-4 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-4xl font-black text-amber-400 tracking-tight">
              <AnimatedCounter 
                value={statsData?.students || SCHOOL_INFO.stats.students || '450+'} 
                duration={850} 
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Peserta Didik Aktif
            </div>
          </div>

          <div className="p-3 border-l border-slate-800">
            <div className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              <AnimatedCounter 
                value={statsData?.teachers || SCHOOL_INFO.stats.teachers || '26'} 
                duration={850} 
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Tenaga Pendidik & Staf
            </div>
          </div>

          <div className="p-3 border-l border-slate-800">
            <div className="text-2xl sm:text-4xl font-black text-amber-400 tracking-tight">
              <AnimatedCounter 
                value={statsData?.extracurriculars || SCHOOL_INFO.stats.extracurriculars || '14'} 
                duration={850} 
              />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Kegiatan Ekstrakurikuler
            </div>
          </div>

          <div className="p-3 border-l border-slate-800">
            <div className="text-xl sm:text-3xl font-black text-emerald-400 tracking-tight flex items-center justify-center gap-1.5 flex-wrap">
              <Award className="w-5 h-5 text-emerald-400 hidden sm:inline-block" />
              <AnimatedCounter 
                value={statsData?.accreditation || SCHOOL_INFO.akreditasi || 'Akreditasi B'} 
                duration={850} 
              />
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
