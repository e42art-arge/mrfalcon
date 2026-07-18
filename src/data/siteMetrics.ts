export type Metric = { value: string; label: string };

export const siteMetrics: Record<"tr" | "en", Metric[]> = {
  tr: [
    { value: "15.000+", label: "Mutlu Müşteri" },
    { value: "5.0/5", label: "Google Değerlendirme" },
    { value: "2", label: "İstanbul Şubesi" },
    { value: "10+", label: "Yıl Deneyim" },
  ],
  en: [
    { value: "15,000+", label: "Happy Clients" },
    { value: "5.0/5", label: "Google Rating" },
    { value: "2", label: "Istanbul Branches" },
    { value: "10+", label: "Years Experience" },
  ],
};
