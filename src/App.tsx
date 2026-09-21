/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WelcomeSection } from './components/WelcomeSection';
import { ProgramsSection } from './components/ProgramsSection';
import { PsbSection } from './components/PsbSection';
import { NewsSection } from './components/NewsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { ExtracurricularSection } from './components/ExtracurricularSection';
import { AchievementsSection } from './components/AchievementsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { TeachersSection } from './components/TeachersSection';
import { HistorySection } from './components/HistorySection';
import { Footer } from './components/Footer';
import { NewsDetailModal } from './components/NewsDetailModal';
import { PsbRegistrationModal } from './components/PsbRegistrationModal';
import { SearchModal } from './components/SearchModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { isAdminLoggedIn, logoutAdmin } from './services/adminAuthService';
import { 
  subscribeToSiteContent, 
  SchoolSiteContent, 
  DEFAULT_HERO_SLIDES,
  DEFAULT_PRINCIPAL_CONTENT,
  DEFAULT_SITE_CONTENT,
  getInitialSiteContent
} from './services/siteContentService';
import { NewsItem } from './types';
import { ArrowUp, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [isPsbModalOpen, setIsPsbModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminLoggedIn());
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Real-time Firestore content state initialized with cached / saved state
  const [siteContent, setSiteContent] = useState<SchoolSiteContent>(() => getInitialSiteContent());

  useEffect(() => {
    // Subscribe to real-time changes from Firestore database
    const unsubscribe = subscribeToSiteContent((content) => {
      setSiteContent(content);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure every tab/page navigation lands cleanly at the top of the destination page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string, elementId?: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAdmin(false);
    setIsAdminDashboardOpen(false);
  };

  const currentContent: SchoolSiteContent = siteContent ? {
    ...DEFAULT_SITE_CONTENT,
    ...siteContent,
    principal: {
      ...DEFAULT_PRINCIPAL_CONTENT,
      ...(siteContent.principal || {}),
    }
  } : DEFAULT_SITE_CONTENT;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Sticky Main Header with Admin Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenPsbModal={() => setIsPsbModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onLogoutAdmin={handleLogout}
      />

      {/* Main Content Areas based on Tab or Full Home Page */}
      <main className="flex-grow">
        {activeTab === 'beranda' && (
          <>
            <Hero
              onExploreClick={() => {
                const el = document.getElementById('profil');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onPsbClick={() => setIsPsbModalOpen(true)}
              slidesData={currentContent.heroSlides}
              isAdmin={isAdmin}
              onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
            />
            <WelcomeSection 
              principalProfile={currentContent.principal}
              isAdmin={isAdmin}
              onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
            />
            <ProgramsSection programsData={currentContent.programs} />
            <PsbSection onOpenPsbModal={() => setIsPsbModalOpen(true)} />
            <NewsSection 
              newsData={currentContent.news} 
              onSelectArticle={(article) => setSelectedArticle(article)} 
            />
            <FacilitiesSection facilitiesData={currentContent.facilities} />
            <ExtracurricularSection extracurricularsData={currentContent.extracurriculars} />
            <AchievementsSection achievementsData={currentContent.achievements} />
            <TestimonialsSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'profil' && (
          <div className="animate-in fade-in duration-300">
            {/* Breadcrumb banner */}
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Profil Sekolah
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  SMP PGRI 5 Cimahi
                </h1>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                  Mengenal kepemimpinan, visi, misi, dan nilai-nilai pembentukan karakter siswa.
                </p>
              </div>
            </div>
            <WelcomeSection 
              principalProfile={currentContent.principal}
              isAdmin={isAdmin}
              onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
            />
            <HistorySection />
            <TeachersSection 
              teachersData={currentContent.teachers}
              isAdmin={isAdmin}
              onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
            />
            <FacilitiesSection facilitiesData={currentContent.facilities} />
          </div>
        )}

        {activeTab === 'sejarah' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Kilas Sejarah
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Sejarah & Nilai Luhur SMP PGRI 5 Cimahi
                </h1>
              </div>
            </div>
            <HistorySection />
            <WelcomeSection 
              principalProfile={currentContent.principal}
              isAdmin={isAdmin}
              onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
            />
          </div>
        )}

        {activeTab === 'guru-staf' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Dewan Guru & Tenaga Kependidikan
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Pendidik Profesional SMP PGRI 5 Cimahi
                </h1>
              </div>
            </div>
            <TeachersSection 
              teachersData={currentContent.teachers}
              isAdmin={isAdmin}
              onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
            />
          </div>
        )}

        {activeTab === 'program' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Kurikulum & Karakter
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Program Unggulan & Pembiasaan Karakter
                </h1>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                  Kurikulum Merdeka, ANBK CBT, P5, Pembiasaan Sholat Dhuha & Dzuhur Berjamaah, serta Pramuka Wajib.
                </p>
              </div>
            </div>
            <ProgramsSection programsData={currentContent.programs} />
            <PsbSection onOpenPsbModal={() => setIsPsbModalOpen(true)} />
          </div>
        )}

        {activeTab === 'kesiswaan' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Kesiswaan
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Aktivitas Siswa & Ekstrakurikuler Pilihan
                </h1>
              </div>
            </div>
            <ExtracurricularSection extracurricularsData={currentContent.extracurriculars} />
            <AchievementsSection achievementsData={currentContent.achievements} />
          </div>
        )}

        {activeTab === 'prestasi' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Pencapaian Siswa
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Prestasi Siswa SMP PGRI 5 Cimahi
                </h1>
              </div>
            </div>
            <AchievementsSection achievementsData={currentContent.achievements} />
            <TestimonialsSection />
          </div>
        )}

        {activeTab === 'fasilitas' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Sarana & Prasarana
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Fasilitas Kampus SMP PGRI 5 Cimahi
                </h1>
              </div>
            </div>
            <FacilitiesSection facilitiesData={currentContent.facilities} />
          </div>
        )}

        {activeTab === 'psb' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Penerimaan Siswa Baru
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Portal PPDB 2025/2026 SMP PGRI 5 Cimahi
                </h1>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                  Informasi resmi pendaftaran peserta didik baru, kuota kelas, serta fasilitas seragam dan buku.
                </p>
              </div>
            </div>
            <PsbSection onOpenPsbModal={() => setIsPsbModalOpen(true)} />
            <ContactSection />
          </div>
        )}

        {activeTab === 'berita' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Warta & Publikasi
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Berita, Agenda & Pengumuman Sekolah
                </h1>
              </div>
            </div>
            <NewsSection 
              newsData={currentContent.news}
              onSelectArticle={(article) => setSelectedArticle(article)} 
            />
          </div>
        )}

        {activeTab === 'kontak' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-emerald-950 text-white py-8 px-4 border-b border-emerald-800">
              <div className="max-w-7xl mx-auto">
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Layanan Publik
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Kontak, Lokasi & Pusat Bantuan
                </h1>
              </div>
            </div>
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPsbModal={() => setIsPsbModalOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsPsbModalOpen(true)}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black py-2.5 px-4 rounded-full shadow-xl flex items-center gap-2 border border-amber-500 hover:scale-105 transition-transform"
          title="Daftar PSB Online"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="hidden sm:inline">Daftar PSB</span>
        </button>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Modals */}
      <NewsDetailModal
        article={
          selectedArticle
            ? currentContent.news?.find((n) => n.id === selectedArticle.id) || selectedArticle
            : null
        }
        onClose={() => setSelectedArticle(null)}
      />

      <PsbRegistrationModal
        isOpen={isPsbModalOpen}
        onClose={() => setIsPsbModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectArticle={(article) => {
          setSelectedArticle(article);
        }}
        onNavigateTab={handleNavigate}
        newsList={currentContent.news}
        programsList={currentContent.programs}
        facilitiesList={currentContent.facilities}
        extracurricularList={currentContent.extracurriculars}
      />

      {/* Admin Login Modal (Username: admin_ilham, Password: ilhamfazril) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setIsAdminLoginOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* Admin Centralized Content Dashboard Modal (Real-Time Firestore Synchronized) */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        siteContent={currentContent}
        onLogout={handleLogout}
        onNavigateTab={handleNavigate}
      />
    </div>
  );
}
