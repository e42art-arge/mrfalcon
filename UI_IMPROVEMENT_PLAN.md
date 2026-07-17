# UI İyileştirme Planı — Mr. Falcon Beauty (2026-07-17)

**Referans:** `ui-ux-audit.md` + canlı site durumu audit

---

## ✅ DÜZELTİLMİŞ (Kritik & Yüksek Öncelik)

| Kod | Sorun | Durum | Not |
|-----|-------|-------|-----|
| C1 | Form ↔ API uyumsuzluğu | **FIXED** | contact.php yeniden yazıldı, Astro alanları kabul ediyor |
| C2 | Turnstile CAPTCHA eksik | **FIXED** | Widget eklendi, fetch submit handler eklendi |
| C3 | Mobile hamburger menü | **FIXED** | Header.astro'da çalışıyor |
| H2 | Footer HTML geçersizliği | **FIXED** | `<li>` artık `<ul>` içinde |
| H3 | Footer logo text | **FIXED** | Sadece logo img kalmış |
| H4 | "Seçmelik Fototermoliz" | **FIXED** | "Seçici" olarak düzeltildi |
| H5 | "Halıkalı" yazım hatası (src/) | **FIXED** | src/ içinde düzeltildi |
| H6 | "Brasilien" Almanca terim | **FIXED** | src/ içinde yok |
| H7 | İstatistik tutarsızlığı | **FIXED** | Hepsi "15.000+" |
| M2 | KVKK aydınlatma linki | **FIXED** | iletisim.astro'da mevcut |
| M4 | Google Fonts display=swap | **FIXED** | BaseLayout.astro'da aktif |

---

## ❌ KALAN SORUNLAR (Öncelik Sırası)

### 🔴 KRİTİK — Görevciliğe Etki Eden

| # | Sorun | Dosya | Fix |
|---|-------|-------|-----|
| 1 | **OG görselinde "Halıkalı" yazım hatası** | `public/og-default.svg` satır 5 | SVG metnini "Halkalı" yap, yeniden build et |
| 2 | **Eksik görseller** (clinic5-8, hero, about, gallery, videos) | `public/images/` klasör yapısı yok | **YAKLAŞIM A:** Referanslı kodları mevcut resimlerle eşleştir (hızlı) **YAKLAŞIM B:** Eksik dosyaları ekle (tam) — bkz. alt plan |

### 🟠 YÜKSEK — Dönüşüm/Kullanıcı Deneyimi

| # | Sorun | Fix |
|---|-------|-----|
| 3 | **Floating WhatsApp butonu yok** | Sabit alt-sağ köşe floating widget ekle (header/footer hariç her sayfada görünür) |
| 4 | **Sitemap doğrulama** | Build sonrası `dist/sitemap-0.xml` içeriğini kontrol et (EN sayfaları dahil) |

### 🟡 ORTA — İyileştirme

| # | Sorun | Fix |
|---|-------|-----|
| 5 | **EN butonu tooltip-only** | Label/ikon ile "Dil: Türkçe / English" daha açık hale getir |
| 6 | **LP'den eksik bölümler** | Sticky WhatsApp, "İşlem Süreci" tablo, "Basında Biz" (sadece falcon-4-pro'da var) |
| 7 | **Video galerisi** | Eksik dosyalar → ya bölümü kaldır ya placeholder ekle |
| 8 | **Özel OG görseli** | Marka rengi/ font ile özelleştir (mevcut SVG temel) |

### 🟢 DÜŞÜK — İnce Ayar

| # | Sorun | Fix |
|---|-------|-----|
| 9 | SSS accordion → Astro island/partial hydration | `client:visible` ile hydrate et |
| 10 | Emoji ikonlar → SVG/icon font | Cross-platform tutarlılık |

---

## 🎨 A — PIXEL PERFECT TASARIM İYİLEŞTİRMELERİ

**Amaç:** Her pikselin yerli yerinde olduğu, tipografihiyerarşisi, whitespace ve alignment konusunda titizlikle çalışılmış bir tasarım.

### A1. Tipografi Hiyerarşisi & Ölçek Sistemi

