export interface KelurahanInfo {
  name: string
  subdistrict: string
  city: string
  province: string
  kemendagriCode: string
  postalCode: string
  legalBasis: string
  inaugurationDate: string
  inauguratedBy: string
  firstLurah: string
  motto: string
  tagline: string
  areaKm2: number
  areaM2Text: string
  altitudeMeters: string
  distanceToCamatKm: number
  distanceToCityCenterKm: number
  distanceEnvironmentToOfficeKm: number
  travelTimeToOfficeMinutes: number
  population: {
    total: number
    households: number
    male: number
    female: number
    religion: {
      protestant: number
      catholic: number
      islam: number
      hindu: number
      buddhist: number
    }
    neighborhoodCount: number
    neighborhoodDistribution?: { name: string; total: number }[]
    year: number
  }
  tax: {
    target2022: string
    realization2022: string
    taxpayersCount: number
    percentage: string
  }
  infrastructure: {
    asphaltRoadM2: number
    dirtRoadM2: number
    motorcycleCount: number
    carCount: number
    electricityHouseholds: number
    wellWaterHouseholds: number
    springWaterHouseholds: number
  }
  facilities: {
    churchesCount: number
    posyanduCount: number
    pustuCount: number
    paudCount: number
    badmintonCourtCount: number
    volleyballCourtCount: number
    nonBankFinancialCount: number
    shopsCount: number
    stallsCount: number
    homeIndustryCount: number
  }
  contact: {
    address: string
    officeHours: string
    email: string
    phone: string
    whatsapp: string
    googleMapsUrl: string
  }
}

export interface OfficialPerson {
  name: string
  role: string
  title: string
  rank?: string
  nip?: string
  description: string
  staff?: string
  avatar?: string
  unit?: string
}

export interface PublicService {
  id: string
  title: string
  category: "kependudukan" | "usaha" | "sosial" | "pertanahan" | "perizinan"
  description: string
  processingTime: string
  cost: string
  requirements: string[]
  flow: string[]
  isOnlineAvailable: boolean
}

export interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  summary: string
  readTime: string
  image: string
}

export interface PotencyItem {
  id: string
  title: string
  category: "Florikultura" | "Pertanian" | "Budaya & Gotong Royong" | "Pariwisata"
  description: string
  highlight: string
  image: string
}

export interface MediaAsset {
  id: string
  title: string
  type: "image" | "video" | "map" | "logo"
  src: string
  alt: string
  caption: string
  credit: string
  category: string
}

