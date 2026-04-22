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
    user: "k*****n",
    game: "3 Charge Buffalo",
    amount: "USD0.50",
    thumb: assets.bigwins.chargeBuffalo,
  },
  {
    provider: "JILI Slot",
    user: "k*****n",
    game: "3 Charge Buffalo",
    amount: "USD0.50",
    thumb: assets.bigwins.chargeBuffalo,
  },
  {
    provider: "JILI Slot",
    user: "k*****n",
    game: "3 Charge Buffalo",
    amount: "USD0.24",
    thumb: assets.bigwins.chargeBuffalo,
  },
  {
    provider: "JILI Slot",
    user: "r*****n",
    game: "Fortune Gems 2",
    amount: "USD0.20",
    thumb: assets.bigwins.fortuneGems2,
  },
  {
    provider: "JILI Slot",
    user: "d**m",
    game: "Pirate Queen 2",
    amount: "USD2.25",
    thumb: assets.bigwins.pirateQueen2,
  },
  {
    provider: "JILI Slot",
    user: "d**m",
    game: "Pirate Queen 2",
    amount: "USD3.04",
    thumb: assets.bigwins.pirateQueen2,
  },
];

function formatWinAmount(amount: string) {
  return amount.replace(/^USD/i, "USD ");
}

export function RecentBigWins() {
  return (
    <section
      className="rounded-xl border p-4"
      style={{
        backgroundColor: "#F5F5F5",
        borderColor: "#D4AF37",
      }}
    >
      <h2 className="mb-3 flex items-center gap-2">
        <img
          src={assets.trophyGif}
          alt=""
          className="h-6 w-6 shrink-0 object-contain [filter:sepia(0.5)_saturate(1.4)_brightness(0.95)]"
        />
        <span className="text-[15px] font-bold uppercase leading-none tracking-wide">
          <span className="text-slate-700">RECENT</span>{" "}
          <span className="text-red-600">BIG WINS</span>
        </span>
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {wins.map((w, i) => (
          <div
            key={i}
            className="flex items-center gap-3 overflow-hidden rounded-lg bg-white p-2.5"
            style={{
              border: "1px solid #D4AF37",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
            }}
          >
            <img
              src={w.thumb}
              alt={w.game}
              className="h-[60px] w-[60px] shrink-0 rounded object-cover"
            />
            <div className="min-w-0 text-[13px] leading-snug">
              <p className="text-slate-800">
                Provider:{" "}
                <span className="font-bold text-slate-800">{w.provider}</span>
              </p>
              <p className="text-slate-500">
                {w.user} in{" "}
                <span className="font-semibold text-sky-800">{w.game}</span> won
              </p>
              <p className="text-sm font-bold text-red-600">
                {formatWinAmount(w.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
