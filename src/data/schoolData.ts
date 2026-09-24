import {
  NewsItem,
  ProgramUnggulan,
  FacilityItem,
  ExtracurricularItem,
  AchievementItem,
  TeacherStaff,
  TestimonialItem,
  FaqItem
} from '../types';
import { PERSISTED_USER_CONTENT } from './persistedSchoolContent';

export const SCHOOL_INFO = {
  name: 'MTs Fatahillah Cimahi',
  subName: 'Yayasan Fatahillah Cimahi — Jawa Barat',
  npsn: '20279752',
  akreditasi: 'A BAN-PDM',
  iso: 'Kurikulum Merdeka Mandiri',
  motto: 'ISLAMI, CERDAS, BERAKHLAKUL KARIMAH',
  tagline: 'Membentuk Insan Beriman, Berilmu, Terampil, dan Mandiri',
  address: 'Jl. Cigugur Tengah No. 45, Kel. Cigugur Tengah, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40522',
  phone: '(022) 665-2408',
  fax: '(022) 665-2408',
  email: 'mtsfatahillahcimahi@gmail.com',
  website: 'https://mtsfatahillahcimahi.sch.id',
  operationalHours: 'Senin - Jumat: 07.00 - 15.00 WIB',
  socialMedia: {
    instagram: 'https://instagram.com/mtsfatahillahcimahi',
    youtube: 'https://youtube.com/@mtsfatahillahcimahi',
    facebook: 'https://facebook.com/mtsfatahillahcimahi',
  },
  stats: {
    students: '450+',
    teachers: '26',
    extracurriculars: '14',
    achievementsPerYear: '25+',
    accreditationScore: 'Akreditasi A',
    alumniSuccess: '100%'
  },
  vision: 'Terwujudnya peserta didik yang beriman dan bertakwa kepada Tuhan Yang Maha Esa, berkarakter mulia, cerdas, berprestasi, terampil, serta peduli terhadap lingkungan di bawah naungan Yayasan Fatahillah Cimahi.',
  missions: [
    'Membina keimanan dan ketakwaan melalui kegiatan keagamaan rutin serta pembiasaan sholat dhuha dan tadarus bersama.',
    'Menyelenggarakan proses pembelajaran yang aktif, kreatif, efektif, dan menyenangkan berlandaskan Kurikulum Merdeka.',
    'Meningkatkan kedisiplinan dan rasa tanggung jawab siswa melalui kegiatan kepemimpinan, kepramukaan, apel pagi, dan tata krama santun.',
    'Mengembangkan potensi minat dan bakat peserta didik melalui beragam kegiatan ekstrakurikuler seni, olahraga, dan teknologi informatika.',
    'Menyediakan sarana prasarana pembelajaran berbasis komputer (ANBK & CBT) yang representatif guna menunjang literasi digital peserta didik.',
    'Menciptakan lingkungan sekolah yang bersih, sehat, aman, dan nyaman untuk mendukung terwujudnya sekolah ramah anak.'
  ]
};

export const PRINCIPAL_INFO = {
  name: PERSISTED_USER_CONTENT.principal?.name || 'Niken Isniyanti',
  role: PERSISTED_USER_CONTENT.principal?.role || 'Kepala MTs Fatahillah Cimahi',
  photo: PERSISTED_USER_CONTENT.principal?.photo || '/images/principal_real.jpg',
  quote: PERSISTED_USER_CONTENT.principal?.quote || '"Di MTs Fatahillah Cimahi, kami mendidik dengan hati, membimbing dengan keteladanan, serta membentuk generasi yang disiplin, cerdas, berakhlak mulia, dan siap meraih masa depan yang gemilang."',
  welcomeMessage: [
    'Assalamu’alaikum Warahmatullahi Wabarakatuh, Sampurasun, Salam Sejahtera untuk kita semua.',
    'Selamat datang di situs resmi MTs Fatahillah Cimahi. Sebagai institusi pendidikan di bawah naungan Yayasan Fatahillah Cimahi dan Kementerian Agama, kami senantiasa berikhtiar memberikan layanan pendidikan berkualitas, terjangkau, dan berakhlakul karimah bagi seluruh peserta didik.',
    'Dengan bimbingan tenaga pendidik yang berpengalaman, fasilitas gedung ruang kelas yang kondusif, laboratorium komputer untuk simulasi dan pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK), sarana olahraga, serta ragam kegiatan ekstrakurikuler, kami terus mengasah kompetensi akademis dan karakter budi pekerti para siswa.',
    'Mari bersama-sama kita pupuk kebersamaan dan sinergi antara sekolah, orang tua, dan masyarakat demi mengantarkan putra-putri kita menjadi insan yang berilmu, berkarakter, dan berguna bagi nusa serta bangsa.'
  ]
};

