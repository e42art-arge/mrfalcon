export type Benefit = { icon: string; text: string };

export const benefits: Record<"tr" | "en", Benefit[]> = {
  tr: [
    { icon: "shield", text: "FDA Onaylı Falcon 4 Pro" },
    { icon: "map-pin", text: "Şişli & Halkalı Şubeleri" },
    { icon: "phone", text: "7/24 Kişiselleştirilmiş Destek" },
    { icon: "trend-down", text: "İlk Seansta %70 Dökülme" },
    { icon: "sparkles", text: "Cilt Bakımı Hizmetleri" },
  ],
  en: [
    { icon: "shield", text: "FDA Cleared Falcon 4 Pro" },
    { icon: "map-pin", text: "Şişli & Halkalı Clinics" },
    { icon: "phone", text: "24/7 Personalized Support" },
    { icon: "trend-down", text: "70% Shedding Rate" },
    { icon: "sparkles", text: "Skin Care Services" },
  ],
};
