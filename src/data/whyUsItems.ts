export type WhyUsItem = { icon: string; title: string; desc: string };

export const whyUsItems: Record<"tr" | "en", WhyUsItem[]> = {
  tr: [
    { icon: "🎓", title: "Uzman Kadro", desc: "Sertifikalı uzman estetisyenler tarafından uygulanır." },
    { icon: "🔬", title: "FDA/CE Onaylı", desc: "Falcon 4 Pro cihazı FDA ve CE sertifikalı, tıbbi cihaz sınıfındadır (Class IIb)." },
    { icon: "📊", title: "Şeffaf Süreç", desc: "Her seans öncesi/sonrası fotoğraflı takip, kıl sayım raporu ve enerji parametreleri paylaşılır." },
    { icon: "🛡️", title: "Garanti Paket", desc: "Paket alırsanız yıl sonuna kadar ücretsiz kontrol seansı. Sonuç gelmezse para iadesi garantisi." },
    { icon: "📍", title: "İki Kolay Konum", desc: "Mecidiyeköy (Şişli) ve Halkalı (Küçükçekmece) - Metro, metrobüs, otobüsle erişim kolay." },
    { icon: "💬", title: "7/24 Destek", desc: "WhatsApp hattımızdan seans sonrası takip, randevu değişikliği ve sorularınız için anında yanıt." },
  ],
  en: [
    { icon: "🎓", title: "Expert Staff", desc: "Applied by certified expert aestheticians." },
    { icon: "🔬", title: "FDA/CE Approved", desc: "Falcon 4 Pro device is FDA and CE certified, medical grade (Class IIb)." },
    { icon: "📊", title: "Transparent Process", desc: "Photo tracking before/after, hair count report and energy parameters shared every session." },
    { icon: "🛡️", title: "Warranty Package", desc: "Free control session until year end if you get a package. Money back guarantee if no results." },
    { icon: "📍", title: "Two Easy Locations", desc: "Mecidiyeköy (Şişli) and Halkalı (Küçükçekmece) - Easy access by Metro, Metrobus, Bus." },
    { icon: "💬", title: "24/7 Support", desc: "Instant response via WhatsApp for post-session follow-up, booking changes and questions." },
  ],
};
