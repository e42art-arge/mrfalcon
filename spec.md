# Mr. Falcon Beauty — Web Sitesi Spesifikasyonu (SPEC)

> **Marka:** Mr. Falcon Beauty
> **Mevcut site:** https://lp.mrfalconbeauty.com/ (tek sayfa, TR-only landing page)
> **Hedef:** Astro ile çok sayfalı, uluslararası marka standardında, görsel olarak etkileyici ("havalı") bir web sitesi
> **Tarih:** 2026-06-18
> **Durum:** Taslak — onay sonrası plan.md ile implementasyona geçilecek

---

## 1. Stratejik Bağlam & Hedefler

### 1.1 Mevcut Durum Analizi (lp.mrfalconbeauty.com)
Tek sayfalık bir lazer epilasyon landing page. İçerik blokları:

| Blok | İçerik |
|------|--------|
| Hero | Lazer epilasyon vaadi, "Randevu Al" + WhatsApp CTA |
| Video referanslar | Müşteri video yorumları |
| Falcon 4 Pro | 4 dalga boyu (755/808/940/1064nm), AI, -20°C soğutma, SHR 20 atım/sn, UVC sterilizasyon |
| Basın | Beyaz TV, CNN Türk, TLC görünümleri |
| Neden biz | Farklılaştırıcı değerler |
| 7 adımlık süreç | Tedavi akışı |
| Yorumlar | 9 doğrulanmış (yorum) müşteri yorumu |
| SSS | 8 soru |
| Şubeler & İletişim | Şişli + Halkalı adres/iletişim |
| Alt menü | Telif, sosyal |

**Şubeler:**
- **Şişli:** Büyükdere Cd. No:33-35 Kat:1, Şişli / İstanbul
- **Halkalı:** Hürriyet Cd. No:15/1, Halkalı / İstanbul

### 1.2 Uluslararası Marka Standardına Geçişteki Boşluklar (Gap Analysis)
- ❌ Çok dilli yok (sadece TR) → i18n gerekiyor (TR + EN minimum)
- ❌ Tek sayfa → çok sayfalı bilgi mimarisi gerekli
- ❌ Premium görsel sistem zayıf → marka kimliği, tipografi, renk, hareket dili tanımlanmalı
- ❌ Teknik SEO/EEAT sinyalleri eksik → YMYL (sağlık) içerik için güven işaretleri şart
- ❌ Erişilebilirlik (a11y) ve performans optimizasyonu belirsiz
- ❌ Yerel SEO / şube bazlı landing sayfaları yok

### 1.3 Dönüşüm Hedefleri (Conversion Goals)
- Birincil: **Randevu talebi** (form / telefon / WhatsApp)
- İkincil: **Güven inşası** (teknoloji, basın, yorumlar, uzmanlık)
- Hedef dönüşüm oranı: ziyaretçi → lead **%5–10** (referans: websitesforclinics)
- Trafiğin **%70+** mobil → mobile-first zorunlu

---

## 2. Bilgi Mimarisi (Information Architecture)

```
/
├── /tr (varsayılan dil kökü, / olarak da servis edilebilir)
│   ├── Ana Sayfa (Home)
│   ├── Lazer Epilasyon (Treatment — pillar sayfa)
│   ├── Falcon 4 Pro (Teknoloji)
│   ├── Merkezlerimiz (Şubeler — lokasyon landing)
│   │   ├── sisli
│   │   └── halkali
│   ├── Yorumlar (Reviews / Results)
│   ├── SSS (FAQ)
│   └── İletişim / Randevu (Contact & Booking)
└── /en
    └── (aynı yapı, İngilizce)
```

**Not:** Astro i18n `defaultLocale: "tr"`, `locales: ["tr","en"]`, `prefixDefaultLocale: false` ile TR kök dizinde, EN `/en` altında servis edilir.

---

## 3. Sayfa Şablonları (Page Templates)

### 3.1 Ana Sayfa (Home)
- Premium hero (video/görsel + başlık + çift CTA)
- Falcon 4 Pro teknoloji özeti (ikonlu kartlar)
- "Neden Mr. Falcon" (farklılaştırıcı 3–4 değer)
- Basın logoları (Beyaz TV / CNN Türk / TLC)
- 7 adımlık süreç özeti
- Öne çıkan yorumlar (2–3)
- Şubelere hızlı erişim
- SSS'ye bağlantı
- Sticky CTA (Randevu / WhatsApp)

