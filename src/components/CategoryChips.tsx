import { useEffect, useRef, useState } from "react";
import { assets } from "../data/assets";

type Chip = { label: string; icon: string; routeHash?: string };

const chipsAll: Chip[] = [
  { label: "Hot Games", icon: assets.iconHotGames, routeHash: "#/hot-games" },
  { label: "All", icon: assets.iconAll, routeHash: "#/games" },
  { label: "Live Casino", icon: assets.iconCasino, routeHash: "#/live-casino" },
  { label: "Slots", icon: assets.iconSlots, routeHash: "#/slots" },
  { label: "Sports", icon: assets.iconSport, routeHash: "#/sports" },
  { label: "Fish Hunt", icon: assets.iconFish, routeHash: "#/fish-hunt" },
  { label: "RNG", icon: assets.iconRng },
];

/** Mobile home hero strip — matches reference: scroll + arrows; desktop equal columns */
const chipsHomeStrip: Chip[] = [
  { label: "Live Casino", icon: assets.iconCasino, routeHash: "#/live-casino" },
  { label: "Slots", icon: assets.iconSlots, routeHash: "#/slots" },
  { label: "Sports", icon: assets.iconSport, routeHash: "#/sports" },
];

function hashToActiveLabel(): string {
  const raw = window.location.hash.replace(/^#\/?/, "").toLowerCase().split("?")[0] ?? "";
  if (raw === "hot-games" || raw === "/hot-games") return "Hot Games";
  if (raw === "games" || raw === "all-games" || raw === "/games" || raw === "/all-games") return "All";
  if (raw === "live-casino" || raw === "/live-casino") return "Live Casino";
  if (raw === "slots" || raw === "/slots") return "Slots";
  if (raw === "sports" || raw === "/sports") return "Sports";
  if (raw === "fish-hunt" || raw === "/fish-hunt") return "Fish Hunt";
  if (raw === "" || raw === "home" || raw === "/") return "Slots";
  return "Slots";
}

function CategoryScrollChevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      {dir === "left" ? (
        <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export type CategoryChipsVariant = "all" | "homeStrip";

type CategoryChipsProps = { variant?: CategoryChipsVariant };

export function CategoryChips({ variant = "all" }: CategoryChipsProps) {
  const chips = variant === "homeStrip" ? chipsHomeStrip : chipsAll;
  const [activeLabel, setActiveLabel] = useState(() => hashToActiveLabel());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setActiveLabel(hashToActiveLabel());
    window.addEventListener("hashchange", sync);
    sync();
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const stripStyle = {
    backgroundColor: "var(--game-category-tab-bg)",
    boxShadow: "var(--game-category-pill-shadow)",
  } as const;

  const chipNodes = chips.map((c) => {
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
          variant === "homeStrip"
            ? "t3-game-category-item flex max-lg:shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-bold leading-none whitespace-nowrap transition-[background-color,color] lg:min-w-0 lg:flex-1"
            : "t3-game-category-item flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-[12.5px] font-bold leading-none whitespace-nowrap transition-[background-color,color]",
          isActive ? "active" : "",
          isActive
            ? "text-[var(--game-category-tab-active-color)]"
            : "text-[var(--game-category-tab-color)] hover:bg-[var(--game-category-tab-hover)]",
        ].join(" ")}
        style={isActive ? { background: "var(--game-category-tab-active)" } : undefined}
      >
        <img
          src={c.icon}
          alt=""
          className="h-[26px] w-[26px] shrink-0 object-contain"
          style={{
            filter: isActive ? "var(--sidebar-icon-filter-active)" : "var(--sidebar-icon-filter)",
          }}
        />
        <h6 className="m-0 text-inherit font-inherit">{c.label}</h6>
      </button>
    );
  });

  if (variant === "homeStrip") {
    return (
      <div className="flex w-full min-w-0 max-w-full items-center gap-2">
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg lg:hidden"
          style={{
            background: "var(--primary-dark)",
            color: "var(--on-primary)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
          aria-label="Scroll categories left"
          onClick={() => scrollBy(-150)}
        >
          <CategoryScrollChevron dir="left" />
        </button>

        <div
          ref={scrollRef}
          className="no-scrollbar min-w-0 flex-1 overflow-x-auto rounded-lg py-1.5 lg:overflow-visible"
          style={stripStyle}
        >
          <div
            role="tablist"
            aria-label="Game categories"
            className="t3-game-category-list t3-game-category-list--home-strip flex w-max min-w-full items-stretch gap-2 px-2 lg:w-full lg:justify-between lg:gap-1 lg:px-1.5 lg:pr-2"
          >
            {chipNodes}
          </div>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg lg:hidden"
          style={{
            background: "var(--primary-dark)",
            color: "var(--on-primary)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
          aria-label="Scroll categories right"
          onClick={() => scrollBy(150)}
        >
          <CategoryScrollChevron dir="right" />
        </button>
      </div>
    );
  }

  return (
    <div
      role="tablist"
      aria-label="Game categories"
      className="t3-game-category-list inline-flex max-w-full items-center overflow-x-auto rounded-lg py-1.5 pl-1.5 pr-2"
      style={stripStyle}
    >
      {chipNodes}
    </div>
  );
}
