import React, { useState } from 'react';
import { Search, X, ChevronRight, FileText, Sparkles, Trophy, Building2 } from 'lucide-react';
import { NEWS_LIST, PROGRAMS_UNGGULAN, FACILITIES_LIST, EXTRACURRICULAR_LIST } from '../data/schoolData';
import { NewsItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: NewsItem) => void;
  onNavigateTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const matchingNews = normalizedQuery
    ? NEWS_LIST.filter(
        (n) =>
          n.title.toLowerCase().includes(normalizedQuery) ||
          n.excerpt.toLowerCase().includes(normalizedQuery) ||
          n.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchingPrograms = normalizedQuery
    ? PROGRAMS_UNGGULAN.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          p.shortDesc.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchingFacilities = normalizedQuery
    ? FACILITIES_LIST.filter(
        (f) =>
          f.name.toLowerCase().includes(normalizedQuery) ||
          f.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchingEkskul = normalizedQuery
    ? EXTRACURRICULAR_LIST.filter(
        (e) =>
          e.name.toLowerCase().includes(normalizedQuery) ||
          e.description.toLowerCase().includes(normalizedQuery) ||
          e.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const hasResults =
    matchingNews.length > 0 ||
    matchingPrograms.length > 0 ||
    matchingFacilities.length > 0 ||
    matchingEkskul.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative max-h-[80vh] flex flex-col">
        
        {/* Search input bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari program, berita, ekskul, PSB, atau fasilitas..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Bersihkan
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              <Sparkles className="w-8 h-8 text-emerald-400/40 mx-auto mb-2" />
              <p>Ketik kata kunci pencarian, misalnya: "Trip Observasi", "PSB", "Robotik", "ACEX", atau "Beasiswa"</p>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Tidak ditemukan hasil untuk "<span className="font-semibold text-slate-600">{query}</span>".
            </div>
          ) : (
            <>
              {/* Programs */}
              {matchingPrograms.length > 0 && (
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Program Unggulan ({matchingPrograms.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingPrograms.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onNavigateTab('program');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 cursor-pointer border border-slate-200/80 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{p.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{p.shortDesc}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News */}
              {matchingNews.length > 0 && (
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Berita & Prestasi ({matchingNews.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingNews.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onSelectArticle(n);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 cursor-pointer border border-slate-200/80 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="text-emerald-700 font-semibold">{n.category}</span>
                            <span>•</span>
                            <span>{n.date}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extracurriculars */}
              {matchingEkskul.length > 0 && (
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-2">
                    Ekstrakurikuler ({matchingEkskul.length})
                  </div>
                  <div className="space-y-2">
                    {matchingEkskul.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => {
                          onNavigateTab('kesiswaan');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 cursor-pointer border border-slate-200/80 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{e.name}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{e.description}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Facilities */}
              {matchingFacilities.length > 0 && (
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Fasilitas ({matchingFacilities.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingFacilities.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => {
                          onNavigateTab('fasilitas');
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 cursor-pointer border border-slate-200/80 transition-colors flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{f.name}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{f.description}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
