import { useEffect, useState, type KeyboardEvent } from "react";

type CashTab = "deposit" | "withdrawal";

function tabActivatorKeyDown(e: KeyboardEvent<HTMLDivElement>, fn: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
}

function TabChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor" width="20" height="20">
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}

/** Reference layout: vicon chevron down (expanded) */
function MenuChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={["vicon shrink-0", className].filter(Boolean).join(" ")}
      viewBox="0 0 1024 1024"
      aria-hidden
      width={18}
      height={18}
      style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}
    >
      <path d="M225.835 414.165l256 256c16.683 16.683 43.691 16.683 60.331 0l256-256c16.683-16.683 16.683-43.691 0-60.331s-43.691-16.683-60.331 0l-225.835 225.835-225.835-225.835c-16.683-16.683-43.691-16.683-60.331 0s-16.683 43.691 0 60.331z" />
    </svg>
  );
}

/** Reference layout: vicon chevron right (collapsed) */
function MenuChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={["vicon shrink-0", className].filter(Boolean).join(" ")}
      viewBox="0 0 1024 1024"
      aria-hidden
      width={18}
      height={18}
      style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}
    >
      <path d="M414.165 798.165l256-256c16.683-16.683 16.683-43.691 0-60.331l-256-256c-16.683-16.683-43.691-16.683-60.331 0s-16.683 43.691 0 60.331l225.835 225.835-225.835 225.835c-16.683 16.683-16.683 43.691 0 60.331s43.691 16.683 60.331 0z" />
    </svg>
  );
}

function BankCategoryIcon() {
  return (
    <svg
      className="theme-icon-size-20 vicon shrink-0 text-[var(--primary)]"
      viewBox="0 0 1088 1024"
      aria-hidden
      width={18}
      height={18}
      style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}
    >
      <path d="M1024 960v-64h-64v-384h64v-64h-192v64h64v384h-192v-384h64v-64h-192v64h64v384h-192v-384h64v-64h-192v64h64v384h-192v-384h64v-64h-192v64h64v384h-64v64h-64v64h1088v-64h-64z" />
      <path d="M512 0h64l512 320v64h-1088v-64l512-320z" />
    </svg>
  );
}

function CryptoCategoryIcon() {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="vicon shrink-0 text-[var(--primary)]"
      aria-hidden
    >
      <path
        d="M12.5 0C19.4034 0.000125719 24.9999 5.59659 25 12.5C25 19.4035 19.4035 24.9999 12.5 25C5.59644 25 3.58285e-08 19.4036 0 12.5C8.65528e-05 5.59651 5.59649 3.58282e-08 12.5 0ZM12.5 1.5C6.42487 1.5 1.5 6.42487 1.5 12.5C1.5 18.5751 6.42487 23.5 12.5 23.5C18.5751 23.5 23.5 18.5751 23.5 12.5C23.5 6.42487 18.5751 1.5 12.5 1.5ZM12.5 3C17.7467 3 22 7.25329 22 12.5C22 17.7467 17.7467 22 12.5 22C7.25329 22 3 17.7467 3 12.5C3 7.25329 7.25329 3 12.5 3ZM12.7988 6.34473L12.8252 7.89648C12.6961 7.88837 12.5652 7.88532 12.4336 7.8877C12.302 7.89007 12.1716 7.89838 12.043 7.91113L12.0166 6.3584L10.4521 6.38672L10.4854 8.34082C8.882 9.09827 7.78703 10.7218 7.81836 12.582C7.84977 14.4421 8.99823 16.0245 10.626 16.7236L10.6592 18.6777L12.2236 18.6494L12.1973 17.0977C12.3264 17.1058 12.4572 17.1088 12.5889 17.1064C12.7205 17.1041 12.8508 17.0958 12.9795 17.083L13.0059 18.6357L14.5703 18.6074L14.5371 16.6533C15.6761 16.1152 16.5585 15.1396 16.9629 13.9531L15.2471 13.9844C14.7216 14.9126 13.7206 15.5494 12.5625 15.5703C10.8347 15.6014 9.41048 14.2506 9.38184 12.5537C9.35326 10.8567 10.7312 9.45519 12.459 9.42383C13.6171 9.4029 14.6389 10.0034 15.1953 10.9121L16.9111 10.8809C16.467 9.70972 15.552 8.76713 14.3955 8.27051L14.3633 6.31641L12.7988 6.34473Z"
        fill="currentColor"
      />
    </svg>
  );
}

const BANKS: { name: string; minmax: string; logoUrl: string }[] = [
  {
    name: "ABA BANK",
    minmax: "3 - 100000",
    logoUrl:
      "https://pksoftcdn.azureedge.net/media/460x0w-202507091830448513-202507101300150058-202511032033402252.png",
  },
  {
    name: "WING BANK",
    minmax: "3 - 100000",
    logoUrl: "https://pksoftcdn.azureedge.net/media/cffec3f2fc237b5e9baefcff21783b7c_icon-202601051724120907.png",
  },
  {
    name: "ACLEDA BANK",
    minmax: "3 - 100000",
    logoUrl: "https://pksoftcdn.azureedge.net/media/download-logo-blue-202601051743156840.jpg",
  },
  {
    name: "WING CASH",
    minmax: "3 - 10000",
    logoUrl:
      "https://pksoftcdn.azureedge.net/media/cffec3f2fc237b5e9baefcff21783b7c_icon-202601051724120907-202604221327240888.png",
  },
];

