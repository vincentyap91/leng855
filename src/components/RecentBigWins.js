import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { assets } from "../data/assets";
const wins = [
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
function formatWinAmount(amount) {
    return amount.replace(/^USD/i, "USD ");
}
export function RecentBigWins() {
    return (_jsxs("section", { className: "rounded-xl border p-4", style: {
            backgroundColor: "#F5F5F5",
            borderColor: "#D4AF37",
        }, children: [_jsxs("h2", { className: "mb-3 flex items-center gap-2", children: [_jsx("img", { src: assets.trophyGif, alt: "", className: "h-6 w-6 shrink-0 object-contain [filter:sepia(0.5)_saturate(1.4)_brightness(0.95)]" }), _jsxs("span", { className: "text-[15px] font-bold uppercase leading-none tracking-wide", children: [_jsx("span", { className: "text-slate-700", children: "RECENT" }), " ", _jsx("span", { className: "text-red-600", children: "BIG WINS" })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: wins.map((w, i) => (_jsxs("div", { className: "flex items-center gap-3 overflow-hidden rounded-lg bg-white p-2.5", style: {
                        border: "1px solid #D4AF37",
                        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
                    }, children: [_jsx("img", { src: w.thumb, alt: w.game, className: "h-[60px] w-[60px] shrink-0 rounded object-cover" }), _jsxs("div", { className: "min-w-0 text-[13px] leading-snug", children: [_jsxs("p", { className: "text-slate-800", children: ["Provider:", " ", _jsx("span", { className: "font-bold text-slate-800", children: w.provider })] }), _jsxs("p", { className: "text-slate-500", children: [w.user, " in", " ", _jsx("span", { className: "font-semibold text-sky-800", children: w.game }), " won"] }), _jsx("p", { className: "text-sm font-bold text-red-600", children: formatWinAmount(w.amount) })] })] }, i))) })] }));
}
