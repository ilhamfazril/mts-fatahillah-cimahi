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
function safeGetLocalStorage(): Partial<SchoolSiteContent> | null {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSetLocalStorage(content: SchoolSiteContent): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.warn('Cache write notice:', e);
  }
}

let currentSiteContentMemory: SchoolSiteContent = (() => {
  const cached = safeGetLocalStorage();
  if (cached) {
    return {
      heroSlides: Array.isArray(cached.heroSlides) ? cached.heroSlides : DEFAULT_HERO_SLIDES,
      principal: { ...DEFAULT_PRINCIPAL_CONTENT, ...(cached.principal || {}) },
      programs: Array.isArray(cached.programs) ? cached.programs : PROGRAMS_UNGGULAN,
      news: Array.isArray(cached.news) ? cached.news : NEWS_LIST,
      facilities: Array.isArray(cached.facilities) ? cached.facilities : FACILITIES_LIST,
      extracurriculars: Array.isArray(cached.extracurriculars) ? cached.extracurriculars : EXTRACURRICULAR_LIST,
      achievements: Array.isArray(cached.achievements) ? cached.achievements : ACHIEVEMENTS_LIST,
      updatedAt: cached.updatedAt || Date.now(),
      updatedBy: cached.updatedBy || 'admin_ilham',
    };
  }
  return { ...DEFAULT_SITE_CONTENT };
})();

const localSubscribers = new Set<(content: SchoolSiteContent) => void>();

function notifySubscribers(content: SchoolSiteContent) {
  currentSiteContentMemory = content;
  safeSetLocalStorage(content);
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
  
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageEvent);
  }

  let unsubscribeFirestore: (() => void) | null = null;
  try {
    unsubscribeFirestore = onSnapshot(
      CONTENT_DOC_REF,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<SchoolSiteContent>;
          const merged: SchoolSiteContent = {
            heroSlides: Array.isArray(data.heroSlides)
              ? data.heroSlides 
              : (currentSiteContentMemory.heroSlides || DEFAULT_HERO_SLIDES),
            principal: {
              ...DEFAULT_PRINCIPAL_CONTENT,
              ...(currentSiteContentMemory.principal || {}),
              ...(data.principal || {}),
            },
            programs: Array.isArray(data.programs)
              ? data.programs
              : (currentSiteContentMemory.programs || PROGRAMS_UNGGULAN),
            news: Array.isArray(data.news)
              ? data.news
              : (currentSiteContentMemory.news || NEWS_LIST),
            facilities: Array.isArray(data.facilities)
              ? data.facilities
              : (currentSiteContentMemory.facilities || FACILITIES_LIST),
            extracurriculars: Array.isArray(data.extracurriculars)
              ? data.extracurriculars
              : (currentSiteContentMemory.extracurriculars || EXTRACURRICULAR_LIST),
            achievements: Array.isArray(data.achievements)
              ? data.achievements
              : (currentSiteContentMemory.achievements || ACHIEVEMENTS_LIST),
            updatedAt: data.updatedAt || Date.now(),
            updatedBy: data.updatedBy || 'admin_ilham',
          };
          notifySubscribers(merged);
        } else {
          // If document doesn't exist yet in Firestore, provision it with initial content
          const initialPayload = cleanForFirestore(currentSiteContentMemory);
          setDoc(CONTENT_DOC_REF, initialPayload).catch((e) => {
            console.warn('Initial doc provisioning notice:', e);
          });
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
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageEvent);
    }
    if (unsubscribeFirestore) {
      unsubscribeFirestore();
    }
  };
}

/**
 * Save updated content to Firestore (Real-Time broadcast to all connected clients).
 * Safely preserves and merges existing sections so updating one section (e.g. news)
 * NEVER overwrites or reverts other sections (e.g. principal, facilities).
 */
export async function saveSiteContentToFirestore(
  updatedContent: Partial<SchoolSiteContent>,
  adminUsername: string = 'admin_ilham'
): Promise<SchoolSiteContent> {
  // 1. Fetch latest state from Firestore to prevent stale overwrites across sessions/tabs
  let liveExistingData: Partial<SchoolSiteContent> = {};
  try {
    const snap = await getDoc(CONTENT_DOC_REF);
    if (snap.exists()) {
      liveExistingData = snap.data() as Partial<SchoolSiteContent>;
    }
  } catch (err) {
    console.warn('Could not pre-fetch live document, using memory cache:', err);
  }

  // 2. Base content is merged from live Firestore -> memory cache -> default fallbacks
  const baseDoc: SchoolSiteContent = {
    heroSlides: Array.isArray(liveExistingData.heroSlides)
      ? liveExistingData.heroSlides
      : (currentSiteContentMemory.heroSlides || DEFAULT_HERO_SLIDES),
    principal: {
      ...DEFAULT_PRINCIPAL_CONTENT,
      ...(currentSiteContentMemory.principal || {}),
      ...(liveExistingData.principal || {}),
    },
    programs: Array.isArray(liveExistingData.programs)
      ? liveExistingData.programs
      : (currentSiteContentMemory.programs || PROGRAMS_UNGGULAN),
    news: Array.isArray(liveExistingData.news)
      ? liveExistingData.news
      : (currentSiteContentMemory.news || NEWS_LIST),
    facilities: Array.isArray(liveExistingData.facilities)
      ? liveExistingData.facilities
      : (currentSiteContentMemory.facilities || FACILITIES_LIST),
    extracurriculars: Array.isArray(liveExistingData.extracurriculars)
      ? liveExistingData.extracurriculars
      : (currentSiteContentMemory.extracurriculars || EXTRACURRICULAR_LIST),
    achievements: Array.isArray(liveExistingData.achievements)
      ? liveExistingData.achievements
      : (currentSiteContentMemory.achievements || ACHIEVEMENTS_LIST),
    updatedAt: liveExistingData.updatedAt || Date.now(),
    updatedBy: liveExistingData.updatedBy || adminUsername,
  };

  // 3. Selectively merge ONLY the sections that are actually updated
  const mergedDoc: SchoolSiteContent = {
    heroSlides: updatedContent.heroSlides !== undefined ? updatedContent.heroSlides : baseDoc.heroSlides,
    principal: updatedContent.principal !== undefined 
      ? { ...baseDoc.principal, ...updatedContent.principal }
      : baseDoc.principal,
    programs: updatedContent.programs !== undefined ? updatedContent.programs : baseDoc.programs,
    news: updatedContent.news !== undefined ? updatedContent.news : baseDoc.news,
    facilities: updatedContent.facilities !== undefined ? updatedContent.facilities : baseDoc.facilities,
    extracurriculars: updatedContent.extracurriculars !== undefined ? updatedContent.extracurriculars : baseDoc.extracurriculars,
    achievements: updatedContent.achievements !== undefined ? updatedContent.achievements : baseDoc.achievements,
    updatedAt: Date.now(),
    updatedBy: adminUsername,
  };

  // 4. Immediately notify local subscribers & localStorage for instant zero-latency UI update
  notifySubscribers(mergedDoc);

  // 5. Sanitize against undefined values and persist to Cloud Firestore
  const payload = cleanForFirestore(mergedDoc);

  try {
    await setDoc(CONTENT_DOC_REF, payload, { merge: true });
    return mergedDoc;
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