const DEFAULT_PROGRAMS_RAW: ProgramUnggulan[] = [
  {
    id: 'anbk',
    title: 'Laboratorium Komputer & Kesiapan ANBK / CBT',
    badge: 'Literasi Digital',
    shortDesc: 'Penguatan kompetensi literasi dan numerasi digital melalui laboratorium komputer terpadu dan simulasi ujian berbasis komputer.',
    fullDesc: 'MTs Fatahillah Cimahi dilengkapi dengan sarana laboratorium komputer berpendingin ruangan dengan puluhan PC desktop siap pakai dan koneksi jaringan stabil. Fasilitas ini digunakan secara rutin untuk pembelajaran Informatika, penugasan digital, serta simulasi Asesmen Nasional Berbasis Komputer (ANBK).',
    icon: 'Monitor',
    image: '/images/slide3_lab_komputer.jpg',
    highlights: ['Puluhan unit PC Desktop terkoneksi LAN', 'Simulasi rutin ANBK & CBT mandiri', 'Pembelajaran dasar coding & desain', 'Internet sekolah stabil']
  },
  {
    id: 'religius',
    title: 'Pembiasaan Karakter Religius & Sholat Berjamaah',
    badge: 'Karakter Mulia',
    shortDesc: 'Pembiasaan apel pagi, sholat dhuha berjamaah, tadarus Al-Qur’an, serta penanaman akhlak karimah dalam keseharian siswa.',
    fullDesc: 'Program pembinaan akhlak mulia dilaksanakan setiap hari melalui pembiasaan sholat dhuha bersama di musala sekolah, tadarus surat-surat pendek sebelum jam pelajaran dimulai, pembacaan Asmaul Husna, serta bimbingan keputrian dan kepribadian santun 5S (Senyum, Salam, Sapa, Sopan, Santun).',
    icon: 'Heart',
    image: '/images/slide2_upacara.jpg',
    highlights: ['Sholat Dhuha rutin berjamaah', 'Tadarus Al-Qur’an & Asmaul Husna', 'Pembiasaan Budaya 5S Santun', 'Peringatan Hari Besar Islam (PHBI)']
  },
  {
    id: 'pramuka',
    title: 'Kepramukaan Gugus Depan & Pasus Paskibra',
    badge: 'Disiplin & Jiwa Korsa',
    shortDesc: 'Pendidikan karakter kepanduan dan baris-berbaris untuk memupuk jiwa patriotisme, gotong royong, dan kedisiplinan tinggi.',
    fullDesc: 'Gerakan Pramuka Gugus Depan MTs Fatahillah Cimahi merupakan kegiatan wajib pembentukan karakter yang aktif berkiprah di Kwartir Ranting Cimahi Tengah. Dilengkapi pasukan khusus (Pasus) Paskibra yang rutin bertugas pada upacara hari Senin dan peringatan hari kemerdekaan Republik Indonesia.',
    icon: 'ShieldCheck',
    image: '/images/slide2_upacara.jpg',
    highlights: ['Latihan rutin PBB & tali-temali', 'Perkemahan sabtu-minggu (Persami)', 'Petugas upacara bendera terlatih', 'Lomba ketangkasan pramuka']
  },
  {
    id: 'p5',
    title: 'Projek Penguatan Profil Pelajar Pancasila (P5)',
    badge: 'Kurikulum Merdeka',
    shortDesc: 'Pembelajaran berbasis proyek kontekstual bertema gaya hidup berkelanjutan, kearifan lokal Sunda, dan kewirausahaan.',
    fullDesc: 'Implementasi Kurikulum Merdeka di MTs Fatahillah Cimahi diwujudkan lewat gelar karya P5 berkala. Siswa diajak mengolah limbah organik/daur ulang, melestarikan seni dan kuliner tradisional Sunda Jawa Barat, serta membuat karya kreatif bernilai guna.',
    icon: 'Sparkles',
    image: '/images/slide1_gedung.jpg',
    highlights: ['Kearifan lokal budaya Jawa Barat', 'Gelar pameran karya siswa semesteran', 'Edukasi pilah sampah & lingkungan', 'Melatih kerja sama gotong royong']
  },
  {
    id: 'seni',
    title: 'Pengembangan Minat Seni Sunda & Musik Modern',
    badge: 'Bakat & Seni',
    shortDesc: 'Wadah pelestarian seni daerah Sunda (Jaipong, degung angklung) dan seni musik modern untuk melatih kepercayaan diri.',
    fullDesc: 'Sekolah memberikan ruang seluas-luasnya bagi peserta didik untuk mengeksplorasi bakat seni, baik tari kreasi tradisional Jawa Barat maupun ensemble musik modern yang kerap tampil pada pentas seni kenaikan kelas dan perpisahan sekolah.',
    icon: 'Trophy',
    image: '/images/slide2_upacara.jpg',
    highlights: ['Sanggar tari tradisional Sunda', 'Band sekolah & vokal group', 'Pentas seni perpisahan akbar', 'Apresiasi karya lukis & kriya']
  },
  {
    id: 'olahraga',
    title: 'Pembinaan Olahraga Prestasi (Futsal & Voli)',
    badge: 'Sportivitas',
    shortDesc: 'Penggemblengan fisik sehat dan ketangkasan olahraga futsal, voli, dan bulutangkis di lapangan sekolah yang representatif.',
    fullDesc: 'Dengan sarana lapangan serbaguna di halaman kampus sekolah, tim futsal dan voli MTs Fatahillah Cimahi rutin mengadakan sesi latihan terstruktur serta pertandingan persahabatan antar sekolah menengah pertama di Kota Cimahi.',
    icon: 'Award',
    image: '/images/slide4_lapangan.jpg',
    highlights: ['Pelatih ekstrakurikuler berdedikasi', 'Turnamen antar kelas (Class Meeting)', 'Uji tanding persahabatan', 'Penguatan daya tahan fisik dan sportivitas']
  }
];