### 3.2 Lazer Epilasyon (Treatment — Pillar)
- Bilimsel açıklama (dalga boyları, cilt tipi uyumu)
- Uygulama süreci & sonuç zaman çizelgesi
- İşlem bölgeleri (bacak, koltuk altı, bikini vb.)
- İdeal aday & cilt tipi değerlendirmesi
- Fiyat yaklaşımı (değer odaklı, "yatırım" dili; "kalıcı" yerine "uzun vadeli azalma")
- CTA: Ücretsiz konsültasyon / Patch test

### 3.3 Falcon 4 Pro (Teknoloji)
- 4 dalga boyu detaylı kartları (755nm Alexandrite / 808nm Diode / 940nm / 1064nm Nd:YAG)
- AI kontrol sistemi
- -20°C sapphire soğutma
- SHR 20 atım/sn (acısız hızlı seans)
- UVC sterilizasyon (hijyen güven işareti)
- Güvenlik sertifikaları / FDA 510(k) referansı

### 3.4 Merkezlerimiz + Şube Landing
- Harita gömme (Google Maps)
- Adres, telefon, çalışma saatleri, ulaşım
- Şube fotoğrafları (temiz, premium ortam)
- LocalBusiness / MedicalClinic schema
- Şubeye özel CTA

### 3.5 Yorumlar (Reviews & Results)
- Doğrulanmış 9 yorum (kategoriye göre: cilt tipi / bölge)
- Before-after galeri (filtresiz, gerçekçi, çeşitli cilt tipleri)
- Video referanslar
- "Güvende hissettim" / "uzmanlık" vurgulu alıntılar

### 3.6 SSS (FAQ)
- 8 mevcut soru (TR/EN)
- FAQ schema (rich result için)
- Kategoriye göre gruplama

### 3.7 İletişim / Randevu (Contact & Booking)
- Randevu formu (isim, telefon, şube, bölge, tarih tercihi)
- WhatsApp hızlı bağlantı
- Telefon CTA
- Google Maps
- Form → **RedMail** e-posta API'si (sunucu tarafı, bkz. Bölüm 13)

### 13. E-posta Gönderimi — RedMail API

