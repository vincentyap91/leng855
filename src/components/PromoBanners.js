import { jsx as _jsx } from "react/jsx-runtime";
import { assets } from "../data/assets";
// Left → right order matches the live kh168.live/en landing page.
const banners = [
    { alt: "Enjoy Our Exclusive Bonus", src: assets.bannerExclusive },
    { alt: "50% Welcome Bonus", src: assets.banner50Welcome },
    { alt: "10% Daily Bonus", src: assets.banner10Daily },
];
export function PromoBanners() {
    return (_jsx("div", { className: "grid grid-cols-3 gap-[14px]", children: banners.map((b) => (_jsx("div", { className: "overflow-hidden rounded-lg", children: _jsx("img", { src: b.src, alt: b.alt, className: "w-full aspect-[580/320] object-cover block" }) }, b.alt))) }));
}