export const PROGRAMS_UNGGULAN: ProgramUnggulan[] = (Array.isArray(PERSISTED_USER_CONTENT.programs) && PERSISTED_USER_CONTENT.programs.length > 0)
  ? (PERSISTED_USER_CONTENT.programs as ProgramUnggulan[])
  : DEFAULT_PROGRAMS_RAW;

const DEFAULT_NEWS_RAW: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Simulasi Asesmen Nasional Berbasis Komputer (ANBK) di MTs Fatahillah Cimahi Berjalan Sukses',
    slug: 'simulasi-anbk-berjalan-sukses-smp-pgri-5-cimahi',
    category: 'Berita',
    date: '10 September 2025',
    author: 'Tim IT & Kurikulum',
    readTime: '3 menit',
    featured: true,
    image: '/images/slide3_lab_komputer.jpg',
    excerpt: 'Pelaksanaan gladi bersih dan simulasi Asesmen Nasional Berbasis Komputer (ANBK) di laboratorium komputer sekolah berlangsung tertib dan lancar tanpa kendala teknis.',
    content: [
      'MTs Fatahillah Cimahi sukses menggelar kegiatan simulasi dan gladi bersih Asesmen Nasional Berbasis Komputer (ANBK) untuk siswa kelas 8. Kegiatan ini bertujuan mempersiapkan kesiapan sarana teknis, kestabilan jaringan internet, serta pembiasaan siswa dalam mengoperasikan aplikasi ujian CBT Pusmendik.',
      'Kepala MTs Fatahillah Cimahi, Dra. Hj. Sri Wahyuni, M.M.Pd., meninjau langsung kesiapan bilik komputer dan memastikan seluruh peserta dapat mengerjakan soal literasi dan numerasi dengan tenang dan fokus.',
      'Berkat dukungan teknisi dan proktor yang sigap, seluruh sesi simulasi dapat diselesaikan tepat waktu. Sekolah optimis pelaksanaan ANBK utama mendatang akan menghasilkan potret mutu pendidikan yang membanggakan bagi sekolah dan Kota Cimahi.'
    ]
  },
  {
    id: 'news-2',
    title: 'Upacara Khidmat Memperingati Hari Guru Nasional & Milad MTs Fatahillah & Hari Guru',
    slug: 'upacara-peringatan-hut-pgri-dan-hari-guru',
    category: 'Agenda',
    date: '25 November 2025',
    author: 'Humas MTs Fatahillah Cimahi',
    readTime: '4 menit',
    featured: true,
    image: '/images/slide2_upacara.jpg',
    excerpt: 'Keluarga besar MTs Fatahillah Cimahi menyelenggarakan upacara bendera peringatan Milad Madrasah & Hari Guru dengan khidmat di halaman sekolah, dirangkaikan penyerahan tanda apresiasi guru.',
    content: [
      'Seluruh guru, tenaga kependidikan, serta siswa-siswi MTs Fatahillah Cimahi berkumpul mengenakan seragam batik resmi madrasah dan seragam sekolah dalam upacara bendera memperingati Hari Guru Nasional dan Milad Madrasah.',
      'Dalam amanatnya, Pembina Upacara menegaskan pentingnya menjunjung tinggi marwah profesi guru sebagai pelita penerang bangsa serta terus mengobarkan semangat solidaritas dan etos kerja profesional para pendidik di bawah panji Yayasan Fatahillah Cimahi.',
      'Acara dilanjutkan dengan pemberian cenderamata bunga oleh para pengurus OSIS kepada dewan guru sebagai wujud bakti dan terima kasih atas ilmu serta bimbingan yang telah dicurahkan setiap hari.'
    ]
  },
  {
    id: 'news-3',
    title: 'Informasi Penerimaan Peserta Didik Baru (PPDB) MTs Fatahillah Cimahi Tahun Pelajaran 2027/2028',
    slug: 'ppdb-smp-pgri-5-cimahi-2027-2028',
    category: 'Pengumuman',
    date: '15 Januari 2027',
    author: 'Panitia PPDB 2027/2028',
    readTime: '5 menit',
    featured: true,
    image: '/images/slide1_gedung.jpg',
    excerpt: 'Pendaftaran PPDB MTs Fatahillah Cimahi telah dibuka. Tersedia jalur reguler, prestasi akademik/non-akademik, serta afirmasi bagi keluarga kurang mampu dengan biaya terjangkau.',
    content: [
      'Panitia Penerimaan Peserta Didik Baru (PPDB) MTs Fatahillah Cimahi secara resmi membuka pendaftaran bagi lulusan SD/MI di wilayah Kota Cimahi, Bandung Barat, dan sekitarnya untuk Tahun Pelajaran 2027/2028.',
      'MTs Fatahillah Cimahi menawarkan keunggulan lingkungan belajar yang aman, bimbingan akhlak intensif, laboratorium komputer lengkap untuk ujian digital, serta beragam beasiswa kemudahan biaya pendidikan bagi siswa berprestasi dan keluarga pemegang KIP/PKH.',
      'Pendaftaran dapat dilakukan langsung di loket Tata Usaha kampus MTs Fatahillah Cimahi Jl. Cigugur Tengah No. 45 atau secara online melalui formulir resmi website ini.'
    ]
  },
  {
    id: 'news-4',
    title: 'Siswa MTs Fatahillah Cimahi Raih Juara Lomba LKBB & Ketangkasan Baris Berbaris',
    slug: 'juara-lomba-lkbb-paskibra-tingkat-kota',
    category: 'Prestasi',
    date: '02 September 2025',
    author: 'Pembina Paskibra & Kesiswaan',
    readTime: '3 menit',
    featured: false,
    image: '/images/slide4_lapangan.jpg',
    excerpt: 'Pasukan Pengibar Bendera (Paskibra) MTs Fatahillah Cimahi menorehkan prestasi membanggakan dengan meraih piala kejuaraan LKBB tingkat pelajar se-Bandung Raya.',
    content: [
      'Tim Paskibra Satuan MTs Fatahillah Cimahi berhasil menyabet trofi penghargaan dalam ajang Lomba Ketangkasan Baris-Berbaris (LKBB) yang diselenggarakan oleh perkumpulan kepemudaan Jawa Barat.',
      'Kerapian formasi, variasi gerakan yang memukau, serta ketegasan danton binaan pelatih mengantarkan tim MTs Fatahillah menduduki podium juara dan membawa pulang piala kebanggaan untuk sekolah.',
      'Prestasi ini membuktikan bahwa dedikasi latihan kedisiplinan dan kekompakan siswa di luar jam pelajaran membuahkan hasil yang sangat membanggakan.'
    ]
  },
  {
    id: 'news-5',
    title: 'Gelar Karya Projek P5: Melestarikan Warisan Budaya Sunda & Olahan Makanan Tradisional',
    slug: 'gelar-karya-p5-budaya-sunda-cimahi',
    category: 'Berita',
    date: '20 Agustus 2025',
    author: 'Tim Fasilitator P5',
    readTime: '3 menit',
    featured: false,
    image: '/images/slide2_upacara.jpg',
    excerpt: 'Pameran gelar karya Projek Penguatan Profil Pelajar Pancasila menampilkan instalasi kerajinan anyaman bambu, makanan khas Jawa Barat, dan pagelaran rampak kendang.',
    content: [
      'Halaman dan selasar lantai 2 MTs Fatahillah Cimahi disemarakkan oleh stan-stan pameran karya siswa dalam acara Gelar Karya P5 bertema "Kearifan Lokal dan Kewirausahaan".',
      'Para siswa menampilkan kebolehan memasak kuliner tradisional Sunda seperti surabi, cilok bumbu kacang, bandros, serta kerajinan tangan dari bahan daur ulang ramah lingkungan.',
      'Kegiatan ini diapresiasi oleh perwakilan pengurus Yayasan Fatahillah Cimahi yang hadir dan mengagumi semangat kreativitas generasi muda di sekolah ini.'
    ]
  },
  {
    id: 'news-6',
    title: 'Kegiatan Bakti Sosial & Penyaluran Paket Berkah Ramadhan untuk Warga Sekitar Cigugur Tengah',
    slug: 'bakti-sosial-ramadhan-cigugur-tengah',
    category: 'Berita',
    date: '05 Agustus 2025',
    author: 'OSIS & Rohis MTs Fatahillah',
    readTime: '3 menit',
    featured: false,
    image: '/images/slide1_gedung.jpg',
    excerpt: 'OSIS dan Rohis MTs Fatahillah Cimahi membagikan ratusan paket sembako kepada warga dhuafa di lingkungan RT 03 RW 03 Kelurahan Cigugur Tengah.',
    content: [
      'Sebagai wujud pengamalan nilai empati dan kepedulian sosial, keluarga besar MTs Fatahillah Cimahi menyerahkan bantuan paket sembako berkah kepada warga di sekitar lingkungan sekolah.',
      'Donasi dihimpun dari infak sukarela para siswa, dewan guru, dan orang tua murid. Kepala Sekolah menyatakan bahwa kegiatan ini menjadi media pembelajaran nyata bagi siswa agar memiliki hati yang dermawan dan peduli terhadap sesama tetangga.'
    ]
  }
];

