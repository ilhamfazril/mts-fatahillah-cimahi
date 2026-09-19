import React from 'react';
import { GraduationCap, Award, BookOpen, Sparkles } from 'lucide-react';
import { TEACHERS_LIST } from '../data/schoolData';

export const TeachersSection: React.FC = () => {
  return (
    <section id="guru-staf" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pendidik Berdedikasi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pimpinan & Tenaga <span className="text-emerald-700">Pendidik Unggulan</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Didukung oleh 48 tenaga pendidik profesional berkualifikasi magister dan doktoral dari perguruan tinggi terkemuka, berkomitmen menginspirasi potensi siswa.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEACHERS_LIST.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all text-center flex flex-col group"
            >
              <div className="relative h-60 w-full overflow-hidden bg-emerald-950">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 inset-x-3 text-amber-300 font-bold text-xs bg-black/60 backdrop-blur-sm py-1 rounded-lg">
                  {teacher.role}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                    {teacher.name}
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    {teacher.subject}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  {teacher.education}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Training stats */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
          <div>
            <div className="text-2xl font-black text-emerald-700">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">Sertifikasi Pendidik Profesional</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-200" />
          <div>
            <div className="text-2xl font-black text-emerald-700">70%+</div>
            <div className="text-xs text-slate-500 mt-0.5">Berkualifikasi Magister (S2 / S3)</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-200" />
          <div>
            <div className="text-2xl font-black text-emerald-700">1 : 16</div>
            <div className="text-xs text-slate-500 mt-0.5">Rasio Ideal Guru : Siswa</div>
          </div>
        </div>

      </div>
    </section>
  );
};