| Sorun | Mevcut | Hedef |
|-------|--------|-------|
| Başlık boyutları tutarsız | `text-4xl md:text-6xl lg:text-7xl` (hero), `text-3xl md:text-4xl lg:text-5xl` (section) | Rhythm: `clamp(2rem, 5vw, 4.5rem)` hero, `clamp(1.75rem, 4vw, 3rem)` section |
| Body text line-height | Bazı yerlerde `leading-relaxed`, bazılarında `leading-normal` | Tek standard: body `leading-relaxed`, captions `leading-normal` |
| Font weight geçişleri | `font-semibold` her yerde, `font-bold` nadiren | Strict scale: `400` body, `500` nav/labels, `600` subheadings, `700` headings |
| Letter-spacing | `tracking-wide`, `tracking-[0.2em]` karışık | Section labels: `tracking-[0.15em]`, badge: `tracking-wide` |

**Fix:** `tailwind.config.mjs`'de `fontSize` custom scale + `letterSpacing` token'ları tanımla.

### A2. Spacing & Rhythm (4px Grid)

| Sorun | Hedef |
|-------|-------|
| Section padding: `py-20` her yerde → monoton | Alternating rhythm: `py-24` / `py-20` (80px / 64px) |
| Card padding: `p-6` her yerde | `p-6` mobile, `p-8` desktop |
| Grid gap: `gap-6`, `gap-8`, `gap-12` karışık | Tight grid: `gap-4 md:gap-6 lg:gap-8` (16/24/32px) |
| Container width: `max-w-6xl` her yerde | `max-w-6xl` (1152px) doğru, ama hero'da `max-w-7xl` olabilir |
| Margin between heading → content | `mb-6` veya `mb-8` → standard: `mb-8` (heading sonu) |

**Fix:** `components/Section.astro` gibi bir wrapper ile section spacing'leri merkezile.

### A3. Kartlar & Yüzeyler

| Sorun | Hedef |
|-------|-------|
| `rounded-2xl` her kartta → tek tip | Doğru: `rounded-2xl` kartlar, `rounded-3xl` hero image, `rounded-full` butonlar |
| Shadow range | Sadece `shadow-sm` ve `shadow-2xl` var → intermediate eksik | Shadow scale: `shadow-sm` (subtle), `shadow-md` (card hover), `shadow-lg` (featured), `shadow-2xl` (hero) |
| Border: `border border-black/5` | Bu doğru, ama hover'da `hover:border-primary/30` → `hover:border-primary/20` (daha soft) |
| Background alternation | `bg-white` → `bg-sky-light/30` → `bg-white` → `bg-navy` iyi ama sonraki section'a geçiş çok keskin | Smooth gradient transition: section sonu + section başı之間 gradient overlay |

### A4. Buton Sistemi

| Variant | Stil | Kullanım |
|---------|------|----------|
| **Primary** | `bg-navy text-white hover:bg-primary rounded-full px-8 py-3 font-semibold` | CTA butonlar |
| **Secondary** | `border-2 border-black/15 text-black hover:border-primary hover:text-primary rounded-full px-8 py-3 font-semibold` | Secondary CTA |
| **Small** | `bg-navy text-white hover:bg-primary rounded-full px-5 py-2.5 text-sm font-semibold` | Mobile CTA, form submit |
| **Ghost** | `text-primary hover:text-black transition-colors font-semibold` | Text link CTA (→ arrow) |

**Fix:** `Button.astro` component oluştur, variant prop ile.

### A5. Responsive Breakpoint Detayı

| Breakpoint | Sorun | Hedef |
|------------|-------|-------|
| `< 640px` (sm) | `px-5` mobile padding yeterli | ✓ |
| `640-768px` (sm→md) | Grid geçişi çok ani | 1→2 col grid'i burada başlat |
| `768-1024px` (md→lg) | 2→3 col grid geçişi | ✓ |
| `> 1024px` (lg) | `max-w-6xl` centered → margin auto | ✓ |
| Footer | 3 col grid mobile'da bozuluyor | `grid-cols-1 md:grid-cols-3` doğru |

### A6. Hero Section Premium Feel

| Mevcut | Hedef |
|--------|-------|
| Basit gradient background `from-beige to-white` | Parallax gradient + subtle noise texture overlay |
| Trust signals bar `sticky top-16` | Floating pill badge, glassmorphism (`backdrop-blur-xl bg-white/70`) |
| CTA butonları yan yana | Primary CTA bigger + shadow, secondary smaller |
| Doctor image basit | Subtle scale-in animation on scroll |

---

## 🎬 B — GSAP + LENIS ANİMASYON PLANI

**Amaç:** Premium, akıcı, native-feeling bir deneyim. Scroll-driven animasyonlar ve smooth scroll ile sitenin "premium" hissettirmesini sağlamak.

