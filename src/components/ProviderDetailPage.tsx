import { useMemo, useState } from "react";
import { assets } from "../data/assets";
import { RtpInfoBadge } from "./RtpInfoBadge";

export type ProviderDetailPageProps = {
  provider: "pgsoft" | "nextspin";
};

type ProviderTile = {
  id: string;
  label: string;
  src: string;
};

const pgSoftTiles: ProviderTile[] = [
  { id: "pg-1", label: "Mahjong Ways", src: assets.tiles.pgsoft },
  { id: "pg-2", label: "Fortune Tiger", src: assets.tiles.pgsoft },
  { id: "pg-3", label: "Lucky Neko", src: assets.tiles.pgsoft },
  { id: "pg-4", label: "Wild Bandito", src: assets.tiles.pgsoft },
  { id: "pg-5", label: "Treasures of Aztec", src: assets.tiles.pgsoft },
  { id: "pg-6", label: "Dragon Hatch", src: assets.tiles.pgsoft },
  { id: "pg-7", label: "Candy Bonanza", src: assets.tiles.pgsoft },
  { id: "pg-8", label: "Rise of Apollo", src: assets.tiles.pgsoft },
  { id: "pg-9", label: "Prosperity Lion", src: assets.tiles.pgsoft },
  { id: "pg-10", label: "Cocktail Nights", src: assets.tiles.pgsoft },
  { id: "pg-11", label: "Medusa II", src: assets.tiles.pgsoft },
  { id: "pg-12", label: "Genie 3 Wishes", src: assets.tiles.pgsoft },
  { id: "pg-13", label: "Ganesha Gold", src: assets.tiles.pgsoft },
  { id: "pg-14", label: "Heist Stakes", src: assets.tiles.pgsoft },
  { id: "pg-15", label: "Piggy Gold", src: assets.tiles.pgsoft },
  { id: "pg-16", label: "Mafia Mayhem", src: assets.tiles.pgsoft },
  { id: "pg-17", label: "Leprechaun Riches", src: assets.tiles.pgsoft },
  { id: "pg-18", label: "Queen of Bounty", src: assets.tiles.pgsoft },
  { id: "pg-19", label: "Fortune Mouse", src: assets.tiles.pgsoft },
  { id: "pg-20", label: "Dreams of Macau", src: assets.tiles.pgsoft },
  { id: "pg-21", label: "Jurassic Kingdom", src: assets.tiles.pgsoft },
  { id: "pg-22", label: "Egypt's Book", src: assets.tiles.pgsoft },
  { id: "pg-23", label: "Flirting Scholar", src: assets.tiles.pgsoft },
  { id: "pg-24", label: "The Great Icescape", src: assets.tiles.pgsoft },
];

type NextspinGame = ProviderTile & { rtp: string };

const NEXTSPIN_BANNER =
  "https://pksoftcdn.azureedge.net/media/nextspin_slot_banner-202604291400585134.webp";

const nextspinGames: NextspinGame[] = [
  { id: "ns-5-fortune-stars", label: "5 Fortune Stars", src: assets.tiles.nextspin, rtp: "91.83" },
  { id: "ns-7-dragons", label: "7 Dragons", src: assets.tiles.nextspin, rtp: "92.41" },
  { id: "ns-golden-phoenix", label: "Golden Phoenix", src: assets.tiles.nextspin, rtp: "93.12" },
  { id: "ns-emerald-treasure", label: "Emerald Treasure", src: assets.tiles.nextspin, rtp: "90.56" },
  { id: "ns-royal-tiger", label: "Royal Tiger", src: assets.tiles.nextspin, rtp: "94.08" },
  { id: "ns-lucky-jade", label: "Lucky Jade", src: assets.tiles.nextspin, rtp: "91.25" },
  { id: "ns-mega-wheel", label: "Mega Wheel", src: assets.tiles.nextspin, rtp: "92.99" },
  { id: "ns-dragon-burst", label: "Dragon Burst", src: assets.tiles.nextspin, rtp: "93.67" },
  { id: "ns-moon-festival", label: "Moon Festival", src: assets.tiles.nextspin, rtp: "90.88" },
  { id: "ns-wealth-god", label: "Wealth God", src: assets.tiles.nextspin, rtp: "92.15" },
  { id: "ns-candy-blast", label: "Candy Blast", src: assets.tiles.nextspin, rtp: "91.50" },
  { id: "ns-phoenix-flame", label: "Phoenix Flame", src: assets.tiles.nextspin, rtp: "93.04" },
];

