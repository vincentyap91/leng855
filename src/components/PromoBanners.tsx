import type { Settings } from "react-slick";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { assets } from "../data/assets";

// Left → right order matches the live leng855.live/en landing page.
const banners = [
  { alt: "Enjoy Our Exclusive Bonus", src: assets.bannerExclusive },
  { alt: "50% Welcome Bonus", src: assets.banner50Welcome },
  { alt: "10% Daily Bonus", src: assets.banner10Daily },
];

const promoBannerSliderSettings: Settings = {
  infinite: true,
  speed: 450,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  arrows: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: false,
        dots: true,
        arrows: false,
      },
    },
  ],
};

export function PromoBanners() {
  return (
    <div className="promo-banners-wrap w-full max-lg:px-4 lg:max-w-none lg:px-0">
      <Slider className="promo-banners-slider" {...promoBannerSliderSettings}>
        {banners.map((b) => (
          <div key={b.alt}>
            <div className="overflow-hidden rounded-[20px] shadow-[0_2px_12px_color-mix(in srgb, var(--surface-inverse) 8%, transparent)] lg:rounded-lg lg:shadow-sm">
              <div className="overflow-hidden max-lg:aspect-[2/1] lg:aspect-[580/320]">
                <img
                  src={b.src}
                  alt={b.alt}
                  className="block h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
