export type ProcessStep = { step: number; title: string; desc: string };

export const processSteps: {
  home: Record<"tr" | "en", ProcessStep[]>;
  lazer: Record<"tr" | "en", ProcessStep[]>;
} = {
  home: {
    tr: [
      { step: 1, title: "Ücretsiz Analiz", desc: "Uzman ekibimiz cilt tipinizi, kıl kalınlığını ve renkini analiz eder. Kişiye özel protokol hazırlanır." },
      { step: 2, title: "Test Atışı", desc: "Küçük bir test alanı uygulanarak cilt tepkisi ve enerji toleransı ölçülür. Güvenlik önceliklidir." },
      { step: 3, title: "Protokol Belirleme", desc: "Falcon 4 Pro'nun 4 dalga boyu üzerinden cilt tipinize özel parametreler (joules, ms, Hz) set edilir." },
      { step: 4, title: "Uygulama", desc: "Soğutmalı başlıkla ağrısız, hızlı ve hijyenik seans. Her vurışta UVC dezenfeksiyon." },
      { step: 5, title: "Sonrası Bakım", desc: "Soğutucu jel, SPF50+ koruyucu ve takip takvimi verilir. Yan etki riski minimize edilir." },
      { step: 6, title: "Seans Takibi", desc: "Her seans sonrası kıl azalma oranı ölçülür, parametreler güncellenir. Ortalama 6-8 seans." },
      { step: 7, title: "Sonuç & Garanti", desc: "%95+ kıl azalma hedeflenir. Yılın sonuna kadar ücretsiz kontrol seansları dahil." },
    ],
    en: [
      { step: 1, title: "Free Analysis", desc: "Our expert team analyzes skin type, hair thickness and color. A personalized protocol is prepared." },
      { step: 2, title: "Test Shot", desc: "A small test area is treated to measure skin reaction and energy tolerance. Safety is priority." },
      { step: 3, title: "Protocol Setup", desc: "Specific parameters (joules, ms, Hz) across Falcon 4 Pro's 4 wavelengths are set for your skin type." },
      { step: 4, title: "Treatment", desc: "Painless, fast and hygienic session with cooled handpiece. UVC disinfection with every pulse." },
      { step: 5, title: "Aftercare", desc: "Cooling gel, SPF50+ protection and follow-up calendar provided. Side effect risk is minimized." },
      { step: 6, title: "Session Tracking", desc: "Hair reduction rate measured after every session, parameters updated. Average 6-8 sessions." },
      { step: 7, title: "Result & Warranty", desc: "95%+ hair reduction target. Free control sessions included until the end of the year." },
    ],
  },
  lazer: {
    tr: [
      { step: 1, title: "Ücretsiz Cilt & Kıl Analizi", desc: "Yolculuğunuz uzman ekibimizle yapılacak ücretsiz bir cilt ve kıl analizi ile başlar. Falcon 4 Pro'nun mobil uygulaması ile cilt tonunuz ve kıl tipiniz bilimsel olarak değerlendirilerek size özel bir tedavi planı oluşturulur." },
      { step: 2, title: "Şişli veya Halkalı Şubemiz", desc: "İstanbul'un iki merkezi konumunda — Şişli ve Halkalı'da — hizmet veriyoruz. Size en yakın ve uygun şubemizde randevunuzu alabilirsiniz." },
      { step: 3, title: "Falcon 4 Pro ile Uygulama", desc: "Lazer epilasyon işleminiz, 4 dalga boylu hibrit teknolojiye sahip Falcon 4 Pro cihazımızla, steril ve güvenli ortamımızda deneyimli uzmanlar tarafından gerçekleştirilir." },
      { step: 4, title: "Ağrısız & Soğutmalı Deneyim", desc: "-20° buz başlık ve 5 farklı soğutma sistemi sayesinde seans boyunca cildiniz sürekli soğutulur; işlem ağrısız ve konforlu bir şekilde tamamlanır." },
      { step: 5, title: "Kişiselleştirilmiş Seans Programı", desc: "Kıl tipinize ve hedeflenen bölgeye göre gerekli seans sayısı cilt analizinize göre belirlenerek düzenli takip seansları planlanır." },
      { step: 6, title: "İlk Seansta Görünür Sonuç", desc: "Falcon 4 Pro'nun yüksek dökülme oranı sayesinde ilk seanstan itibaren kıllarınızda incelme ve dökülme fark edilir hale gelir." },
      { step: 7, title: "Düzenli Kontrol & Takip", desc: "Tedavinizin tüm aşamalarında uzman ekibimiz yanınızdadır. Lazer epilasyon sonuçlarınız düzenli kontrol seanslarıyla izlenir, gerektiğinde protokol güncellenir." },
    ],
    en: [
      { step: 1, title: "Free Skin & Hair Analysis", desc: "Your journey begins with a free consultation. Falcon 4 Pro's mobile app scientifically analyzes your skin tone and hair type to create a personalized treatment plan." },
      { step: 2, title: "Choose Your Clinic", desc: "We serve at two central Istanbul locations — Şişli and Halkalı. Book at the branch most convenient for you." },
      { step: 3, title: "Falcon 4 Pro Treatment", desc: "Your laser hair removal is performed by experienced specialists using the 4-wavelength hybrid Falcon 4 Pro in a sterile, safe environment." },
      { step: 4, title: "Painless Cooling Experience", desc: "With -20°C ice tip and 5 independent cooling systems, your skin is continuously cooled throughout the session." },
      { step: 5, title: "Personalized Sessions", desc: "Based on your hair type and target area, a tailored session schedule is created after your skin analysis." },
      { step: 6, title: "Visible Results from Session 1", desc: "High shedding rate means you'll notice thinning and reduction from the very first session." },
      { step: 7, title: "Regular Monitoring", desc: "Our team follows your progress with regular check-ups and adjusts the protocol as needed." },
    ],
  },
};
