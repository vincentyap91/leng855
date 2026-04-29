import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { getCenteredModalDialogStyle } from "./modalDialogShared";

type DownlinesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function XCloseIcon() {
  return (
    <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true">
      <path d="M512 439.603l-362.035-362.035-72.397 72.397 362.035 362.035-362.035 362.035 72.397 72.397 362.035-362.035 362.035 362.035 72.397-72.397-362.035-362.035 362.035-362.035-72.397-72.397z" />
    </svg>
  );
}

export function DownlinesModal({ isOpen, onClose }: DownlinesModalProps) {
  const [tab, setTab] = useState<"summary" | "kpis">("summary");
  const quickFilters = useMemo(() => ["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month"] as const, []);
  const [activeQuickFilter, setActiveQuickFilter] = useState<(typeof quickFilters)[number]>("This Week");

  const [startDate, setStartDate] = useState("27-04-2026");
  const [endDate, setEndDate] = useState("29-04-2026");

  useEffect(() => {
    if (!isOpen) return;
    setTab("summary");
    setActiveQuickFilter("This Week");
    setStartDate("27-04-2026");
    setEndDate("29-04-2026");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeTabBg = "var(--theme-color-nav-menu-active)";
  const activeTabColor = "var(--on-primary)";

  const inactiveTabBg = "var(--surface-3)";
  const inactiveTabColor = "var(--text)";

  const quickActiveBg = "color-mix(in srgb, var(--theme-color-nav-menu-active) 18%, var(--surface-2))";
  const quickActiveColor = "var(--text)";

  const cardLabelColor = "var(--text)";
  const cardValueColor = "var(--gold)";

  const tabButtonBase: CSSProperties = {
    fontFamily: "var(--base-font-family)",
    fontWeight: 800,
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
  };

  const cardBase: CSSProperties = {
    background: "var(--surface-2)",
    border: "1px solid var(--panel-item-border)",
    borderRadius: 6,
    padding: "10px 12px",
    boxSizing: "border-box",
  };

  return (
    <div className="modal show" role="dialog" tabIndex={-1} style={{ display: "block" }}>
      <button type="button" className="modal-backdrop" aria-label="Close downlines modal" onClick={onClose} />

      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{
          ...getCenteredModalDialogStyle({
            width: "100%",
          }),
        }}
      >
        <div
          className="modal-content t3-login-register-modal t3-custom-modal"
          style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
        >
          <div
            className="modal-header"
            style={{
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              className="modal-title"
              style={{
                fontWeight: 800,
                color: "var(--primary)",
                fontFamily: "var(--base-font-family)",
                fontSize: 14,
                lineHeight: 1.25,
              }}
            >
              Downlines
            </div>

            <button type="button" className="t3-close-modal" onClick={onClose} aria-label="Close">
              <XCloseIcon />
            </button>
          </div>

          <div className="modal-body" style={{ background: "var(--bg)", padding: 0 }}>
            <div className="px-4 py-4">
              {/* Tabs */}
              <div className="flex overflow-hidden rounded-md border" style={{ borderColor: "var(--border)" }}>
                <button
                  type="button"
                  onClick={() => setTab("summary")}
                  style={{
                    ...tabButtonBase,
                    flex: 1,
                    background: tab === "summary" ? activeTabBg : inactiveTabBg,
                    color: tab === "summary" ? activeTabColor : inactiveTabColor,
                    borderRight: "1px solid var(--border)",
                  }}
                >
                  Downline Summary
                </button>
                <button
                  type="button"
                  onClick={() => setTab("kpis")}
                  style={{
                    ...tabButtonBase,
                    flex: 1,
                    background: tab === "kpis" ? activeTabBg : inactiveTabBg,
                    color: tab === "kpis" ? activeTabColor : inactiveTabColor,
                  }}
                >
                  Downlines KPIs
                </button>
              </div>

              {/* Date filter section */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <div style={{ color: "var(--muted)", fontSize: 12, fontWeight: 700 }}>Start Date</div>
                  <input
                    className="t3-custom-input-text"
                    style={{ marginTop: 6, height: 40, fontSize: 13, borderColor: "var(--border)", background: "var(--surface-2)" }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    aria-label="Start Date"
                  />
                </div>
                <div>
                  <div style={{ color: "var(--muted)", fontSize: 12, fontWeight: 700 }}>End Date</div>
                  <input
                    className="t3-custom-input-text"
                    style={{ marginTop: 6, height: 40, fontSize: 13, borderColor: "var(--border)", background: "var(--surface-2)" }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    aria-label="End Date"
                  />
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {quickFilters.map((f) => {
                  const active = f === activeQuickFilter;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActiveQuickFilter(f)}
                      className="rounded-md px-3 py-1"
                      style={{
                        border: `1px solid ${active ? "var(--border-strong)" : "var(--border)"}`,
                        background: active ? quickActiveBg : "var(--surface-3)",
                        color: active ? quickActiveColor : "var(--muted)",
                        fontFamily: "var(--base-font-family)",
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>

              {/* Data cards grid */}
              {tab === "summary" ? (
                <div className="mt-4 space-y-3">
                  {/* First row: 2 cards */}
                  <div className="grid grid-cols-2 gap-2">
                    <div style={cardBase}>
                      <div style={{ color: cardLabelColor, fontSize: 12, fontWeight: 700 }}>New Downline L1</div>
                      <div style={{ marginTop: 4, color: cardValueColor, fontSize: 16, fontWeight: 900 }}>0</div>
                    </div>
                    <div style={cardBase}>
                      <div style={{ color: cardLabelColor, fontSize: 12, fontWeight: 700 }}>New All Downlines</div>
                      <div style={{ marginTop: 4, color: cardValueColor, fontSize: 16, fontWeight: 900 }}>0</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 2, color: "var(--primary-dark)", fontSize: 13, fontWeight: 900 }}>
                    Up To Now
                  </div>

                  {/* Second row: 3 cards */}
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    <div style={cardBase}>
                      <div style={{ color: cardLabelColor, fontSize: 12, fontWeight: 700 }}>Total Downline L1</div>
                      <div style={{ marginTop: 4, color: cardValueColor, fontSize: 16, fontWeight: 900 }}>0</div>
                    </div>
                    <div style={cardBase}>
                      <div style={{ color: cardLabelColor, fontSize: 12, fontWeight: 700 }}>Total All Downlines</div>
                      <div style={{ marginTop: 4, color: cardValueColor, fontSize: 16, fontWeight: 900 }}>0</div>
                    </div>
                    <div style={cardBase}>
                      <div style={{ color: cardLabelColor, fontSize: 12, fontWeight: 700 }}>Number of Downlines</div>
                      <div style={{ marginTop: 4, color: cardValueColor, fontSize: 16, fontWeight: 900 }}>0</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-md border p-4" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
                  <div style={{ color: "var(--muted)", fontSize: 13, fontWeight: 700 }}>Downlines KPIs view (placeholder)</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

