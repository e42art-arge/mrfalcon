export type Benefit = { icon: string; text: string };

export const benefits: Record<"tr" | "en", Benefit[]> = {
  tr: [
    { icon: "🛡️", text: "FDA Onaylı Falcon 4 Pro" },
    { icon: "📍", text: "Şişli & Halkalı Şubeleri" },
    { icon: "📞", text: "7/24 Kişiselleştirilmiş Destek" },
    { icon: "📉", text: "İlk Seansta %70 Dökülme" },
  ],
  en: [
    { icon: "🛡️", text: "FDA Cleared Falcon 4 Pro" },
    { icon: "📍", text: "Şişli & Halkalı Clinics" },
    { icon: "📞", text: "24/7 Personalized Support" },
    { icon: "📉", text: "70% Shedding Rate" },
  ],
};
