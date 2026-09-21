import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  GraduationCap, 
  Award,
  BookOpen,
  Users,
  Building2,
  Sparkles,
  Lock,
  ShieldCheck,
  LogOut,
  User,
  Sliders,
  Trophy,
  Newspaper
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { PgriLogo } from './PgriLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenPsbModal: () => void;
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
  onOpenAdminDashboard: () => void;
  onLogoutAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenPsbModal,
  isAdmin,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onLogoutAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [academicDropdownOpen, setAcademicDropdownOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [infoDropdownOpen, setInfoDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setAcademicDropdownOpen(false);
    setStudentDropdownOpen(false);
    setInfoDropdownOpen(false);
    
    // Always land cleanly and accurately at the top of the selected page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300 shadow-md select-none">
      
      {/* Top Notification / Info Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 hidden lg:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Contact Details Left */}
          <div className="flex items-center space-x-6 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Jl. RH Abdul Halim RT 03/03, Cigugur Tengah, Cimahi</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>(022) 665-2408</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>smppgri5cimahi@gmail.com</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Senin - Jumat 07.00 - 15.00 WIB</span>
            </div>
          </div>

          {/* Accreditation & PPDB CTA Right */}
          <div className="flex items-center space-x-3">
            <span className="bg-emerald-900/80 text-emerald-200 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-700/60 shadow-sm">
              NPSN: 20224096 • Akreditasi B BAN-S/M
            </span>
            <button 
              onClick={onOpenPsbModal}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-3 py-1 rounded-md text-[11px] transition-all flex items-center gap-1 shadow hover:scale-105"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>PPDB 2025/2026</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full bg-white transition-all duration-300 border-b border-slate-100 ${
        isScrolled ? 'py-2 sm:py-2.5 shadow-md' : 'py-3 sm:py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand & School Title */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 sm:gap-3.5 cursor-pointer group"
          >
            {/* Official PGRI Circular Vector Logo */}
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <PgriLogo size={50} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-800 transition-colors">
                  SMP PGRI 5
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight leading-none">
                  CIMAHI
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-500 font-semibold mt-1">
                <span className="text-emerald-800 font-extrabold tracking-wider uppercase">
                  DISIPLIN • CERDAS • BERKARAKTER
                </span>
                <span className="text-slate-300 hidden md:inline">|</span>
                <span className="hidden md:inline text-slate-600 font-normal">
                  YPLP PGRI Kota Cimahi
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links (Option 2: 5 Consolidated Menu Groups) */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* 1. Beranda */}
            <button
              id="nav-beranda"
              onClick={() => handleNavClick('beranda')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'beranda'
                  ? 'text-emerald-800 bg-emerald-50 shadow-sm border border-emerald-200/60'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Beranda
            </button>

            {/* 2. Profil ▾ */}
            <div 
              className="relative"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <button
                id="nav-profil-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                  activeTab === 'profil' || activeTab === 'sejarah' || activeTab === 'guru-staf' || activeTab === 'fasilitas'
                    ? 'text-emerald-800 bg-emerald-50 shadow-sm border border-emerald-200/60'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span>Profil</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('profil')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Sambutan & Visi Misi</div>
                      <div className="text-[10px] text-slate-400">Kepala Sekolah & Arah Tujuan</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('sejarah')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Sejarah PGRI & Sekolah</div>
                      <div className="text-[10px] text-slate-400">Dedikasi pendidikan Cimahi</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('guru-staf')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Dewan Guru & Staf</div>
                      <div className="text-[10px] text-slate-400">Tenaga pendidik berkompeten</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('fasilitas')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors border-t border-slate-100 mt-1 pt-2"
                  >
                    <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Sarana & Fasilitas</div>
                      <div className="text-[10px] text-slate-400">Lab komputer, lapangan & kelas</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Akademik ▾ */}
            <div 
              className="relative"
              onMouseEnter={() => setAcademicDropdownOpen(true)}
              onMouseLeave={() => setAcademicDropdownOpen(false)}
            >
              <button
                id="nav-akademik-btn"
                onClick={() => setAcademicDropdownOpen(!academicDropdownOpen)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                  activeTab === 'program'
                    ? 'text-emerald-800 bg-emerald-50 shadow-sm border border-emerald-200/60'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span>Akademik</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${academicDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {academicDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('program')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Kurikulum Merdeka Mandiri</div>
                      <div className="text-[10px] text-slate-400">Pembelajaran aktif berpusat siswa</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('program')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">ANBK & Literasi Digital</div>
                      <div className="text-[10px] text-slate-400">Lab CBT & teknologi informatika</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('program')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Pembiasaan & Karakter</div>
                      <div className="text-[10px] text-slate-400">Sholat dhuha & tadarus rutin</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Kesiswaan ▾ */}
            <div 
              className="relative"
              onMouseEnter={() => setStudentDropdownOpen(true)}
              onMouseLeave={() => setStudentDropdownOpen(false)}
            >
              <button
                id="nav-kesiswaan-btn"
                onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                  activeTab === 'kesiswaan' || activeTab === 'prestasi'
                    ? 'text-emerald-800 bg-emerald-50 shadow-sm border border-emerald-200/60'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span>Kesiswaan</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${studentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {studentDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('kesiswaan')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Ekstrakurikuler & OSIS</div>
                      <div className="text-[10px] text-slate-400">Paskibra, Pramuka, Futsal & Seni</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('prestasi')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="font-bold">Prestasi Siswa</div>
                      <div className="text-[10px] text-slate-400">Juara akademik & non-akademik</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Informasi ▾ */}
            <div 
              className="relative"
              onMouseEnter={() => setInfoDropdownOpen(true)}
              onMouseLeave={() => setInfoDropdownOpen(false)}
            >
              <button
                id="nav-informasi-btn"
                onClick={() => setInfoDropdownOpen(!infoDropdownOpen)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-1 transition-all ${
                  activeTab === 'berita' || activeTab === 'kontak'
                    ? 'text-emerald-800 bg-emerald-50 shadow-sm border border-emerald-200/60'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span>Informasi</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${infoDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {infoDropdownOpen && (
                <div className="absolute right-0 lg:left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => handleNavClick('berita')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <Newspaper className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Warta & Berita Sekolah</div>
                      <div className="text-[10px] text-slate-400">Agenda kegiatan & kabar terbaru</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleNavClick('kontak')}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center gap-2.5 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">Kontak & Lokasi Kampus</div>
                      <div className="text-[10px] text-slate-400">Peta, kontak WhatsApp & pengaduan</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs Desktop Right (Search + Login Admin / Panel Admin) */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            <button
              id="btn-search-header"
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
              title="Pencarian Cepat"
            >
              <Search className="w-5 h-5" />
            </button>

            {!isAdmin ? (
              <button
                id="nav-login-admin"
                type="button"
                onClick={onOpenAdminLogin}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-all flex items-center gap-1.5 border border-slate-200 shadow-sm whitespace-nowrap shrink-0"
                title="Login Admin untuk merubah foto & teks slide real-time"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Login Admin</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  id="nav-panel-admin"
                  type="button"
                  onClick={onOpenAdminDashboard}
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm font-black bg-emerald-700 hover:bg-emerald-800 text-white transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg hover:scale-105 whitespace-nowrap"
                  title="Buka Panel Pengaturan Konten Real-Time"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Panel Admin</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                </button>

                <button
                  id="nav-logout-admin"
                  type="button"
                  onClick={onLogoutAdmin}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                  title="Keluar dari Akun Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu and search toggle */}
          <div className="flex lg:hidden items-center space-x-1.5">
            <button
              id="btn-search-mobile"
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {/* Quick PPDB banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-3.5 mb-3 shadow-sm">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-300" />
                <div className="text-xs font-bold">PPDB 2025/2026 SMP PGRI 5 CIMAHI</div>
              </div>
              <p className="text-[11px] text-emerald-100 mt-1">
                Penerimaan Peserta Didik Baru telah dibuka. Biaya terjangkau & fasilitas lengkap.
              </p>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPsbModal();
                }}
                className="mt-2.5 w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2 px-3 rounded-xl text-xs text-center shadow transition-colors"
              >
                Daftar PPDB Sekarang
              </button>
            </div>

            <button
              onClick={() => handleNavClick('beranda')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'beranda' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick('profil')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'profil' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Profil & Sambutan Kepala Sekolah
            </button>
            <button
              onClick={() => handleNavClick('sejarah')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'sejarah' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Visi, Misi & Sejarah Sekolah
            </button>
            <button
              onClick={() => handleNavClick('guru-staf')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'guru-staf' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Dewan Guru & Tenaga Kependidikan
            </button>
            <button
              onClick={() => handleNavClick('program')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'program' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Program & Kurikulum (ANBK, P5)
            </button>
            <button
              onClick={() => handleNavClick('kesiswaan')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'kesiswaan' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Kesiswaan & Ekstrakurikuler
            </button>
            <button
              onClick={() => handleNavClick('fasilitas')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'fasilitas' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Fasilitas Kampus (Lab Komputer, Lapangan)
            </button>
            <button
              onClick={() => handleNavClick('prestasi')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'prestasi' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Prestasi Siswa
            </button>
            <button
              onClick={() => handleNavClick('berita')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'berita' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Berita & Informasi Terkini
            </button>
            <button
              onClick={() => handleNavClick('kontak')}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-colors ${
                activeTab === 'kontak' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Kontak & Lokasi Sekolah
            </button>

            {/* Mobile Section: Akses Khusus Akun Admin */}
            <div className="pt-3 mt-3 border-t border-slate-200">
              {!isAdmin ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-colors whitespace-nowrap"
                >
                  <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Login Admin</span>
                </button>
              ) : (
                <div className="space-y-2 bg-emerald-900 text-white p-3.5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <ShieldCheck className="w-4 h-4 text-amber-300" />
                      <span className="font-bold text-emerald-100">Akun: admin_ilham</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdminDashboard();
                      }}
                      className="w-full py-2.5 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Buka Panel Admin (Ubah Teks & Foto)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogoutAdmin();
                      }}
                      className="w-full py-2 px-3 bg-emerald-950/80 hover:bg-rose-700 text-emerald-200 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar dari Akun Admin</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
