import { useEffect, useState } from "react";
import { assets } from "../data/assets";

type Chip = { label: string; icon: string; routeHash?: string };

const chips: Chip[] = [
  { label: "Hot Games", icon: assets.iconHotGames, routeHash: "#/hot-games" },
  { label: "All", icon: assets.iconAll, routeHash: "#/games" },
  { label: "Live Casino", icon: assets.iconCasino, routeHash: "#/live-casino" },
  { label: "Slots", icon: assets.iconSlots, routeHash: "#/slots" },
  { label: "Sports", icon: assets.iconSport, routeHash: "#/sports" },
  { label: "Fish Hunt", icon: assets.iconFish, routeHash: "#/fish-hunt" },
  { label: "RNG", icon: assets.iconRng },
];

function hashToActiveLabel(): string {
  const raw = window.location.hash.replace(/^#\/?/, "").toLowerCase().split("?")[0] ?? "";
  if (raw === "hot-games" || raw === "/hot-games") return "Hot Games";
  if (raw === "games" || raw === "all-games" || raw === "/games" || raw === "/all-games") return "All";
  if (raw === "live-casino" || raw === "/live-casino") return "Live Casino";
  if (raw === "slots" || raw === "/slots") return "Slots";
  if (raw === "sports" || raw === "/sports") return "Sports";
  if (raw === "fish-hunt" || raw === "/fish-hunt") return "Fish Hunt";
  return "Slots";
}

export function CategoryChips() {
  const [activeLabel, setActiveLabel] = useState("Slots");

  useEffect(() => {
    const sync = () => setActiveLabel(hashToActiveLabel());
    window.addEventListener("hashchange", sync);
    sync();
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div
      role="tablist"
      aria-label="Game categories"
      className="t3-game-category-list inline-flex max-w-full items-center overflow-x-auto rounded-full py-1.5 pl-1.5 pr-2"
      style={{
        backgroundColor: "var(--game-category-tab-bg)",
        boxShadow: "var(--game-category-pill-shadow)",
      }}
    >
      {chips.map((c) => {
        const isActive = activeLabel === c.label;
        return (
          <button
            key={c.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              if (c.routeHash) {
                window.location.hash = c.routeHash;
              } else {
                setActiveLabel(c.label);
              }
            }}
            className={[
              "t3-game-category-item flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-bold leading-none whitespace-nowrap transition-[background-color,color]",
              isActive ? "active" : "",
              isActive
                ? "text-[var(--game-category-tab-active-color)]"
                : "text-[var(--game-category-tab-color)] hover:bg-[var(--game-category-tab-hover)]",
            ].join(" ")}
            style={
              isActive
                ? { background: "var(--game-category-tab-active)" }
                : undefined
            }
          >
            <img
              src={c.icon}
              alt=""
              className="h-[26px] w-[26px] shrink-0 object-contain"
              style={{
                filter: isActive
                  ? "var(--sidebar-icon-filter-active)"
                  : "var(--sidebar-icon-filter)",
              }}
            />
            <h6 className="m-0 text-inherit font-inherit">{c.label}</h6>
          </button>
        );
      })}
    </div>
  );
}