export const KELURAHAN_DATA: KelurahanInfo = {
  name: "Kelurahan Walian Dua",
  subdistrict: "Kecamatan Tomohon Selatan",
  city: "Kota Tomohon",
  province: "Sulawesi Utara",
  kemendagriCode: "71.73.01.1011",
  postalCode: "95439",
  legalBasis: "UU No. 10 Tahun 2003 & Pemekaran Tomohon 2008",
  inaugurationDate: "29 Agustus 2008",
  inauguratedBy: "Walikota Tomohon Pertama, Jefferson S.M. Rumajar",
  firstLurah: "Ibu Siska Tambingon, S.Pd",
  motto: "Sitou Timou Tumou Tou",
  tagline: "Harmonis, Berdaya, dan Transparan Berakar Kearifan Minahasa",
  areaKm2: 0.16,
  areaM2Text: "± 0,16 km² (16 Hektar)",
  altitudeMeters: "800 - 1.250 m dpl",
  distanceToCamatKm: 3.0,
  distanceToCityCenterKm: 3.5,
  distanceEnvironmentToOfficeKm: 0.5,
  travelTimeToOfficeMinutes: 5,
  population: {
    total: 1808,
    households: 566,
    male: 905,
    female: 903,
    religion: {
      protestant: 1312,
      catholic: 385,
      islam: 110,
      hindu: 1,
      buddhist: 0,
    },
    neighborhoodCount: 5,
    neighborhoodDistribution: [
      { name: "Lingkungan I", total: 364 },
      { name: "Lingkungan II", total: 320 },
      { name: "Lingkungan III", total: 368 },
      { name: "Lingkungan IV", total: 311 },
      { name: "Lingkungan V", total: 444 },
    ],
    year: 2026,
  },
  tax: {
    target2022: "Rp 52.373.581",
    realization2022: "Rp 52.373.581",
    taxpayersCount: 510,
    percentage: "100%",
  },
  infrastructure: {
    asphaltRoadM2: 22589.75,
    dirtRoadM2: 1068,
    motorcycleCount: 200,
    carCount: 38,
    electricityHouseholds: 495,
    wellWaterHouseholds: 56,
    springWaterHouseholds: 439,
  },
  facilities: {
    churchesCount: 4,
    posyanduCount: 1,
    pustuCount: 1,
    paudCount: 1,
    badmintonCourtCount: 1,
    volleyballCourtCount: 2,
    nonBankFinancialCount: 4,
    shopsCount: 1,
    stallsCount: 18,
    homeIndustryCount: 4,
  },
  contact: {
    address: "Jl. Kolongan - Walian, Lingkungan II, Walian Dua, Kec. Tomohon Selatan, Kota Tomohon, Sulawesi Utara 95439",
    officeHours: "Senin - Jumat: 08:00 - 16:00 WITA",
    email: "kelurahan.waliandua@tomohon.go.id",
    phone: "(0431) 351001",
    whatsapp: "0851-7234-0386",
    googleMapsUrl: "https://maps.google.com/?q=Walian+Dua+Tomohon+Selatan",
  },
}

export const APARATUR_KELURAHAN: OfficialPerson[] = [
  {
    name: "Marlon Jhon Taroreh, A.Md.Kep.",
    role: "Lurah Walian Dua",
    title: "Kepala Kelurahan",
    description: "Memimpin penyelenggaraan pemerintahan kelurahan, pelayanan warga, ketentraman dan ketertiban umum, serta pemberdayaan masyarakat di 5 Lingkungan.",
    unit: "Pimpinan Wilayah",
    avatar: "/images/lurah-marlon-taroreh.jpg",
  },
  {
    name: "Frida Florino Rompis, S.E.",
    role: "Sekretaris Kelurahan",
    title: "Sekretariat",
    description: "Mengkoordinasikan urusan umum, kepegawaian, perlengkapan, tata usaha, serta pelaporan pertanggungjawaban pelaksanaan tugas kelurahan.",
    unit: "Sekretariat Kelurahan",
  },
  {
    name: "Vicny Lesar, SH",
    role: "Kasi Pemerintahan, Ketentraman & Ketertiban Umum",
    title: "Seksi Pemerintahan & Trantib",
    nip: "19700501 200701 1 023",
    description: "Administrasi kependudukan, pembinaan kerukunan hidup beragama, ideologi negara, penegakan peraturan daerah, serta pembinaan LINMAS.",
    staff: "David Wajongkere (Staf)",
    unit: "Seksi Pemerintahan & Trantib",
  },
  {
    name: "Lukas R. Posumah, SE",
    role: "Kasi Perekonomian & Pembangunan",
    title: "Seksi Pembangunan",
    nip: "19800827 201001 1 007",
    description: "Perencanaan dan pembangunan kelurahan, administrasi pajak & retribusi daerah, pembinaan lingkungan hidup, serta pengawasan bangunan.",
    staff: "Stiany Lalogirot (Staf)",
    unit: "Seksi Pembangunan & PMD",
  },
  {
    name: "Meiny Kodoatie",
    role: "Bendahara Kelurahan",
    title: "Pengelola Keuangan",
    rank: "Pengatur Muda Tkt. I (II/b)",
    nip: "19900507 201102 2 001",
    description: "Penatausahaan kas, pembukuan administrasi keuangan operasional kelurahan, dan pertanggungjawaban anggaran.",
    unit: "Pengelola Keuangan",
  },
  {
    name: "Stevany Nangin, SH",
    role: "Petugas Operasional",
    title: "Petugas Operasional",
    description: "Dukungan teknis operasional ketatausahaan, administrasi persuratan, dan pelayanan harian warga Kelurahan Walian Dua.",
    unit: "Petugas Operasional",
  },
  {
    name: "Brenda A. H. Menajang, S.Tr.Par",
    role: "Operator Layanan Operasional",
    title: "Operator Layanan Operasional",
    nip: "200201272025212017",
    description: "Pengelolaan sistem administrasi, dukungan operasional pelayanan publik terpadu, dan ketatausahaan kelurahan.",
    unit: "Petugas Operasional",
  },
  {
    name: "Kepala Lingkungan I - V (Pala)",
    role: "Kepala Lingkungan (Pala) & Maweteng",
    title: "Pamong 5 Lingkungan",
    description: "Garda terdepan koordinasi warga di masing-masing 5 Lingkungan Walian Dua berlandaskan semangat gotong royong Mapalus.",
    unit: "Pamong 5 Lingkungan",
  },
]

