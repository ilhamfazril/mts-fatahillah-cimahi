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
import firebaseConfigData from '../../firebase-applet-config.json';
import {
  compressImageForStorage,
  saveMediaAsset,
  resolveMediaUrl,
  resolveObjectMedia,
  initMediaAssetsSync,
  fetchAllMediaAssetsRest,
} from './mediaAssetService';

export {
  compressImageForStorage,
  saveMediaAsset,
  resolveMediaUrl,
  resolveObjectMedia,
  initMediaAssetsSync,
  fetchAllMediaAssetsRest,
};
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

// REST API Base URL to Google Cloud Firestore (direct cloud persistence fallback)
const FIRESTORE_REST_BASE = `https://firestore.googleapis.com/v1/projects/${firebaseConfigData.projectId}/databases/${firebaseConfigData.firestoreDatabaseId}/documents/site_content/main_config?key=${firebaseConfigData.apiKey}`;

// Decode raw Firestore REST API document format into clean TypeScript objects
function decodeFirestoreValue(val: any): any {
  if (!val || typeof val !== 'object') return val;
  if ('stringValue' in val) return val.stringValue;
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return Number(val.doubleValue);
  if ('booleanValue' in val) return val.booleanValue;
  if ('timestampValue' in val) return val.timestampValue;
  if ('nullValue' in val) return null;
  if ('arrayValue' in val) {
    const values = val.arrayValue?.values || [];
    return values.map(decodeFirestoreValue);
  }
  if ('mapValue' in val) {
    const fields = val.mapValue?.fields || {};
    const res: Record<string, any> = {};
    for (const [k, v] of Object.entries(fields)) {
      res[k] = decodeFirestoreValue(v);
    }
    return res;
  }
  return val;
}

function decodeFirestoreDocument(docData: any): Partial<SchoolSiteContent> | null {
  if (!docData || !docData.fields) return null;
  const res: Record<string, any> = {};
  for (const [k, v] of Object.entries(docData.fields)) {
    res[k] = decodeFirestoreValue(v);
  }
  return res as Partial<SchoolSiteContent>;
}

// Encode clean JavaScript object to Firestore REST API fields format
function encodeFirestoreValue(val: any): any {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'string') return { stringValue: val };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
  }
  if (Array.isArray(val)) {
    return {
      arrayValue: {
        values: val.map(encodeFirestoreValue),
      },
    };
  }
  if (typeof val === 'object') {
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        fields[k] = encodeFirestoreValue(v);
      }
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function encodeFirestoreDocument(obj: Record<string, any>): any {
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) {
      fields[k] = encodeFirestoreValue(v);
    }
  }
  return { fields };
}

/**
 * Direct HTTPS REST fetch to Google Cloud Firestore servers.
 * Bypasses all WebChannel / WebSocket / iframe limitations.
 */
export async function fetchLiveContentFromFirestoreRest(): Promise<Partial<SchoolSiteContent> | null> {
  try {
    const res = await fetch(FIRESTORE_REST_BASE, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return decodeFirestoreDocument(json);
  } catch (err) {
    console.warn('Direct REST fetch notice:', err);
    return null;
  }
}

/**
 * Direct HTTPS REST write to Google Cloud Firestore servers.
 * Guarantees permanent persistence in Firebase even if client SDK is in offline mode.
 */
export async function saveLiveContentToFirestoreRest(data: Partial<SchoolSiteContent>): Promise<boolean> {
  try {
    const cleaned = cleanForFirestore(data);
    const encoded = encodeFirestoreDocument(cleaned);
    const fields = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
    const mask = fields.map((k) => `updateMask.fieldPaths=${encodeURIComponent(k)}`).join('&');
    const url = `${FIRESTORE_REST_BASE}&${mask}`;

    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(encoded),
    });
    return res.ok;
  } catch (err) {
    console.warn('Direct REST write notice:', err);
    return false;
  }
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
  const resolved = resolveObjectMedia(content);
  currentSiteContentMemory = resolved;
  safeSetLocalStorage(resolved);
  localSubscribers.forEach((fn) => {
    try {
      fn(resolved);
    } catch (err) {
      console.error('Subscriber callback error:', err);
    }
  });
}

/**
 * Automatically extracts uploaded image dataUrls and stores each in dedicated
 * media_assets documents in Cloud Firestore, replacing the bulky inline Base64 with
 * lightweight media: references so main_config is always tiny (<20KB) and never hits 1MB limits.
 */
