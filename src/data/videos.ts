export type PressVideo = { id: number; thumbnail: string; videoUrl: string; channel: string };
export type GalleryVideo = { id: number; thumbnail: string; videoUrl: string; title: string; description: string };

export const pressVideos: PressVideo[] = [
  { id: 18, thumbnail: "/images/shorts/shorts18.jpg", videoUrl: "/videos/shorts/shorts18.mp4", channel: "Beyaz TV" },
  { id: 21, thumbnail: "/images/shorts/shorts21.jpg", videoUrl: "/videos/shorts/shorts21.mp4", channel: "CNN Türk" },
  { id: 22, thumbnail: "/images/shorts/shorts22.jpg", videoUrl: "/videos/shorts/shorts22.mp4", channel: "TLC" },
  { id: 23, thumbnail: "/images/shorts/shorts23.jpg", videoUrl: "/videos/shorts/shorts23.mp4", channel: "TLC" },
  { id: 24, thumbnail: "/images/shorts/shorts24.jpg", videoUrl: "/videos/shorts/shorts24.mp4", channel: "CNN Türk" },
];

export const satisfactionVideos: Record<"tr" | "en", GalleryVideo[]> = {
  tr: [
    { id: 25, thumbnail: "/images/shorts/shorts25.jpg", videoUrl: "/videos/shorts/shorts25.mp4", title: "Memnuniyet Videoları", description: "Lazer Epilasyon" },
    { id: 26, thumbnail: "/images/shorts/shorts26.jpg", videoUrl: "/videos/shorts/shorts26.mp4", title: "Memnuniyet Videoları", description: "Lazer Epilasyon" },
    { id: 27, thumbnail: "/images/shorts/shorts27.jpg", videoUrl: "/videos/shorts/shorts27.mp4", title: "Memnuniyet Videoları", description: "Lazer Epilasyon" },
    { id: 28, thumbnail: "/images/shorts/shorts28.jpg", videoUrl: "/videos/shorts/shorts28.mp4", title: "Memnuniyet Videoları", description: "Lazer Epilasyon" },
  ],
  en: [
    { id: 25, thumbnail: "/images/shorts/shorts25.jpg", videoUrl: "/videos/shorts/shorts25.mp4", title: "Satisfaction Videos", description: "Laser Hair Removal" },
    { id: 26, thumbnail: "/images/shorts/shorts26.jpg", videoUrl: "/videos/shorts/shorts26.mp4", title: "Satisfaction Videos", description: "Laser Hair Removal" },
    { id: 27, thumbnail: "/images/shorts/shorts27.jpg", videoUrl: "/videos/shorts/shorts27.mp4", title: "Satisfaction Videos", description: "Laser Hair Removal" },
    { id: 28, thumbnail: "/images/shorts/shorts28.jpg", videoUrl: "/videos/shorts/shorts28.mp4", title: "Satisfaction Videos", description: "Laser Hair Removal" },
  ],
};

export const faqVideos: Record<"tr" | "en", GalleryVideo[]> = {
  tr: [
    { id: 1, thumbnail: "/images/shorts/shorts1.jpg", videoUrl: "/videos/shorts/shorts1.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 2, thumbnail: "/images/shorts/shorts2.jpg", videoUrl: "/videos/shorts/shorts2.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 3, thumbnail: "/images/shorts/shorts3.jpg", videoUrl: "/videos/shorts/shorts3.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 4, thumbnail: "/images/shorts/shorts4.jpg", videoUrl: "/videos/shorts/shorts4.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 5, thumbnail: "/images/shorts/shorts5.jpg", videoUrl: "/videos/shorts/shorts5.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 6, thumbnail: "/images/shorts/shorts6.jpg", videoUrl: "/videos/shorts/shorts6.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 7, thumbnail: "/images/shorts/shorts7.jpg", videoUrl: "/videos/shorts/shorts7.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 8, thumbnail: "/images/shorts/shorts8.jpg", videoUrl: "/videos/shorts/shorts8.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 9, thumbnail: "/images/shorts/shorts9.jpg", videoUrl: "/videos/shorts/shorts9.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 10, thumbnail: "/images/shorts/shorts10.jpg", videoUrl: "/videos/shorts/shorts10.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 11, thumbnail: "/images/shorts/shorts11.jpg", videoUrl: "/videos/shorts/shorts11.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
    { id: 12, thumbnail: "/images/shorts/shorts12.jpg", videoUrl: "/videos/shorts/shorts12.mp4", title: "Sıkça Sorulan Sorular", description: "Falcon 4 Pro & Lazer Epilasyon" },
  ],
  en: [
    { id: 1, thumbnail: "/images/shorts/shorts1.jpg", videoUrl: "/videos/shorts/shorts1.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 2, thumbnail: "/images/shorts/shorts2.jpg", videoUrl: "/videos/shorts/shorts2.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 3, thumbnail: "/images/shorts/shorts3.jpg", videoUrl: "/videos/shorts/shorts3.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 4, thumbnail: "/images/shorts/shorts4.jpg", videoUrl: "/videos/shorts/shorts4.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 5, thumbnail: "/images/shorts/shorts5.jpg", videoUrl: "/videos/shorts/shorts5.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 6, thumbnail: "/images/shorts/shorts6.jpg", videoUrl: "/videos/shorts/shorts6.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 7, thumbnail: "/images/shorts/shorts7.jpg", videoUrl: "/videos/shorts/shorts7.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 8, thumbnail: "/images/shorts/shorts8.jpg", videoUrl: "/videos/shorts/shorts8.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 9, thumbnail: "/images/shorts/shorts9.jpg", videoUrl: "/videos/shorts/shorts9.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 10, thumbnail: "/images/shorts/shorts10.jpg", videoUrl: "/videos/shorts/shorts10.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 11, thumbnail: "/images/shorts/shorts11.jpg", videoUrl: "/videos/shorts/shorts11.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
    { id: 12, thumbnail: "/images/shorts/shorts12.jpg", videoUrl: "/videos/shorts/shorts12.mp4", title: "Frequently Asked Questions", description: "Falcon 4 Pro & Laser Hair Removal" },
  ],
};
