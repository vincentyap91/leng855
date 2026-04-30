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

const providerRoute: Partial<Record<(typeof providers)[number]["name"], string>> = {
  "PG Soft": "#/provider/pgsoft",
};

/** Mobile: 4 logos per row (reference); desktop: 4-up with arrows */
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
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

export function HotProviders() {
  return (
    <section className="rounded-xl bg-white p-4">
      <h2
        className="mb-3 text-[15px] font-extrabold italic uppercase tracking-wide sm:mb-4"
        style={{ color: "var(--primary-dark)" }}
      >
        HOT PROVIDERS
      </h2>

      <div className="hot-providers-slider -mx-0.5 px-0.5 sm:-mx-1 sm:px-1 lg:mx-0 lg:px-6">
        <Slider {...sliderSettings}>
          {providers.map((p) => (
            <div key={p.name} className="px-1 sm:px-2 lg:px-3">
              <a
                href={providerRoute[p.name] ?? "#"}
                className="flex h-[64px] items-center justify-center sm:h-[72px] lg:h-[80px]"
                style={{ cursor: providerRoute[p.name] ? "pointer" : "default" }}
                onClick={(event) => {
                  if (!providerRoute[p.name]) {
                    event.preventDefault();
                  }
                }}
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="max-h-[58%] max-w-[min(200px,22vw)] object-contain sm:max-h-[62%] sm:max-w-[min(200px,24vw)] lg:max-h-[60%] lg:max-w-[min(200px,22vw)]"
                />
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
