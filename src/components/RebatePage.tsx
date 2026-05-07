import { assets } from "../data/assets";

function ChevronRight() {
  return (
    <span aria-hidden className="inline-block" style={{ transform: "translateY(1px)" }}>
      &gt;
    </span>
  );
}

export type RebatePageProps = {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
};

export function RebatePage({ isLoggedIn = false, onLoginClick }: RebatePageProps) {
  const brandRed = "var(--brand-3)";
  const brandGold = "var(--brand-1)";
  const accentSoft = "var(--accent-soft)";
  const borderDefault = "var(--border-default)";
  const panelBorder = "var(--panel-item-border)";
  const surfaceBase = "var(--surface-base)";
  const surfaceMuted = "var(--surface-muted)";
  const tableHeaderBg = "var(--ref-30)";
  const textPrimary = "var(--text-primary)";
  const textSecondary = "var(--text-secondary)";
  const baseFont = "var(--base-font-family)";

  const tiers = ["Normal", "Bronze", "Silver", "Gold", "Platinum", "Diamond"];
  const categories = ["Sport", "Live Casino", "Slot", "Fish Hunt", "ESport", "RNG"];
  const percentages = ["5%", "6%", "7%", "8%", "9%", "10%"];

  return (
    <section className="t3-rebate-content w-full pb-10" style={{ fontFamily: baseFont, background: surfaceBase }}>
      <div className="mx-auto w-full max-w-[1430px] px-4 py-5">
        {/* Breadcrumbs */}
        <div
          className="inline-flex w-fit max-w-full items-center gap-2 rounded-full text-sm font-semibold"
          style={{
            background: surfaceMuted,
            color: textSecondary,
            padding: "3px 20px",
            lineHeight: "36px",
            marginBottom: "20px",
          }}
        >
          <a href="#/" style={{ color: textSecondary, textDecoration: "none" }} aria-label="Home">
            Home
          </a>
          <ChevronRight />
          <span style={{ color: brandRed }}>Rebate</span>
        </div>

        <h1 className="m-0 mb-6 text-[18px] font-extrabold tracking-tight" style={{ color: brandRed }}>
          Our Rebate System
        </h1>

        {!isLoggedIn ? (
          <div
            className="rounded-xl border p-10 text-center"
            style={{
              background: surfaceBase,
              borderColor: panelBorder,
              boxShadow: "var(--card-shadow)"
            }}
          >
            <p className="m-0 mb-4 text-[16px] font-bold" style={{ color: textPrimary }}>
              Log In to View Your Rebate Info
            </p>
            <button
              type="button"
              className="rounded-lg px-8 py-3 text-sm font-extrabold transition-all hover:brightness-110"
              style={{ background: "var(--cta-gradient)", color: "var(--text-on-emphasis)" }}
              onClick={() => onLoginClick?.()}
            >
              Login Now!
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Claimable Rebate Card (Top) */}
            <div
              className="rounded-xl border p-[20px]"
              style={{
                background: surfaceMuted,
                borderColor: accentSoft,
                boxShadow: "var(--card-shadow)",
              }}
            >
              <div className="text-[15px] font-bold" style={{ color: brandRed }}>
                Claimable Rebate: <span className="font-extrabold" style={{ color: brandGold }}>$0.000</span>
              </div>
            </div>

            {/* My Rebate & Sales Section */}
            <div
              className="rounded-xl border p-[20px]"
              style={{
                background: surfaceMuted,
                borderColor: panelBorder,
                boxShadow: "var(--card-shadow)",
              }}
            >
              <h2 className="m-0 mb-4 text-[17px] font-extrabold tracking-tight" style={{ color: brandRed }}>
                My Rebate & Sales
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="rounded-xl border p-[20px]"
                  style={{ background: surfaceBase, borderColor: borderDefault }}
                >
                  <div className="text-[14px] font-bold" style={{ color: brandRed }}>Total Lifetime Rebate</div>
                  <div className="mt-2 text-[20px] font-extrabold tabular-nums tracking-tight" style={{ color: brandGold }}>$0.000</div>
                </div>
                <div
                  className="rounded-xl border p-[20px]"
                  style={{ background: surfaceBase, borderColor: borderDefault }}
                >
                  <div className="text-[14px] font-bold" style={{ color: brandRed }}>My Individual Sales</div>
                  <div className="mt-2 text-[20px] font-extrabold tabular-nums tracking-tight" style={{ color: brandGold }}>$0.000</div>
                </div>
              </div>
            </div>

            {/* Membership Rebate Section */}
            <div
              className="rounded-xl border p-[20px]"
              style={{
                background: surfaceBase,
                borderColor: panelBorder,
                boxShadow: "var(--card-shadow)",
              }}
            >
              <h2 className="m-0 mb-6 text-[17px] font-extrabold tracking-tight" style={{ color: brandRed }}>
                Membership Rebate
              </h2>
              <div className="overflow-hidden rounded-xl border" style={{ borderColor: borderDefault }}>
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse">
                    <thead>
                      <tr style={{ background: tableHeaderBg }}>
                        <th className="w-40 border-b border-r px-4 py-3" style={{ borderColor: borderDefault }}></th>
                        {tiers.map((tier) => (
                          <th
                            key={tier}
                            className="border-b border-r px-4 py-3 text-center text-[14px] font-extrabold last:border-r-0"
                            style={{ color: brandRed, borderColor: borderDefault }}
                          >
                            {tier}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat) => (
                        <tr key={cat} className="last:border-b-0" style={{ borderBottom: `1px solid ${borderDefault}` }}>
                          <td
                            className="border-r px-4 py-3 text-[14px] font-bold"
                            style={{ color: brandRed, borderColor: borderDefault }}
                          >
                            {cat}
                          </td>
                          {percentages.map((pct, idx) => (
                            <td
                              key={`${cat}-${tiers[idx]}`}
                              className="border-r px-4 py-3 text-center text-[13px] tabular-nums last:border-r-0"
                              style={{ color: textPrimary, borderColor: borderDefault }}
                            >
                              {pct}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