export const LAYANAN_PUBLIK: PublicService[] = [
  {
    id: "sku",
    title: "Surat Keterangan Usaha (SKU)",
    category: "usaha",
    description: "Legalitas keterangan tempat usaha mikro/kecil warga untuk pengajuan KUR, perbankan, dan izin dinas.",
    processingTime: "15 - 30 Menit",
    cost: "Gratis (Rp 0)",
    requirements: [
      "Fotokopi KTP Pemohon (Warga Walian Dua)",
      "Fotokopi Kartu Keluarga (KK)",
      "Foto tempat/kegiatan usaha aktif",
      "Surat pengantar dari Kepala Lingkungan (Pala)",
    ],
    flow: [
      "Bawa berkas persyaratan ke kantor lurah atau konsultasi via WhatsApp resmi",
      "Verifikasi data dan registrasi berkas oleh Seksi Pembangunan",
      "Penandatanganan dan pengesahan resmi oleh Lurah Walian Dua",
      "Pengambilan fisik surat keterangan resmi di loket pelayanan kelurahan",
    ],
    isOnlineAvailable: false,
  },
  {
    id: "sktm",
    title: "Surat Keterangan Tidak Mampu (SKTM)",
    category: "sosial",
    description: "Keterangan kondisi ekonomi untuk pengajuan beasiswa pendidikan, keringanan biaya RS, atau BPJS PBI.",
    processingTime: "1 Hari Kerja",
    cost: "Gratis (Rp 0)",
    requirements: [
      "Surat Pengantar dari Kepala Lingkungan (Pala)",
      "Fotokopi KTP & Kartu Keluarga",
      "Surat pernyataan tidak mampu bermaterai",
      "Foto kondisi rumah (tampak depan)",
    ],
    flow: [
      "Pemeriksaan berkas dan verifikasi faktual lapangan",
      "Penerbitan draf SKTM oleh Seksi Pemerintahan",
      "Validasi dan pengesahan resmi Lurah Walian Dua",
    ],
    isOnlineAvailable: false,
  },
  {
    id: "skd",
    title: "Surat Keterangan Domisili (SKD)",
    category: "kependudukan",
    description: "Keterangan alamat tempat tinggal resmi di wilayah hukum Kelurahan Walian Dua.",
    processingTime: "15 Menit",
    cost: "Gratis (Rp 0)",
    requirements: [
      "Fotokopi KTP Pemohon",
      "Fotokopi Kartu Keluarga (KK)",
      "Surat bukti kontrak/sewa tempat tinggal (bagi non-penduduk tetap)",
      "Pengantar Pala setempat",
    ],
    flow: [
      "Pemeriksaan berkas kependudukan di loket pelayanan",
      "Pencatatan nomor buku register kelurahan",
      "Penerbitan surat fisik berstempel resmi kelurahan",
    ],
    isOnlineAvailable: false,
  },
  {
    id: "surat-kehilangan",
    title: "Surat Keterangan Laporan Kehilangan",
    category: "kependudukan",
    description: "Surat keterangan resmi dari kelurahan bagi warga yang kehilangan dokumen penting, surat berharga, atau barang untuk pengantar laporan ke kepolisian atau instansi penerbit dokumen.",
    processingTime: "15 Menit",
    cost: "Gratis (Rp 0)",
    requirements: [
      "Surat pengantar Kepala Lingkungan (Pala)",
      "Fotokopi KTP / KK pelapor (atau bukti identitas yang masih ada)",
      "Fotokopi dokumen yang hilang (jika masih menyimpan arsip)",
      "Surat pernyataan kehilangan bermeterai (jika dipersyaratkan)",
    ],
    flow: [
      "Pemeriksaan berkas dan identitas pelapor di loket kantor lurah",
      "Pencatatan rincian dokumen yang hilang ke buku register kelurahan",
      "Penerbitan Surat Keterangan Kehilangan berstempel resmi kelurahan",
      "Diteruskan warga ke Polsek/Polres Tomohon Selatan atau instansi terkait",
    ],
    isOnlineAvailable: false,
  },
  {
    id: "surat-kematian",
    title: "Surat Keterangan Kematian & Kelahiran",
    category: "kependudukan",
    description: "Pencatatan peristiwa vital warga untuk penerbitan akta kematian atau akta kelahiran resmi.",
    processingTime: "Selesai di Hari yang Sama",
    cost: "Gratis (Rp 0)",
    requirements: [
      "Surat keterangan medis dari RS / Dokter / Puskesmas",
      "KTP & KK almarhum / orang tua bayi",
      "KTP pelapor & 2 orang saksi",
    ],
    flow: [
      "Pelaporan oleh ahli waris / keluarga di kantor kelurahan",
      "Pencatatan di buku register peristiwa kependudukan",
      "Penerbitan surat keterangan legalitas kelurahan",
    ],
    isOnlineAvailable: false,
  },
  {
    id: "pertanahan",
    title: "Keterangan Riwayat Tanah & Waris",
    category: "pertanahan",
    description: "Surat keterangan batas riwayat kepemilikan tanah adat/perkebunan Wawo dan silsilah ahli waris.",
    processingTime: "2 - 3 Hari Kerja",
    cost: "Gratis (Rp 0)",
    requirements: [
      "Surat pernyataan batas tetangga tanah",
      "Bukti lunas PBB-P2 tahun berjalan",
      "Bagan silsilah ahli waris diketahui Pala",
      "KTP para pihak",
    ],
    flow: [
      "Peninjauan lokasi bersama tim kelurahan",
      "Verifikasi batas kepemilikan",
      "Penerbitan surat keterangan",
    ],
    isOnlineAvailable: false,
  },
]

