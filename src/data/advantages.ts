export type Advantage = { icon: string; title: string; desc: string };

export const advantages: Record<"tr" | "en", Advantage[]> = {
  tr: [
    { icon: "target", title: "4 Dalga Boyu", desc: "755nm Alexandrite, 808nm Diode, 940nm ve 1064nm Nd:YAG tek cihazda. Her cilt tipi ve kıl rengi için optimize edilmiş." },
    { icon: "bot", title: "AI Cilt Analizi", desc: "Yapay zeka destekli cilt ve kıl analizi ile her müşteriye özel enerji parametreleri belirlenir." },
    { icon: "snowflake", title: "Safir Soğutma", desc: "-20°C'a kadar soğutma ile epilasyon sırasında neredeyse sıfır ağrı hissi." },
    { icon: "sun", title: "4 Mevsim Güvenli", desc: "Nd:YAG 1064nm sayesinde bronz ciltlerde ve yaz aylarında da güvenli uygulama." },
    { icon: "bug-ant", title: "UVC Hijyen", desc: "Her seans öncesi başlık UVC ışığıyla dezenfekte edilir, tek kullanımlık kapak kullanılır." },
    { icon: "bolt", title: "Hızlı Seans", desc: "4 cm² spot boyu ve 10 Hz frekans ile vücut epilasyonu 15-20 dakikada tamamlanır." },
  ],
  en: [
    { icon: "target", title: "4 Wavelengths", desc: "755nm Alexandrite, 808nm Diode, 940nm and 1064nm Nd:YAG in one device. Optimized for every skin type and hair color." },
    { icon: "bot", title: "AI Skin Analysis", desc: "AI-powered skin and hair analysis determines custom energy parameters for every client." },
    { icon: "snowflake", title: "Sapphire Cooling", desc: "Down to -20°C cooling for nearly zero pain during hair removal." },
    { icon: "sun", title: "Safe All Year", desc: "Nd:YAG 1064nm allows safe treatment on tanned skin and during summer months." },
    { icon: "bug-ant", title: "UVC Hygiene", desc: "Handpiece is disinfected with UVC light before every session, single-use caps are used." },
    { icon: "bolt", title: "Fast Sessions", desc: "4 cm² spot size and 10 Hz frequency complete full body hair removal in 15-20 minutes." },
  ],
};
