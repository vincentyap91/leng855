import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { assets } from "../data/assets";
const mainItems = [
    { label: "Hot Games", icon: assets.iconHotGames, active: true },
    { label: "Home", icon: assets.iconHome },
    { label: "All", icon: assets.iconAll },
    { label: "Live Casino", icon: assets.iconCasino },
    { label: "Slots", icon: assets.iconSlots },
    { label: "Sports", icon: assets.iconSport },
    { label: "Fish Hunt", icon: assets.iconFish },
    { label: "RNG", icon: assets.iconRng },
    { label: "Promotion", icon: assets.iconPromo, badge: 1 },
    { label: "Referral", icon: assets.iconReferral },
    { label: "Rebate", icon: assets.iconRebate },
];
/** Live Chat — same 24×24 + filter treatment as other sidebar rows */
function LiveChatIcon() {
    return (_jsx("img", { src: assets.iconLiveChat, alt: "", className: "h-[24px] w-[24px] shrink-0 object-contain pointer-events-none [filter:var(--sidebar-icon-filter)] group-hover:[filter:var(--sidebar-icon-filter-active)]", draggable: false, "aria-hidden": true }));
}
function SideLink({ label, icon, badge, active }) {
    return (_jsxs("button", { type: "button", className: [
            "t3-sidemenu-item side-nav-item group relative w-full h-[44px] rounded-lg transition-[color,background-color,box-shadow] duration-200 ease-out flex items-center px-[12px] gap-[10px]",
            active ? "side-nav-item--active bg-[var(--nav-side-active)]" : "bg-bg-item hover:bg-[var(--nav-side-item-hover)]",
        ].join(" "), style: {
            boxShadow: active ? "var(--nav-side-item-active-shadow)" : undefined,
        }, children: [_jsx("img", { src: icon, alt: "", className: "side-nav-icon w-[24px] h-[24px] object-contain shrink-0 transition" }), _jsx("h6", { className: [
                    "m-0 text-[13px] font-semibold leading-none flex-1 text-left",
                    active
                        ? "text-[var(--nav-side-text-active)]"
                        : "text-[var(--nav-side-color)] group-hover:text-[var(--nav-side-text-hover)]",
                ].join(" "), children: label }), badge !== undefined && (_jsx("span", { className: [
                    "min-w-[18px] h-[18px] px-[5px] rounded-full text-[11px] font-bold flex items-center justify-center",
                    active
                        ? "bg-white text-[var(--primary)]"
                        : "bg-[var(--primary)] text-white",
                ].join(" "), children: badge }))] }));
}
/** Plain row: icon + white label, no filled cell (screenshot: Recent Game) */
function RecentGameLink() {
    return (_jsxs("button", { type: "button", className: "t3-sidemenu-item group w-full h-[44px] rounded-lg flex items-center px-[12px] gap-[10px] text-left transition-colors bg-bg-item hover:bg-[var(--nav-side-item-hover)]", children: [_jsx("img", { src: assets.iconRecent, alt: "", className: "w-[24px] h-[24px] object-contain shrink-0 [filter:var(--sidebar-icon-filter)] group-hover:[filter:var(--sidebar-icon-filter-active)]" }), _jsx("h6", { className: "m-0 text-[13px] font-semibold leading-none text-[var(--nav-side-color)] group-hover:text-[var(--nav-side-text-hover)]", children: "Recent Game" })] }));
}
/** Live Chat — layout/spacing matches Recent Game; badge matches SideLink pill */
function LiveChatLink() {
    return (_jsxs("button", { type: "button", className: "t3-sidemenu-item group w-full h-[44px] rounded-lg flex items-center px-[12px] gap-[10px] text-left transition-colors bg-bg-item hover:bg-[var(--nav-side-item-hover)]", children: [_jsx(LiveChatIcon, {}), _jsx("h6", { className: "m-0 text-[13px] font-semibold leading-none flex-1 text-left text-[var(--nav-side-color)] group-hover:text-[var(--nav-side-text-hover)]", children: "Live Chat" }), _jsx("span", { className: "min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--primary)] text-white text-[11px] font-bold flex items-center justify-center", children: "1" })] }));
}
function SocialSidebarRow() {
    const linkClass = "block w-[34px] h-[34px] rounded-[6px] overflow-hidden ring-1 ring-white/10 shadow-sm hover:brightness-110 transition-[filter] duration-150";
    return (_jsxs("div", { className: "flex items-center justify-center gap-2.5 pt-3 pb-1", children: [_jsx("a", { href: "#facebook", className: linkClass, "aria-label": "Facebook", children: _jsx("img", { src: assets.socialFb, alt: "", className: "w-full h-full object-cover" }) }), _jsx("a", { href: "#telegram", className: linkClass, "aria-label": "Telegram", children: _jsx("img", { src: assets.socialTelegram, alt: "", className: "w-full h-full object-cover" }) }), _jsx("a", { href: "#line", className: linkClass, "aria-label": "Line", children: _jsx("img", { src: assets.socialLine, alt: "", className: "w-full h-full object-cover" }) })] }));
}
/**
 * Top promo row (Daily Bonus / Spin Wheel / Download).
 * Backgrounds use `--daily-checkin-button`, `--spin-wheel-button`, `--apk-banner-button`;
 * text shadow uses `--nav-side-promo-text-shadow` (see `theme.css`).
 */
