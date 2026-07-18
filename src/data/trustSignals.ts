export type Signal = { icon: string; text: string };

export const trustSignals: Record<"tr" | "en", Signal[]> = {
  tr: [
    { icon: "🏆", text: "15.000+" },
    { icon: "⭐", text: "5.0/5" },
    { icon: "🏥", text: "2 Şube" },
    { icon: "⚡", text: "Falcon 4 Pro" },
  ],
  en: [
    { icon: "🏆", text: "15,000+" },
    { icon: "⭐", text: "5.0/5" },
    { icon: "🏥", text: "2 Branches" },
    { icon: "⚡", text: "Falcon 4 Pro" },
  ],
};