export const POTENSI_UNGGULAN: PotencyItem[] = [
  {
    id: "florikultura",
    title: "Florikultura & Bunga Hias Tomohon",
    category: "Florikultura",
    description: "Kelurahan Walian Dua berada di pusat tradisi bunga Tomohon. Petani lokal membudidayakan bunga krisan (Riri & Kulo), aster, mawar, dan lili yang menyuplai ajang tahunan Tomohon International Flower Festival (TIFF).",
    highlight: "Pemasok bunga hias & kontributor utama agenda TIFF",
    image: "/images/bunga-tomohon.jpg",
  },
  {
    id: "perkebunan-wawo",
    title: "Kawasan Hortikultura & Perkebunan Wawo",
    category: "Pertanian",
    description: "Area subur lereng bukit Wawo Walian Dua menghasilkan sayuran dataran tinggi segar seperti daun bawang, seledri, tomat apel, dan kubis dengan teknik pertanian ramah lingkungan.",
    highlight: "Lahan vulkanik subur beriklim sejuk 20°C - 24°C",
    image: "/images/galeri-pertanian-sayur-warga.jpg",
  },
  {
    id: "mapalus",
    title: "Kearifan Budaya Gotong Royong (Mapalus)",
    category: "Budaya & Gotong Royong",
    description: "Semangat gotong royong Minahasa di Walian Dua tetap hidup kuat dalam bakti lingkungan, kebersamaan rukun duka, rukun keluarga, serta koordinasi antar lingkungan.",
    highlight: "Falsafah leluhur: Sitou Timou Tumou Tou",
    image: "/images/galeri-kerja-bakti-mapalus.jpg",
  },
  {
    id: "wisata-geografis",
    title: "Panorama Alam Kaki Gunung Lokon & Mahawu",
    category: "Pariwisata",
    description: "Dikelilingi lanskap vulkanik megah dan berdekatan dengan Danau Linow di Tomohon Selatan (± 5,3 km berkendara via Jl. Raya Tomohon-Kawangkoan ke arah Lahendong), Walian Dua menawarkan udara pegunungan segar dan pemandangan asri nan menenangkan.",
    highlight: "Akses ± 12–15 Menit (5,3 km via GMaps) ke Danau Linow",
    image: "/images/danau-linow.jpg",
  },
]

