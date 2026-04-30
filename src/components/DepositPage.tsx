import { useCallback, useEffect, useId, useMemo, useState, type KeyboardEvent } from "react";
import { copyIconSrc } from "../data/copyIcon";

type CashTab = "deposit" | "withdrawal";

export type BankTransferRecord = {
  id: string;
  name: string;
  minmax: string;
  min: number;
  max: number;
  logoUrl: string;
  accountNumber: string;
  accountName: string;
};

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

function ChevronLeftSm() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden fill="currentColor">
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

function BankReceiptUploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1138 1024"
      aria-hidden
      style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}
    >
      <path d="M1052.444 853.333v56.889c0 62.578-51.2 113.778-113.778 113.778h-796.444c-63.147 0-113.778-51.2-113.778-113.778v-796.444c0-62.578 50.631-113.778 113.778-113.778h796.444c62.578 0 113.778 51.2 113.778 113.778v56.889h-512c-63.147 0-113.778 51.2-113.778 113.778v455.111c0 62.578 50.631 113.778 113.778 113.778h512zM540.444 739.556h568.889v-455.111h-568.889v455.111zM768 597.333c-47.218 0-85.333-38.116-85.333-85.333s38.116-85.333 85.333-85.333c47.218 0 85.333 38.116 85.333 85.333s-38.116 85.333-85.333 85.333z" />
    </svg>
  );
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* ignore */
  }
}

const QUICK_AMOUNTS = [5, 10, 50, 100, 500, 1000] as const;

const BANK_TRANSFER_OPTIONS: BankTransferRecord[] = [
  {
    id: "aba",
    name: "ABA BANK",
    minmax: "3 - 100000",
    min: 3,
    max: 100_000,
    logoUrl:
      "https://pksoftcdn.azureedge.net/media/460x0w-202507091830448513-202507101300150058-202511032033402252.png",
    accountNumber: "095 522 519",
    accountName: "CHAN VORNG",
  },
  {
    id: "wing",
    name: "WING BANK",
    minmax: "3 - 100000",
    min: 3,
    max: 100_000,
    logoUrl: "https://pksoftcdn.azureedge.net/media/cffec3f2fc237b5e9baefcff21783b7c_icon-202601051724120907.png",
    accountNumber: "012 555 889",
    accountName: "CHAN VORNG",
  },
  {
    id: "acleda",
    name: "ACLEDA BANK",
    minmax: "3 - 100000",
    min: 3,
    max: 100_000,
    logoUrl: "https://pksoftcdn.azureedge.net/media/download-logo-blue-202601051743156840.jpg",
    accountNumber: "010 223 441",
    accountName: "CHAN VORNG",
  },
  {
    id: "wing-cash",
    name: "WING CASH",
    minmax: "3 - 10000",
    min: 3,
    max: 10_000,
    logoUrl:
      "https://pksoftcdn.azureedge.net/media/cffec3f2fc237b5e9baefcff21783b7c_icon-202601051724120907-202604221327240888.png",
    accountNumber: "088 901 234",
    accountName: "CHAN VORNG",
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

function formatMoney(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function clampAmount(raw: number, min: number, max: number) {
  if (Number.isNaN(raw) || raw < min) return min;
  if (raw > max) return max;
  return raw;
}

function pseudoQrCells(seed: string): boolean[][] {
  const n = 25;
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const m: boolean[][] = [];
  for (let y = 0; y < n; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < n; x++) {
      const hole = Math.abs(x - 12) < 4 && Math.abs(y - 12) < 4;
      if (hole) {
        row.push(false);
        continue;
      }
      const corner =
        (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
      const v = corner ? (x + y + h) % 3 !== 0 : ((h + x * 31) ^ (y * 17)) % 5 < 2;
      row.push(v);
    }
    m.push(row);
  }
  return m;
}

function BankTransferQrSvg({ seed, fileBase }: { seed: string; fileBase: string }) {
  const cells = useMemo(() => pseudoQrCells(seed), [seed]);
  const sz = 160;
  const gap = 1;
  const n = cells.length;
  const cell = (sz - gap * (n + 1)) / n;

  const downloadSvg = useCallback(() => {
    let body = "";
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (!cells[y][x]) continue;
        const px = gap + x * (cell + gap);
        const py = gap + y * (cell + gap);
        body += `<rect x="${px.toFixed(3)}" y="${py.toFixed(3)}" width="${cell.toFixed(3)}" height="${cell.toFixed(3)}" fill="#0f172a"/>`;
      }
    }
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}">
<rect width="${sz}" height="${sz}" fill="#ffffff"/>
${body}
<circle cx="${sz / 2}" cy="${sz / 2}" r="14" fill="#991B1B"/>
<text x="${sz / 2}" y="${sz / 2 + 5}" text-anchor="middle" fill="#ffffff" font-size="16" font-family="system-ui,sans-serif" font-weight="700">$</text>
</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileBase}-qr.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [cells, cell, fileBase, gap, n, sz]);

  const rects = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!cells[y][x]) continue;
      const px = gap + x * (cell + gap);
      const py = gap + y * (cell + gap);
      rects.push(<rect key={`${x}-${y}`} x={px} y={py} width={cell} height={cell} fill="#0f172a" />);
    }
  }

  return (
    <div className="deposit-bank-transfer__qr">
      <div className="deposit-bank-transfer__qr-box">
        <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} role="img" aria-label="Deposit QR code placeholder">
          <rect width={sz} height={sz} fill="#ffffff" />
          {rects}
          <circle cx={sz / 2} cy={sz / 2} r={14} fill="var(--primary-dark)" />
          <text
            x={sz / 2}
            y={sz / 2 + 5}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={16}
            fontFamily="system-ui, sans-serif"
            fontWeight={700}
          >
            $
          </text>
        </svg>
      </div>
      <button type="button" className="deposit-bank-transfer__qr-link" onClick={downloadSvg}>
        Download QR Code
      </button>
    </div>
  );
}

