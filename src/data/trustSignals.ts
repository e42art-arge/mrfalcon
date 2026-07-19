export type Signal = { icon: string; text: string };

export const trustSignals: Record<"tr" | "en", Signal[]> = {
  tr: [
    { icon: "award", text: "15.000+" },
    { icon: "star", text: "5.0/5" },
    { icon: "hospital", text: "2 Şube" },
    { icon: "zap", text: "Falcon 4 Pro" },
  ],
  en: [
    { icon: "award", text: "15,000+" },
    { icon: "star", text: "5.0/5" },
    { icon: "hospital", text: "2 Branches" },
    { icon: "zap", text: "Falcon 4 Pro" },
  ],
};