### B1. Lenis Smooth Scroll

```astro
<!-- BaseLayout.astro <head> içine -->
<script>
  import Lenis from '@studio-freight/lenis';
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
</script>
```

**Neden:** Scroll hissiyatı premium sitelerin ayırt edici özelliği. Smooth scroll, "parlak" bir deneyim yaratır.

**Risk:** SEO ile uyumlu (Lenis JavaScript tabanlı, SSR'ı etkilemez). Performans için `prefers-reduced-motion` kontrolü ekle.

### B2. GSAP ScrollTrigger Animasyonları

#### Sayfa Yüklenme (Page Load)

| Animasyon | Hedef Element | Etki |
|-----------|---------------|------|
| **Hero FadeUp** | Hero başlık + açıklama | `opacity: 0→1`, `y: 40→0`, `duration: 0.8`, `ease: power3.out` |
| **Hero Image Scale** | Hero görsel | `scale: 1.05→1`, `duration: 1.2`, `ease: power2.out` |
| **Trust Bar SlideIn** | Trust signals bar | `y: -20→0`, `duration: 0.6`, `delay: 0.3` |
| **Nav FadeDown** | Header | `y: -30→0`, `opacity: 0→1`, `duration: 0.5` |

#### Scroll-Driven (ScrollTrigger)

| Animasyon | Hedef | Trigger | Etki |
|-----------|-------|---------|------|
| **Section FadeUp** | Tüm section başlıkları | `start: "top 85%"` | `opacity: 0→1`, `y: 60→0`, `duration: 0.8` |
| **Card Stagger** | Kart grid'leri (özellikle advntg/process) | `start: "top 80%"` | Her kart `y: 40→0`, stagger `0.1s` |
| **Counter Animate** | İstatistik sayısı (15.000+, 4.9/5) | `start: "top 80%"` | `gsap.fromTo` ile `0→target` sayacı |
| **Parallax Image** | Hero görsel, about görseli | Scroll ile `y: -50→0` | Subtle parallax |
| **Progress Bar** | Process step'leri (1→7) | Her step `start: "top center"` | Width animasyonu ile adım ilerleme |
| **Footer SlideUp** | Footer section | `start: "top 90%"` | `y: 60→0`, `duration: 0.6` |

#### Hover/Interaction

| Animasyon | Hedef | Etki |
|-----------|-------|------|
| **Buton Scale** | Primary butonlar | `scale: 1.02` on hover |
| **Card Lift** | Kart hover | `y: -4`, `shadow-md → shadow-lg` transition |
| **Image Zoom** | Gallery images | `scale: 1.05` on hover, `overflow: hidden` |

### B3. Astro + GSAP Entegrasyonu

```
GSAP'yi Astro'da kullanma yöntemleri:

1. PUBLIC SCRIPT (en basit):
   - BaseLayout.astro'da <script> ile全局 GSAP setup
   - ScrollTrigger plugin'i register
   - Her section'a data attributes (data-animate="fadeUp") ile tetikleme

2. COMPONENT-LEVEL (daha kontrollü):
   - Her .astro dosyasında kendi <script> bloğu
   - Specific element'lere GSAP timeline'lar
   - Astro lifecycle'a uyumlu (DOMContentLoaded)
```

**Önerilen:** Seçenek 1 (Public script). Neden: Tek script dosyası, cache'lenir, her sayfada çalışır.

### B4. Performans Optimizasyonu

| Tedbir | Detay |
|--------|-------|
| **Lazy init** | GSAP'i sadece `IntersectionObserver` tetiklediğinde yükle |
| **prefers-reduced-motion** | `window.matchMedia('(prefers-reduced-motion: reduce)')` → animasyonları atla |
| **GPU acceleration** | `will-change: transform` sadece aktif animasyonlarda |
| **Bundle split** | GSAP core (28KB gzip) + ScrollTrigger (12KB gzip) → ayrı chunk |
| **Font display** | `font-display: swap` zaten aktif →CLS minimize |
| **Critical CSS** | Above-the-fold CSS inline, geri kalanı async |

### B5. Sayfalara Göre Animasyon Haritası

| Sayfa | Özel Animasyonlar |
|-------|-------------------|
| **Ana Sayfa** | Hero parallax, trust bar slide-in, stats counter, process timeline progression, gallery masonry reveal |
| **Lazer Epilasyon** | Step-by-step reveal (1→7), before/after transition |
| **Falcon 4 Pro** | Tech specs table fade-in, device image parallax |
| **Merkezlerimiz** | Map pins appear, clinic cards stagger |
| **Yorumlar** | Review cards masonry/stagger, star rating animate |
| **SSS** | Accordion expand/collapse (GSAP-powered) |
| **İletişim** | Form fields stagger-in, map fade |

---

## 📋 DETAYLI FIX PLANI (Yürütme Sırası)

### AŞAMA 1 — Bugün (Critical)

```bash
# 1. OG görseli düzelt
# public/og-default.svg içindeki "Halıkalı" → "Halkalı"
sed -i 's/Halıkalı/Halkalı/g' public/og-default.svg

# 2. Eksik görsel referanslarını temizle (Hızlı yaklaşım A)
# - merkezlerimiz.astro: clinic5-8 referanslarını kaldır, sadece 4 clinic fotoğrafı bırak
# - index.astro: hero/falcon-hero.webp → mevcut sliderdoctor.png veya clinic1.jpg ile değiştir
# - index.astro: about/clinic-interior.webp → clinic1.jpg
# - index.astro: gallery/* → clinic1-4.jpg'yi tekrar kullan
# - falcon-4-pro.astro: tech/falcon-device-main.webp → falcons.png
# - falcon-4-pro.astro: shorts*, gallery/* → falcons.png / clinic1-4.jpg
# - Video testimonials bölümü: poster ve video referanslarını kaldır (placeholder yaz)

# 3. Floating WhatsApp widget ekle
# BaseLayout.astro <body> içine (slot öncesi/sonrası):
# <a href="https://wa.me/..." class="fixed bottom-6 right-6 z-50 ...">...</a>

# 4. Build & deploy
npm run build && git add -A && git commit -m "fix(ui): OG typo, missing image refs, add WhatsApp float" && git push
```

### AŞAMA 2 — Yarın (High)

```bash
# 5. Sitemap doğrula
# Build sonrası dist/sitemap-0.xml içeriğini kontrol et
# EN sayfaları (en/laser-hair-removal, en/falcon-4-pro, vb.) dahil mi?

# 6. EN butonu iyileştir
# Header.astro: "EN"/"TR" butonuna aria-label + title + ikon (🌐) ekle

# 7. "İşlem Süreci" tablosunu index.astro ya da lazer-epilasyon.astro'ya ekle (LP referansından)
# 8. "Basında Biz" bölümü → index.astro hero altına veya ayrı section olarak
```

### AŞAMA 3 — Hafta İçi (Medium)

```bash
# 9. Video gallery: ya kaldır ya dosya sağla
# 10. Özel OG görseli tasarla (marka renkleri: #17468A, #61B1F5, #E9F2F9)
# 11. SSS accordion → Astro island (<script client:visible>)
# 12. Emoji → SVG icon set (lucide/react-icons vs.)
```

---

## 🎯 BAŞARI KRİTERLERİ

| Metrik | Hedef |
|--------|-------|
| Tüm sayfalar 200 OK | ✅ Zaten sağlanıyor |
| Form submit çalışıyor | ✅ Zaten sağlanıyor |
| Mobil nav çalışıyor | ✅ Zaten sağlanıyor |
| OG görseli doğru yazım | ❌ Düzeltilecek |
| Eksik görsel 404 yok | ❌ Düzeltilecek (ref temizliği) |
| Floating WhatsApp görünür | ❌ Eklenecek |
| Sitemap EN sayfaları dahil | ❌ Doğrulanacak |
| Lighthouse Performance ≥ 90 | Hedef |
| Lighthouse Accessibility ≥ 95 | Hedef |

---

## 📌 NOTLAR

- **Eksik görseller için tercih:** Yaklaşım A (kod referanslarını mevcut 4 clinic fotoğrafı + falcons.png + sliderdoctor.png ile eşleştir). Dosya beklemek deploy geciktirir.
- **KVKK aydınlatma sayfası** (`/kvkk-aydinlatma-metni`) henüz yok — ayrı bir sayfa/route eklenmeli veya harici link verilmeli.
- **Turnstile sitekey** iki formda farklı mı? `iletisim.astro` ve `index.astro` widget'larının `data-sitekey` değerlerini karşılaştır.
- **Analytics/Tracking** (GA4, Clarity, Meta Pixel) henüz eklenmemiş — LP referansında varsa ekle.

---

*Plan oluşturuldu: 2026-07-17*