import React, { useState, useEffect } from 'react';
import { 
  X, 
  LayoutDashboard, 
  Image as ImageIcon, 
  UserCheck, 
  BookOpen, 
  Newspaper, 
  Building2, 
  Activity, 
  Trophy, 
  Settings, 
  LogOut, 
  CheckCircle2, 
  RotateCcw, 
  ShieldCheck, 
  Download,
  AlertCircle,
  Database,
  ChevronRight,
  Menu,
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { 
  SchoolSiteContent, 
  HeroSlideContent, 
  PrincipalProfileContent,
  saveSiteContentToFirestore, 
  resetSiteContentToDefaults,
  DEFAULT_HERO_SLIDES,
  DEFAULT_PRINCIPAL_CONTENT
} from '../services/siteContentService';
import { getAdminSession } from '../services/adminAuthService';
import { ProgramUnggulan, NewsItem, FacilityItem, ExtracurricularItem, AchievementItem } from '../types';
import { PROGRAMS_UNGGULAN, NEWS_LIST, FACILITIES_LIST, EXTRACURRICULAR_LIST, ACHIEVEMENTS_LIST } from '../data/schoolData';

import { AdminOverviewTab } from './admin/AdminOverviewTab';
import { AdminHeroSlidesTab } from './admin/AdminHeroSlidesTab';
import { AdminPrincipalTab } from './admin/AdminPrincipalTab';
import { AdminProgramsTab } from './admin/AdminProgramsTab';
import { AdminNewsTab } from './admin/AdminNewsTab';
import { AdminFacilitiesTab } from './admin/AdminFacilitiesTab';
import { AdminExtracurricularsTab } from './admin/AdminExtracurricularsTab';
import { AdminAchievementsTab } from './admin/AdminAchievementsTab';
import { AdminPpdbTab } from './admin/AdminPpdbTab';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteContent: SchoolSiteContent;
  onLogout: () => void;
}

