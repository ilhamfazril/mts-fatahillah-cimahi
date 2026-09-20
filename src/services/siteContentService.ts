import { 
  db, 
  doc, 
  onSnapshot, 
  setDoc, 
  getDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDocFromServer
} from '../lib/firebase';
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

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  timestamp: string;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    timestamp: new Date().toISOString()
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  return errInfo;
}

// Validate connection to Firestore on initialization per Skill requirement
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'site_content', 'connection_test'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore notice: client appears offline or using cached state.');
    }
    return false;
  }
}

// Run connection check in background
testFirestoreConnection();

export interface HeroSlideContent {
  id: number | string;
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

export interface PPDBRegistrationRecord {
  id?: string;
  registrationCode: string;
  candidateName: string;
  originSchool: string;
  nisn?: string;
  gender: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  selectedTrack: string;
  notes?: string;
  status: 'Baru' | 'Diverifikasi' | 'Diterima' | 'Menunggu';
  createdAt: number;
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
const PPDB_COLLECTION_REF = collection(db, 'ppdb_registrations');
const CACHE_STORAGE_KEY = 'smp_pgri_5_cimahi_site_content_cache';

// Clean object recursively to eliminate any `undefined` fields that break Firestore writes
function cleanForFirestore<T>(input: T): T {
  return JSON.parse(
    JSON.stringify(input, (_, value) => {
      if (value === undefined) return null;
      return value;
    })
  );
}

// In-memory cache & local subscribers to guarantee instant, zero-delay real-time reactivity
let currentSiteContentMemory: SchoolSiteContent = (() => {
  try {
    const saved = localStorage.getItem(CACHE_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        heroSlides: Array.isArray(parsed.heroSlides) && parsed.heroSlides.length > 0 ? parsed.heroSlides : DEFAULT_HERO_SLIDES,
        principal: { ...DEFAULT_PRINCIPAL_CONTENT, ...(parsed.principal || {}) },
        programs: Array.isArray(parsed.programs) && parsed.programs.length > 0 ? parsed.programs : PROGRAMS_UNGGULAN,
        news: Array.isArray(parsed.news) && parsed.news.length > 0 ? parsed.news : NEWS_LIST,
        facilities: Array.isArray(parsed.facilities) && parsed.facilities.length > 0 ? parsed.facilities : FACILITIES_LIST,
        extracurriculars: Array.isArray(parsed.extracurriculars) && parsed.extracurriculars.length > 0 ? parsed.extracurriculars : EXTRACURRICULAR_LIST,
        achievements: Array.isArray(parsed.achievements) && parsed.achievements.length > 0 ? parsed.achievements : ACHIEVEMENTS_LIST,
        updatedAt: parsed.updatedAt || Date.now(),
        updatedBy: parsed.updatedBy || 'admin_ilham',
      };
    }
  } catch (e) {
    console.warn('Cache read notice:', e);
  }
  return { ...DEFAULT_SITE_CONTENT };
})();

const localSubscribers = new Set<(content: SchoolSiteContent) => void>();

function notifySubscribers(content: SchoolSiteContent) {
  currentSiteContentMemory = content;
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.warn('Cache write notice:', e);
  }
  localSubscribers.forEach((fn) => {
    try {
      fn(content);
    } catch (err) {
      console.error('Subscriber callback error:', err);
    }
  });
}

/**
 * Subscribe to real-time site content updates across all users & browser tabs
 */
export function subscribeToSiteContent(
  onUpdate: (content: SchoolSiteContent) => void,
  onError?: (error: Error) => void
): () => void {
  // Register local subscriber for instant optimistic updates
  localSubscribers.add(onUpdate);
  // Emit current data immediately so caller never waits with null state
  onUpdate(currentSiteContentMemory);

  // Cross-tab real-time synchronization via storage events
  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === CACHE_STORAGE_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        currentSiteContentMemory = {
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          principal: { ...DEFAULT_PRINCIPAL_CONTENT, ...(parsed.principal || {}) },
        };
        onUpdate(currentSiteContentMemory);
      } catch (err) {
        console.warn('Cross-tab sync parse error:', err);
      }
    }
  };
  window.addEventListener('storage', handleStorageEvent);

  let unsubscribeFirestore: (() => void) | null = null;
  try {
    unsubscribeFirestore = onSnapshot(
      CONTENT_DOC_REF,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<SchoolSiteContent>;
          const merged: SchoolSiteContent = {
            heroSlides: Array.isArray(data.heroSlides) && data.heroSlides.length > 0 
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
            updatedAt: data.updatedAt || Date.now(),
            updatedBy: data.updatedBy || 'admin_ilham',
          };
          notifySubscribers(merged);
        } else {
          // If document doesn't exist yet in Firestore, provision it with current content
          notifySubscribers(currentSiteContentMemory);
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.GET, 'site_content/main_config');
        notifySubscribers(currentSiteContentMemory);
        if (onError) onError(err);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'site_content/main_config');
    notifySubscribers(currentSiteContentMemory);
  }

  return () => {
    localSubscribers.delete(onUpdate);
    window.removeEventListener('storage', handleStorageEvent);
    if (unsubscribeFirestore) {
      unsubscribeFirestore();
    }
  };
}