async function extractAndPersistMediaAssets(
  content: SchoolSiteContent
): Promise<{ toStoreInMainConfig: SchoolSiteContent; toNotify: SchoolSiteContent }> {
  const mainDoc: SchoolSiteContent = JSON.parse(JSON.stringify(content));
  const notifyDoc: SchoolSiteContent = JSON.parse(JSON.stringify(content));

  // 1. Hero slides
  if (Array.isArray(mainDoc.heroSlides)) {
    for (let i = 0; i < mainDoc.heroSlides.length; i++) {
      const slide = mainDoc.heroSlides[i];
      if (slide.bgImage && slide.bgImage.startsWith('data:image/')) {
        const assetId = `slide_${slide.id || i}`;
        await saveMediaAsset(assetId, slide.bgImage);
        slide.bgImage = `media:${assetId}`;
      }
    }
  }

  // 2. Principal photo
  if (mainDoc.principal?.photo && mainDoc.principal.photo.startsWith('data:image/')) {
    const assetId = 'principal_photo';
    await saveMediaAsset(assetId, mainDoc.principal.photo);
    mainDoc.principal.photo = `media:${assetId}`;
  }

  // 3. News
  if (Array.isArray(mainDoc.news)) {
    for (const item of mainDoc.news) {
      if (item.image && item.image.startsWith('data:image/')) {
        const assetId = `news_${item.id}`;
        await saveMediaAsset(assetId, item.image);
        item.image = `media:${assetId}`;
      }
    }
  }

  // 4. Facilities
  if (Array.isArray(mainDoc.facilities)) {
    for (const item of mainDoc.facilities) {
      if (item.image && item.image.startsWith('data:image/')) {
        const assetId = `facility_${item.id}`;
        await saveMediaAsset(assetId, item.image);
        item.image = `media:${assetId}`;
      }
    }
  }

  // 5. Programs
  if (Array.isArray(mainDoc.programs)) {
    for (const item of mainDoc.programs) {
      if (item.image && item.image.startsWith('data:image/')) {
        const assetId = `program_${item.id}`;
        await saveMediaAsset(assetId, item.image);
        item.image = `media:${assetId}`;
      }
    }
  }

  // 6. Achievements
  if (Array.isArray(mainDoc.achievements)) {
    for (const item of mainDoc.achievements) {
      if (item.image && item.image.startsWith('data:image/')) {
        const assetId = `achievement_${item.id}`;
        await saveMediaAsset(assetId, item.image);
        item.image = `media:${assetId}`;
      }
    }
  }

  return { toStoreInMainConfig: mainDoc, toNotify: notifyDoc };
}

/**
 * Safely merge live Firestore document or cached state with application fallbacks.
 * Preserves all user modifications and ensures no sections are ever null/undefined.
 */
export function mergeWithDefaults(data?: Partial<SchoolSiteContent> | null): SchoolSiteContent {
  if (!data) return currentSiteContentMemory;
  return {
    heroSlides: Array.isArray(data.heroSlides) && data.heroSlides.length > 0
      ? data.heroSlides
      : (currentSiteContentMemory.heroSlides || DEFAULT_HERO_SLIDES),
    principal: {
      ...DEFAULT_PRINCIPAL_CONTENT,
      ...(currentSiteContentMemory.principal || {}),
      ...(data.principal || {}),
    },
    programs: Array.isArray(data.programs) && data.programs.length > 0
      ? data.programs
      : (currentSiteContentMemory.programs || PROGRAMS_UNGGULAN),
    news: Array.isArray(data.news) && data.news.length > 0
      ? data.news
      : (currentSiteContentMemory.news || NEWS_LIST),
    facilities: Array.isArray(data.facilities) && data.facilities.length > 0
      ? data.facilities
      : (currentSiteContentMemory.facilities || FACILITIES_LIST),
    extracurriculars: Array.isArray(data.extracurriculars) && data.extracurriculars.length > 0
      ? data.extracurriculars
      : (currentSiteContentMemory.extracurriculars || EXTRACURRICULAR_LIST),
    achievements: Array.isArray(data.achievements) && data.achievements.length > 0
      ? data.achievements
      : (currentSiteContentMemory.achievements || ACHIEVEMENTS_LIST),
    updatedAt: data.updatedAt || Date.now(),
    updatedBy: data.updatedBy || 'admin_ilham',
  };
}

