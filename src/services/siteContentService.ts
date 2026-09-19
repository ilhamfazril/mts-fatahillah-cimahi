import { db, doc, onSnapshot, setDoc, getDoc } from '../lib/firebase';
import { 
  PRINCIPAL_INFO, 
  PROGRAMS_UNGGULAN, 
  NEWS_LIST, 
  FACILITIES_LIST, 
  EXTRACURRICULAR_LIST, 
  ACHIEVEMENTS_LIST 
} from '../data/schoolData';
import { 
  ProgramUnggulan, 
  NewsItem, 
  FacilityItem, 
  ExtracurricularItem, 
  AchievementItem 
} from '../types';

export interface HeroSlideContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  bgImage: string;
  alt: string;
  primaryBtn: string;
  secondaryBtn: string;
}

export interface PrincipalProfileContent {
  name: string;
  role: string;
  quote: string;
  photo: string;
}

export interface SchoolSiteContent {
  heroSlides: HeroSlideContent[];
  principal: PrincipalProfileContent;
  programs: ProgramUnggulan[];
  news: NewsItem[];
  facilities: FacilityItem[];
  extracurriculars: ExtracurricularItem[];
  achievements: AchievementItem[];
  updatedAt?: number;
  updatedBy?: string;
}

export const DEFAULT_HERO_SLIDES: HeroSlideContent[] = [
  {
    id: 0,
    title: 'Membentuk Generasi Cerdas, Disiplin, dan Berakhlak Mulia',
    subtitle: 'SMP PGRI 5 Cimahi — YPLP PGRI Kota Cimahi',
    description: 'Lembaga pendidikan formal tingkat menengah pertama yang mengintegrasikan Kurikulum Merdeka, pembiasaan religius, dan keteladanan budi pekerti luhur di Kota Cimahi.',
    badge: 'Sekolah Berkarakter & Humanis',
    bgImage: '/images/slide1_gedung.jpg',
    alt: 'Gedung dan siswa SMP PGRI 5 Cimahi di tangga dan selasar',
    primaryBtn: 'Pendaftaran PPDB 2025/2026',
    secondaryBtn: 'Jelajahi Profil Sekolah',
  },
  {
    id: 1,
    title: 'Menumbuhkan Jiwa Nasionalisme & Kedisiplinan Karakter',
    subtitle: 'Upacara Bendera, Sholat Berjamaah & Pembiasaan Positif',
    description: 'Mendidik mental tangguh dan integritas melalui apel pagi rutin, upacara bendera merah putih, tadarus Al-Qur’an bersama, dan kepramukaan aktif.',
    badge: 'Kedisiplinan & Integritas',
    bgImage: '/images/slide2_upacara.jpg',
    alt: 'Upacara bendera dan apel pagi siswa SMP PGRI 5 Cimahi',
    primaryBtn: 'Lihat Aktivitas Kesiswaan',
    secondaryBtn: 'Daftar Sekarang',
  },
  {
    id: 2,
    title: 'Fasilitas Laboratorium Komputer Siap Ujian CBT & ANBK',
    subtitle: 'Mempersiapkan Literasi Digital & Asesmen Berbasis Komputer',
    description: 'Didukung laboratorium komputer representatif dengan puluhan PC desktop siap pakai dan koneksi internet stabil untuk sukses Asesmen Nasional Berbasis Komputer (ANBK).',
    badge: 'Teknologi & Literasi Digital',
    bgImage: '/images/slide3_lab_komputer.jpg',
    alt: 'Laboratorium komputer ANBK SMP PGRI 5 Cimahi',
    primaryBtn: 'Sarana & Fasilitas',
    secondaryBtn: 'Info Kurikulum',
  },
  {
    id: 3,
    title: 'Penerimaan Peserta Didik Baru (PPDB) 2025/2026',
    subtitle: 'Mari Bergabung Menjadi Bagian dari SMP PGRI 5 Cimahi',
    description: 'Biaya pendidikan terjangkau, lingkungan belajar kondusif dan aman, beasiswa afirmasi bagi keluarga kurang mampu, serta dibimbing guru-guru berpengalaman.',
    badge: 'PPDB Telah Dibuka',
    bgImage: '/images/slide4_lapangan.jpg',
    alt: 'Halaman sekolah dan gedung 2 lantai SMP PGRI 5 Cimahi',
    primaryBtn: 'Daftar PPDB Online',
    secondaryBtn: 'Hubungi Panitia',
  },
];