function BankTransferDetailsStep({
  bank,
  allBanks,
  onBack,
  onSelectBank,
}: {
  bank: BankTransferRecord;
  allBanks: BankTransferRecord[];
  onBack: () => void;
  onSelectBank: (id: string) => void;
}) {
  const uploadId = useId();
  const [amountUsd, setAmountUsd] = useState(0);
  const [amountDraft, setAmountDraft] = useState("");
  const [reference, setReference] = useState("");
  const [uploadName, setUploadName] = useState<string | null>(null);

  useEffect(() => {
    setAmountUsd(0);
    setAmountDraft("");
    setReference("");
    setUploadName(null);
  }, [bank.id]);

  const displayAmount = amountUsd;
  const activeQuick = QUICK_AMOUNTS.includes(amountUsd as (typeof QUICK_AMOUNTS)[number]) ? amountUsd : null;

  const setClampedAmount = (next: number) => {
    const v = clampAmount(next, bank.min, bank.max);
    setAmountUsd(v);
    setAmountDraft(v > 0 ? String(v) : "");
  };

  const onCustomChange = (raw: string) => {
    setAmountDraft(raw);
    const n = Number.parseFloat(raw.replace(/,/g, ""));
    if (raw.trim() === "" || Number.isNaN(n)) {
      setAmountUsd(0);
      return;
    }
    setAmountUsd(clampAmount(n, bank.min, bank.max));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="deposit-bank-transfer-details" onSubmit={onSubmit}>
      <div className="deposit-bank-transfer__subheader">
        <button type="button" className="deposit-bank-transfer__back" onClick={onBack}>
          <ChevronLeftSm />
          Back
        </button>
        <h2 className="deposit-bank-transfer__title">Normal Bank Transfer</h2>
      </div>

      <div className="deposit-bank-transfer__panel">
        <div className="deposit-bank-transfer__info-row">
          <span>Balance</span>
          <span className="deposit-bank-transfer__info-val">0.00</span>
        </div>
        <div className="deposit-bank-transfer__info-row">
          <span>Min Deposit</span>
          <span className="deposit-bank-transfer__info-val">{bank.min}</span>
        </div>
        <div className="deposit-bank-transfer__notes-rule">
          <p className="deposit-bank-transfer__notes-label">Notes:</p>
          <p className="deposit-bank-transfer__notes-body">
            Upload a screenshot of your payment receipt to notify us of your payment.
          </p>
        </div>
      </div>

      <div className="deposit-bank-transfer__panel deposit-bank-transfer__panel--brand-surface">
        <h3 className="deposit-bank-transfer__section-title deposit-bank-transfer__section-title--brand">
          Select Bank
        </h3>
        <div className="deposit-bank-transfer__bank-scroll" role="list">
          {allBanks.map((b) => (
            <button
              key={b.id}
              type="button"
              role="listitem"
              className={`deposit-bank-transfer__bank-card ${b.id === bank.id ? "selected" : ""}`}
              onClick={() => onSelectBank(b.id)}
            >
              <span className="deposit-bank-transfer__bank-card-media">
                <img src={b.logoUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
              </span>
              <span className="deposit-bank-transfer__bank-card-body">
                <span className="nm">{b.name}</span>
                <span className="mm">{b.minmax}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="deposit-bank-transfer__panel deposit-bank-transfer__panel--brand-surface">
        <h3 className="deposit-bank-transfer__section-title deposit-bank-transfer__section-title--brand deposit-bank-transfer__section-title--tight">
          Please Select or Enter Deposit Amount
        </h3>
        <div className="deposit-bank-transfer__amount-grid">
          {QUICK_AMOUNTS.map((v) => (
            <button
              key={v}
              type="button"
              className={`deposit-bank-transfer__amount-chip ${activeQuick === v ? "active" : ""}`}
              onClick={() => setClampedAmount(v)}
            >
              {v === 1000 ? "1k" : v}
            </button>
          ))}
        </div>
        <div className="deposit-bank-transfer__input-row">
          <span className="deposit-bank-transfer__input-prefix">USD</span>
          <input
            type="text"
            inputMode="decimal"
            className="deposit-bank-transfer__input-field"
            placeholder={`Enter the amount (USD ${bank.min} - USD ${bank.max.toLocaleString()})`}
            value={amountDraft}
            onChange={(e) => onCustomChange(e.target.value)}
            aria-label="Deposit amount in USD"
          />
        </div>
        <p className="deposit-bank-transfer__input-hint">
          USD {bank.min} - USD {bank.max.toLocaleString()}
        </p>
      </div>

      <div className="deposit-bank-transfer__panel deposit-bank-transfer__panel--brand-surface deposit-bank-transfer__pay-card">
        <p className="deposit-bank-transfer__stat-label">Deposit Amount</p>
        <div className="deposit-bank-transfer__pay-line">
          <span className="deposit-bank-transfer__pay-usd">USD</span>
          <span className="deposit-bank-transfer__pay-fig">{formatMoney(displayAmount)}</span>
        </div>
        <div className="deposit-bank-transfer__stat-rule" />
      </div>

      <div className="deposit-bank-transfer__panel">
        <BankTransferQrSvg seed={`${bank.id}-${bank.accountNumber}`} fileBase={`deposit-${bank.id}`} />
      </div>

      <div className="deposit-bank-transfer__panel deposit-bank-transfer__panel--brand-surface deposit-bank-transfer__bank-detail-card">
        <div className="deposit-bank-transfer__stat-section">
          <span className="deposit-bank-transfer__stat-label">Bank Name</span>
          <span className="deposit-bank-transfer__stat-value">{bank.name}</span>
        </div>
        <div className="deposit-bank-transfer__stat-divider" />
        <div className="deposit-bank-transfer__stat-section deposit-bank-transfer__stat-section--row">
          <div className="deposit-bank-transfer__stat-stack">
            <span className="deposit-bank-transfer__stat-label">Account Number</span>
            <span className="deposit-bank-transfer__stat-value">{bank.accountNumber}</span>
          </div>
          <button
            type="button"
            className="deposit-bank-transfer__copy"
            aria-label="Copy account number"
            onClick={() => copyToClipboard(bank.accountNumber.replace(/\s+/g, ""))}
          >
            <img src={copyIconSrc} alt="" className="deposit-bank-transfer__copy-img" aria-hidden />
          </button>
        </div>
        <div className="deposit-bank-transfer__stat-divider" />
        <div className="deposit-bank-transfer__stat-section deposit-bank-transfer__stat-section--row">
          <div className="deposit-bank-transfer__stat-stack">
            <span className="deposit-bank-transfer__stat-label">Account Name</span>
            <span className="deposit-bank-transfer__stat-value">{bank.accountName}</span>
          </div>
          <button
            type="button"
            className="deposit-bank-transfer__copy"
            aria-label="Copy account name"
            onClick={() => copyToClipboard(bank.accountName)}
          >
            <img src={copyIconSrc} alt="" className="deposit-bank-transfer__copy-img" aria-hidden />
          </button>
        </div>
      </div>

      <div className="deposit-bank-transfer__panel deposit-bank-transfer__panel--brand-surface deposit-bank-transfer__ref-card">
        <span className="deposit-bank-transfer__stat-label">Reference / Transaction ID (Optional)</span>
        <div className="deposit-bank-transfer__ref-row">
          <input
            type="text"
            className="deposit-bank-transfer__ref-input"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Optional"
            aria-label="Reference or transaction ID"
          />
          <button
            type="button"
            className="deposit-bank-transfer__copy"
            aria-label="Copy reference"
            onClick={() => reference && copyToClipboard(reference)}
            disabled={!reference.trim()}
          >
            <img src={copyIconSrc} alt="" className="deposit-bank-transfer__copy-img" aria-hidden />
          </button>
        </div>
      </div>

      <div className="deposit-bank-transfer__upload-section">
        <p className="deposit-bank-transfer__upload-lead">
          Upload a screenshot or PDF of your payment receipt to notify us of your payment *
        </p>
        <label htmlFor={uploadId} className="deposit-bank-transfer__upload">
          <BankReceiptUploadIcon className="deposit-bank-transfer__upload-icon vicon theme-icon-size-20" />
          <span className="deposit-bank-transfer__upload-text">
            {uploadName ? uploadName : "Tap to upload file"}
          </span>
          <input
            id={uploadId}
            type="file"
            accept="image/*,.pdf,application/pdf"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              setUploadName(f?.name ?? null);
            }}
          />
        </label>
      </div>

      <button type="submit" className="deposit-bank-transfer__submit">
        Submit
      </button>
    </form>
  );
}

export function DepositPage() {
  const [cashTab, setCashTab] = useState<CashTab>("deposit");
  const [bankOpen, setBankOpen] = useState(true);
  const [cryptoOpen, setCryptoOpen] = useState(false);
  const [bankTransferBankId, setBankTransferBankId] = useState<string | null>(null);

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

  const activeBank = useMemo(
    () => BANK_TRANSFER_OPTIONS.find((b) => b.id === bankTransferBankId) ?? null,
    [bankTransferBankId],
  );

  return (
    <section className="deposit-page mx-auto w-full max-w-4xl px-4 py-4" style={{ background: "var(--bg)" }}>
      <div className="t3-two-custom-tabs deposit-page-tabs" role="tablist" aria-label="Deposit or withdrawal">
        <div
          role="tab"
          tabIndex={0}
          aria-selected={cashTab === "deposit"}
          className={cashTab === "deposit" ? "active" : ""}
          onClick={() => {
            setCashTab("deposit");
            setBankTransferBankId(null);
          }}
          onKeyDown={(e) =>
            tabActivatorKeyDown(e, () => {
              setCashTab("deposit");
              setBankTransferBankId(null);
            })
          }
        >
          Deposit
        </div>
        <div
          role="tab"
          tabIndex={0}
          aria-selected={cashTab === "withdrawal"}
          className={cashTab === "withdrawal" ? "active" : ""}
          onClick={() => {
            setCashTab("withdrawal");
            setBankTransferBankId(null);
          }}
          onKeyDown={(e) =>
            tabActivatorKeyDown(e, () => {
              setCashTab("withdrawal");
              setBankTransferBankId(null);
            })
          }
        >
          Withdrawal
          <TabChevronRight className="deposit-tab-chevron shrink-0" />
        </div>
      </div>

      {cashTab === "deposit" && !activeBank ? (
        <p className="mb-3 text-sm sm:text-[14px]" style={{ color: "var(--muted)" }}>
          Select a reload option from the available options.
        </p>
      ) : null}

      {cashTab === "deposit" && activeBank ? (
        <BankTransferDetailsStep
          bank={activeBank}
          allBanks={BANK_TRANSFER_OPTIONS}
          onBack={() => setBankTransferBankId(null)}
          onSelectBank={(id) => setBankTransferBankId(id)}
        />
      ) : cashTab === "deposit" ? (
        <div className="t3-settings-menu-list mt-2 flex flex-col gap-2">
          <div className="t3-settings-menu-list-item bank overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
            <button type="button" className="menu-list-item-row" onClick={() => setBankOpen((o) => !o)} aria-expanded={bankOpen}>
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
                {BANK_TRANSFER_OPTIONS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className="bank-option-box text-left"
                    onClick={() => setBankTransferBankId(b.id)}
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

          <div className="t3-settings-menu-list-item bank overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
            <button type="button" className="menu-list-item-row" onClick={() => setCryptoOpen((o) => !o)} aria-expanded={cryptoOpen}>
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
                  <button key={c.name} type="button" className="bank-option-box text-left">
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
        <div
          className="rounded-xl border px-6 py-12 text-center"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        >
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
