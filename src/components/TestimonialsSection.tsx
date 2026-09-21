import React from 'react';
import { Quote, Star, Sparkles, Heart } from 'lucide-react';
import { TESTIMONIALS_LIST } from '../data/schoolData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-emerald-600" />
            <span>Suara Komunitas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata <span className="text-emerald-700">Alumni & Orang Tua</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Pengalaman nyata menjalani proses belajar yang berkarakter, bermakna, dan membekas seumur hidup.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_LIST.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-emerald-100 absolute top-6 right-6" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic relative z-10">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 text-white font-bold flex items-center justify-center text-sm shadow-sm border-2 border-emerald-400/80 flex-shrink-0">
                    {item.author.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('')}
                  </div>
                )}
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">
                    {item.author}
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold">
                    {item.role}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.relation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
