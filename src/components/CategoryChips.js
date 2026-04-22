import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { assets } from "../data/assets";
const chips = [
    { label: "Hot Games", icon: assets.iconHotGames },
    { label: "All", icon: assets.iconAll },
    { label: "Live Casino", icon: assets.iconCasino },
    { label: "Slots", icon: assets.iconSlots },
    { label: "Sports", icon: assets.iconSport },
    { label: "Fish Hunt", icon: assets.iconFish },
    { label: "RNG", icon: assets.iconRng },
];
export function CategoryChips() {
    const [activeLabel, setActiveLabel] = useState("Slots");
    return (_jsx("div", { role: "tablist", "aria-label": "Game categories", className: "inline-flex max-w-full items-center overflow-x-auto rounded-full py-1.5 pl-1.5 pr-2", style: {
            backgroundColor: "var(--game-category-tab-bg)",
            boxShadow: "var(--game-category-pill-shadow)",
        }, children: chips.map((c) => {
            const isActive = activeLabel === c.label;
            return (_jsxs("button", { type: "button", role: "tab", "aria-selected": isActive, onClick: () => setActiveLabel(c.label), className: [
                    "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-bold leading-none whitespace-nowrap transition-[background-color,color]",
                    isActive
                        ? "text-[var(--game-category-tab-active-color)]"
                        : "text-[var(--game-category-tab-color)] hover:bg-[var(--game-category-tab-hover)]",
                ].join(" "), style: isActive
                    ? { background: "var(--game-category-tab-active)" }
                    : undefined, children: [_jsx("img", { src: c.icon, alt: "", className: "h-[26px] w-[26px] shrink-0 object-contain", style: {
                            filter: isActive
                                ? "var(--sidebar-icon-filter-active)"
                                : "var(--sidebar-icon-filter)",
                        } }), _jsx("span", { children: c.label })] }, c.label));
        }) }));
}