export const NEWS_LIST: NewsItem[] = (Array.isArray(PERSISTED_USER_CONTENT.news) && PERSISTED_USER_CONTENT.news.length > 0)
  ? (PERSISTED_USER_CONTENT.news as NewsItem[])
  : DEFAULT_NEWS_RAW;

export const PSB_INFO = {
  academicYear: '2027 / 2028',
  status: 'Pendaftaran Dibuka',
  batches: [
    {
      name: 'Gelombang I (Pendaftaran Awal & Jalur Prestasi)',
      desc: 'Bagi lulusan SD/MI berprestasi akademik rapor atau kejuaraan lomba seni, olahraga, dan tahfidz.',
      startDate: '1 Januari 2027',
      endDate: '30 April 2027',
      announcementDate: 'Mei 2027',
      status: 'Aktif',
      color: 'emerald'
    },
    {
      name: 'Gelombang II (Jalur Reguler & Afirmasi)',
      desc: 'Pendaftaran jalur reguler dan afirmasi bantuan KIP/PKH bagi warga Kota Cimahi dan sekitarnya.',
      startDate: '1 Mei 2027',
      endDate: '10 Juli 2027',
      announcementDate: 'Juli 2027',
      status: 'Segera Dibuka',
      color: 'amber'
    }
  ],
  requirements: [
    'Siswa lulusan SD/MI atau sederajat tahun 2026 atau 2027.',
    'Fotokopi Ijazah / Surat Keterangan Lulus (SKL) dari SD asal (2 lembar).',
    'Fotokopi Akta Kelahiran dan Kartu Keluarga (KK) calon siswa (2 lembar).',
    'Fotokopi KTP kedua orang tua/wali.',
    'Pas foto berwarna terbaru ukuran 3x4 (3 lembar).',
    'Fotokopi Kartu KIP / PKH / KKS (khusus pendaftar jalur afirmasi, jika ada).',
    'Piagam/Sertifikat Kejuaraan asli & fotokopi (khusus jalur prestasi, jika ada).'
  ],
  steps: [
    {
      step: 1,
      title: 'Pendaftaran Online / Datang Langsung',
      desc: 'Isi formulir pendaftaran awal di website ini atau hadir langsung ke ruang panitia PPDB di sekolah.'
    },
    {
      step: 2,
      title: 'Penyerahan & Verifikasi Berkas',
      desc: 'Membawa berkas persyaratan fotokopi ijazah/SKL, KK, dan pas foto ke loket PPDB untuk diverifikasi petugas.'
    },
    {
      step: 3,
      title: 'Wawancara Siswa & Orang Tua',
      desc: 'Sesi ramah tamah singkat mengenai minat bakat siswa dan komitmen tata tertib sekolah.'
    },
    {
      step: 4,
      title: 'Penetapan & Pengumuman',
      desc: 'Menerima surat keterangan tanda kelulusan penerimaan peserta didik baru dari panitia.'
    },
    {
      step: 5,
      title: 'Daftar Ulang & Pengukuran Seragam',
      desc: 'Menyelesaikan administrasi daftar ulang dan mendapatkan seragam resmi MTs Fatahillah Cimahi.'
    },
    {
      step: 6,
      title: 'Masa Pengenalan Lingkungan Sekolah (MPLS)',
      desc: 'Mengikuti kegiatan MPLS yang ramah, edukatif, dan menyenangkan bersama guru dan kakak OSIS.'
    }
  ]
};

