export type WhyUs = { icon: string; title: string; desc: string };

export const whyUs: Record<"tr" | "en", WhyUs[]> = {
  tr: [
    { icon: "microscope", title: "4 Dalga Boylu Hibrit Teknoloji", desc: "Falcon 4 Pro ile 755nm, 808nm, 940nm ve 1064nm dalga boyları tek aplikatörde birleşir. Açık tenden koyu tene, ince kıldan kalın kıla kadar her tip için etkili." },
    { icon: "snowflake", title: "Ağrısız Uygulama", desc: "-20°C buz başlık ve 5 soğutma sistemi ile cilt sürekli soğutulur. İşlem neredeyse ağrısız ve oldukça konforludur." },
    { icon: "sparkles", title: "Steril Ortam & UVC", desc: "Steril Box ve UVC sterilizasyon teknolojisi, her danışan için maksimum hijyeni güvence altına alır." },
    { icon: "bot", title: "Yapay Zeka Analizi", desc: "Özel mobil uygulama ile cilt ve kıl tipiniz bilimsel olarak analiz edilir, en uygun dalga boyu otomatik belirlenir." },
  ],
  en: [
    { icon: "microscope", title: "4-Wavelength Hybrid Technology", desc: "Falcon 4 Pro combines 755nm, 808nm, 940nm, and 1064nm in one applicator. Effective for all hair and skin types." },
    { icon: "snowflake", title: "Painless Treatment", desc: "-20°C ice tip and 5 cooling systems continuously cool the skin. The procedure is virtually painless." },
    { icon: "sparkles", title: "Sterile Environment & UVC", desc: "Sterile Box and UVC sterilization technology guarantee maximum hygiene for every client." },
    { icon: "bot", title: "AI-Powered Analysis", desc: "The mobile app analyzes your skin and hair scientifically, automatically selecting the optimal wavelength." },
  ],
};