export const ASSET_CATALOGUE: MediaAsset[] = [
  {
    id: "logo-tomohon",
    title: "Lambang Resmi Kota Tomohon",
    type: "logo",
    src: "/images/logo-tomohon.png",
    alt: "Lambang Resmi Kota Tomohon",
    caption: "Burung Manguni, Rumah Adat Minahasa, Tumbuhan Tawaang, dan Pena Emas melambangkan peradaban, keberanian, dan pendidikan Tomohon.",
    credit: "Pemerintah Kota Tomohon (Public Domain / Wikimedia Commons)",
    category: "Identitas Resmi",
  },
  {
    id: "lurah-marlon-taroreh",
    title: "Lurah Walian Dua & Ketua TP-PKK",
    type: "image",
    src: "/images/lurah-marlon-taroreh-full.jpg",
    alt: "Foto Resmi Lurah Marlon Jhon Taroreh, A.Md.Kep. bersama Ibu Carla",
    caption: "Lurah Walian Dua Marlon Jhon Taroreh, A.Md.Kep. dalam Pakaian Dinas Upacara (PDU) didampingi Ketua TP-PKK Kelurahan Walian Dua.",
    credit: "Dokumentasi Resmi Kelurahan Walian Dua",
    category: "Pemerintahan",
  },
  {
    id: "gunung-lokon",
    title: "Pemandangan Gunung Lokon",
    type: "image",
    src: "/images/gunung-lokon.jpg",
    alt: "Gunung Lokon Tomohon yang megah",
    caption: "Gunung berapi aktif ikon Kota Tomohon yang berdiri megah memberikan kesuburan tanah bagi perkebunan sekitar Walian Dua.",
    credit: "Wikimedia Commons (CC-BY-SA)",
    category: "Lanskap Alam",
  },
  {
    id: "danau-linow",
    title: "Danau Linow Tomohon Selatan",
    type: "image",
    src: "/images/danau-linow.jpg",
    alt: "Danau Linow dengan warna air hydrothermal unik",
    caption: "Destinasi wisata kebanggaan Tomohon Selatan berjarak ± 5,3 km (± 12–15 menit berkendara) dari Kelurahan Walian Dua.",
    credit: "Wikimedia Commons (CC-BY-SA)",
    category: "Pariwisata Wilayah",
  },
  {
    id: "tomohon-overview",
    title: "Panorama Dataran Tinggi Tomohon",
    type: "image",
    src: "/images/tomohon-overview.jpg",
    alt: "Pemandangan lembah dan pemukiman Tomohon",
    caption: "Lanskap perbukitan hijau sejuk tempat warga bermukim dan mengolah agrikultur bernilai tinggi.",
    credit: "Wikimedia Commons (CC-BY-SA)",
    category: "Panorama Geografis",
  },
  {
    id: "peta-tomohon",
    title: "Peta Pembagian Kecamatan Kota Tomohon",
    type: "map",
    src: "/images/peta-tomohon.png",
    alt: "Peta Kecamatan Kota Tomohon menunjukkan posisi Tomohon Selatan",
    caption: "Peta administrasi yang memvisualisasikan posisi strategis Tomohon Selatan dan kelurahan-kelurahannya.",
    credit: "Badan Informasi Geospasial / Wikimedia Commons",
    category: "Geospasial",
  },
  {
    id: "bunga-tomohon",
    title: "Pesona Florikultura Bunga Krisan",
    type: "image",
    src: "/images/bunga-tomohon.jpg",
    alt: "Kebun bunga krisan mekar segar di dataran tinggi Tomohon",
    caption: "Hamparan kebun bunga krisan mekar segar yang dibudidayakan oleh para petani florikultura Tomohon.",
    credit: "Wikimedia Commons",
    category: "Florikultura",
  },
  {
    id: "pertanian-wawo",
    title: "Lahan Pertanian Perkebunan Wawo",
    type: "image",
    src: "/images/pertanian-wawo.jpg",
    alt: "Perkebunan hijau terasering dataran tinggi",
    caption: "Hamparan perkebunan Wawo di Walian Dua yang menghasilkan aneka sayur-mayur segar konsumsi lokal.",
    credit: "Unsplash Curated Collection",
    category: "Pertanian",
  },
  {
    id: "pelayanan-kantor",
    title: "Pelayanan Administrasi Terpadu Kelurahan",
    type: "image",
    src: "/images/pelayanan-kantor.jpg",
    alt: "Meja kerja pelayanan publik modern ramah warga",
    caption: "Kesiapan pelayanan kelurahan yang responsif, transparan, dan bebas pungutan liar.",
    credit: "Civic Service Architecture Collection",
    category: "Layanan Publik",
  },
  {
    id: "warga-komunitas",
    title: "Semangat Kebersamaan & Guyub Warga",
    type: "image",
    src: "/images/warga-komunitas.jpg",
    alt: "Masyarakat berkumpul dalam suasana akrab dan harmonis",
    caption: "Pilar utama ketahanan sosial Kelurahan Walian Dua yang rukun, religius, dan bergotong-royong.",
    credit: "Community Culture Archive",
    category: "Sosial Kemasyarakatan",
  },
]

