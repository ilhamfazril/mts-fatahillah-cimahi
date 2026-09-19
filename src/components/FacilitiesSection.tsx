import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { FACILITIES_LIST } from '../data/schoolData';
import { FacilityItem } from '../types';

interface FacilitiesSectionProps {
  facilitiesData?: FacilityItem[];
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ facilitiesData }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  const categories = ['Semua', 'Akademik', 'Olahraga', 'Seni & Budaya', 'Penunjang'];

  const allFacilities = (facilitiesData && facilitiesData.length > 0) ? facilitiesData : FACILITIES_LIST;

  const filteredFacilities = activeCategory === 'Semua'
    ? allFacilities
    : allFacilities.filter((f) => f.category === activeCategory);

  return (
    <section id="fasilitas" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Fasilitas Kampus <span className="text-emerald-700">Modern & Ramah Anak</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              Didukung infrastruktur berstandar nasional dan internasional guna mendukung kenyamanan belajar, eksplorasi riset, dan pengembangan bakat minat siswa.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {fac.category}
                </span>
                <button
                  onClick={() => setSelectedFacility(fac)}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/60 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors shadow"
                  title="Lihat Detail"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {fac.name}
                  </h3>
                  <p className="mt-2 text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {fac.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="space-y-1">
                    {fac.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedFacility(fac)}
                    className="mt-3 w-full py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 text-emerald-800 text-[11px] font-bold transition-colors text-center"
                  >
                    Detail Fasilitas
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hygiene & Security certification strip */}
        <div className="mt-12 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold flex-shrink-0 shadow">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                Standar Sanitasi Sekolah Sehat Strata Paripurna
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                Pengawasan CCTV 24 Jam di seluruh area kampus, air minum steril teruji berkala, dan penanganan medis cepat tanggap.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-white px-4 py-2 rounded-xl border border-emerald-200">
            <span>Standar ISO 9001:2015</span>
          </div>
        </div>

      </div>

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative">
            <div className="relative h-60 w-full">
              <img
                src={selectedFacility.image}
                alt={selectedFacility.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/30 to-transparent" />
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-emerald-600 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                  {selectedFacility.category}
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  {selectedFacility.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-slate-700 text-sm leading-relaxed">
                {selectedFacility.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2.5">
                  Fasilitas & Kelengkapan
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedFacility.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
