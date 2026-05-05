import { assets } from "../data/assets";

type Win = {
  provider: string;
  user: string;
  game: string;
  amount: string;
  thumb: string;
};

const wins: Win[] = [
  {
    provider: "JILI Slot",
    user: "r*****g",
    game: "Ali Baba",
    amount: "0.94",
    thumb: assets.bigwins.chargeBuffalo,
  },
  {
    provider: "Live22",
    user: "k*****n",
    game: "Buffalo Blaze",
    amount: "14.90",
    thumb: assets.bigwins.fortuneGems2,
  },
  {
    provider: "JILI Slot",
    user: "k*****n",
    game: "3 Charge Buffalo",
    amount: "0.50",
    thumb: assets.bigwins.chargeBuffalo,
  },
  {
    provider: "JILI Slot",
    user: "d**m",
    game: "Fortune Gems 2",
    amount: "0.20",
    thumb: assets.bigwins.fortuneGems2,
  },
];

function formatWinAmount(amount: string) {
  return `$${amount.replace(/^USD\s*/i, "").trim()}`;
}

export function RecentBigWins() {
  return (
    <section
      className="rounded-[18px] border p-3.5 sm:p-4"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--primary)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <h2 className="mb-3 flex items-center gap-2">
        <img
          src={assets.trophyGif}
          alt=""
          className="h-7 w-7 shrink-0 object-contain [filter:sepia(0.45)_saturate(1.5)_brightness(0.92)_hue-rotate(-5deg)]"
        />
        <span className="text-[15px] font-bold uppercase leading-none tracking-wide">
          <span className="text-[var(--text)]">RECENT</span>{" "}
          <span className="italic text-[var(--primary)]">BIG WINS</span>
        </span>
      </h2>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3">
        {wins.map((w, i) => (
          <div
            key={i}
            className="flex min-h-0 items-center gap-3 overflow-hidden rounded-[10px] p-2.5 sm:p-3"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={w.thumb}
              alt={w.game}
              className="h-[64px] w-[64px] shrink-0 rounded-lg object-cover sm:h-[68px] sm:w-[68px]"
            />
            <div className="min-w-0 flex-1 text-[13px] leading-snug">
              <p className="text-[var(--text)]">
                Provider: <span className="font-bold">{w.provider}</span>
              </p>
              <p className="mt-0.5 text-[var(--muted)]">
                {w.user} in <span className="font-bold text-[var(--gold)]">{w.game}</span> won
              </p>
              <p className="mt-1 text-base font-extrabold tabular-nums text-[var(--primary)] sm:text-[17px]">
                {formatWinAmount(w.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
