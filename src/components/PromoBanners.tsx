import { assets } from "../data/assets";

// Left → right order matches the live leng855.live/en landing page.
const banners = [
  { alt: "Enjoy Our Exclusive Bonus", src: assets.bannerExclusive },
  { alt: "50% Welcome Bonus", src: assets.banner50Welcome },
  { alt: "10% Daily Bonus", src: assets.banner10Daily },
];

export function PromoBanners() {
  return (
    <div className="grid grid-cols-3 gap-[14px]">
      {banners.map((b) => (
        <div key={b.alt} className="overflow-hidden rounded-lg">
          <img
            src={b.src}
            alt={b.alt}
            className="w-full aspect-[580/320] object-cover block"
          />
        </div>
      ))}
    </div>
  );
}