export const VIDEO_REFERENCES = [
  {
    title: "Pesona Wisata & Alam Kota Tomohon",
    channel: "Pariwisata Sulawesi Utara & Liputan Tomohon",
    summary: "Visualisasi bentang alam Gunung Lokon, Danau Linow di Tomohon Selatan, serta keasrian alam perbukitan.",
    topics: ["Danau Linow", "Gunung Lokon", "Hawa Sejuk Pegunungan", "Tomohon Selatan"],
  },
  {
    title: "Tomohon International Flower Festival (Tournament of Flowers)",
    channel: "Pemerintah Kota Tomohon Resmi",
    summary: "Parade kendaraan hias bunga segar kelas dunia, tarian adat kabasaran dan maengket, serta semarak budaya Minahasa.",
    topics: ["Parade Bunga", "Petani Bunga Tomohon", "Budaya Minahasa", "Pariwisata Internasional"],
  },
  {
    title: "Dokumentasi Paduan Suara & Komunitas GMIM Bukit Zaitun Walian Dua",
    channel: "Komunitas Musik Gerejawi Walian Dua",
    summary: "Tradisi paduan suara gerejawi berkualitas tinggi yang menjadi denyut spiritual dan kebersamaan warga di Walian Dua.",
    topics: ["GMIM Bukit Zaitun", "Seni Paduan Suara", "Kegiatan Sosial Warga"],
  },
]