const CRYPTO_OPTIONS: { name: string; minmax: string; logoUrl: string }[] = [
  {
    name: "USDT-TRC20",
    minmax: "3 - 100000",
    logoUrl:
      "https://pksoftcdn.azureedge.net/media/360_f_488586958_7v1yw1b8p84t6ugl7mrwlbbhrovbzyjc-202603141742557458.jpg",
  },
];

export function DepositPage() {
  const [cashTab, setCashTab] = useState<CashTab>("deposit");
  const [bankOpen, setBankOpen] = useState(true);
  const [cryptoOpen, setCryptoOpen] = useState(false);

  useEffect(() => {
    const applyTabFromHash = () => {
      const raw = window.location.hash.replace(/^#\/?/, "");
      const query = raw.split("?")[1] ?? "";
      const params = new URLSearchParams(query);
      const tab = params.get("tab");
      setCashTab(tab === "withdrawal" ? "withdrawal" : "deposit");
    };

    applyTabFromHash();
    window.addEventListener("hashchange", applyTabFromHash);
    return () => window.removeEventListener("hashchange", applyTabFromHash);
  }, []);

  return (
    <section className="deposit-page mx-auto w-full max-w-4xl px-4 py-4" style={{ background: "var(--bg)" }}>
      <div
        className="t3-two-custom-tabs deposit-page-tabs"
        role="tablist"
        aria-label="Deposit or withdrawal"
      >
        <div
          role="tab"
          tabIndex={0}
          aria-selected={cashTab === "deposit"}
          className={cashTab === "deposit" ? "active" : ""}
          onClick={() => setCashTab("deposit")}
          onKeyDown={(e) => tabActivatorKeyDown(e, () => setCashTab("deposit"))}
        >
          Deposit
        </div>
        <div
          role="tab"
          tabIndex={0}
          aria-selected={cashTab === "withdrawal"}
          className={cashTab === "withdrawal" ? "active" : ""}
          onClick={() => setCashTab("withdrawal")}
          onKeyDown={(e) => tabActivatorKeyDown(e, () => setCashTab("withdrawal"))}
        >
          Withdrawal
          <TabChevronRight className="deposit-tab-chevron shrink-0" />
        </div>
      </div>

      <p className="mb-3 text-sm sm:text-[14px]" style={{ color: "var(--muted)" }}>
        Select a reload option from the available options.
      </p>

      {cashTab === "deposit" ? (
        <div className="t3-settings-menu-list mt-2 flex flex-col gap-2">
          <div
            className="t3-settings-menu-list-item bank overflow-hidden rounded-xl border"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              className="menu-list-item-row"
              onClick={() => setBankOpen((o) => !o)}
              aria-expanded={bankOpen}
            >
              <div className="first">
                <div className="flex shrink-0 items-center">
                  <BankCategoryIcon />
                </div>
                <div className="min-w-0">
                  <div className="title">Bank</div>
                  <span className="remark">Normal Bank Transfer</span>
                </div>
              </div>
              <div className="second text-[var(--muted)]">{bankOpen ? <MenuChevronDown /> : <MenuChevronRight />}</div>
            </button>
            {bankOpen ? (
              <div className="bank-option-list">
                {BANKS.map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    className="bank-option-box text-left"
                  >
                    <div className="bank-option-img">
                      <img src={b.logoUrl} alt={b.name} className="img-100" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="bank-option-info min-w-0">
                      <div className="bank-option-name">{b.name}</div>
                      <div className="bank-option-minmax">{b.minmax}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className="t3-settings-menu-list-item bank overflow-hidden rounded-xl border"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              className="menu-list-item-row"
              onClick={() => setCryptoOpen((o) => !o)}
              aria-expanded={cryptoOpen}
            >
              <div className="first">
                <div className="flex shrink-0 items-center">
                  <CryptoCategoryIcon />
                </div>
                <div className="min-w-0">
                  <div className="title">Cryptocurrency</div>
                  <span className="remark">Cryptocurrency (Manual)</span>
                </div>
              </div>
              <div className="second text-[var(--muted)]">{cryptoOpen ? <MenuChevronDown /> : <MenuChevronRight />}</div>
            </button>
            {cryptoOpen ? (
              <div className="bank-option-list">
                {CRYPTO_OPTIONS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className="bank-option-box text-left"
                  >
                    <div className="bank-option-img">
                      <img src={c.logoUrl} alt={c.name} className="img-100" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="bank-option-info min-w-0">
                      <div className="bank-option-name">{c.name}</div>
                      <div className="bank-option-minmax">{c.minmax}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
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
