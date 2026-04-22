type Row = { account: string; amount: string };

const deposits: Row[] = [
  { account: "*****rn", amount: "1.00" },
  { account: "*****rn", amount: "1.50" },
  { account: "***un", amount: "15.00" },
  { account: "**mm", amount: "10.00" },
];

const withdrawals: Row[] = [
  { account: "*******12", amount: "11.00" },
  { account: "**mm", amount: "26.00" },
  { account: "***un", amount: "100.00" },
  { account: "***un", amount: "300.00" },
];

function Avatar() {
  return (
    <span
      className="inline-block w-5 h-5 rounded-full mr-2 align-middle"
      style={{
        backgroundColor: "var(--surface-3)",
        border: "1px solid var(--border)",
      }}
    />
  );
}

function Column({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-[34px] bg-gold-header flex items-center justify-center">
        <span className="text-sm font-bold text-[var(--on-gold)]">{title}</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className={[
            "h-[34px] flex items-center px-[14px] text-[13px] text-[var(--text)]",
            i % 2 === 0 ? "bg-bg-rowAlt" : "bg-bg-row",
          ].join(" ")}
        >
          <Avatar />
          <span>{r.account}</span>
          <span className="ml-auto tabular-nums">{r.amount}</span>
        </div>
      ))}
    </div>
  );
}

export function LiveTransactions() {
  return (
    <section>
      <h2 className="italic font-bold text-[17.5px] text-brand-red tracking-wide">
        LIVE TRANSACTIONS
      </h2>
      <div
        className="mt-2 rounded-lg overflow-hidden flex"
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid #D4AF37",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <Column title="Deposit" rows={deposits} />
        <Column title="Withdrawal" rows={withdrawals} />
      </div>
    </section>
  );
}
