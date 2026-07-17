# Mr. Falcon Beauty — Uygulama Planı (PLAN)

> **Bağlam:** `spec.md` onaylandıktan sonra uygulanacak. Astro tabanlı, çok sayfalı, TR+EN, uluslararası standartta lazer epilasyon sitesi.
> **Tarih:** 2026-06-18
> **Yaklaşım:** İteratif — önce iskelet + i18n, sonra içerik göçü, sonra görsel sistem, en son doğrulama.

---

## Milestone 0 — Proje Kurulumu & Repo Bağlantısı

- [ ] `/config/workspace/mrfalcon` dizinini GitHub repo `e42art-arge/mrfalcon` ile bağla (git init + remote + ilk commit)
- [ ] Node/npm ortamını doğrula
- [ ] Astro projesini `npm create astro@latest` ile başlat (empty template, TypeScript)
- [ ] `astro.config.mjs` i18n ayarı:
  ```js
  export default defineConfig({
    i18n: {
      defaultLocale: 'tr',
      locales: ['tr', 'en'],
      prefixDefaultLocale: false,
    },
  });
  ```
- [ ] Styling kararı: **Tailwind CSS** (Astro entegrasyonu) — hızlı, tutarlı tasarım sistemi için
- [ ] Gerekli paketler: `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/prefetch`

**Çıktı:** Çalışan `npm run dev` iskeleti.

---

## Milestone 1 — Tasarım Sistemi & Layout

- [ ] `src/styles/global.css` — CSS değişkenleri (renk, tipografi, boşluk ölçeği)
- [ ] Fontlar: Google Fonts (Playfair Display + Inter) — preconnect + display=swap
- [ ] `src/layouts/BaseLayout.astro` — html lang, head (SEO meta, OG, hreflang), header, footer
- [ ] `src/components/Header.astro` — logo, nav (çok dilli), dil değiştirici, sticky CTA
- [ ] `src/components/Footer.astro` — şube kısa bilgi, sosyal, telif, SSS linki
- [ ] `src/components/LanguageSwitcher.astro` — mevcut path'i koruyarak /en ↔ / geçiş
- [ ] `src/components/StickyCTA.astro` — Randevu + WhatsApp (mobil friendly)
- [ ] Yardımcı bileşenler: `Button.astro`, `Section.astro`, `Container.astro`, `Icon.astro`

**Çıktı:** Tutarlı iskelet + navigation + görsel token'lar.

---

## Milestone 2 — Content Collections & Veri Modeli

- [ ] `src/content/config.ts` şemaları:
  - `reviews` (data): name, location, branch, category, rating, quote, verified
  - `faq` (data): question, answer, category, order
  - `branches` (data): slug, name, address, district, phone, whatsapp, hours, mapUrl, image
  - `treatments` (content/MDX): title, description, excerpt, body
  - `tech` (data): name, wavelength, description, icon (Falcon 4 Pro kartları)
- [ ] Markdown/JSON içerik dosyalarını oluştur:
  - `src/content/reviews/*.json` — mevcut 9 yorum
  - `src/content/faq/*.json` — mevcut 8 SSS
  - `src/content/branches/*.json` — şişli, halkalı
  - `src/content/tech/*.json` — 4 dalga boyu + AI + soğutma + SHR + UVC
- [ ] TR + EN çevirilerini paralel klasörlerde hazırla

**Çıktı:** Doğrulanmış, sorgulanabilir içerik.

---

## Milestone 3 — Sayfalar (TR + EN)

Sıralama: önce TR, sonra EN çeviri ile mirror.

1. **Ana Sayfa** `src/pages/index.astro` + `src/pages/en/index.astro`
   - Hero, Falcon 4 Pro özet, Neden biz, Basın, 7 adım, öne çıkan yorumlar, şube erişimi
