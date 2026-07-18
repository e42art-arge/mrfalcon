# Mr. Falcon Beauty — Tasarım Dili Tutarlılığı & Section Birleştirme Planı

> Tarih: 2026-07-18 · Durum: Onay bekliyor (uygulama yapılmadı)

## 0. Bağlam & Prensip

- **Mevcut palet KORUNUR** — mavi/klinik kimlik: `primary #007BFF`, `navy #17468A`, `sky #61B1F5`, `sky-light #E9F2F9`, `whatsapp #55cd6c`.
- UI/UX Pro Max aracı "Soft UI / pink-lavanta" paleti önerdi; mevcut markayla çeliştiği için **reddedildi**. Sadece *tutarlılık bozuklukları* giderilir, palet değişmez.
- Hedef: (a) görsel dil birliği, (b) tekrar eden section'ların paylaşılan bileşen / veri modülüne çıkarılması.

## 1. Tasarım Dili Tutarlılığı

### 1.1 Tanımsız / sürüklenmiş renkler (HATA — düşük risk, yüksek görsel kazanç)

| Sorun | Yer | Düzeltme |
|-------|-----|----------|
| `from-beige` — palet dışı, tanımsız token | `index.astro:131`, `en/index.astro:131` (hero bg) | `from-sky-light` |
| `from-ink` — tanımsız token (about overlay + video caption) | `index.astro:328,565`, `en/index.astro:328,565` | `from-navy` |
| `#0E7490` cyan — eski palet artığı (hero dalgası + pulse-glow) | `index.astro:287-288`, `en/index.astro:287-288`, `global.css:45,48` | `primary` / `navy` |
| `bg-green-500 hover:bg-green-600` — ham Tailwind yeşili | `BaseLayout.astro:57` (WhatsApp widget) | `bg-whatsapp hover:bg-[#46b85c]` (Footer ile uyumlu) |

### 1.2 Token çift kaynağı (bakım riski)

- `tailwind.config.mjs` ve `global.css @theme` **aynı renkleri iki yerde** tanımlıyor.
- `fontSize` (display-xl…), `letterSpacing`, `spacing` (section-*), `boxShadow` (surface/card…), `borderRadius`, `transitionDuration/Timing` token'ları **sadece config'te**.
- **Öneri:** Tüm token'ları `global.css @theme`'e taşı (Tailwind v4 native kaynak), `tailwind.config.mjs`'i sil. Tek doğruluk kaynağı.
- **Risk:** build sonrası tipografi/spacing token kullanımlarının bozulmaması için `npm run build` ile doğrulama şart.

### 1.3 Emoji ikonlar (düşük öncelik — plan dışı, opsiyonel)

- Bölüm kartlarında emoji (🎯 🤖 ❄️ ☀️) ikon olarak kullanılıyor; UI/UX standardı SVG (Lucide/Heroicons).
- Büyük değişiklik → bu planda **kapsam dışı**; yalnızca not. İstenirse ayrı görev.

## 2. Tekrar Eden Section'ların Birleştirilmesi

Öncelik P0 (veri tutarsızlığı) → P1 (veri modülleri) → P2 (bileşenler).

### P0 — Tek veri kaynağına indir (hatalı/kopya içeriği giderir)

1. **Şube adresleri:** `index.astro` / `en/index.astro` inline `clinics` array + hardcoded `<select>` option → `getCollection("branches")` (iletisim/merkezlerimiz zaten kullanıyor).
   - *Kritik yan etki:* `index.astro` contacts bölümü her iki şubeye **Halkalı numarasını** (`+90 506 371 70 71`) gösteriyor; `branches` collection Şişli=`+90 552 593 98 90`. Bu sapma düzelir.
2. **Homepage `faqs`:** inline 9 soru → `getCollection("faq")` (`sss.astro` gibi).
3. **`tech` collection ölü:** 5 dosya hiçbir yerde import edilmiyor (inline array'ler kullanılıyor). Ya `advantages`/`features` ile doldur-yok-et ya sil.

### P1 — Yeni `src/data/*.ts` modülleri (4 kopya → 1)

| Modül | İçerik | Şu an | tr/en |
|-------|--------|-------|-------|
| `processSteps.ts` | 7 adım (2 varyant: home / lazer) | `index`, `lazer-epilasyon` + EN | ✓ |
| `whyUs.ts` | Lazer "Neden Biz" 4 kart | `lazer-epilasyon` + EN | ✓ |
| `whyUsItems.ts` / `advantages.ts` | Home "Neden Biz" 6 kart | `index` + EN | ✓ |
| `falconFeatures.ts` | Falcon 4 Pro 6 kart | `falcon-4-pro` + EN | ✓ |
| `trustSignals.ts` | Hero sticky bar + lazer hero rozetleri | `index`, `lazer-epilasyon` + EN | ✓ |
| `siteMetrics.ts` | aboutMetrics 4 istatistik | `index` + EN | ✓ |
| `falconTechSpecs.ts` | Teknik özellik dl 8 satır | `index` + EN | ✓ |
| `clinicGallery.ts` | galleryImages + clinicImages birleşik | `index`, `merkezlerimiz` + EN | — |
| `videos.ts` | satisfaction/faq/press video listeleri | `index` + EN | — |
| `mediaNews.ts` | Basın 4 kart | `falcon-4-pro` + EN | ✓ |

### P2 — Yeni `src/components/*.astro` (markup tekrarı → 1)

| Bileşen | Birleştirdiği | Not |
|---------|---------------|-----|
| `FaqAccordion.astro` | 3 ayrı FAQ implementasyonu (sss + en/faq + index) | 3 script → 1; GSAP+simple toggle birleştir |
| `ReviewCard.astro` / `ReviewGrid.astro` | 4 yorum kart varyantı (home 3/9, lazer 4, yorumlar tam) | yıldız render + layout tek yere |
| `ClinicCard.astro` (+ `BranchMap.astro`) | Şube kartları (iletisim/merkezlerimiz + EN) | `branches`'tan beslenir |
| `ContactForm.astro` | 3 benzer form (index/iletisim/en/contact) | endpoint + sitekey + locale prop |
| `BookingCta.astro` | "Hazır mısınız?" CTA (6+ sayfa) | adres snippet'i `branches`'tan |
| `StatGrid.astro` | İstatistik grid (4 yer) | `siteMetrics`/`reviewStats` ile |

**Zaten paylaşımlı (dokunulmaz):** `Header`, `Footer`, `VideoGallery`, `PressSlider`, `data/reviews.ts`.

## 3. Kapsam Seçenekleri (onay)

- **A) Sadece 1.1** — renk düzeltmeleri (hızlı, risksiz, en yüksek görsel kazanç)
- **B) 1.1 + 1.2** — renk + token birleştirme
- **C) A + P0** — renk + veri tek kaynağı (telefon sapması düzelir)
- **D) Tam plan** — C + P1 + P2 (büyük refactor: ~20 dosya)

## 4. Doğrulama

- `npm run build` → 14 sayfa hatasız.
- `grep` ile `beige`/`ink`/`0E7490`/`green-500` kalmamalı.
- Şube telefon numaraları `branches` ile tutarlı.
- Görsel regresyon: dist'te renk/section çakışması yok.
