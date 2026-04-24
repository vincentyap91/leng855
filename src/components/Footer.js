import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { assets } from "../data/assets";
const socials = [
    { label: "Facebook", src: assets.socialFb, href: "#" },
    { label: "Telegram", src: assets.socialTelegram, href: "#" },
    { label: "Line", src: assets.socialLine, href: "#" },
];
export function Footer() {
    return (_jsxs("footer", { className: "text-[var(--nav-footer-color)]", style: {
            background: "var(--nav-footer-gradient)",
            borderBottom: "var(--nav-footer-border)",
        }, children: [_jsxs("div", { className: "flex flex-wrap items-center justify-end gap-3 px-8 py-4", children: [socials.map((s) => (_jsx("a", { href: s.href, "aria-label": s.label, className: "grid h-9 w-9 place-items-center overflow-hidden rounded-md", children: _jsx("img", { src: s.src, alt: s.label, className: "h-full w-full object-contain" }) }, s.label))), _jsxs("button", { type: "button", className: "flex h-9 items-center gap-2 rounded-md border px-3", style: { borderColor: "var(--nav-footer-control-border)" }, children: [_jsx("img", { src: assets.ukFlag, alt: "", className: "h-5 w-5 rounded-full" }), _jsx("span", { className: "text-sm text-[var(--nav-footer-color)]", children: "English" }), _jsx("img", { src: assets.chevronIcon, alt: "", className: "h-3 w-3 opacity-70" })] })] }), _jsx("div", { className: "text-center pb-6 text-xs text-[var(--nav-footer-copyright-color)] font-light", children: "\u00A92026 Leng855. All rights reserved. | 18+ | v1.10.334" })] }));
}
