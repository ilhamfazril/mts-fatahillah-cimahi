import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Trophy, 
  Globe, 
  ShieldCheck, 
  Atom, 
  ChevronRight, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { PROGRAMS_UNGGULAN } from '../data/schoolData';
import { ProgramUnggulan } from '../types';

export const ProgramsSection: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramUnggulan | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6" />;
      case 'Globe':
        return <Globe className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Atom':
        return <Atom className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="program" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Karakteristik & Keunggulan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program Unggulan <span className="text-emerald-700">SMP PGRI 5 Cimahi</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Kurikulum terintegrasi yang memadukan Kurikulum Merdeka, kesiapan asesmen berbasis komputer (ANBK), pembiasaan budi pekerti, dan pengembangan minat bakat.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS_UNGGULAN.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  {program.badge}
                </div>

                {/* Floating Icon */}
                <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg">
                  {getIcon(program.icon)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {program.shortDesc}
                  </p>

                  {/* Highlights preview */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    {program.highlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-emerald-50 text-emerald-800 text-xs font-bold border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Lihat Detail Program</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Immersion & Karakter Banner Spotlight */}
        <div className="mt-14 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Teknologi & Literasi Digital</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Mempersiapkan Generasi Cerdas Digital & Berakhlak Mulia
              </h3>
              <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                SMP PGRI 5 Cimahi berkomitmen membekali para siswa dengan sarana laboratorium komputer siap ujian CBT/ANBK, bimbingan guru yang berdedikasi, serta pembiasaan sholat dhuha dan upacara bendera demi mewujudkan Profil Pelajar Pancasila.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <div className="text-amber-400 font-bold text-xs uppercase">Laboratorium ANBK</div>
                <div className="text-white text-sm font-semibold mt-0.5">Fasilitas Komputer & Ujian Digital CBT</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <div className="text-emerald-300 font-bold text-xs uppercase">Pembiasaan Religius</div>
                <div className="text-white text-sm font-semibold mt-0.5">Sholat Dhuha, Tadarus Al-Qur'an & Karakter</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Detail Program */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header with Image */}
            <div className="relative h-56 w-full">
              <img
                src={selectedProgram.image}
                alt={selectedProgram.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-emerald-600 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                  {selectedProgram.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                  {selectedProgram.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {selectedProgram.fullDesc}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                  Poin Keunggulan Utama
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProgram.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Tutup Informasi
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
