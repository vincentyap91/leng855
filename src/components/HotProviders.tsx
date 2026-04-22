import { assets } from "../data/assets";
import type { Settings } from "react-slick";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const providers = [
  { name: "Pragmatic Play", src: assets.brands.pragmatic },
  { name: "PG Soft", src: assets.brands.pgsoft },
  { name: "Fa Chai", src: assets.brands.fachai },
  { name: "Joker", src: assets.brands.joker },
] as const;

const sliderSettings: Settings = {
  infinite: true,
  speed: 400,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: true,
  arrows: true,
  dots: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 420, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

export function HotProviders() {
  return (
    <section className="rounded-xl bg-white p-4">
      <h2 className="mb-4 text-[15px] font-bold uppercase tracking-wide">
        <span className="text-red-600">HOT</span>{" "}
        <span className="text-slate-800">PROVIDERS</span>
      </h2>

      <div className="hot-providers-slider -mx-1 px-1 sm:mx-0 sm:px-6">
        <Slider {...sliderSettings}>
          {providers.map((p) => (
            <div key={p.name} className="px-2 sm:px-3">
              <div className="flex h-[72px] items-center justify-center sm:h-[80px]">
                <img
                  src={p.src}
                  alt={p.name}
                  className="max-h-[70%] max-w-[min(200px,28vw)] object-contain sm:max-h-[60%] sm:max-w-[min(200px,22vw)]"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