/**
 * Save updated content to Firestore (Real-Time broadcast to all connected clients)
 */
export async function saveSiteContentToFirestore(
  updatedContent: Partial<SchoolSiteContent>,
  adminUsername: string = 'admin_ilham'
): Promise<SchoolSiteContent> {
  const completeDoc: SchoolSiteContent = {
    heroSlides: updatedContent.heroSlides || currentSiteContentMemory.heroSlides || DEFAULT_HERO_SLIDES,
    principal: {
      ...DEFAULT_PRINCIPAL_CONTENT,
      ...(currentSiteContentMemory.principal || {}),
      ...(updatedContent.principal || {}),
    },
    programs: updatedContent.programs || currentSiteContentMemory.programs || PROGRAMS_UNGGULAN,
    news: updatedContent.news || currentSiteContentMemory.news || NEWS_LIST,
    facilities: updatedContent.facilities || currentSiteContentMemory.facilities || FACILITIES_LIST,
    extracurriculars: updatedContent.extracurriculars || currentSiteContentMemory.extracurriculars || EXTRACURRICULAR_LIST,
    achievements: updatedContent.achievements || currentSiteContentMemory.achievements || ACHIEVEMENTS_LIST,
    updatedAt: Date.now(),
    updatedBy: adminUsername,
  };

  // 1. Immediately notify local subscribers & localStorage for instant zero-latency UI update
  notifySubscribers(completeDoc);

  // 2. Sanitize against undefined values and persist to Cloud Firestore
  const payload = cleanForFirestore(completeDoc);

  try {
    await setDoc(CONTENT_DOC_REF, payload, { merge: true });
    return completeDoc;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'site_content/main_config');
    throw error;
  }
}

/**
 * Reset content back to pure default configuration in Firestore
 */
export async function resetSiteContentToDefaultInFirestore(): Promise<void> {
  const defaultDoc: SchoolSiteContent = {
    heroSlides: DEFAULT_HERO_SLIDES,
    principal: DEFAULT_PRINCIPAL_CONTENT,
    programs: PROGRAMS_UNGGULAN,
    news: NEWS_LIST,
    facilities: FACILITIES_LIST,
    extracurriculars: EXTRACURRICULAR_LIST,
    achievements: ACHIEVEMENTS_LIST,
    updatedAt: Date.now(),
    updatedBy: 'admin_ilham (reset)',
  };

  notifySubscribers(defaultDoc);
  const payload = cleanForFirestore(defaultDoc);

  try {
    await setDoc(CONTENT_DOC_REF, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'site_content/main_config');
    throw error;
  }
}

export const resetSiteContentToDefaults = resetSiteContentToDefaultInFirestore;

/**
 * Save a new PPDB Registration to Firestore
 */
export async function savePpdbRegistrationToFirestore(
  registration: Omit<PPDBRegistrationRecord, 'id' | 'createdAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(PPDB_COLLECTION_REF, {
      ...registration,
      createdAt: Date.now(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'ppdb_registrations');
    throw error;
  }
}

/**
 * Subscribe to real-time PPDB Registrations
 */
export function subscribeToPpdbRegistrations(
  onUpdate: (registrations: PPDBRegistrationRecord[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const q = query(PPDB_COLLECTION_REF, orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const items: PPDBRegistrationRecord[] = [];
        snapshot.forEach((docSnap) => {
          items.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<PPDBRegistrationRecord, 'id'>),
          });
        });
        onUpdate(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, 'ppdb_registrations');
        if (onError) onError(err);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'ppdb_registrations');
    return () => {};
  }
}

/**
 * Update the verification status of a PPDB Registration in Firestore
 */
export async function updatePpdbRegistrationStatus(
  docId: string, 
  status: 'Baru' | 'Diverifikasi' | 'Diterima' | 'Menunggu'
): Promise<void> {
  try {
    const regDocRef = doc(db, 'ppdb_registrations', docId);
    await updateDoc(regDocRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `ppdb_registrations/${docId}`);
    throw error;
  }
}

/**
 * Delete a PPDB Registration from Firestore
 */
export async function deletePpdbRegistration(docId: string): Promise<void> {
  try {
    const regDocRef = doc(db, 'ppdb_registrations', docId);
    await deleteDoc(regDocRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `ppdb_registrations/${docId}`);
    throw error;
  }
}

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
