# LP.mrfalconbeauty.com → Project Asset Sync Plan

**Date:** 2026-07-17  
**Source:** `https://lp.mrfalconbeauty.com/` (full HTML scrape)

---

## 📊 Asset Comparison

### ✅ **Already in Project** (14 files)
| File | Status |
|------|--------|
| `c1.jpg` - `c4.jpg` | ✅ |
| `clinic1.jpg` - `clinic4.jpg` | ✅ |
| `contactbg.jpg` | ✅ |
| `falcons.png` | ✅ |
| `homeabout.png` | ✅ |
| `logo.png` | ✅ |
| `sliderdoctor.png` | ✅ |
| `favicon.svg` | ✅ (LP has `.png`) |
| `og-default.svg` | ✅ (LP doesn't have OG) |

---

### ❌ **MISSING: Clinic Images** (4 files)
| LP Path | Purpose | Priority |
|---------|---------|----------|
| `lib/images/clinic5.jpg` | Gallery - Halkalı 3 | 🔴 High |
| `lib/images/clinic6.jpg` | Gallery - Halkalı 4 | 🔴 High |
| `lib/images/clinic7.jpg` | Gallery - Şişli 3 | 🔴 High |
| `lib/images/clinic8.jpg` | Gallery - Şişli 4 | 🔴 High |

**Usage in LP:** `#gallery` section (8 clinic photos total, we have 4)

---

### ❌ **MISSING: Shorts/Video Gallery** (56 files = 28 thumbnails + 28 videos)

| Category | Files | Count |
|----------|-------|-------|
| **Video Thumbnails** | `shorts1.jpg` - `shorts28.jpg` | 28 |
| **Video Files (MP4)** | `shorts1.mp4` - `shorts28.mp4` | 28 |

**Usage in LP:**
- **`#satisfaction-videos`** (Memnuniyet Videoları): `shorts25-28` (4 items)
- **`#video-gallery`** (Video Galerisi): `shorts1-24` (24 items) — grouped as:
  - `shorts1-12`: "Sıkça Sorulan Sorular"
  - `shorts13-18`: "Danışan Memnuniyet Videoları"  
  - `shorts19-24`: "Basında Biz"

---

### ❌ **MISSING: Favicon**
| LP Path | Note |
|---------|------|
| `lib/images/favicon.png` | LP uses PNG, we have SVG (both work) |

---

## 📋 IMPLEMENTATION PLAN

### Phase 1: Download Assets (Automated)
```bash
# Create directory structure
mkdir -p /config/workspace/mrfalcon/public/images/clinic
mkdir -p /config/workspace/mrfalcon/public/images/shorts

# Download clinic images (4 files)
for i in {5..8}; do
  curl -s "https://lp.mrfalconbeauty.com/lib/images/clinic${i}.jpg" \
    -o "/config/workspace/mrfalcon/public/images/clinic/clinic${i}.jpg"
done

# Download shorts thumbnails (28 files)
for i in {1..28}; do
  curl -s "https://lp.mrfalconbeauty.com/lib/images/shorts${i}.jpg" \
    -o "/config/workspace/mrfalcon/public/images/shorts/shorts${i}.jpg"
done

# Download shorts videos (28 files) — LARGE, do selectively
for i in {1..28}; do
  curl -s "https://lp.mrfalconbeauty.com/lib/images/shorts${i}.mp4" \
    -o "/config/workspace/mrfalcon/public/images/shorts/shorts${i}.mp4"
done

# Download favicon
curl -s "https://lp.mrfalconbeauty.com/lib/images/favicon.png" \
  -o "/config/workspace/mrfalcon/public/favicon.png"
```

### Phase 2: Update Code References

#### A. Gallery Section (`src/pages/index.astro`, `src/pages/merkezlerimiz.astro`)
```astro
// Add to galleryImages array:
{ src: "/images/clinic/clinic5.jpg", alt: "Halkalı Şubesi 3", location: "Halkalı" },
{ src: "/images/clinic/clinic6.jpg", alt: "Halkalı Şubesi 4", location: "Halkalı" },
{ src: "/images/clinic/clinic7.jpg", alt: "Şişli Şubesi 3", location: "Şişli" },
{ src: "/images/clinic/clinic8.jpg", alt: "Şişli Şubesi 4", location: "Şişli" },
```

#### B. Video Gallery Component (NEW)
Create `src/components/VideoGallery.astro`:
```astro
---
interface VideoItem {
  id: number;
  thumbnail: string;
  video: string;
  title: string;
  category: 'faq' | 'testimonial' | 'press';
}

const videos: VideoItem[] = [
  // shorts1-12: FAQ
  { id: 1, thumbnail: "/images/shorts/shorts1.jpg", video: "/images/shorts/shorts1.mp4", title: "Sıkça Sorulan Sorular", category: "faq" },
  // ... shorts2-12
  // shorts13-18: Testimonial
  // shorts19-24: Press
  // shorts25-28: Satisfaction (hero section)
];
---

<!-- Render with data-fancybox, data-animate="fadeUp" -->
```

#### C. Update `src/pages/index.astro`
- Replace static `videoTestimonials` with dynamic VideoGallery component
- Add `shorts25-28` to satisfaction videos section

#### D. Update `src/pages/en/index.astro` (same)

#### E. Favicon
- Add `favicon.png` to `public/`
- Update `BaseLayout.astro` to include both:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

---

## 📦 SIZE ESTIMATES

| Asset Type | Count | Est. Size/Each | Total |
|------------|-------|----------------|-------|
| Clinic JPGs | 4 | ~120KB | ~480KB |
| Shorts Thumbs | 28 | ~50KB | ~1.4MB |
| Shorts Videos | 28 | **~5-15MB** | **~140-420MB** ⚠️ |

**⚠️ CRITICAL:** 28 MP4 videos = **140-420MB**. This will:
- Blow up repo size
- Slow down builds/deploys
- Exceed GitHub file size limits (100MB/file)

---

## 🎯 RECOMMENDED APPROACH

### Option A: **Selective Video Import** (Recommended)
Only import videos actually used on our pages:
- **Home page satisfaction:** `shorts25-28.mp4` (4 videos)
- **Video gallery page:** `shorts1-12.mp4` (FAQ videos, 12 videos)
- **Skip:** `shorts13-24` (press/testimonial duplicates)

**Est. size:** 16 videos × ~10MB = **~160MB** (still high but manageable)

### Option B: **External Video Hosting** (Best for Performance)
- Upload videos to **YouTube/Vimeo/Bunny.net**
- Embed via iframe or `<video>` with external `src`
- Keep only thumbnails locally
- **Repo stays tiny**, CDN delivers video

### Option C: **Placeholder-Only** (Fastest)
- Download only thumbnails (28 JPGs = ~1.4MB)
- Use `<video poster="...">` with `preload="none"`
- Load actual MP4 on demand via JS fetch when user clicks play
- Videos served from LP domain or cloud storage

---

## ✅ DECISION NEEDED

**Please choose:**

1. **Option A** — Download 16 selected videos locally (160MB repo growth)
2. **Option B** — External hosting (YouTube/Vimeo/Bunny), embed only
3. **Option C** — Thumbnails only, lazy-load videos from LP domain on click
4. **Custom** — Specify which videos you want

**My recommendation: Option C** — Fastest to implement, minimal repo impact, videos load on-demand from existing LP CDN.

---

## 🚀 NEXT STEPS (After Your Approval)

1. Run download script for clinic images + all 28 thumbnails
2. Create `VideoGallery.astro` component
3. Integrate into index.astro (TR + EN)
4. Add `data-animate` attributes for GSAP
5. Build, test, deploy