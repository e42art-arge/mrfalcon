export type WhyUsItem = { icon: string; title: string; desc: string };

export const whyUs: Record<"tr" | "en", WhyUsItem[]> = {
  tr: [
    { icon: "microscope", title: "4 Dalga Boylu Hibrit Teknoloji", desc: "Falcon 4 Pro ile 755nm, 808nm, 940nm ve 1064nm dalga boyları tek aplikatörde birleşir. Açık tenden koyu tene, ince kıldan kalın kıla kadar her tip için etkili." },
    { icon: "trend-down", title: "İlk Seansta %70 Dökülme Oranı", desc: "Falcon 4 Pro'nun yapay zeka destekli hibrit teknoloji ile ilk seanstan itibaren kıllarda belirgin azalma. Çoğu danışan ilk seansta %70'e varan dökülme görür." },
    { icon: "snowflake", title: "Ağrısız & Soğutmalı Uygulama", desc: "-20°C buz başlık ve 5 farklı soğutma sistemi sayesinde cilt sürekli soğutulur. İşlem neredeyse ağrısız ve oldukça konforludur." },
    { icon: "sparkles", title: "Steril Ortam & UVC Hijyen", desc: "Steril Box ve UVC sterilizasyon teknolojisi, her danışan için maksimum hijyeni güvence altına alır." },
    { icon: "bot", title: "Yapay Zeka Destekli Analiz", desc: "Özel mobil uygulama ile cilt ve kıl tipiniz bilimsel olarak analiz edilir, en uygun dalga boyu ve parametreler otomatik belirlenir." },
    { icon: "academic-cap", title: "Uzman Kadro", desc: "Sertifikalı uzman estetisyenler tarafından uygulanır." },
    { icon: "shield", title: "FDA & CE Onaylı", desc: "Falcon 4 Pro cihazı FDA 510(k) ve CE sertifikalı, tıbbi cihaz sınıfındadır (Class IIb)." },
    { icon: "chart-bar", title: "Şeffaf Süreç & Garanti", desc: "Her seans öncesi/sonrası fotoğraflı takip, kıl sayım raporu ve enerji parametreleri paylaşılır. Paket alırsanız yıl sonuna kadar ücretsiz kontrol." },
    { icon: "map-pin", title: "Şişli & Halkalı İki Merkezi Şube", desc: "Mecidiyeköy (Şişli) ve Halkalı (Küçükçekmece) — Metro, metrobüs, otobüsle erişim kolay." },
    { icon: "chat-bubble", title: "7/24 Kişiselleştirilmiş Destek", desc: "WhatsApp hattımızdan seans sonrası takip, randevu değişikliği ve sorularınız için anında yanıt." },
  ],
  en: [
    { icon: "microscope", title: "4-Wavelength Hybrid Technology", desc: "Falcon 4 Pro combines 755nm, 808nm, 940nm, and 1064nm in one applicator. Effective for all hair and skin types." },
    { icon: "trend-down", title: "70% Shedding Rate from Session 1", desc: "AI-powered hybrid technology delivers visible reduction from the very first session. Most clients experience up to 70% shedding." },
    { icon: "snowflake", title: "Painless Cooling Experience", desc: "-20°C ice tip and 5 independent cooling systems continuously cool the skin. The procedure is virtually painless." },
    { icon: "sparkles", title: "Sterile Environment & UVC", desc: "Sterile Box and UVC sterilization technology guarantee maximum hygiene for every client." },
    { icon: "bot", title: "AI-Powered Analysis", desc: "The mobile app analyzes your skin and hair scientifically, automatically selecting the optimal wavelength and parameters." },
    { icon: "academic-cap", title: "Expert Staff", desc: "Applied by certified expert aestheticians." },
    { icon: "shield", title: "FDA & CE Approved", desc: "Falcon 4 Pro is FDA 510(k) cleared and CE certified (Class IIb)." },
    { icon: "chart-bar", title: "Transparent Process & Warranty", desc: "Photo tracking before/after, hair count report, and energy parameters shared every session. Free follow-up included with packages." },
    { icon: "map-pin", title: "Şişli & Halkalı — Two Central Locations", desc: "Mecidiyeköy (Şişli) and Halkalı (Küçükçekmece) — easy access by Metro, Metrobus, Bus." },
    { icon: "chat-bubble", title: "24/7 Personalized Support", desc: "Instant response via WhatsApp for post-session follow-up, scheduling changes, and questions." },
  ],
};
