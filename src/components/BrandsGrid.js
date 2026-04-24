import { jsx as _jsx } from "react/jsx-runtime";
import { assets } from "../data/assets";
/**
 * Bottom brand/provider logo strip from leng855.live/en.
 * Uses real color logos downloaded into /public/assets.
 */
const brands = [
    { name: "Saba", src: assets.brands.saba },
    { name: "Pragmatic Play", src: assets.brands.pragmatic },
    { name: "Play Star", src: assets.brands.playstar },
    { name: "Spadegaming", src: assets.brands.spadegaming },
    { name: "SA Gaming", src: assets.brands.sagaming },
    { name: "Nextspin", src: assets.brands.nextspin },
    { name: "CMD Sports", src: assets.brands.cmdsport },
    { name: "Sexy Baccarat", src: assets.brands.sexybaccarat },
    { name: "FastSpin", src: assets.brands.fastspin },
    { name: "FaChai", src: assets.brands.fachai },
    { name: "WM Casino", src: assets.brands.wmcasino },
    { name: "Microgaming", src: assets.brands.microgaming },
    { name: "Spribe", src: assets.brands.spribe },
    { name: "Evolution", src: assets.brands.evolution },
    { name: "Joker", src: assets.brands.joker },
    { name: "JILI", src: assets.tiles.jili }, // fallback — brands don't have standalone jili
    { name: "Pussy888", src: assets.brands.pussy888 },
    { name: "Mega H5", src: assets.brands.mega },
    { name: "Dream Gaming", src: assets.brands.dreamgaming },
    { name: "Saba Sports", src: assets.brands.sabasport },
    { name: "Hacksaw", src: assets.brands.hacksaw },
    { name: "Relax Gaming", src: assets.brands.relaxgaming },
    { name: "PG Soft", src: assets.brands.pgsoft },
    { name: "Marbula Two", src: assets.brands.m2 },
];
export function BrandsGrid() {
    return (_jsx("section", { className: "py-4", children: _jsx("div", { className: "grid grid-cols-8 gap-x-6 gap-y-5 items-center justify-items-center", children: brands.map((b) => (_jsx("div", { className: "h-[44px] w-full flex items-center justify-center", children: _jsx("img", { src: b.src, alt: b.name, className: "max-h-full max-w-[90%] object-contain opacity-90" }) }, b.name))) }) }));
}