2. **Lazer Epilasyon** `src/pages/lazer-epilasyon.astro` + `/en/laser-hair-removal.astro`
   - Pillar içerik (content collection'dan)
3. **Falcon 4 Pro** `src/pages/falcon-4-pro.astro` + `/en/falcon-4-pro.astro`
   - Tech kartları grid
4. **Merkezlerimiz** `src/pages/merkezlerimiz.astro` + `/en/our-clinics.astro`
   - Şube listesi + her şube için dinamik `merkezlerimiz/[slug]` landing
5. **Yorumlar** `src/pages/yorumlar.astro` + `/en/reviews.astro`
   - Reviews grid + before-after placeholder + video referans
6. **SSS** `src/pages/sss.astro` + `/en/faq.astro`
   - FAQ accordion + schema
7. **İletişim / Randevu** `src/pages/iletisim.astro` + `/en/contact.astro`
   - Form + WhatsApp + harita

**Çıktı:** 7 sayfa × 2 dil = 14 route.

---

## Milestone 4 — Görsel Cila & Hareket

- [ ] View Transitions: `<ClientRouter />` BaseLayout head'de; sayfa geçiş animasyonu
- [ ] Scroll-reveal: küçük vanilla JS (IntersectionObserver) + `prefers-reduced-motion` guard
- [ ] Hero görsel/video entegrasyonu (placeholder → gerçek varlık sonra)
- [ ] Before-after galeri component (filtresiz, çeşitli cilt tipleri)
- [ ] Hover micro-interactions (Tailwind transition)
- [ ] İkon seti (inline SVG: dalga boyu, soğutma, AI, UVC, şube, WhatsApp)

**Çıktı:** "Havalı" etkileşim katmanı.

---

## Milestone 5 — SEO / Schema / a11y

- [ ] JSON-LD: LocalBusiness + MedicalClinic (şube sayfaları), FAQPage (SSS), Review (yorumlar)
- [ ] Sitemap (`@astrojs/sitemap`) + robots.txt
- [ ] hreflang karşılıklı linkler
- [ ] OG/Twitter kartları (her sayfa)
- [ ] a11y denetimi: semantik etiketler, kontrast, klavye, alt metin, label
- [ ] `lang` dinamik, title/description her route

**Çıktı:** Arama motoru + erişilebilirlik hazır.

---

## Milestone 6 — Doğrulama & Build

- [ ] `npm run build` hatasız
- [ ] `npm run preview` ile manuel gözden geçirme
- [ ] Lighthouse (mobil) Performance ≥ 95 kontrolü
- [ ] TR/EN dil değiştirici tüm sayfalarda
- [ ] 14 route erişilebilir, içerik eksiksiz
- [ ] a11y spot-check (klavye tab, kontrast)
- [ ] Git commit + push (ilk sürüm)

**Çıktı:** Yayına hazır statik site.

---

## Dosya Yapısı (Hedef)

```
mrfalcon/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── src/
│   ├── content/
│   │   ├── config.ts
│   │   ├── reviews/      (tr/, en/)
│   │   ├── faq/          (tr/, en/)
│   │   ├── branches/     (*.json)
│   │   ├── tech/         (*.json)
│   │   └── treatments/   (tr/, en/)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro, Footer.astro, LanguageSwitcher.astro
│   │   ├── StickyCTA.astro, Button.astro, Section.astro
│   │   ├── TechCard.astro, ReviewCard.astro, FaqItem.astro
│   │   └── BranchCard.astro, Icon.astro
│   ├── pages/
│   │   ├── index.astro, lazer-epilasyon.astro, falcon-4-pro.astro
│   │   ├── merkezlerimiz.astro, merkezlerimiz/[slug].astro
│   │   ├── yorumlar.astro, sss.astro, iletisim.astro
│   │   └── en/  (aynı yapı)
│   ├── styles/global.css
│   └── scripts/ (scroll-reveal.ts)
└── public/ (görseller, favicon, robots.txt)
```

---

## Riskler & Notlar

- **İçerik çevirisi:** EN metinleri kullanıcı onayıyla (veya AI draft) üretilecek; tıbbi terimlerde doğruluk kritik.
- **Gerçek görseller:** Başlangıçta placeholder; marka gerçek foto/klinik varlıkları sonradan eklenmeli.
- **Form işlemi:** İlk sürümde istemci-side validation + mailto/webhook placeholder; sunucu işlemi ayrı milestone.
- **Hosting:** Netlify/Vercel kararı kullanıcıyla; statik çıktı her ikisine de uygun.
- **GH Token:** Shell ortamındaki token `unset` edilmeli / rotate önerilir (güvenlik).

---

## Tahmini Sıra

| Milestone | Kapsam |
|-----------|--------|
| M0 | Kurulum + repo |
| M1 | Tasarım sistemi + layout |
| M2 | Content collections |
| M3 | 14 route (sayfalar) |
| M4 | Görsel/hareket cila |
| M5 | SEO/schema/a11y |
| M6 | Build + doğrulama |