/**
 * Subscribe to real-time site content updates across all users & browser tabs.
 * Combines:
 * 1. Immediate optimistic emission from memory/localStorage
 * 2. Instant Cloud Hydration via getDocFromServer + REST fallback on page load
 * 3. Continuous real-time Firestore onSnapshot listener
 * 4. Automatic cross-tab sync via storage events
 * 5. Heartbeat sync on tab focus and every 15s to guarantee fresh cloud state
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
        const merged = mergeWithDefaults(parsed);
        notifySubscribers(merged);
      } catch (err) {
        console.warn('Cross-tab sync parse error:', err);
      }
    }
  };
  
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageEvent);
  }

  // Active Cloud Hydration: Fetch live document directly from Google Cloud servers
  let isHydrated = false;
  const hydrateFromCloud = async () => {
    // 1. Fetch all cloud media assets first so media: references resolve immediately
    try {
      await fetchAllMediaAssetsRest();
    } catch (e) {
      console.warn('Media assets prefetch notice:', e);
    }

    try {
      const snap = await getDocFromServer(CONTENT_DOC_REF);
      if (snap.exists()) {
        const serverData = snap.data() as Partial<SchoolSiteContent>;
        const merged = mergeWithDefaults(serverData);
        isHydrated = true;
        notifySubscribers(merged);
        return;
      }
    } catch {
      // If SDK server fetch fails (e.g. iframe offline / WebChannel delay), proceed to REST
    }

    try {
      const restData = await fetchLiveContentFromFirestoreRest();
      if (restData) {
        const merged = mergeWithDefaults(restData);
        isHydrated = true;
        notifySubscribers(merged);
      }
    } catch (e) {
      console.warn('Cloud hydration notice:', e);
    }
  };

  // Run immediate hydration upon subscribing
  hydrateFromCloud();

  // Real-time synchronization of media_assets
  const unsubscribeMedia = initMediaAssetsSync();

  let unsubscribeFirestore: (() => void) | null = null;
  try {
    unsubscribeFirestore = onSnapshot(
      CONTENT_DOC_REF,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<SchoolSiteContent>;
          const merged = mergeWithDefaults(data);
          notifySubscribers(merged);
        } else if (!isHydrated) {
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
        // If onSnapshot fails (e.g. iframe WebChannel blocked), immediately fallback to REST
        hydrateFromCloud();
        if (onError) onError(err);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'site_content/main_config');
    hydrateFromCloud();
  }

  // Heartbeat & focus sync: ensures fresh cloud data even after device sleep or tab switch
  const intervalId = setInterval(() => {
    hydrateFromCloud();
  }, 15000);

  const handleVisibilityChange = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      hydrateFromCloud();
    }
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  return () => {
    localSubscribers.delete(onUpdate);
    clearInterval(intervalId);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageEvent);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
    if (unsubscribeFirestore) {
      unsubscribeFirestore();
    }
    if (unsubscribeMedia) {
      unsubscribeMedia();
    }
  };
}

/**
 * Save updated content to Firestore (Real-Time broadcast to all connected clients).
 * Non-destructive: pre-fetches live state from Cloud Firestore (SDK + REST fallback)
 * and uses Dual-Persistence (Firestore SDK + direct HTTPS REST) to guarantee that
 * data is permanently written directly to Google Cloud servers.
 */
export async function saveSiteContentToFirestore(
  updatedContent: Partial<SchoolSiteContent>,
  adminUsername: string = 'admin_ilham'
): Promise<SchoolSiteContent> {
  // 1. Fetch latest state from Firestore to prevent stale overwrites across sessions/tabs
  let liveExistingData: Partial<SchoolSiteContent> = {};
  try {
    const snap = await getDocFromServer(CONTENT_DOC_REF);
    if (snap.exists()) {
      liveExistingData = snap.data() as Partial<SchoolSiteContent>;
    }
  } catch {
    try {
      const rest = await fetchLiveContentFromFirestoreRest();
      if (rest) liveExistingData = rest;
    } catch {
      // Fallback to in-memory state
    }
  }

  // 2. Base content is merged from live Firestore -> memory cache -> default fallbacks
  const baseDoc = mergeWithDefaults(liveExistingData);

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

  // 4. Extract any uploaded photo dataUrls and persist them into dedicated media_assets collection
  //    This keeps main_config under 25KB, eliminates 1MB limits permanently, and persists images indefinitely.
  const { toStoreInMainConfig, toNotify } = await extractAndPersistMediaAssets(mergedDoc);

  // 5. Immediately notify local subscribers & localStorage with fully resolved image content
  notifySubscribers(toNotify);

  // 6. Dual-persistence: Write compact manifest (with media: references) to Firestore SDK AND direct HTTPS REST
  const payload = cleanForFirestore(toStoreInMainConfig);
  let sdkSuccess = false;
  let restSuccess = false;

  try {
    await setDoc(CONTENT_DOC_REF, payload, { merge: true });
    sdkSuccess = true;
  } catch (sdkErr) {
    console.warn('Firestore SDK write error/offline notice:', sdkErr);
  }

  try {
    restSuccess = await saveLiveContentToFirestoreRest(toStoreInMainConfig);
  } catch (restErr) {
    console.warn('Firestore REST write error notice:', restErr);
  }

  if (!sdkSuccess && !restSuccess) {
    handleFirestoreError(new Error('Gagal menyimpan ke Google Cloud Firestore'), OperationType.WRITE, 'site_content/main_config');
    throw new Error('Gagal menyimpan perubahan ke Cloud Firestore. Silakan periksa koneksi internet Anda.');
  }

  return toNotify;
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

  let sdkSuccess = false;
  let restSuccess = false;

  try {
    await setDoc(CONTENT_DOC_REF, payload);
    sdkSuccess = true;
  } catch (error) {
    console.warn('Reset SDK notice:', error);
  }

  try {
    restSuccess = await saveLiveContentToFirestoreRest(defaultDoc);
  } catch (error) {
    console.warn('Reset REST notice:', error);
  }

  if (!sdkSuccess && !restSuccess) {
    throw new Error('Gagal mereset data di Firestore.');
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