export const DEFAULT_PRINCIPAL_CONTENT: PrincipalProfileContent = {
  name: PRINCIPAL_INFO.name,
  role: PRINCIPAL_INFO.role,
  quote: PRINCIPAL_INFO.quote,
  photo: PRINCIPAL_INFO.photo,
};

export const DEFAULT_SITE_CONTENT: SchoolSiteContent = {
  heroSlides: DEFAULT_HERO_SLIDES,
  principal: DEFAULT_PRINCIPAL_CONTENT,
  programs: PROGRAMS_UNGGULAN,
  news: NEWS_LIST,
  facilities: FACILITIES_LIST,
  extracurriculars: EXTRACURRICULAR_LIST,
  achievements: ACHIEVEMENTS_LIST,
};

const CONTENT_DOC_REF = doc(db, 'site_content', 'main_config');

/**
 * Subscribe to real-time site content updates across all users
 */
export function subscribeToSiteContent(
  onUpdate: (content: SchoolSiteContent) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    return onSnapshot(
      CONTENT_DOC_REF,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<SchoolSiteContent>;
          const merged: SchoolSiteContent = {
            heroSlides: data.heroSlides && data.heroSlides.length === 4 
              ? data.heroSlides 
              : DEFAULT_HERO_SLIDES,
            principal: {
              ...DEFAULT_PRINCIPAL_CONTENT,
              ...(data.principal || {}),
            },
            programs: Array.isArray(data.programs) && data.programs.length > 0
              ? data.programs
              : PROGRAMS_UNGGULAN,
            news: Array.isArray(data.news) && data.news.length > 0
              ? data.news
              : NEWS_LIST,
            facilities: Array.isArray(data.facilities) && data.facilities.length > 0
              ? data.facilities
              : FACILITIES_LIST,
            extracurriculars: Array.isArray(data.extracurriculars) && data.extracurriculars.length > 0
              ? data.extracurriculars
              : EXTRACURRICULAR_LIST,
            achievements: Array.isArray(data.achievements) && data.achievements.length > 0
              ? data.achievements
              : ACHIEVEMENTS_LIST,
            updatedAt: data.updatedAt,
            updatedBy: data.updatedBy,
          };
          onUpdate(merged);
        } else {
          // If document doesn't exist yet in Firestore, provide default content
          onUpdate(DEFAULT_SITE_CONTENT);
        }
      },
      (err) => {
        console.warn('Firestore subscription notice, fallback to default:', err);
        onUpdate(DEFAULT_SITE_CONTENT);
        if (onError) onError(err);
      }
    );
  } catch (error) {
    console.error('Error establishing Firestore subscription:', error);
    onUpdate(DEFAULT_SITE_CONTENT);
    return () => {};
  }
}

/**
 * Save updated content to Firestore (Real-Time broadcast to all connected clients)
 */
export async function saveSiteContentToFirestore(
  updatedContent: Partial<SchoolSiteContent>,
  adminUsername: string = 'admin_ilham'
): Promise<void> {
  const payload = {
    ...updatedContent,
    updatedAt: Date.now(),
    updatedBy: adminUsername,
  };

  await setDoc(CONTENT_DOC_REF, payload, { merge: true });
}

/**
 * Reset content back to pure default configuration in Firestore
 */
export async function resetSiteContentToDefaultInFirestore(): Promise<void> {
  await setDoc(CONTENT_DOC_REF, {
    heroSlides: DEFAULT_HERO_SLIDES,
    principal: DEFAULT_PRINCIPAL_CONTENT,
    programs: PROGRAMS_UNGGULAN,
    news: NEWS_LIST,
    facilities: FACILITIES_LIST,
    extracurriculars: EXTRACURRICULAR_LIST,
    achievements: ACHIEVEMENTS_LIST,
    updatedAt: Date.now(),
    updatedBy: 'admin_ilham (reset)',
  });
}

export const resetSiteContentToDefaults = resetSiteContentToDefaultInFirestore;

/**
 * Helper to compress user-uploaded image for optimal Firestore storage and ultra-fast loading
 */
export function compressImageForStorage(
  file: File,
  maxWidth: number = 1600,
  maxHeight: number = 1000,
  quality: number = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Gagal memproses file foto.'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(file);
  });
}
