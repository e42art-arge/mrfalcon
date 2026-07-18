import raw from "../../mr-falcon-reviews.json";

type RawReview = {
  review_id: string;
  time: { published: string; last_edited: string | null };
  author: { name: string; profile_url: string; url: string; id: string };
  review: { rating: number; text: string | null; language: string | null };
  source: string;
};

type RawFile = {
  scrapedAt: string;
  placeUrl: string;
  totalReviews: number;
  reviews: RawReview[];
};

const data = raw as unknown as RawFile;

export const googlePlaceUrl = data.placeUrl;
export const totalGoogleReviews = data.totalReviews;

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: Date;
}

const clean = (s: string): string =>
  s.replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim();

// "Kötü yorum" = olumsuz tonlu tek yorum (Akbaci Metin: 5★ ama telefon görüşmesi şikayeti).
// JSON'da "faydalı" oy sayısı yok; en faydalı = en detaylı (uzun) yorum olarak sıralanır.
const EXCLUDED_IDS = new Set([
  "Ci9DQUlRQUNvZENodHljRjlvT2pac1drOXdUVXhCWVc5WldqaEhZMUZEYWxreVQzYxAB",
]);

export const reviews: Review[] = data.reviews
  .map((r) => ({
    id: r.review_id,
    name: r.author.name,
    rating: r.review.rating,
    text: clean(r.review.text ?? ""),
    date: new Date(Number(r.time.published)),
  }))
  .filter((r) => r.text.length > 0 && r.rating === 5 && !EXCLUDED_IDS.has(r.id))
  .sort((a, b) => b.text.length - a.text.length || b.date.getTime() - a.date.getTime());

export const reviewStats = (() => {
  const total = reviews.length;
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  const fiveStar = reviews.filter((r) => r.rating === 5).length;
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const r of reviews) dist[r.rating] = (dist[r.rating] ?? 0) + 1;
  return {
    total,
    avg: total ? Math.round((sum / total) * 10) / 10 : 0,
    fiveStarPct: total ? Math.round((fiveStar / total) * 100) : 0,
    dist,
  };
})();

export const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
