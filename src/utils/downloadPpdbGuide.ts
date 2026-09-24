import { jsPDF } from 'jspdf';
import { SCHOOL_INFO, PSB_INFO } from '../data/schoolData';

export function downloadPpdbGuidePdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(6, 78, 59); // Emerald 900
  doc.rect(0, 0, pageWidth, 38, 'F');

  // School Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('YAYASAN PENDIDIKAN ISLAM FATAHILLAH CIMAHI', pageWidth / 2, 11, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('MTS FATAHILLAH CIMAHI', pageWidth / 2, 19, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('NPSN: 20279752 | Akreditasi: A | Kurikulum Merdeka & Kemenag', pageWidth / 2, 26, { align: 'center' });
  doc.text('Jl. Cigugur Tengah No. 45, Kel. Cigugur Tengah, Kec. Cimahi Tengah, Kota Cimahi', pageWidth / 2, 32, { align: 'center' });

  // Document Title
  doc.setFillColor(245, 158, 11); // Amber 500
  doc.rect(0, 38, pageWidth, 1.5, 'F');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PANDUAN & PEDOMAN RESMI PPDB 2027/2028', pageWidth / 2, 49, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(71, 85, 105);
  doc.text('Penerimaan Peserta Didik Baru Tahun Ajaran 2027/2028', pageWidth / 2, 55, { align: 'center' });

  let currentY = 65;

  // Section 1: Jalur Pendaftaran
  doc.setFillColor(241, 245, 249);
  doc.rect(14, currentY - 5, pageWidth - 28, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(6, 78, 59);
  doc.text('A. JALUR & JADWAL GELOMBANG PPDB 2027/2028', 16, currentY);

  currentY += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);

  doc.setFont('helvetica', 'bold');
  doc.text('1. Gelombang I (Pendaftaran Awal & Jalur Prestasi)', 18, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text('   - Periode Pendaftaran : 1 Januari 2027 s/d 30 April 2027', 18, currentY + 5);
  doc.text('   - Pengumuman Seleksi   : Mei 2027', 18, currentY + 10);
  doc.text('   - Ketentuan           : Nilai rapor berprestasi / piagam kejuaraan olahraga, seni, tahfidz.', 18, currentY + 15);

  currentY += 23;
  doc.setFont('helvetica', 'bold');
  doc.text('2. Gelombang II (Jalur Reguler & Afirmasi Bantuan KIP/PKH)', 18, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text('   - Periode Pendaftaran : 1 Mei 2027 s/d 10 Juli 2027', 18, currentY + 5);
  doc.text('   - Pengumuman Seleksi   : Juli 2027', 18, currentY + 10);
  doc.text('   - Ketentuan           : Lulusan SD/MI domisili Cimahi dan sekitarnya.', 18, currentY + 15);

  currentY += 25;

  // Section 2: Syarat Dokumen
  doc.setFillColor(241, 245, 249);
  doc.rect(14, currentY - 5, pageWidth - 28, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(6, 78, 59);
  doc.text('B. DOKUMEN PERSYARATAN WAJIB', 16, currentY);

  currentY += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);

  const requirements = [
    'Siswa lulusan SD/MI atau sederajat tahun 2026 atau 2027.',
    'Fotokopi Ijazah / Surat Keterangan Lulus (SKL) dari SD asal (2 lembar).',
    'Fotokopi Akta Kelahiran dan Kartu Keluarga (KK) calon siswa (2 lembar).',
    'Fotokopi KTP kedua orang tua/wali siswa.',
    'Pas foto berwarna terbaru ukuran 3x4 (3 lembar).',
    'Fotokopi Kartu KIP / PKH / KKS (khusus pendaftar jalur afirmasi/keringanan, jika ada).',
    'Piagam/Sertifikat Kejuaraan asli & fotokopi (khusus pendaftar jalur prestasi, jika ada).'
  ];

  requirements.forEach((req, idx) => {
    doc.text(`${idx + 1}.  ${req}`, 18, currentY);
    currentY += 6;
  });

  currentY += 4;

  // Section 3: Alur Pendaftaran
  doc.setFillColor(241, 245, 249);
  doc.rect(14, currentY - 5, pageWidth - 28, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(6, 78, 59);
  doc.text('C. ALUR 6 LANGKAH PENDAFTARAN PPDB', 16, currentY);

  currentY += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);

  const steps = [
    'Langkah 1: Mengisi formulir pendaftaran secara online di situs resmi atau datang langsung.',
    'Langkah 2: Penyerahan berkas fisik di loket sekretariat PPDB sekolah.',
    'Langkah 3: Wawancara ramah tamah minat bakat siswa serta sosialisasi tata tertib.',
    'Langkah 4: Penetapan hasil seleksi dan pengumuman penerimaan.',
    'Langkah 5: Penyelesaian daftar ulang dan pengukuran seragam sekolah.',
    'Langkah 6: Mengikuti kegiatan Masa Pengenalan Lingkungan Sekolah (MPLS).'
  ];

  steps.forEach((st) => {
    doc.text(st, 18, currentY);
    currentY += 6;
  });

  currentY += 4;

  // Section 4: Kontak & Sekretariat
  doc.setFillColor(236, 253, 245);
  doc.rect(14, currentY - 3, pageWidth - 28, 25, 'F');
  doc.rect(14, currentY - 3, pageWidth - 28, 25, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(6, 78, 59);
  doc.text('SEKRETARIAT PANITIA PPDB 2027/2028 MTS FATAHILLAH CIMAHI', 18, currentY + 3);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text('Alamat       : Kampus MTs Fatahillah Cimahi, Jl. Cigugur Tengah No. 45, Cigugur Tengah', 18, currentY + 8);
  doc.text('Waktu Layanan: Senin s/d Jumat, Pukul 07.30 - 14.30 WIB', 18, currentY + 13);
  doc.text('Telepon / WA : (022) 665-2408 / Panitia PPDB Online', 18, currentY + 18);

  // Footer Note
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('* Dokumen ini diterbitkan resmi oleh Panitia PPDB MTs Fatahillah Cimahi Tahun Ajaran 2027/2028.', pageWidth / 2, 288, { align: 'center' });

  // Trigger real download
  doc.save('Pedoman_PPDB_2027-2028_MTs_Fatahillah_Cimahi.pdf');
}