type AdminTab = 
  | 'overview' 
  | 'slides' 
  | 'principal' 
  | 'programs' 
  | 'news' 
  | 'facilities' 
  | 'extracurriculars' 
  | 'achievements' 
  | 'ppdb'
  | 'settings';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  siteContent,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [tabHistory, setTabHistory] = useState<AdminTab[]>(['overview']);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [globalFeedback, setGlobalFeedback] = useState<string | null>(null);

  const navigateToTab = (tab: AdminTab) => {
    if (tab !== activeTab) {
      setTabHistory((prev) => [...prev, tab]);
      setActiveTab(tab);
    }
    setIsMobileNavOpen(false);
  };

  const handleGoBack = () => {
    if (tabHistory.length > 1) {
      const nextHistory = [...tabHistory];
      nextHistory.pop(); // remove current tab
      const prev = nextHistory[nextHistory.length - 1];
      setTabHistory(nextHistory);
      setActiveTab(prev || 'overview');
    } else {
      setActiveTab('overview');
    }
  };

  const session = getAdminSession();

  // Close with Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Generic helper to update a part of siteContent and push to Firestore
  const updateSiteSection = async (partial: Partial<SchoolSiteContent>) => {
    const updated: SchoolSiteContent = {
      ...siteContent,
      ...partial,
      updatedAt: new Date().toISOString(),
      updatedBy: session?.username || 'admin_ilham',
    };
    await saveSiteContentToFirestore(updated);
  };

  const handleSaveSlides = async (updatedSlides: HeroSlideContent[]) => {
    await updateSiteSection({ heroSlides: updatedSlides });
  };

  const handleSavePrincipal = async (updatedPrincipal: PrincipalProfileContent) => {
    await updateSiteSection({ principal: updatedPrincipal });
  };

  const handleSavePrograms = async (updatedPrograms: ProgramUnggulan[]) => {
    await updateSiteSection({ programs: updatedPrograms });
  };

  const handleSaveNews = async (updatedNews: NewsItem[]) => {
    await updateSiteSection({ news: updatedNews });
  };

  const handleSaveFacilities = async (updatedFacilities: FacilityItem[]) => {
    await updateSiteSection({ facilities: updatedFacilities });
  };

  const handleSaveExtracurriculars = async (updatedExtracurriculars: ExtracurricularItem[]) => {
    await updateSiteSection({ extracurriculars: updatedExtracurriculars });
  };

  const handleSaveAchievements = async (updatedAchievements: AchievementItem[]) => {
    await updateSiteSection({ achievements: updatedAchievements });
  };

  const handleResetToDefaults = async () => {
    try {
      setIsResetting(true);
      await resetSiteContentToDefaults();
      setIsResetConfirmOpen(false);
      setGlobalFeedback('Seluruh data website berhasil dikembalikan ke standar awal.');
      setTimeout(() => setGlobalFeedback(null), 5000);
    } catch (err) {
      console.error(err);
      alert('Gagal mengatur ulang data.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `smp_pgri_5_cimahi_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const navItems = [
    {
      id: 'overview' as AdminTab,
      label: 'Ringkasan & Status',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: null,
    },
    {
      id: 'slides' as AdminTab,
      label: 'Slide Banner Hero',
      icon: <ImageIcon className="w-4 h-4" />,
      badge: siteContent.heroSlides?.length || 4,
    },
    {
      id: 'principal' as AdminTab,
      label: 'Profil Kepala Sekolah',
      icon: <UserCheck className="w-4 h-4" />,
      badge: null,
    },
    {
      id: 'programs' as AdminTab,
      label: 'Program Unggulan',
      icon: <BookOpen className="w-4 h-4" />,
      badge: siteContent.programs?.length || PROGRAMS_UNGGULAN.length,
    },
    {
      id: 'news' as AdminTab,
      label: 'Berita & Agenda',
      icon: <Newspaper className="w-4 h-4" />,
      badge: siteContent.news?.length || NEWS_LIST.length,
    },
    {
      id: 'facilities' as AdminTab,
      label: 'Fasilitas Sarana',
      icon: <Building2 className="w-4 h-4" />,
      badge: siteContent.facilities?.length || FACILITIES_LIST.length,
    },
    {
      id: 'extracurriculars' as AdminTab,
      label: 'Ekstrakurikuler',
      icon: <Activity className="w-4 h-4" />,
      badge: siteContent.extracurriculars?.length || EXTRACURRICULAR_LIST.length,
    },
    {
      id: 'achievements' as AdminTab,
      label: 'Prestasi Siswa',
      icon: <Trophy className="w-4 h-4" />,
      badge: siteContent.achievements?.length || ACHIEVEMENTS_LIST.length,
    },
    {
      id: 'ppdb' as AdminTab,
      label: 'Pendaftar PPDB Online',
      icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
      badge: 'Live',
    },
    {
      id: 'settings' as AdminTab,
      label: 'Cadangan & Pengaturan',
      icon: <Settings className="w-4 h-4" />,
      badge: null,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-50 w-full h-full sm:h-[94vh] sm:w-[96vw] sm:max-w-7xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-700/50">
        
        {/* Top Header Bar */}
        <header className="bg-emerald-950 text-white px-4 sm:px-6 py-3.5 border-b border-emerald-800/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="p-1.5 rounded-lg bg-emerald-900/80 text-emerald-200 md:hidden hover:bg-emerald-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
              P5
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-white leading-none">
                  Admin Panel SMP PGRI 5 Cimahi
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-800/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-600/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Real-Time Sync
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80 hidden sm:block mt-0.5">
                Pengelolaan Konten Mandiri & Sinkronisasi Cloud Firestore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* User Profile Info */}
            <div className="hidden lg:flex items-center gap-2 bg-emerald-900/60 border border-emerald-700/50 px-3 py-1.5 rounded-xl text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <div>
                <span className="font-bold text-white block leading-none">
                  {session?.displayName || 'Administrator'}
                </span>
                <span className="text-[10px] text-emerald-300 font-mono">
                  @{session?.username || 'admin_ilham'}
                </span>
              </div>
            </div>

            {/* Logout button */}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-white border border-rose-800/60 rounded-xl text-xs font-bold transition-colors"
              title="Keluar dari sesi Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>

            {/* Close modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 text-emerald-300 hover:text-white hover:bg-emerald-800/60 rounded-xl transition-colors"
              title="Tutup Panel (Kembali ke Web)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Global Feedback Banner */}
        {globalFeedback && (
          <div className="bg-emerald-600 text-white text-xs font-semibold px-6 py-2.5 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>{globalFeedback}</span>
            </div>
            <button
              type="button"
              onClick={() => setGlobalFeedback(null)}
              className="text-emerald-100 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Main Body: Sidebar + Active Tab Content */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Sidebar Navigation */}
          <aside
            className={`absolute md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
              isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <div className="p-3 overflow-y-auto space-y-1">
              <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                Menu Manajemen
              </div>

              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateToTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-amber-300' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-emerald-800 text-emerald-100'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sidebar Footer Info */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/70 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cloud Firestore</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">
                Data terenkripsi dan terhubung secara live ke seluruh browser pengunjung.
              </p>
            </div>
          </aside>

          {/* Backdrop for mobile nav */}
          {isMobileNavOpen && (
            <div
              onClick={() => setIsMobileNavOpen(false)}
              className="fixed inset-0 bg-black/40 z-20 md:hidden"
            />
          )}

          {/* Tab Content View Area */}
          <main className="flex-1 bg-slate-100/70 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
            <div className="max-w-6xl mx-auto">
              {/* Sticky Top Back Bar (Permanently visible at the top without scrolling) */}
              {activeTab !== 'overview' && (
                <div className="sticky top-0 z-30 -mt-2 mb-6 backdrop-blur-md bg-white/95 border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 px-3.5 sm:px-4 shadow-sm flex items-center justify-between transition-all">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      id="btn-admin-sticky-back"
                      onClick={handleGoBack}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                      title="Kembali ke halaman sebelumnya tanpa perlu scroll"
                    >
                      <ArrowLeft className="w-4 h-4 text-amber-400" />
                      <span>Kembali ke Halaman Sebelumnya</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium pl-2 border-l border-slate-200">
                      <span className="text-slate-400">Panel</span>
                      <span>/</span>
                      <span className="font-bold text-slate-800">
                        {navItems.find((n) => n.id === activeTab)?.label || activeTab}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="hidden md:inline">Live Cloud Firestore</span>
                      <span className="md:hidden">Live Sync</span>
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'overview' && (
                <AdminOverviewTab
                  content={siteContent}
                  onNavigateTab={(tab) => navigateToTab(tab)}
                />
              )}

              {activeTab === 'slides' && (
                <AdminHeroSlidesTab
                  slides={siteContent.heroSlides || DEFAULT_HERO_SLIDES}
                  onSaveSlides={handleSaveSlides}
                  onBack={handleGoBack}
                />
              )}

              {activeTab === 'principal' && (
                <AdminPrincipalTab
                  principal={siteContent.principal || DEFAULT_PRINCIPAL_CONTENT}
                  onSavePrincipal={handleSavePrincipal}
                />
              )}

              {activeTab === 'programs' && (
                <AdminProgramsTab
                  programs={siteContent.programs || PROGRAMS_UNGGULAN}
                  onSavePrograms={handleSavePrograms}
                />
              )}

              {activeTab === 'news' && (
                <AdminNewsTab
                  newsList={siteContent.news || NEWS_LIST}
                  onSaveNews={handleSaveNews}
                />
              )}

              {activeTab === 'facilities' && (
                <AdminFacilitiesTab
                  facilitiesList={siteContent.facilities || FACILITIES_LIST}
                  onSaveFacilities={handleSaveFacilities}
                />
              )}

              {activeTab === 'extracurriculars' && (
                <AdminExtracurricularsTab
                  extracurricularsList={siteContent.extracurriculars || EXTRACURRICULAR_LIST}
                  onSaveExtracurriculars={handleSaveExtracurriculars}
                />
              )}

              {activeTab === 'achievements' && (
                <AdminAchievementsTab
                  achievementsList={siteContent.achievements || ACHIEVEMENTS_LIST}
                  onSaveAchievements={handleSaveAchievements}
                />
              )}

              {activeTab === 'ppdb' && (
                <AdminPpdbTab />
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="pb-4 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-emerald-700" />
                      <span>Cadangan Data & Pemulihan Sistem</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Unduh cadangan data (backup) atau atur ulang konten ke konfigurasi sampel awal sekolah.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Backup Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                          <Download className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Unduh Cadangan Lengkap (JSON)
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Simpan seluruh data sekolah (Slide, Profil, Program, Berita, Fasilitas, Ekskul, Prestasi) ke dalam satu berkas JSON di komputer Anda.
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={handleExportBackup}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition-all"
                        >
                          <Download className="w-4 h-4" />
                          <span>Unduh File Cadangan (.json)</span>
                        </button>
                      </div>
                    </div>

                    {/* Reset Section */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3">
                          <RotateCcw className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Kembalikan ke Sampel Data Awal
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Jika Anda ingin mereset konten sekolah kembali ke data bawaan SMP PGRI 5 Cimahi (semua penyesuaian baru akan diganti dengan data awal).
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setIsResetConfirmOpen(true)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Atur Ulang ke Default</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* System Metadata Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-600 space-y-2">
                    <h5 className="font-bold text-slate-800">
                      Informasi Sesi & Lingkungan Server
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-500 pt-1">
                      <div>
                        <span className="font-medium text-slate-400 block text-[11px]">Koleksi Firestore:</span>
                        <span className="font-mono text-slate-800">site_content/main_config</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-400 block text-[11px]">Login Aktif:</span>
                        <span className="text-slate-800 font-bold">{session?.displayName} (@{session?.username})</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-400 block text-[11px]">Terakhir Diperbarui:</span>
                        <span className="text-slate-800">{siteContent.updatedAt ? new Date(siteContent.updatedAt).toLocaleString('id-ID') : 'Default'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Quick Return Pill: accessible anywhere on long pages without scrolling */}
            {activeTab !== 'overview' && (
              <button
                type="button"
                id="btn-admin-floating-back"
                onClick={handleGoBack}
                className="fixed bottom-6 right-6 z-40 bg-slate-900/95 hover:bg-emerald-700 text-white shadow-2xl rounded-full px-4 py-2.5 text-xs font-bold flex items-center gap-2 border border-slate-700 backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
                title="Kembali ke halaman sebelumnya tanpa scroll"
              >
                <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Kembali</span>
              </button>
            )}
          </main>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="text-base font-bold text-slate-900">
                Atur Ulang Seluruh Data Sekolah?
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Tindakan ini akan mengembalikan seluruh teks slide, profil, program unggulan, berita, fasilitas, ekstrakurikuler, dan prestasi ke data bawaan awal.
              </p>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleResetToDefaults}
                disabled={isResetting}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow transition-all"
              >
                {isResetting ? 'Mereset...' : 'Ya, Atur Ulang Semua'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