const DEFAULT_FACILITIES_RAW: FacilityItem[] = [
  {
    id: 'fac-1',
    name: 'Gedung Sekolah Representatif 2 Lantai',
    category: 'Akademik',
    description: 'Bangunan kampus yang kokoh, rapi, bertingkat dua dengan selasar teduh dan sirkulasi udara alami yang segar untuk kenyamanan belajar setiap kelas.',
    image: '/images/slide1_gedung.jpg',
    features: ['Ruang Kelas Berpapan Tulis & Audio', 'Ventilasi & Pencahayaan Alami', 'Selasar Lantai Dua Teduh', 'Akses Tangga Aman & Nyaman']
  },
  {
    id: 'fac-2',
    name: 'Laboratorium Komputer Ujian CBT & ANBK',
    category: 'Akademik',
    description: 'Laboratorium komputer ber-AC yang dilengkapi puluhan unit PC desktop siap pakai, instalasi jaringan lokal kabel LAN, dan server mandiri untuk kelancaran ANBK.',
    image: '/images/slide3_lab_komputer.jpg',
    features: ['Puluhan PC Desktop Spesifikasi Standar ANBK', 'Koneksi Internet Fiber Optic Stabil', 'Ruang Nyaman Berpendingin Udara', 'Didampingi Proktor & Teknisi']
  },
  {
    id: 'fac-3',
    name: 'Lapangan Upacara & Olahraga Serbaguna',
    category: 'Olahraga',
    description: 'Halaman tengah sekolah berlantai semen rapi dengan tiang bendera permanen, digunakan untuk apel pagi, upacara bendera, senam bersama, futsal, dan voli.',
    image: '/images/slide4_lapangan.jpg',
    features: ['Tiang Bendera Resmi Merah Putih', 'Gawang Futsal & Garis Lapangan', 'Area Apel Seluruh Siswa & Guru', 'Lingkungan Bersih & Terbuka']
  },
  {
    id: 'fac-4',
    name: 'Perpustakaan Sekolah & Sudut Baca Literasi',
    category: 'Akademik',
    description: 'Ruang sumber bacaan lengkap yang menyediakan buku paket Kurikulum Merdeka, buku fiksi, ensiklopedia pengetahuan, dan koran harian.',
    image: '/images/slide1_gedung.jpg',
    features: ['Buku Teks Pelajaran Terbitan Kemendikbud', 'Koleksi Cerita Rakyat & Sains Populer', 'Meja Baca Nyaman', 'Pelayanan Peminjaman Buku Mudah']
  },
  {
    id: 'fac-5',
    name: 'Musala Sekolah & Pembinaan Keagamaan',
    category: 'Penunjang',
    description: 'Sarana ibadah yang bersih dan tenang untuk melaksanakan sholat dhuha berjamaah, sholat dzuhur, bimbingan tadarus Al-Qur’an, serta keputrian.',
    image: '/images/slide2_upacara.jpg',
    features: ['Tempat Wudhu Terpisah Putra/Putri', 'Karpet Sajadah Bersih & Wangi', 'Al-Qur’an & Buku Doa Harian', 'Jadwal Sholat Teratur']
  },
  {
    id: 'fac-6',
    name: 'Ruang UKS (Usaha Kesehatan Sekolah)',
    category: 'Penunjang',
    description: 'Ruang pertolongan pertama bagi siswa yang sakit atau membutuhkan istirahat, dilengkapi tempat tidur periksa dan obat-obatan dasar.',
    image: '/images/slide1_gedung.jpg',
    features: ['Tempat Tidur Pasien Bersih', 'Kotak P3K Lengkap & Timbangan', 'Bekerjasama dengan Puskesmas Cigugur', 'Pemeriksaan Kesehatan Berkala']
  },
  {
    id: 'fac-7',
    name: 'Ruang Bimbingan Konseling (BK)',
    category: 'Penunjang',
    description: 'Ruangan konsultasi privat bagi siswa untuk berdiskusi mengenai hambatan belajar, pergaulan, serta pendampingan perkembangan psikologis anak.',
    image: '/images/slide1_gedung.jpg',
    features: ['Guru BK Ramah & Pengertian', 'Privasi Siswa Terjaga Penuh', 'Layanan Minat Bakat Siswa', 'Koordinasi Bersama Orang Tua']
  },
  {
    id: 'fac-8',
    name: 'Kantin Sekolah Bersih & Sehat',
    category: 'Penunjang',
    description: 'Area kantin sekolah yang menyajikan makanan dan minuman higienis, bergizi, dan ramah kantong bagi seluruh warga sekolah.',
    image: '/images/slide4_lapangan.jpg',
    features: ['Pilihan Makanan & Minuman Sehat', 'Tempat Cuci Tangan dengan Sabun', 'Harga Terjangkau untuk Pelajar', 'Area Bersih Terjaga']
  }
];