İletişim formu, sunucu tarafında **RedMail** (https://redmail.e42art.com) üzerinden e-posta gönderir. OpenLiteSpeed paylaşımlı hosting özel portları engellediği için, form backend'i aynı domain üzerinde **PHP + .htaccess** ile servis edilir (Node `:8787` portu erişilemez).

**Endpoint:**
```
POST https://redmail.e42art.com//api/v1/send
```

**Headers:**
- `Content-Type: application/json`
- `X-API-KEY: <secret>`  (GitHub Actions secret: `REDMAIL_API_KEY`)

**Request body (JSON):**
| Alan | Tip | Açıklama |
|------|-----|----------|
| `to` | string | Alıcı e-posta (ör. `info@mrfalconbeauty.com`) |
| `cc` | array[string] | CC alıcıları |
| `bcc` | array[string] | BCC alıcıları (opsiyonel) |
| `reply_to` | string | Yanıt adresi = form gönderenin e-postası |
| `subject` | string | Konu |
| `body` | string (HTML) | E-posta gövdesi |
| `attachments` | array[{name, content}] | Opsiyonel base64 ekler |

**Örnek istek:**
```bash
curl -X POST https://redmail.e42art.com//api/v1/send \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: $REDMAIL_API_KEY" \
  -d '{
    "to": "user@example.com",
    "cc": ["manager@example.com"],
    "reply_to": "support@example.com",
    "subject": "Hello from RedMail",
    "body": "<h1>It works!</h1>"
  }'
```

**Deploy:** `server/config.php` (git-ignored) GitHub Actions tarafından sunucuda `REDMAIL_*` secret'larıyla yazılır. `server/contact.php` POST `/api/contact`'i yakalar, doğrular, HTML gövde oluşturup RedMail'e iletir. `public/.htaccess` bu route'u `server/contact.php`'ye yönlendirir.

---

## 4. Görsel Sistem (Visual Design System)

### 4.1 Marka Kimliği
- **İsim:** Mr. Falcon Beauty → şahin (falcon) motifi, premium/asılı (sleek) his
- **Ton:** Lüks + klinik güven + modern teknoloji
- **Referans estetik:** high-end med spa siteleri (Studio MD, Blue Palm, Skin Verse) — bol beyaz alan, ince tipografi, büyük görseller

### 4.2 Renk Paleti (öneri)
- **Base:** bembeyaz / açık gri (klinik temizlik)
- **Primary:** derin gece mavisi veya oniks siyah (asılılık)
- **Accent:** altın / şampanya (luks) VEYA soğuk camgöbeği (teknoloji/soğutma)
- **Neutral:** sıcak bej (cilt/insan sıcaklığı)

### 4.3 Tipografi
- **Display/Heading:** Modern serif veya geometrik sans (ör. Playfair Display / Space Grotesk)
- **Body:** okunaklı sans (Inter / Satoshi)
- **Ölçek:** büyük hero başlıkları, net hiyerarşi

### 4.4 Hareket & Etkileşim (Motion)
- Astro **View Transitions** (sayfa geçişlerinde yumuşak animasyon)
- Scroll-reveal (IntersectionObserver ile hafif fade/slide)
- Hover micro-interactions (kart yükselme, buton parıltı)
- Reduced-motion desteği (prefers-reduced-motion)

### 4.5 Görsel Varlıklar
- Yüksek kaliteli klinik/insan fotoğrafları (gerçek ekip & ortam)
- Teknoloji infografikleri (dalga boyu diyagramı)
- İkon seti (inline SVG, hafif)

---

## 5. Teknik Yığın (Tech Stack)

| Katman | Tercih |
|--------|--------|
| Framework | **Astro** (MPA, sıfır JS varsayılan) |
| Styling | Astro + scoped CSS / Tailwind (karar plan'da) |
| i18n | Astro built-in i18n routing + content collections |
| Content | Content Collections (Markdown/MDX şema doğrulamalı) |
| Animasyon | View Transitions API + küçük vanilla JS |
| Form | Statik form → sonradan sunucu işlemi (webhook/e-posta) |
| Hosting | Static (Netlify/Vercel) — henüz karar verilmedi |
| Analytics | (sonradan) |

---

## 6. Çok Dillilik (i18n)

- `astro.config.mjs` → `i18n: { defaultLocale: "tr", locales: ["tr","en"], prefixDefaultLocale: false }`
- İçerik: Content Collections içinde `tr` / `en` klasörleri
- Dil değiştirici (header'da), mevcut route'ı koruyarak dil atlar
- `hreflang` etiketleri (SEO için)
- `lang` attribute dinamik

---

## 7. İçerik Modeli (Content Collections Şeması)

```ts
// src/content/config.ts (özet)
collections: {
  pages:    { tr: ..., en: ... }      // statik sayfa metinleri
  reviews:  { type: 'data', schema }  // yorumlar (isim, bölge, metin, kategori)
  faq:      { type: 'data', schema }  // soru/cevap
  branches: { type: 'data', schema }  // şube verisi (adres, tel, saat, harita)
  treatments:{ type: 'content' }      // lazer epilasyon içerik blog-benzeri
}
```

---

## 8. SEO & EEAT (YMYL Sağlık İçeriği)

- **YMYL** kategorisi → güven sinyalleri zorunlu
- LocalBusiness + MedicalClinic + FAQPage + Review schema (JSON-LD)
- Open Graph / Twitter Card
- Her sayfa: title, description, canonical, hreflang
- Yerel SEO: şube bazlı landing + Google Maps + schema
- "Uzmanlık" vurgusu: ekip foto, sertifika, cilt tipi eğitimi, teknoloji şeffaflığı
- Hız: statik Astro, lazy-load görseller, minimal JS

---

## 9. Erişilebilirlik (a11y)

- Semantik HTML (header/nav/main/section/footer)
- Renk kontrastı WCAG AA
- Klavye ile tam gezinme
- Alt metinleri, ARIA etiketleri
- Reduced-motion desteği
- Formlarda label + hata mesajları

---

## 10. Performans Hedefleri

- Lighthouse Performance ≥ 95 (mobil)
- TBT düşük, CLS ≈ 0
- Statik HTML, kritik CSS inline
- Görseller modern format (AVIF/WebP) + boyutlandırma

---

## 11. Kabul Kriterleri (Acceptance Criteria)

- [ ] TR + EN dil desteği, dil değiştirici çalışıyor
- [ ] 7 sayfa şablonu çok dilli mevcut
- [ ] Mevcut tüm içerik (tech, basın, 9 yorum, 8 SSS, 2 şube) aktarıldı
- [ ] Randevu/WhatsApp CTA her sayfada erişilebilir
- [ ] Schema markup (LocalBusiness, FAQ, Review) doğrulu
- [ ] Lighthouse mobilde ≥ 95
- [ ] WCAG AA kontrast + klavye gezinme

---

## 12. Kapsam Dışı (Out of Scope — ilk sürüm)

- Canlı online rezervasyon entegrasyonu (şimdilik form/WhatsApp)
- Ödeme / e-ticaret
- Blog / haber bölümü (sonraya)
- CMS entegrasyonu (içerik Markdown ile)
- A/B test altyapısı
