export type TechSpec = { label: string; value: string };

export const falconTechSpecs: Record<"tr" | "en", TechSpec[]> = {
  tr: [
    { label: "Dalga Boyları", value: "755nm Alexandrite + 808nm Diode + 940nm + 1064nm Nd:YAG" },
    { label: "Spot Boyutu", value: "4 cm² (büyük vücut alanları için optimize)" },
    { label: "Frekans", value: "1-10 Hz (hızlı vücut epilasyonu)" },
    { label: "Soğutma", value: "Safir kristal, -20°C ile +5°C arası ayarlanabilir" },
    { label: "Enerji", value: "1-120 J/cm² (cilt tipine göre AI ile otomatik)" },
    { label: "Nabız Süresi", value: "5-400 ms (ince/kalın kıl için optimize)" },
    { label: "Hijyen", value: "UVC LED dezenfeksiyon + tek kullanımlık başlık kapağı" },
    { label: "Ekran", value: "15.6\" dokunmatik, AI cilt analizi entegre" },
  ],
  en: [
    { label: "Wavelengths", value: "755nm Alexandrite + 808nm Diode + 940nm + 1064nm Nd:YAG" },
    { label: "Spot Size", value: "4 cm² (optimized for large body areas)" },
    { label: "Frequency", value: "1-10 Hz (fast body hair removal)" },
    { label: "Cooling", value: "Sapphire crystal, adjustable between -20°C and +5°C" },
    { label: "Energy", value: "1-120 J/cm² (AI automatic by skin type)" },
    { label: "Pulse Duration", value: "5-400 ms (optimized for fine/thick hair)" },
    { label: "Hygiene", value: "UVC LED disinfection + single-use handpiece cap" },
    { label: "Screen", value: "15.6\" touch, AI skin analysis integrated" },
  ],
};
