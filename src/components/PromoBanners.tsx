import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <div className="promo-banners-wrap w-full max-lg:px-4 lg:max-w-none lg:px-0">
      <Slider key={isMobile ? "mobile" : "desktop"} className="promo-banners-slider" {...promoBannerSliderSettings}>
        {banners.map((b) => (
          <div key={b.alt}>
            <div className="overflow-hidden rounded-[10px] shadow-sm lg:rounded-lg">
              <div className="relative w-full overflow-hidden">
                <img
                  src={b.src}
                  alt={b.alt}
                  className="block h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
