export type MediaNews = { name: string; desc: string };

export const mediaNews: Record<"tr" | "en", MediaNews[]> = {
  tr: [
    { name: "Beyaz TV", desc: "Falcon 4 Pro teknolojisi ulusal kanalda tanıtıldı" },
    { name: "CNN Türk", desc: "Lazer epilasyonda yeni standart: Falcon 4 Pro" },
    { name: "TLC", desc: "Ağrısız epilasyon deneyimi mercek altında" },
    { name: "CNN Türk", desc: "4 dalga boylu hibrit cihaz Türkiye'de" },
  ],
  en: [
    { name: "Beyaz TV", desc: "Falcon 4 Pro featured on national television" },
    { name: "CNN Türk", desc: "New standard in laser hair removal" },
    { name: "TLC", desc: "Painless hair removal experience highlighted" },
    { name: "CNN Türk", desc: "4-wavelength hybrid device in Turkey" },
  ],
};
