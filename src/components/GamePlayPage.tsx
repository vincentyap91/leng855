

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
    <span aria-hidden className="inline-block text-[var(--text-secondary)]" style={{ transform: "translateY(1px)" }}>
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
      <rect x="8" y="10" width="40" height="44" rx="3" fill="var(--border-strong)" />
      <rect x="14" y="20" width="28" height="3" rx="1.5" fill="var(--text-on-emphasis)" />
      <rect x="14" y="28" width="20" height="3" rx="1.5" fill="var(--text-on-emphasis)" />
      <rect x="14" y="36" width="24" height="3" rx="1.5" fill="var(--text-on-emphasis)" />
      <circle cx="46" cy="46" r="12" fill="var(--border-default)" stroke="var(--border-strong)" strokeWidth="2" />
      <circle cx="46" cy="46" r="7" fill="none" stroke="var(--border-strong)" strokeWidth="2" />
      <line x1="51" y1="51" x2="57" y2="57" stroke="var(--border-strong)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Game Viewport
// ---------------------------------------------------------------------------
function GameViewport({ src, label, iframeUrl }: { src: string; label: string; iframeUrl?: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl" style={{ background: "var(--surface-inverse)" }}>
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
              style={{ color: "var(--text-on-emphasis)" }}
            >
              8026011309168
            </div>
            {/* Game title watermark (top-right) */}
            <div
              className="absolute right-3 top-2 text-[11px] font-semibold opacity-80 select-none"
              style={{ color: "var(--text-on-emphasis)" }}
            >
              {label}
            </div>
          </>
        )}
        {/* Bottom overlay bar */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-2 px-4 py-2"
          style={{ background: "color-mix(in srgb, var(--surface-inverse) 78%, transparent)" }}
        >
          {/* Balance */}
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] font-semibold tracking-wide" style={{ color: "color-mix(in srgb, var(--text-on-emphasis) 65%, transparent)" }}>
              Balance(USD)
            </span>
            <span className="text-[20px] font-black tabular-nums leading-tight" style={{ color: "var(--accent-soft)" }}>
              0.00
            </span>
            <span className="text-[9px]" style={{ color: "color-mix(in srgb, var(--text-on-emphasis) 45%, transparent)" }}>
              2026-04-30, 15:08:53 GMT+8 | NS99FA7791
            </span>
          </div>

          {/* Total Win */}
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] font-semibold tracking-wide" style={{ color: "color-mix(in srgb, var(--text-on-emphasis) 65%, transparent)" }}>
              Total Win(USD)
            </span>
            <span className="text-[20px] font-black tabular-nums leading-tight" style={{ color: "var(--accent-soft)" }}>
              0.00
            </span>
            <span className="text-[9px]" style={{ color: "color-mix(in srgb, var(--text-on-emphasis) 45%, transparent)" }}>
              243 Ways
            </span>
          </div>

          {/* Bet */}
          <div className="flex flex-col items-center min-w-0">
            <span className="text-[10px] font-semibold tracking-wide" style={{ color: "color-mix(in srgb, var(--text-on-emphasis) 65%, transparent)" }}>
              Bet(USD)
            </span>
            <span className="text-[20px] font-black tabular-nums leading-tight" style={{ color: "var(--accent-soft)" }}>
              0.80
            </span>
            <span className="text-[9px]" style={{ color: "color-mix(in srgb, var(--text-on-emphasis) 45%, transparent)" }}>
              Bet Multiplier ×2
            </span>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Game menu"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--text-on-emphasis)]/30 text-[var(--text-on-emphasis)] transition hover:bg-[var(--surface-base)]/10"
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
      className="rounded-xl p-4"
      style={{
        background: "var(--surface-muted)",
      }}
    >
      {/* Title */}
      <p className="mb-3 text-[14px]">
        <span className="font-extrabold" style={{ color: "var(--action-primary-hover)" }}>
          {gameLabel}
        </span>{" "}
        <span className="font-medium" style={{ color: "var(--action-primary-hover)" }}>
          by <span className="underline">{provider}</span>
        </span>
      </p>

      {/* Button */}
      <button
        type="button"
        className="mb-4 rounded-md px-8 py-1.5 text-[13px] font-bold text-[var(--text-on-emphasis)] transition hover:brightness-110"
        style={{ background: "var(--action-primary-hover)" }}
      >
        Ranking
      </button>

      {/* Table header */}
      <div
        className="grid text-[13px] font-bold text-[var(--text-on-emphasis)]"
        style={{
          gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr 2fr",
          background: "var(--action-primary-hover)",
          borderRadius: "6px 6px 0 0",
          padding: "10px 12px",
        }}
      >
        {RANKING_COLS.map((col) => (
          <span key={col} className={col === "Rank" ? "" : "text-center"}>{col}</span>
        ))}
      </div>

      {/* Empty state */}
      <div
        className="flex flex-col items-center justify-center gap-2 py-12"
        style={{
          borderRadius: "0 0 6px 6px",
          background: "var(--surface-base)",
        }}
      >
        <IconNoData />
        <p className="text-[13px] font-bold" style={{ color: "var(--text-muted)" }}>
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
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "var(--surface-muted)",
      }}
    >
      {/* Section title */}
      <div className="mb-4">
        <h2 className="text-[14px] font-extrabold" style={{ color: "var(--action-primary-hover)" }}>
          Latest Bets
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md" style={{ background: "var(--surface-base)" }}>
        <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--action-primary-hover)" }}>
              {["Bet ID", "Username", "Date/Time", "Bet Amount"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-bold text-[var(--text-on-emphasis)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LATEST_BETS.map((row, i) => (
              <tr
                key={row.betId}
                style={{
                  borderBottom: i === LATEST_BETS.length - 1 ? "none" : "1px solid var(--accent-strong)",
                }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: "var(--text-primary)" }}>
                  {row.betId}
                </td>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--accent-strong)" }}>
                  {row.username}
                </td>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--action-primary-hover)" }}>
                  {row.dateTime}
                </td>
                <td className="px-4 py-3 font-extrabold text-right sm:text-left" style={{ color: "var(--accent-soft)" }}>
                  {row.betAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        className="inline-flex w-fit max-w-full items-center gap-2 rounded-full px-5 text-sm"
        style={{ background: "var(--accent-strong)", lineHeight: "36px" }}
      >
        <a href="#/games" className="no-underline font-medium" style={{ color: "var(--text-secondary)" }}>
          All
        </a>
        <ChevronRight />
        <a href={`#/provider/${providerSlug}`} className="no-underline font-medium" style={{ color: "var(--text-secondary)" }}>
          {provider}
        </a>
        <ChevronRight />
        <span className="font-bold" style={{ color: "var(--action-primary-hover)" }}>
          {gameLabel}
        </span>
      </div>

      {/* Game title */}
      <h1
        className="m-0 text-[20px] font-extrabold leading-tight md:text-[22px]"
        style={{ color: "var(--accent-strong)" }}
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
