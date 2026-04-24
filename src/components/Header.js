import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { assets } from "../data/assets";
export function Header() {
    return (_jsxs("header", { className: "flex h-[60px] min-w-0 items-center gap-3 border-b border-t px-4 sm:px-5 md:gap-4", style: {
            borderTopColor: "var(--header-bar-top-line)",
            borderBottomColor: "var(--header-bar-bottom-line)",
            background: "var(--header-bar-gradient)",
        }, children: [_jsx("button", { type: "button", "aria-label": "Menu", className: "grid h-[30px] w-[30px] shrink-0 place-items-center opacity-90 hover:opacity-100", children: _jsx("img", { src: assets.menuIcon, alt: "", className: "h-[24px] w-[24px]" }) }), _jsx("a", { href: "#", className: "ml-0.5 block shrink-0 rounded-[4px] px-1 py-0.5 sm:ml-1", "aria-label": "Leng855 home", children: _jsx("img", { src: assets.leng855Logo, alt: "Leng855", className: "h-[50px] max-h-[50px] w-[min(320px,42vw)] max-w-[320px] object-contain object-left" }) }), _jsxs("div", { className: "ml-auto flex shrink-0 items-center gap-4 sm:gap-5", children: [_jsx("a", { href: "#login", className: "hidden text-sm font-bold hover:opacity-80 sm:inline", style: { color: "var(--nav-login-color)" }, children: "Log in" }), _jsx("button", { type: "button", className: "h-[40px] min-w-[96px] rounded-lg px-4 text-sm font-bold transition hover:brightness-110", style: {
                            background: "var(--nav-header-register-bg)",
                            color: "var(--nav-header-register-color)",
                        }, children: "Register" }), _jsxs("button", { type: "button", className: "flex h-[40px] items-center gap-1.5 rounded-lg px-2.5 transition hover:brightness-110", style: {
                            background: "var(--header-lang-bg)",
                            border: "var(--header-lang-border)",
                            color: "var(--gold)",
                        }, "aria-label": "Language", children: [_jsx("img", { src: assets.ukFlag, alt: "EN", className: "h-5 w-5 rounded-full ring-1 ring-white/25" }), _jsx("img", { src: assets.chevronIcon, alt: "", className: "h-3 w-3", style: { filter: "var(--header-lang-chevron-filter)" } })] })] })] }));
}