export const FACILITIES_LIST: FacilityItem[] = (Array.isArray(PERSISTED_USER_CONTENT.facilities) && PERSISTED_USER_CONTENT.facilities.length > 0)
  ? (PERSISTED_USER_CONTENT.facilities as FacilityItem[])
  : DEFAULT_FACILITIES_RAW;

const DEFAULT_EXTRACURRICULARS_RAW: ExtracurricularItem[] = [
  {
    id: 'ekskul-1',
    name: 'Pramuka Penggalang Gudep MTs Fatahillah',
    category: 'Bahasa & Keorganisasian',
    description: 'Pendidikan kepanduan wajib yang melatih kemandirian, morse, tali temali, sandi, serta jiwa tolong-menolong sesama.',
    schedule: 'Jumat, 13.30 - 15.30 WIB',
    iconName: 'Award',
    achievements: 'Peserta Aktif Jambore Ranting Cimahi Tengah'
  },
  {
    id: 'ekskul-2',
    name: 'Pasus Paskibra Satuan MTs Fatahillah',
    category: 'Bahasa & Keorganisasian',
    description: 'Pelatihan baris-berbaris formal, formasi pengibaran bendera, kedisiplinan mental, dan pemupukan jiwa patriotik.',
    schedule: 'Rabu & Sabtu, 14.30 - 16.30 WIB',
    iconName: 'Shield',
    achievements: 'Juara LKBB Pelajar Tingkat Bandung Raya'
  },
  {
    id: 'ekskul-3',
    name: 'Futsal MTs Fatahillah Cimahi',
    category: 'Olahraga',
    description: 'Latihan fisik, kerja sama tim, teknik menggiring bola, strategi tanding, dan uji kompetisi antar sekolah.',
    schedule: 'Selasa & Kamis, 15.30 - 17.00 WIB',
    iconName: 'Flame',
    achievements: 'Juara Turnamen Pelajar Kota Cimahi'
  },
  {
    id: 'ekskul-4',
    name: 'Bola Voli Putra & Putri',
    category: 'Olahraga',
    description: 'Penguasaan servis, smash, passing atas/bawah, dan kekompakan bertanding di lapangan serbaguna sekolah.',
    schedule: 'Senin & Kamis, 15.30 - 17.00 WIB',
    iconName: 'Activity',
    achievements: 'Semifinalis O2SN Tingkat Sub-Rayon'
  },
  {
    id: 'ekskul-5',
    name: 'PMR (Palang Merah Remaja)',
    category: 'Bahasa & Keorganisasian',
    description: 'Latihan pertolongan pertama, kesiapsiagaan bencana, donor darah, dan bakti sosial kesehatan masyarakat.',
    schedule: 'Rabu, 15.00 - 16.30 WIB',
    iconName: 'HeartPulse',
    achievements: 'Regu Teladan Jumbara PMI Kota Cimahi'
  },
  {
    id: 'ekskul-6',
    name: 'Rohis & Tahfidz Al-Qur’an',
    category: 'Bahasa & Keorganisasian',
    description: 'Pembelajaran makharijul huruf, tajwid, hafalan juz 30, serta pembinaan akhlak islami bagi putra-putri muslim.',
    schedule: 'Selasa & Jumat, 14.00 - 15.30 WIB',
    iconName: 'Microscope',
    achievements: 'Juara MTQ & MHQ Tingkat Kecamatan Cimahi Tengah'
  },
  {
    id: 'ekskul-7',
    name: 'Seni Tari Tradisional Sunda (Jaipong)',
    category: 'Seni & Budaya',
    description: 'Mempelajari ragam gerak tari Jaipong Jawa Barat, kelenturan tubuh, dan irama ketukan kendang Sunda.',
    schedule: 'Rabu, 15.00 - 16.30 WIB',
    iconName: 'Music',
    achievements: 'Penampil Utama Festival Kebudayaan Cimahi'
  },
  {
    id: 'ekskul-8',
    name: 'Paduan Suara & Vokal Group',
    category: 'Seni & Budaya',
    description: 'Olah vokal pernapasan, pembagian suara sopran-alto, lagu kebangsaan Indonesia, serta lagu daerah Jawa Barat.',
    schedule: 'Kamis, 15.00 - 16.30 WIB',
    iconName: 'Mic',
    achievements: 'Paduan Suara Resmi Upacara Hari Guru Yayasan Fatahillah'
  },
  {
    id: 'ekskul-9',
    name: 'Klub Komputer & Multimedia',
    category: 'Sains & Teknologi',
    description: 'Pelatihan dasar pengolah kata/angka, desain grafis Canva dasar, dan persiapan keterampilan komputasi siswa.',
    schedule: 'Senin, 15.00 - 16.30 WIB',
    iconName: 'Cpu',
    achievements: 'Dukungan Media Dokumentasi Kegiatan Sekolah'
  },
  {
    id: 'ekskul-10',
    name: 'Bela Diri Pencak Silat',
    category: 'Olahraga',
    description: 'Seni bela diri warisan leluhur nusantara yang mengedepankan ksatria budi pekerti, ketangkasan jurus, dan pertahanan diri.',
    schedule: 'Sabtu, 08.00 - 10.00 WIB',
    iconName: 'Shield',
    achievements: 'Medali Emas Kejurcab Silat Pelajar Cimahi'
  }
];

