export type Feature = { name: string; wavelengths: string; desc: string };

export const features: Record<"tr" | "en", Feature[]> = {
  tr: [
    { name: "4 Dalga Boylu Hibrit Teknoloji", wavelengths: "755nm + 808nm + 940nm + 1064nm", desc: "Dört farklı lazer dalga boyunu tek aplikatörde birleştirir. Açık tenden bronz tene, ince kıldan kalın kıla kadar her danışana en etkili deneyimi sunar." },
    { name: "Ağrısız & Konforlu Uygulama", wavelengths: "-20°C Soğutma", desc: "4 cm² geniş spot başlığı seans sürelerini kısaltır, 5 farklı soğutma sistemi ve -20° buz başlık teknolojisi ağrısız bir deneyim sağlar." },
    { name: "SHR Teknolojisi", wavelengths: "20 atış/sn", desc: "In-Motion SHR sistemi ile saniyede 20 atış yapılabilir. Hızlı ve etkili epilasyonun garantisidir." },
    { name: "Hijyen & Sterilizasyon", wavelengths: "UVC + Steril Box", desc: "Steril Box ve UVC sterilizasyon teknolojisi, her danışan için maksimum hijyeni güvence altına alır." },
    { name: "Yapay Zeka Destekli Analiz", wavelengths: "Mobil Uygulama", desc: "Seans öncesinde cilt ve kıl tipiniz bilimsel olarak analiz edilir, en uygun dalga boyu otomatik belirlenir." },
    { name: "Yüksek Güç & Garanti", wavelengths: "2400W / 100M", desc: "2400W yüksek çıkış gücü ve 100 milyon atış garantisiyle dört mevsim güvenle kullanılabilir." },
  ],
  en: [
    { name: "4-Wavelength Hybrid Technology", wavelengths: "755nm + 808nm + 940nm + 1064nm", desc: "Four laser wavelengths in a single applicator. From fair to dark skin, fine to coarse hair — effective for every client." },
    { name: "Painless & Comfortable", wavelengths: "-20°C Cooling", desc: "4 cm² spot size reduces session time, while 5 cooling systems and -20° ice tip ensure a painless experience." },
    { name: "SHR Technology", wavelengths: "20 pulses/sec", desc: "In-Motion SHR delivers up to 20 pulses per second for fast, effective treatment of large areas." },
    { name: "Hygiene & Sterilization", wavelengths: "UVC + Sterile Box", desc: "Maximum hygiene guaranteed with Sterile Box and UVC sterilization technology for every client." },
    { name: "AI-Powered Analysis", wavelengths: "Mobile App", desc: "Scientific analysis of skin and hair type before each session with automatic wavelength selection." },
    { name: "High Power & Warranty", wavelengths: "2400W / 100M", desc: "2400W output power and 100 million shot warranty for safe year-round use." },
  ],
};