const providerMeta = {
  pgsoft: {
    title: "PG Soft",
    banner: "https://pksoftcdn.azureedge.net/media/kh168_pgsoft_providerbanner_200x200px-202508270801367795.jpg",
  },
} as const;

function ChevronRight() {
  return (
    <span aria-hidden className="inline-block" style={{ transform: "translateY(1px)" }}>
      &gt;
    </span>
  );
}

function IconRefresh() {
  return (
    <svg
      className="t3-provider-info-bar__icon"
      viewBox="0 0 1024 1024"
      style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}
      aria-hidden="true"
    >
      <path d="M303.9 573.127c14.206-16.295 2.634-41.738-18.986-41.738h-64.727c-0.422-6.405-0.658-12.859-0.658-19.367 0-161.27 131.201-292.471 292.47-292.471 77.5 0 148.042 30.31 200.431 79.684l91.273-106.776c-79.895-73.090-182.721-113.125-291.703-113.125-115.575 0-224.232 45.009-305.956 126.731-81.722 81.724-126.731 190.381-126.731 305.956 0 6.48 0.162 12.935 0.444 19.367h-54.52c-21.619 0-33.193 25.444-18.985 41.741l148.824 170.706 148.825-170.706z" />
      <path d="M1017.748 490.819l-148.821-170.708-148.821 170.708c-14.205 16.296-2.634 41.74 18.984 41.74h64.649c-10.576 151.723-137.375 271.935-291.736 271.935-67.383 0-129.508-22.921-179.015-61.355l-91.278 106.786c76.467 61.406 170.808 94.783 270.295 94.783 115.572 0 224.23-45.005 305.956-126.731 76.863-76.863 121.236-177.556 126.242-285.416h54.562c21.618-0.002 33.189-25.446 18.984-41.742z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg className="t3-provider-info-bar__icon t3-provider-info-bar__icon--lock" viewBox="0 0 1024 1024" style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}>
      <path d="M204.8 409.6v-102.4c0-169.662 137.538-307.2 307.2-307.2s307.2 137.538 307.2 307.2v0 102.4h51.2c56.554 0 102.4 45.846 102.4 102.4v0 409.6c0 56.554-45.846 102.4-102.4 102.4v0h-716.8c-56.554 0-102.4-45.846-102.4-102.4v0-409.6c0-56.32 46.080-102.4 102.4-102.4h51.2zM460.8 754.176v116.224h102.4v-116.224c30.824-18.035 51.2-50.978 51.2-88.681 0-56.554-45.846-102.4-102.4-102.4s-102.4 45.846-102.4 102.4c0 37.703 20.376 70.646 50.717 88.419l0.483 0.262zM358.4 307.2v102.4h307.2v-102.4c0-84.831-68.769-153.6-153.6-153.6s-153.6 68.769-153.6 153.6v0z"></path>
    </svg>
  );
}

