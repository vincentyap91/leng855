import { useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type GamePlayPageProps = {
  gameId: string;
  gameLabel: string;
  provider: string;
  providerSlug: string;
  gameSrc: string; // thumbnail / iframe src
  iframeUrl?: string;
};

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const RANKING_COLS = ["Rank", "Username", "Date", "Bet Amount", "Payout", "Win Amount"];

const LATEST_BETS = [
  { betId: "5914261", username: "s**9", dateTime: "12-Apr-2026 02:48:40 PM", betAmount: "0.40" },
  { betId: "5914262", username: "s**9", dateTime: "12-Apr-2026 02:48:37 PM", betAmount: "0.40" },
  { betId: "5914263", username: "s**9", dateTime: "12-Apr-2026 02:48:34 PM", betAmount: "0.40" },
  { betId: "5914264", username: "s**9", dateTime: "12-Apr-2026 02:48:31 PM", betAmount: "0.40" },
  { betId: "5914265", username: "s**9", dateTime: "12-Apr-2026 02:48:28 PM", betAmount: "0.40" },
  { betId: "5914266", username: "s**9", dateTime: "12-Apr-2026 02:48:26 PM", betAmount: "0.40" },
  { betId: "5914010", username: "s**9", dateTime: "12-Apr-2026 02:48:18 PM", betAmount: "0.40" },
  { betId: "5914011", username: "s**9", dateTime: "12-Apr-2026 02:48:15 PM", betAmount: "0.40" },
  { betId: "5914012", username: "s**9", dateTime: "12-Apr-2026 02:48:12 PM", betAmount: "0.40" },
  { betId: "5914013", username: "s**9", dateTime: "12-Apr-2026 02:48:09 PM", betAmount: "0.40" },
];

// ---------------------------------------------------------------------------
// Icon sub-components
// ---------------------------------------------------------------------------
function ChevronRight() {
  return (
    <span aria-hidden className="inline-block text-[var(--muted)]" style={{ transform: "translateY(1px)" }}>
      &gt;
    </span>
  );
}

function IconHamburger() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function IconNoData() {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 opacity-40" aria-hidden>
      <rect x="8" y="10" width="40" height="44" rx="3" fill="#c0c4cc" />
      <rect x="14" y="20" width="28" height="3" rx="1.5" fill="#fff" />
      <rect x="14" y="28" width="20" height="3" rx="1.5" fill="#fff" />
      <rect x="14" y="36" width="24" height="3" rx="1.5" fill="#fff" />
      <circle cx="46" cy="46" r="12" fill="#e0e0e0" stroke="#b0b0b0" strokeWidth="2" />
      <circle cx="46" cy="46" r="7" fill="none" stroke="#b0b0b0" strokeWidth="2" />
      <line x1="51" y1="51" x2="57" y2="57" stroke="#b0b0b0" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Game Viewport
// ---------------------------------------------------------------------------
function GameViewport({ src, label, iframeUrl }: { src: string; label: string; iframeUrl?: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ background: "#1a1a2e" }}>
      {/* 16:9 aspect ratio container */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {iframeUrl ? (
          <iframe
            src={iframeUrl}
            title={label}
            className="absolute inset-0 h-full w-full border-none"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={src}
              alt={label}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Session / game-id watermark (top-left) */}
            <div
              className="absolute left-3 top-2 text-[9px] font-mono opacity-60 select-none"
              style={{ color: "#fff" }}
            >
              8026011309168
            </div>
            {/* Game title watermark (top-right) */}
            <div
              className="absolute right-3 top-2 text-[11px] font-semibold opacity-80 select-none"
              style={{ color: "#fff" }}
            >
              {label}
            </div>
          </>
        )}
        {/* Bottom overlay bar */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-2 px-4 py-2"
          style={{ background: "rgba(0,0,0,0.78)" }}
        >
          {/* Balance */}
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
              Balance(USD)
            </span>
            <span className="text-[20px] font-black tabular-nums leading-tight" style={{ color: "var(--gold)" }}>
              0.00
            </span>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              2026-04-30, 15:08:53 GMT+8 | NS99FA7791
            </span>
          </div>

          {/* Total Win */}
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
              Total Win(USD)
            </span>
            <span className="text-[20px] font-black tabular-nums leading-tight" style={{ color: "var(--gold)" }}>
              0.00
            </span>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              243 Ways
            </span>
          </div>

          {/* Bet */}
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
              Bet(USD)
            </span>
            <span className="text-[20px] font-black tabular-nums leading-tight" style={{ color: "var(--gold)" }}>
              0.80
            </span>
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              Bet Multiplier ×2
            </span>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Game menu"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
          >
            <IconHamburger />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ranking Section
// ---------------------------------------------------------------------------
function RankingSection({ gameLabel, provider }: { gameLabel: string; provider: string }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: "var(--surface)",
        borderColor: "var(--panel-item-border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Title + button */}
      <p className="mb-3 text-[13px]" style={{ color: "var(--text)" }}>
        <span className="font-extrabold" style={{ color: "var(--primary)" }}>
          {gameLabel}
        </span>{" "}
        <span className="font-medium" style={{ color: "var(--muted)" }}>
          by {provider}
        </span>
      </p>
      <button
        type="button"
        className="mb-4 rounded-md px-5 py-1.5 text-sm font-bold text-white transition hover:brightness-110"
        style={{ background: "var(--primary)" }}
      >
        Ranking
      </button>

      {/* Table header */}
      <div
        className="grid text-[12px] font-bold text-white"
        style={{
          gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr 2fr",
          background: "var(--primary)",
          borderRadius: "6px 6px 0 0",
          padding: "8px 12px",
        }}
      >
        {RANKING_COLS.map((col) => (
          <span key={col} className={col === "Rank" ? "" : "text-center"}>{col}</span>
        ))}
      </div>

      {/* Empty state */}
      <div
        className="flex flex-col items-center justify-center gap-2 py-10"
        style={{
          border: "1px solid var(--panel-item-border)",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          background: "#f9f9f9",
        }}
      >
        <IconNoData />
        <p className="text-[13px] font-medium" style={{ color: "var(--muted)" }}>
          No Data Found
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Latest Bets Section
// ---------------------------------------------------------------------------
function LatestBetsSection() {
  const [showAll, setShowAll] = useState(false);
  const rows = showAll ? LATEST_BETS : LATEST_BETS.slice(0, 10);

  return (
    <div
      className="rounded-xl border"
      style={{
        background: "var(--surface)",
        borderColor: "var(--panel-item-border)",
        boxShadow: "var(--card-shadow)",
        overflow: "hidden",
      }}
    >
      {/* Section title */}
      <div className="px-4 py-3">
        <h2 className="text-[15px] font-extrabold" style={{ color: "var(--primary-dark)" }}>
          Latest Bets
        </h2>
      </div>

      {/* Table */}
      <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--primary)" }}>
            {["Bet ID", "Username", "Date/Time", "Bet Amount"].map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left font-bold text-white"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.betId}
              style={{
                background: i % 2 === 0 ? "#ffffff" : "#fafafa",
                borderBottom: "1px solid var(--panel-item-border)",
              }}
            >
              <td className="px-4 py-2.5 font-medium" style={{ color: "var(--text)" }}>
                {row.betId}
              </td>
              <td className="px-4 py-2.5 font-medium" style={{ color: "var(--primary)" }}>
                {row.username}
              </td>
              <td className="px-4 py-2.5" style={{ color: "var(--muted)" }}>
                {row.dateTime}
              </td>
              <td className="px-4 py-2.5 font-extrabold" style={{ color: "var(--gold)" }}>
                {row.betAmount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show More */}
      <div className="flex justify-center py-4">
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="rounded-md px-10 py-2 text-sm font-bold text-white transition hover:brightness-110 active:scale-95"
          style={{ background: "var(--primary)" }}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export function GamePlayPage({
  gameId: _gameId,
  gameLabel,
  provider,
  providerSlug,
  gameSrc,
  iframeUrl,
}: GamePlayPageProps) {
  return (
    <section
      className="w-full space-y-5"
      style={{ fontFamily: "var(--base-font-family, Poppins, system-ui, sans-serif)" }}
    >
      {/* Breadcrumbs */}
      <div
        className="inline-flex w-fit max-w-full items-center gap-2 rounded-full px-5 text-sm font-semibold"
        style={{ background: "var(--surface-3)", color: "var(--muted)", lineHeight: "36px" }}
      >
        <a href="#/games" className="no-underline" style={{ color: "var(--muted)" }}>
          All
        </a>
        <ChevronRight />
        <a href={`#/provider/${providerSlug}`} className="no-underline" style={{ color: "var(--muted)" }}>
          {provider}
        </a>
        <ChevronRight />
        <span className="rounded-full px-3 py-0.5 text-sm font-bold text-white" style={{ background: "var(--primary)" }}>
          {gameLabel}
        </span>
      </div>

      {/* Game title */}
      <h1
        className="m-0 text-[20px] font-extrabold leading-tight md:text-[22px]"
        style={{ color: "var(--primary)" }}
      >
        {gameLabel}
      </h1>

      {/* Game Viewport */}
      <GameViewport src={gameSrc} label={gameLabel} iframeUrl={iframeUrl} />

      {/* Ranking */}
      <RankingSection gameLabel={gameLabel} provider={provider} />

      {/* Latest Bets */}
      <LatestBetsSection />
    </section>
  );
}
