// The original static content of the site.
// Used once by `npm run seed` to fill Sanity, and as a fallback if a field is left empty.

export const defaultSiteSettings = {
  siteTitle: "Zeliha Koyuncu",
  navHome: "Ana Sayfa",
  navAbout: "Hakkımda",
  navProjects: "Projelerim",
  navExperiences: "Deneyimlerim",
  homeTitle: "Geleceğin Teknolojilerini İnşa Eden Bir",
  homeHighlight: "Yazılım Mühendisi",
  homeDescription:
    "İstanbul Gelişim Üniversitesi Software Engineering öğrencisiyim. Savunma sanayii vizyonuyla Java, asenkron veri akışları ve veritabanı mimarileri üzerine projeler geliştiriyorum.",
  githubUrl: "https://github.com/zzelihakync",
  linkedinUrl: "",
  aboutButtonLabel: "Daha Fazla Bilgi",
  profileImageUrl: "/resimler/zeliha.jpg.jpeg",
  aboutIntro:
    "İstanbul Gelişim Üniversitesi Yazılım Mühendisliği 2. sınıf öğrencisiyim. Java, Python ve C/C++ dillerinde nesne yönelimli programlama, algoritma optimizasyonu ve asenkron thread yönetimi üzerine yoğunlaştım.",
  aboutVisionHeading: "Profil & Vizyon",
  aboutVision:
    "Yazılım gereksinim analizi, sistem mimari tasarımı ve test süreçlerini modern yapay zeka (AI) ve prompt mühendisliği teknikleriyle optimize ederek yüksek performanslı çözümler üretmeye odaklanıyorum. Teknik iletişim becerilerimi kurumsal projelerde değerlendirerek savunma sanayii ve ileri teknoloji odaklı sistem mimarilerine katkı sağlamayı hedefliyorum.",
  educationHeading: "Eğitim Bilgileri",
  educationLabel: "🎓 Lisans Eğitimi:",
  education: "İstanbul Gelişim Üniversitesi - Yazılım Mühendisliği 2. Sınıf Öğrencisi",
  focusAreasHeading: "Odak Alanlarım & Metodolojiler",
  focusAreas: [
    { title: "Masaüstü & Sistem", description: "Java Swing mimarisi, Nesne Yönelimli Tasarım (OOD) ve asenkron thread yönetimi." },
    { title: "Veritabanı Yönetimi", description: "JDBC sürücüleri, Zaman Serisi (Time-Series) veri loglama mimarileri ve MySQL ilişkisel DB tasarımı." },
    { title: "Yazılım Yaşam Döngüsü", description: "Yazılım Gereksinim Analizi (Business Analysis), Yazılım Tasarımı ve Yazılım Test Prensipleri." },
    { title: "Yapay Zeka Entegrasyonu", description: "İleri Düzey Prompt Yazımı (Prompt Engineering) ve yazılım geliştirme süreçlerinde AI entegrasyonu." },
  ],
  skillsHeading: "Tech Stack (Yetenek Havuzu)",
  skills: ["Java", "C / C++", "Python", "MySQL", "JDBC", "HTML5", "CSS3", "JavaScript", "XAMPP", "Git / GitHub", "NetBeans", "VS Code", "Prompt Engineering", "AI Integration"],
  projectsHeading: "Geliştirdiğim Mühendislik Projeleri",
  projectButtonLabel: "GitHub'da İncele",
  experiencesHeading: "İş ve Staj Deneyimlerim",
  footerLine1: "© 2026 Zeliha Koyuncu. Tüm Hakları Saklıdır.",
  footerLine2: "Software Engineering Student | İstanbul Gelişim Üniversitesi",
};

export const defaultProjects = [
  {
    _id: "project-uav-telemetry",
    order: 1,
    icon: "⚡",
    title: "UAV Telemetry System",
    description:
      "Asenkron thread yapısıyla çalışan, anlık akan uçuş verilerini milisaniyeler içinde yerel log dosyalarına ve MySQL veritabanına kaydeden Yer Kontrol İstasyonu simülatörü.",
    githubUrl: "https://github.com/zzelihakync/UAV-Telemetry-Simulation-System",
  },
  {
    _id: "project-iha-inventory",
    order: 2,
    icon: "🛸",
    title: "IHA Envanter Yönetimi",
    description:
      "İnsansız Hava Araçlarının bakım periyotlarını, aktif görev durumlarını ve teknik parça envanterlerini ilişkisel veritabanı mimarisiyle yöneten kurumsal CRUD yazılımı.",
    githubUrl: "https://github.com/zzelihakync/IHA_Envanter_Yonetimi",
  },
  {
    _id: "project-health-system",
    order: 3,
    icon: "🩺",
    title: "Bireysel Sağlık Sistemi",
    description:
      "Java Swing Framework ve MySQL entegrasyonu ile geliştirilen, kullanıcıların sağlık verilerini, kalori takiplerini ve form grafiklerini analiz eden yönetim sistemi.",
    githubUrl: "https://github.com/zzelihakync/BireyselSaglikVeFormYonetimi",
  },
];