export const EXTRACURRICULAR_LIST: ExtracurricularItem[] = (Array.isArray(PERSISTED_USER_CONTENT.extracurriculars) && PERSISTED_USER_CONTENT.extracurriculars.length > 0)
  ? (PERSISTED_USER_CONTENT.extracurriculars as ExtracurricularItem[])
  : DEFAULT_EXTRACURRICULARS_RAW;

const DEFAULT_ACHIEVEMENTS_RAW: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Juara 1 Lomba Ketangkasan Baris Berbaris (LKBB)',
    studentName: 'Tim Paskibra Satuan MTs Fatahillah',
    event: 'Kejuaraan LKBB Pelajar Se-Bandung Raya',
    level: 'Provinsi',
    year: '2025',
    category: 'Kesiswaan',
    image: '/images/slide2_upacara.jpg'
  },
  {
    id: 'ach-2',
    title: 'Juara 2 Turnamen Futsal Pelajar Tingkat SMP',
    studentName: 'Tim Futsal Putra MTs Fatahillah',
    event: 'Piala Disdikpora Kota Cimahi 2025',
    level: 'Kota',
    year: '2025',
    category: 'Olahraga',
    image: '/images/slide4_lapangan.jpg'
  },
  {
    id: 'ach-3',
    title: 'Juara 1 Musabaqah Hifdzil Qur’an (MHQ) Juz 30',
    studentName: 'Muhammad Farhan',
    event: 'Pentas PAI SMP Tingkat Kota Cimahi',
    level: 'Kota',
    year: '2024',
    category: 'Keagamaan',
    image: '/images/slide2_upacara.jpg'
  },
  {
    id: 'ach-4',
    title: 'Peringkat Harapan 1 Tari Tradisional Kreasi Sunda',
    studentName: 'Sanggar Tari MTs Fatahillah Cimahi',
    event: 'Festival Lomba Seni Siswa Nasional (FLS2N) Cimahi',
    level: 'Kota',
    year: '2024',
    category: 'Seni & Budaya',
    image: '/images/slide2_upacara.jpg'
  }
];

export const ACHIEVEMENTS_LIST: AchievementItem[] = (Array.isArray(PERSISTED_USER_CONTENT.achievements) && PERSISTED_USER_CONTENT.achievements.length > 0)
  ? (PERSISTED_USER_CONTENT.achievements as AchievementItem[])
  : DEFAULT_ACHIEVEMENTS_RAW;

