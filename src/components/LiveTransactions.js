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
export function LiveTransactions() {
    return (_jsxs("section", { className: "mobile-home-latest-transactions-box", children: [_jsx("h2", { className: "italic font-bold text-[17.5px] text-brand-red tracking-wide", children: "LIVE TRANSACTIONS" }), _jsx("div", { className: "body mt-2 rounded-lg overflow-hidden", style: {
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--gold)",
                    boxShadow: "var(--card-shadow)",
                }, children: _jsxs("table", { className: "t3-custom-table w-full border-collapse text-[13px]", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "h-[34px] px-3 text-center font-bold", children: "Deposit" }), _jsx("th", { className: "h-[34px] px-3 text-center font-bold", children: "Withdrawal" })] }) }), _jsx("tbody", { children: deposits.map((d, i) => (_jsxs("tr", { children: [_jsx("td", { className: "h-[34px] px-3", children: _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "mr-2 inline-block h-5 w-5 rounded-full", style: {
                                                        backgroundColor: "var(--surface-3)",
                                                        border: "1px solid var(--border)",
                                                    } }), _jsx("span", { children: d.account }), _jsx("span", { className: "ml-auto tabular-nums", children: d.amount })] }) }), _jsx("td", { className: "h-[34px] px-3", children: _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "mr-2 inline-block h-5 w-5 rounded-full", style: {
                                                        backgroundColor: "var(--surface-3)",
                                                        border: "1px solid var(--border)",
                                                    } }), _jsx("span", { children: withdrawals[i]?.account }), _jsx("span", { className: "ml-auto tabular-nums", children: withdrawals[i]?.amount })] }) })] }, `${d.account}-${i}`))) })] }) })] }));
}
