export type WhyUsItem = { icon: string; title: string; desc: string };

export const whyUsItems: Record<"tr" | "en", WhyUsItem[]> = {
  tr: [
    { icon: "academic-cap", title: "Uzman Kadro", desc: "Sertifikalı uzman estetisyenler tarafından uygulanır." },
    { icon: "microscope", title: "FDA/CE Onaylı", desc: "Falcon 4 Pro cihazı FDA ve CE sertifikalı, tıbbi cihaz sınıfındadır (Class IIb)." },
    { icon: "chart-bar", title: "Şeffaf Süreç", desc: "Her seans öncesi/sonrası fotoğraflı takip, kıl sayım raporu ve enerji parametreleri paylaşılır." },
    { icon: "shield", title: "Garanti Paket", desc: "Paket alırsanız yıl sonuna kadar ücretsiz kontrol seansı. Sonuç gelmezse para iadesi garantisi." },
    { icon: "map-pin", title: "İki Kolay Konum", desc: "Mecidiyeköy (Şişli) ve Halkalı (Küçükçekmece) - Metro, metrobüs, otobüsle erişim kolay." },
    { icon: "chat-bubble", title: "7/24 Destek", desc: "WhatsApp hattımızdan seans sonrası takip, randevu değişikliği ve sorularınız için anında yanıt." },
  ],
  en: [
    { icon: "academic-cap", title: "Expert Staff", desc: "Applied by certified expert aestheticians." },
    { icon: "microscope", title: "FDA/CE Approved", desc: "Falcon 4 Pro device is FDA and CE certified, medical grade (Class IIb)." },
    { icon: "chart-bar", title: "Transparent Process", desc: "Photo tracking before/after, hair count report and energy parameters shared every session." },
    { icon: "shield", title: "Warranty Package", desc: "Free control session until year end if you get a package. Money back guarantee if no results." },
    { icon: "map-pin", title: "Two Easy Locations", desc: "Mecidiyeköy (Şişli) and Halkalı (Küçükçekmece) - Easy access by Metro, Metrobus, Bus." },
    { icon: "chat-bubble", title: "24/7 Support", desc: "Instant response via WhatsApp for post-session follow-up, booking changes and questions." },
  ],
};