function PromoStrip({ variant, icon, children, }) {
    const bgClass = variant === "daily"
        ? "bg-sidebar-daily"
        : variant === "spin"
            ? "bg-sidebar-spin"
            : "bg-sidebar-download";
    return (_jsxs("button", { type: "button", className: [
            "w-full h-[48px] rounded-[6px] flex items-center px-[12px] gap-[11px]",
            "text-white font-bold text-[13px] leading-[1.15] text-left",
            "ring-1 ring-white/10 shadow-[0_3px_6px_rgba(0,0,0,0.35)]",
            "transition hover:brightness-110 active:brightness-95",
            bgClass,
        ].join(" "), style: { textShadow: "var(--nav-side-promo-text-shadow)" }, children: [_jsx("img", { src: icon, alt: "", className: "w-[32px] h-[32px] object-contain shrink-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]" }), _jsx("span", { children: children })] }));
}
export function Sidebar() {
    return (_jsxs("aside", { className: "t3-side-menu t3-sidemenu-box sticky top-[60px] h-[calc(100vh-60px)] w-[220px] shrink-0 overflow-y-auto bg-bg-sidebar relative pb-4 border-r", style: {
            borderRightColor: "var(--sidebar-container-border)",
        }, "aria-label": "Primary navigation", children: [_jsxs("div", { className: "flex flex-col gap-[7px] pt-[12px] px-[8px]", children: [_jsxs(PromoStrip, { variant: "daily", icon: assets.iconDailyBonusPromo, children: ["Daily Bonus", _jsx("br", {}), "Claim"] }), _jsxs(PromoStrip, { variant: "spin", icon: assets.iconSpinWheel, children: ["Spin Wheel", _jsx("br", {}), "Bonus"] }), _jsx(PromoStrip, { variant: "download", icon: assets.iconAndroid, children: "Download" })] }), _jsxs("nav", { className: "flex flex-col gap-[6px] pt-[10px] px-[8px]", "aria-label": "Main", children: [mainItems.map((item) => (_jsx(SideLink, { ...item }, item.label))), _jsx(RecentGameLink, {}), _jsx("div", { className: "mt-2 border-t border-b py-2.5 -mx-[8px] px-[8px]", style: { borderColor: "var(--nav-side-chat-section-border)" }, children: _jsx(LiveChatLink, {}) })] }), _jsx(SocialSidebarRow, {})] }));
}