export const TEACHERS_LIST: TeacherStaff[] = [
  {
    id: 't-1',
    name: PERSISTED_USER_CONTENT.principal?.name || 'Niken Isniyanti',
    role: 'Kepala Sekolah',
    subject: 'Manajemen Pendidikan & Pembina Utama',
    education: 'S1 Pendidikan',
    image: PERSISTED_USER_CONTENT.principal?.photo || '/images/principal_real.jpg'
  },
  {
    id: 't-2',
    name: 'Drs. H. Agus Supriyatna, M.Pd.',
    role: 'Wakil Kepala Sekolah Bidang Kurikulum',
    subject: 'Ilmu Pengetahuan Alam (IPA)',
    education: 'S2 Pendidikan IPA',
    image: ''
  },
  {
    id: 't-3',
    name: 'Yudi Hernawan, S.Pd.',
    role: 'Wakil Kepala Sekolah Bidang Kesiswaan',
    subject: 'Pendidikan Jasmani, Olahraga & Kesehatan (PJOK)',
    education: 'S1 Pendidikan Kepelatihan Olahraga',
    image: ''
  },
  {
    id: 't-4',
    name: 'Rizki Ramadhan, S.Kom.',
    role: 'Koordinator Lab Komputer & Proktor ANBK',
    subject: 'Informatika & Komputer',
    education: 'S1 Teknik Informatika',
    image: ''
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'testi-1',
    quote: 'Sekolah di MTs Fatahillah Cimahi sangat menyenangkan. Gurunya telaten dan sabar, fasilitas komputer untuk ANBK sangat membantu, dan kegiatan apel serta kepramukaannya mendidik kita menjadi pribadi yang disiplin.',
    author: 'Dicky Pratama',
    role: 'Alumnus & Siswa Berprestasi SMK Negeri 1 Cimahi',
    relation: 'Alumni Angkatan 2023',
    image: ''
  },
  {
    id: 'testi-2',
    quote: 'Sebagai orang tua di Cigugur Tengah, kami sangat bersyukur menyekolahkan anak di MTs Fatahillah Cimahi. Biaya sangat bersahabat, lokasinya dekat, serta pembiasaan sholat dhuha dan tadarus membuat akhlak anak kami semakin santun.',
    author: 'Ibu Aisyah & Bpk. Mulyadi',
    role: 'Orang Tua Siswa Kelas IX',
    relation: 'Wali Murid Angkatan 2024/2025',
    image: ''
  },
  {
    id: 'testi-3',
    quote: 'Sinergi nilai kedisiplinan dan pembinaan karakter di bawah naungan Yayasan Fatahillah Cimahi membekali siswa dengan mental tangguh, menghargai guru, dan siap melanjutkan ke jenjang SMA/SMK impian.',
    author: 'Siti Nurhaliza, S.Pd.',
    role: 'Guru & Penggerak Literasi Pelajar',
    relation: 'Alumni MTs Fatahillah Cimahi Angkatan 2017',
    image: ''
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    question: 'Kapan pendaftaran peserta didik baru (PPDB) MTs Fatahillah Cimahi dibuka?',
    answer: 'Pendaftaran PPDB MTs Fatahillah Cimahi Tahun Pelajaran 2027/2028 dibuka mulai bulan Januari 2027 untuk Gelombang I (Jalur Prestasi & Awal) hingga bulan Juli 2027 untuk Gelombang II (Jalur Reguler dan Afirmasi). Pendaftaran dapat dilakukan langsung di sekolah maupun secara online.',
    category: 'PPDB'
  },
  {
    question: 'Kurikulum apa yang diterapkan di MTs Fatahillah Cimahi?',
    answer: 'MTs Fatahillah Cimahi menerapkan Kurikulum Merdeka secara menyeluruh, dilengkapi Projek Penguatan Profil Pelajar Pancasila (P5), pembiasaan literasi numerasi komputer, serta pembinaan karakter religius 5S.',
    category: 'Akademik'
  },
  {
    question: 'Bagaimana kesiapan fasilitas sarana komputer dan ANBK?',
    answer: 'Sekolah memiliki laboratorium komputer representatif dengan puluhan PC desktop siap pakai dan koneksi internet stabil yang menyelenggarakan simulasi serta pelaksanaan ANBK/CBT secara mandiri di sekolah.',
    category: 'Fasilitas'
  },
  {
    question: 'Di mana lokasi kampus MTs Fatahillah Cimahi?',
    answer: 'MTs Fatahillah Cimahi berlokasi di Jl. Cigugur Tengah No. 45, Kelurahan Cigugur Tengah, Kecamatan Cimahi Tengah, Kota Cimahi, Jawa Barat 40522. Lokasinya strategis dan mudah dijangkau dari berbagai titik Kota Cimahi.',
    category: 'Umum'
  },
  {
    question: 'Apakah ada kemudahan biaya atau beasiswa di MTs Fatahillah Cimahi?',
    answer: 'Ya, sebagai sekolah di bawah naungan Yayasan Fatahillah Cimahi yang berkomitmen pada pendidikan inklusif, sekolah menyediakan skema biaya terjangkau serta fasilitas afirmasi/keringanan biaya bagi keluarga pemegang Kartu Indonesia Pintar (KIP/PKH).',
    category: 'PPDB'
  }
];
