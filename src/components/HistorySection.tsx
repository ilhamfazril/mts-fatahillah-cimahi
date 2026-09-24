import React from 'react';
import { History, Award, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const HistorySection: React.FC = () => {
  const milestones = [
    {
      year: 'Pendirian Awal',
      title: 'Kiprah Pengabdian Yayasan Fatahillah di Kota Cimahi',
      desc: 'Bermula dari komitmen para pendidik dan tokoh masyarakat muslim di bawah naungan Yayasan Fatahillah untuk menyediakan pendidikan madrasah tsanawiyah yang bernuansa islami, terjangkau, dan berkarakter mulia bagi putra-putri di Cimahi Tengah.'
    },
    {
      year: 'Pengembangan Sarana',
      title: 'Pembangunan Kampus & Fasilitas Pembelajaran',
      desc: 'Pengembangan bertahap sarana dan prasarana madrasah di Jl. Cigugur Tengah No. 45, dilengkapi ruang kelas yang nyaman, musholla, lapangan upacara/olahraga, ruang guru, dan perpustakaan.'
    },
    {
      year: 'Fasilitas Komputer',
      title: 'Pembangunan Laboratorium Komputer & Kesiapan ANBK',
      desc: 'Pengadaan sarana laboratorium komputer terpadu dengan puluhan PC desktop siap pakai, memudahkan siswa dalam simulasi dan pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) serta literasi teknologi digital.'
    },
    {
      year: 'Masa Kini',
      title: 'Implementasi Kurikulum Merdeka & Penguatan Karakter',
      desc: 'Menerapkan Kurikulum Merdeka dengan fokus pada Projek Penguatan Profil Pelajar Pancasila (P5), pembiasaan sholat dhuha dan tadarus rutin, kepramukaan aktif, dan pembinaan budi pekerti luhur.'
    }
  ];

  return (
    <section id="sejarah" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
            <History className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kilas Sejarah</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perjalanan Sejarah <span className="text-emerald-700">MTs Fatahillah Cimahi</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Dedikasi mengabdi membina tunas bangsa yang beriman, cerdas, berdisiplin, dan berakhlak mulia di Kota Cimahi, Jawa Barat.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-emerald-500/40 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-emerald-700 border-4 border-white shadow flex items-center justify-center text-white text-[10px] font-bold">
                  {idx + 1}
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:border-emerald-400 group-hover:bg-emerald-50/40 transition-all">
                  <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2.5">
                    {m.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