function IconSearch() {
  return (
    <svg className="t3-provider-search__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.2 15.2L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NextspinProviderLayout() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nextspinGames;
    return nextspinGames.filter((g) => g.label.toLowerCase().includes(q));
  }, [query]);

  return (
    <section
      className="t3-provider-game-page space-y-5"
      style={{ background: "var(--bg)", fontFamily: "var(--base-font-family)" }}
    >
      <div
        className="inline-flex w-fit max-w-full items-center gap-2 rounded-full px-5 text-sm font-semibold"
        style={{
          background: "var(--surface-3)",
          color: "var(--muted)",
          lineHeight: "36px",
        }}
      >
        <a href="#/games" className="no-underline" style={{ color: "var(--muted)" }}>
          All
        </a>
        <ChevronRight />
        <span style={{ color: "var(--primary)" }}>Nextspin</span>
      </div>

      <h1 className="m-0 text-[22px] font-bold leading-tight md:text-[26px]" style={{ color: "var(--primary)" }}>
        Nextspin
      </h1>

      <div className="overflow-hidden rounded-xl">
        <img src={NEXTSPIN_BANNER} alt="Nextspin" className="block h-auto w-full object-cover" />
      </div>

      <div
        className="rounded-lg p-2"
        style={{
          background: "#f4f4f5",
        }}
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-md bg-white px-4 py-2.5 shadow-sm">
            <div className="flex flex-col leading-tight">
              <span className="text-[12px] font-medium" style={{ color: "var(--gold)" }}>Wallet</span>
              <span className="mt-0.5 text-[15px] font-bold" style={{ color: "var(--primary-dark)" }}>0.00</span>
            </div>
            <button type="button" className="flex h-[22px] w-[22px] items-center justify-center transition-opacity hover:opacity-80" aria-label="Refresh wallet" style={{ color: "var(--primary-dark)" }}>
              <IconRefresh />
            </button>
          </div>
          <div className="flex items-center justify-between rounded-md bg-white px-4 py-2.5 shadow-sm">
            <div className="flex flex-col leading-tight">
              <span className="text-[12px] font-medium" style={{ color: "var(--gold)" }}>Membership Rebate</span>
              <span className="mt-0.5 text-[15px] font-bold" style={{ color: "var(--primary-dark)" }}>0.00%</span>
            </div>
            <span className="flex h-[20px] w-[20px] items-center justify-center" aria-hidden style={{ color: "var(--primary-dark)" }}>
              <IconLock />
            </span>
          </div>
        </div>
      </div>


      <div
        className="flex items-center gap-3 rounded-lg border bg-white px-[20px] py-[12px]"
        style={{ borderColor: "var(--panel-item-border)" }}
      >
        <span className="flex h-5 w-5 items-center justify-center" style={{ color: "var(--primary-dark)" }}>
          <IconSearch />
        </span>
        <input
          type="search"
          className="w-full bg-transparent text-[14px] font-medium outline-none placeholder:text-[#b89b7b]"
          style={{ color: "var(--text)" }}
          placeholder="Search games..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search games"
        />
      </div>


      <div className="t3-game-list-box t3-provider-game-page__game-box">
        <div className="t3-game-list-grid t3-provider-game-page__grid">
          {filtered.map((g) => (
            <article key={g.id} className="t3-game-list-item">
              <a href={`#/provider/nextspin/${g.id}`} className="block no-underline">
                <div className="t3-game-list-image-box">
                  <div className="image">
                    <img src={g.src} alt={g.label} className="t3-game-list-image t3-provider-game-page__thumb" />
                  </div>
                </div>
                <div className="t3-game-list-meta t3-provider-game-page__meta">
                  <p className="t3-provider-game-page__title">{g.label}</p>
                  <RtpInfoBadge thumbUrl={g.src} gameName={g.label} rtpPercent={g.rtp} showGameName={false} />
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProviderDetailPage({ provider }: ProviderDetailPageProps) {
  if (provider === "nextspin") {
    return <NextspinProviderLayout />;
  }

  const meta = providerMeta.pgsoft;
  const tiles = pgSoftTiles;

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-xl">
        <img src={meta.banner} alt={`${meta.title} banner`} className="block h-auto w-full object-cover" />
      </div>

      <section className="t3-game-list-box">
        <div className="mb-3 px-1 text-sm font-bold uppercase tracking-wide" style={{ color: "var(--primary-dark)" }}>
          {meta.title} Games
        </div>
        <div className="t3-game-list-grid">
          {tiles.map((t) => (
            <article key={t.id} className="t3-game-list-item">
              <div className="t3-game-list-image-box">
                <div className="image">
                  <img src={t.src} alt={t.label} className="t3-game-list-image first" />
                </div>
              </div>
              <div className="t3-game-list-meta">
                <p className="t3-game-list-title">{t.label}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
