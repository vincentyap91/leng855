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

export function LiveTransactions() {
  return (
    <section className="mobile-home-latest-transactions-box">
      <h2 className="italic font-bold text-[17.5px] text-brand-emphasis tracking-wide">
        LIVE TRANSACTIONS
      </h2>
      <div
        className="body mt-2 rounded-lg overflow-hidden"
        style={{
          backgroundColor: "var(--surface-base)",
          border: "1px solid var(--accent-soft)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <table className="t3-custom-table live-transactions-dw-table w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="live-transactions-dw-table__deposit h-[34px] px-3 text-center font-bold">
                Deposit
              </th>
              <th className="h-[34px] px-3 text-center font-bold">Withdrawal</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((d, i) => (
              <tr key={`${d.account}-${i}`}>
                <td className="live-transactions-dw-table__deposit h-[34px] px-3">
                  <div className="flex items-center">
                    <span
                      className="mr-2 inline-block h-5 w-5 rounded-full"
                      style={{
                        backgroundColor: "var(--surface-muted)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    />
                    <span>{d.account}</span>
                    <span className="ml-auto tabular-nums">{d.amount}</span>
                  </div>
                </td>
                <td className="h-[34px] px-3">
                  <div className="flex items-center">
                    <span
                      className="mr-2 inline-block h-5 w-5 rounded-full"
                      style={{
                        backgroundColor: "var(--surface-muted)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    />
                    <span>{withdrawals[i]?.account}</span>
                    <span className="ml-auto tabular-nums">{withdrawals[i]?.amount}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
