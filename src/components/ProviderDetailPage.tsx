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
    <svg className="t3-provider-info-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12a9 9 0 00-9-9 9.75 9.75 0 00-6.74 2.74L3 8M3 3v5h5M3 12a9 9 0 009 9 9.75 9.75 0 006.74-2.74L21 16M21 21v-5h-5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg className="t3-provider-info-bar__icon t3-provider-info-bar__icon--lock" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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

      <div className="t3-provider-info-bar grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="t3-provider-info-bar__cell">
          <div className="t3-provider-info-bar__labels">
            <span className="t3-provider-info-bar__label">Wallet</span>
            <span className="t3-provider-info-bar__value t3-provider-info-bar__value--gold">0.00</span>
          </div>
          <button type="button" className="t3-provider-info-bar__action" aria-label="Refresh wallet">
            <IconRefresh />
          </button>
        </div>
        <div className="t3-provider-info-bar__cell">
          <div className="t3-provider-info-bar__labels">
            <span className="t3-provider-info-bar__label">Membership Rebate</span>
            <span className="t3-provider-info-bar__value t3-provider-info-bar__value--gold">0.00%</span>
          </div>
          <span className="t3-provider-info-bar__action t3-provider-info-bar__action--static" aria-hidden>
            <IconLock />
          </span>
        </div>
      </div>

      <div className="t3-provider-search">
        <IconSearch />
        <input
          type="search"
          className="t3-provider-search__input"
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
              <a href="#" className="block no-underline" onClick={(e) => e.preventDefault()}>
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
