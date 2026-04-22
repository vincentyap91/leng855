import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const deposits = [
    { account: "*****rn", amount: "1.00" },
    { account: "*****rn", amount: "1.50" },
    { account: "***un", amount: "15.00" },
    { account: "**mm", amount: "10.00" },
];
const withdrawals = [
    { account: "*******12", amount: "11.00" },
    { account: "**mm", amount: "26.00" },
    { account: "***un", amount: "100.00" },
    { account: "***un", amount: "300.00" },
];
function Avatar() {
    return (_jsx("span", { className: "inline-block w-5 h-5 rounded-full mr-2 align-middle", style: {
            backgroundColor: "var(--surface-3)",
            border: "1px solid var(--border)",
        } }));
}
function Column({ title, rows }) {
    return (_jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsx("div", { className: "h-[34px] bg-gold-header flex items-center justify-center", children: _jsx("span", { className: "text-sm font-bold text-[var(--on-gold)]", children: title }) }), rows.map((r, i) => (_jsxs("div", { className: [
                    "h-[34px] flex items-center px-[14px] text-[13px] text-[var(--text)]",
                    i % 2 === 0 ? "bg-bg-rowAlt" : "bg-bg-row",
                ].join(" "), children: [_jsx(Avatar, {}), _jsx("span", { children: r.account }), _jsx("span", { className: "ml-auto tabular-nums", children: r.amount })] }, i)))] }));
}
export function LiveTransactions() {
    return (_jsxs("section", { children: [_jsx("h2", { className: "italic font-bold text-[17.5px] text-brand-red tracking-wide", children: "LIVE TRANSACTIONS" }), _jsxs("div", { className: "mt-2 rounded-lg overflow-hidden flex", style: {
                    backgroundColor: "var(--surface)",
                    border: "1px solid #D4AF37",
                    boxShadow: "var(--card-shadow)",
                }, children: [_jsx(Column, { title: "Deposit", rows: deposits }), _jsx(Column, { title: "Withdrawal", rows: withdrawals })] })] }));
}
