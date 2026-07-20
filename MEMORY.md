# Proje Hafızası (MEMORY.md)

## Proje Hakkında
- **Proje Adı:** Mr. Falcon Beauty Web Sitesi
- **Kullanılan Teknoloji:** Astro, Tailwind CSS (v4), GSAP
- **Ana Hedef:** Anasayfadaki `FALCON 4 PRO TECH DEEP DIVE` bölümünü yeniden tasarlamak, daha premium, çarpıcı ve yüksek kaliteli (UI-UX Pro Max standartlarında) hale getirmek.

## Aktif Görev
- Onaylanan mühendislik düzeltmeleri (SplitText simülasyonu dahil) başarıyla tamamlandı ve build ile doğrulandı.

## Yapılacaklar Listesi
- [x] `ui-ux-pro-max` becerisinin tasarım sistemini çalıştırarak en iyi renk, tipografi, yerleşim ve animasyon kurallarını analiz et.
- [x] `FALCON 4 PRO TECH DEEP DIVE` bölümünün yapısını planla (bento-grid, dalga boyu görselleştiricileri, interaktif teknik detaylar).
- [x] Kod değişikliklerini `src/pages/index.astro` dosyasında gerçekleştir.
- [x] Video slider'larının mobil kart genişliklerini `VideoGallery.astro` ve `PressSlider.astro` dosyalarında güncelle.
- [x] Video oynatma modallarının mobil uyumluluğunu `global.css` dosyasında Fancybox override kuralları ile ayarla.
- [x] Tech Deep Dive bölümünün renk paletini kurumsal renklerle (Navy & Primary & Sky) uyumlu olacak şekilde yeniden düzenle.
- [x] Hero bölümündeki Google Değerlendirme widget'ı ve rozetlerinin mobilde çakışmaması için yerleşimi responsive yap.
- [x] Fancybox video modal kapatma ve navigasyon butonlarını daha belirgin ve touch-friendly (44px+) hale getir.
- [x] İkinci VideoGallery bileşeninde (Bilgilendirici Videolar) Fancybox seçicisini String Selector olarak değiştirerek modal açılmama hatasını fix et.
- [x] Dikey videoların modalda kırpılmasını önlemek için aspect-ratio zorlamasını kaldır ve object-fit: contain yap.
- [x] Dikey ve yatay videoların ekranda tam ortalanması için slide flex ve height oranlarını global.css'te ayarla.
- [x] Video elementlerinde height: auto ve iframe'lerde height: 100% ayrımı yaparak videoların küçük görünmesi/çökmesi sorununu fix et.
- [x] slide yüksekliğini height: 100% ve margin değerini auto !important yaparak mobildeki dikey ortalama kaymasını tamamen gider.
- [x] align-items: flex-start ve align-self: flex-start uygulayarak videoların mobilde cihazın en tepesinden (0px/16px) başlamasını sağla.
- [x] Mobilde alt thumbnails listesini gizleyerek dikey alanı genişlet ve video alt yazılarının/alt alanlarının kırpılmasını kesin olarak önle.
- [x] Toolbar, thumbs ve slide paddinglerini tamamen sıfırlayarak dikey videoların mobilde 0px noktasından başlamasını sağla ve crop problemini ortadan kaldır.
- [x] GSAP/Lenis animations.js scriptini src/ klasörüne taşıyıp Vite modülü olarak bundle et, tarayıcıdaki runtime çökmelerini çöz.
- [x] GSAP SplitText eklentisi lisans hatasını (parent set of undefined) aşmak için vanilla JS SplitText simülasyonunu uygula.
- [x] Eski @astrojs/prefetch kütüphanesini kaldırıp yerine modern yerleşik prefetch: true entegrasyonunu uygula.
- [x] Sağ alttaki WhatsApp butonu için standart sohbet balonu yerine orijinal ve güven veren WhatsApp logosunu yerleştir.
- [x] Build sonucunu gör ve hataları kontrol et.
- [x] Değişiklikleri doğrula ve kullanıcıya sun.
