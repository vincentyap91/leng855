import { useState } from "react";

type CashTab = "deposit" | "withdrawal";

function TabChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor" width="20" height="20">
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}

function AccordionChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor" width="22" height="22">
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  );
}

/** Bank building — `vicon`-style inline icon */
function BankCategoryIcon() {
  return (
    <svg
      className="vicon shrink-0 text-[var(--primary)]"
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M8 20h32L24 8 8 20z" strokeLinejoin="round" />
      <path d="M12 20v18M20 20v18M28 20v18M36 20v18" strokeLinecap="round" />
      <path d="M6 38h36" strokeLinecap="round" />
    </svg>
  );
}

/** Letter C in circle — crypto category */
function CryptoCategoryIcon() {
  return (
    <svg
      className="vicon shrink-0 text-[var(--primary)]"
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="24" cy="24" r="18" />
      <path d="M31 17c-2.4-2.3-5.5-3.5-9-3.5-7.2 0-13 5.8-13 13s5.8 13 13 13c3.4 0 6.4-1.3 8.7-3.4" strokeLinecap="round" />
    </svg>
  );
}

const BANKS: { name: string; limit: string; logoUrl: string }[] = [
  {
    name: "ABA Bank",
    limit: "1 - 30000",
    logoUrl: "https://pksoftcdn.azureedge.net/media/460x0w-202507091830448513-202507101300150058.png",
  },
  {
    name: "Aclede Bank",
    limit: "1 - 30000",
    logoUrl: "https://pksoftcdn.azureedge.net/media/unnamed-202508071730342724.png",
  },
  {
    name: "WING Bank (Cambodia) Plc",
    limit: "1 - 2000",
    logoUrl: "https://pksoftcdn.azureedge.net/media/cffec3f2fc237b5e9baefcff21783b7c_icon-202508091238382637.png",
  },
];

export function DepositPage() {
  const [cashTab, setCashTab] = useState<CashTab>("deposit");
  const [bankOpen, setBankOpen] = useState(true);

  return (
    <section className="deposit-page mx-auto w-full max-w-4xl px-4 py-6" style={{ background: "var(--bg)" }}>
      <div className="deposit-page-tabs">
        <button
          type="button"
          onClick={() => setCashTab("deposit")}
          className={["deposit-cash-tab", cashTab === "deposit" ? "deposit-cash-tab--active" : "deposit-cash-tab--inactive"].join(" ")}
        >
          Deposit
        </button>
        <button
          type="button"
          onClick={() => setCashTab("withdrawal")}
          className={["deposit-cash-tab", cashTab === "withdrawal" ? "deposit-cash-tab--active" : "deposit-cash-tab--inactive"].join(" ")}
        >
          Withdrawal
          <TabChevronRight className="deposit-tab-chevron shrink-0" />
        </button>
      </div>

      <p className="mb-5 text-sm sm:text-[15px]" style={{ color: "var(--muted)" }}>
        Select a reload option from the available options.
      </p>

      {cashTab === "deposit" ? (
        <div className="deposit-accordion-stack flex flex-col gap-3">
          <div className={`t3-accordion-item deposit-accordion-item rounded-xl border ${bankOpen ? "active" : ""}`} style={{ borderColor: "var(--border)" }}>
            <button
              type="button"
              className="head flex w-full items-center gap-3 px-4 py-3 text-left"
              onClick={() => setBankOpen((o) => !o)}
              aria-expanded={bankOpen}
            >
              <BankCategoryIcon />
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold leading-tight">Bank</div>
                <div className="mt-0.5 text-[13px] font-normal leading-snug text-[var(--muted)]">
                  Normal Bank Transfer
                </div>
              </div>
              <span className="shrink-0 text-[var(--muted)]">{bankOpen ? <AccordionChevronDown /> : <TabChevronRight className="opacity-90" />}</span>
            </button>
            {bankOpen ? (
              <div className="details px-4 pb-4 pt-1">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {BANKS.map((b) => (
                    <button
                      key={b.name}
                      type="button"
                      className="deposit-bank-card flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-[box-shadow] hover:shadow-[var(--card-shadow-hover)]"
                    >
                      <img
                        src={b.logoUrl}
                        alt={b.name}
                        className="h-10 w-10 shrink-0 rounded-lg object-contain bg-[var(--surface)] p-1"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold leading-tight" style={{ color: "var(--text)" }}>
                          {b.name}
                        </div>
                        <div className="mt-1 text-[13px] font-medium" style={{ color: "var(--gold)" }}>
                          {b.limit}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="t3-accordion-item deposit-accordion-item rounded-xl border" style={{ borderColor: "var(--border)" }}>
            <button
              type="button"
              className="head flex w-full items-center gap-3 px-4 py-3 text-left"
              aria-expanded={false}
            >
              <CryptoCategoryIcon />
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold leading-tight">Cryptocurrency</div>
                <div className="mt-0.5 text-[13px] font-normal text-[var(--muted)]">
                  Cryptocurrency (Manual)
                </div>
              </div>
              <span className="shrink-0 text-[var(--muted)]">
                <TabChevronRight className="opacity-90" />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border px-6 py-12 text-center" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
          <p className="text-sm font-semibold" style={{ color: "var(--primary-dark)" }}>
            Withdrawal
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Withdrawal options will appear here.
          </p>
        </div>
      )}
    </section>
  );
}
