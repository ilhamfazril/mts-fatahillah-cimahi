import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { PgriLogo } from './PgriLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenPsbModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPsbModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      
      {/* Top Banner with Motto */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <PgriLogo size={42} />
            <div>
              <div className="text-white font-extrabold text-sm tracking-wide">
                SMP PGRI 5 CIMAHI — KOTA CIMAHI
              </div>
              <div className="text-amber-400 text-xs font-bold tracking-widest uppercase">
                Motto: {SCHOOL_INFO.motto}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300">Pendaftaran Peserta Didik Baru telah dibuka!</span>
            <button
              onClick={onOpenPsbModal}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold transition-all shadow hover:scale-105 flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Info PPDB 2025/2026</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Profile */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <PgriLogo size={48} />
              <div>
                <div className="text-white font-black text-base tracking-tight">
                  SMP PGRI 5 CIMAHI
                </div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  YPLP PGRI Kota Cimahi
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Sekolah Menengah Pertama yang berdedikasi membentuk generasi berakhlak mulia, disiplin, berprestasi, dan terampil. Menyelenggarakan Kurikulum Merdeka dengan sarana laboratorium komputer ANBK dan ragam ekstrakurikuler.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px]">
              <span className="bg-slate-900 border border-slate-800 text-emerald-300 px-2.5 py-1 rounded-md font-semibold">
                NPSN: {SCHOOL_INFO.npsn}
              </span>
              <span className="bg-slate-900 border border-slate-800 text-amber-300 px-2.5 py-1 rounded-md font-semibold">
                Akreditasi: {SCHOOL_INFO.akreditasi}
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md font-semibold">
                Kota Cimahi - Jawa Barat
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-l-2 border-amber-400 pl-2">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Beranda</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('profil')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Profil & Sambutan Kepala Sekolah</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sejarah')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Visi, Misi & Nilai Dasar</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('program')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Program Kurikulum Merdeka & ANBK</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('kesiswaan')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Kesiswaan & Ekstrakurikuler</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('fasilitas')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Fasilitas (Lab Komputer, Lapangan)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Program & PPDB */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-l-2 border-emerald-500 pl-2">
              Layanan & PPDB
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('psb')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Informasi PPDB 2025/2026</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPsbModal}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Formulir Pendaftaran</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('prestasi')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Prestasi Siswa</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('berita')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  <span>Berita & Pengumuman</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider border-l-2 border-amber-400 pl-2">
              Sekretariat Sekolah
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{SCHOOL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{SCHOOL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{SCHOOL_INFO.operationalHours}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-6 px-4 bg-slate-950 text-[11px] text-slate-500 text-center sm:flex sm:justify-between sm:items-center max-w-7xl mx-auto">
        <div>
          © {new Date().getFullYear()} SMP PGRI 5 Cimahi (YPLP PGRI Kota Cimahi). Seluruh hak cipta dilindungi.
        </div>
        <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4">
          <span>Website Resmi: smppgri5cimahi.sch.id</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">DISIPLIN • CERDAS • BERKARAKTER</span>
        </div>
      </div>
    </footer>
  );
};
