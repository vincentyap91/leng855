import { useEffect, useMemo, useState, type CSSProperties } from "react";

import { getCenteredModalDialogStyle } from "./modalDialogShared";

export type HistoryTab = "deposits" | "withdrawals";

type HistoryRecordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function XCloseIcon() {
  return (
    <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true">
      <path d="M512 439.603l-362.035-362.035-72.397 72.397 362.035 362.035-362.035 362.035 72.397 72.397 362.035-362.035 362.035 362.035 72.397-72.397-362.035-362.035 362.035-362.035-72.397-72.397-362.035 362.035z" />
    </svg>
  );
}

export function HistoryRecordModal({ isOpen, onClose }: HistoryRecordModalProps) {
  const [recordType, setRecordType] = useState("Transaction Record");
  const [activeQuickFilter, setActiveQuickFilter] = useState("This Week");
  const [tab, setTab] = useState<HistoryTab>("deposits");

  const [startDate, setStartDate] = useState("27-04-2026");
  const [endDate, setEndDate] = useState("29-04-2026");

  useEffect(() => {
    if (!isOpen) return;

    // Reset to screenshot-like defaults when opening.
    setRecordType("Transaction Record");
    setActiveQuickFilter("This Week");
    setTab("deposits");
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

  const deposits = useMemo(() => {
    // Empty state for now (matches screenshot).
    return [] as Array<{ date: string; amount: string; status: string; description: string }>;
  }, []);

  const withdrawals = useMemo(() => {
    return [] as Array<{ date: string; amount: string; status: string; description: string }>;
  }, []);

  const rows = tab === "deposits" ? deposits : withdrawals;

  const quickFilters = ["Today", "Yesterday", "This Week", "Last Week", "This Month", "Last Month"] as const;

  const tableThemeVars: CSSProperties = {
    // `.t3-custom-table` uses these tokens (with `!important`) for header visuals.
    // Override them locally so the modal table follows the modal-specific variables.
    ["--dashboard-table-th" as any]: "var(--sidebar-bg)",
    ["--dashboard-table-th-color" as any]: "var(--text-primary)",
    ["--border-strong" as any]: "var(--modal-table-header-boder)",
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" role="dialog" tabIndex={-1} style={{ display: "block" }}>
      <button type="button" className="modal-backdrop" aria-label="Close history modal" onClick={onClose} />

      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={{
          ...getCenteredModalDialogStyle({
            width: "100%",
            height: 600,
          }),
        }}
      >
        <div
          className="modal-content t3-login-register-modal t3-custom-modal"
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            className="modal-header"
            style={{
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div
              className="modal-title"
              style={{
                fontWeight: 800,
                color: "var(--accent-strong)",
                fontFamily: "var(--base-font-family)",
                fontSize: 14,
                lineHeight: 1.25,
              }}
            >
              History Record
            </div>

            <button type="button" className="t3-close-modal" onClick={onClose} aria-label="Close">
              <XCloseIcon />
            </button>
          </div>

          <div
            className="modal-body"
            style={{ background: "var(--surface-base)", padding: 0, flex: "1 1 auto", overflowY: "auto" }}
          >
            <div className="px-4 py-4">
              {/* Record Type */}
              <div className="flex items-center gap-2">
                <div style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 600 }}>Record Type</div>
                <select
                  className="t3-custom-input-text"
                  style={{ flex: 1, minHeight: 40, height: 40, fontSize: 13 }}
                  value={recordType}
                  onChange={(e) => setRecordType(e.target.value)}
                  aria-label="Record type"
                >
                  <option value="Transaction Record">Transaction Record</option>
                </select>
              </div>

              {/* Transaction Record */}
              <div className="mt-4">
                <div
                  style={{
                    color: "var(--action-primary-hover)",
                    fontFamily: "var(--base-font-family)",
                    fontWeight: 800,
                    fontSize: 15,
                    lineHeight: 1.25,
                  }}
                >
                  Transaction Record
                </div>

                {/* Date filters */}
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <div style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 600 }}>Start Date</div>
                    <input
                      type="text"
                      className="t3-custom-input-text date"
                      style={{ fontSize: 13, marginTop: 6, height: 40 }}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <div style={{ color: "var(--text-secondary)", fontSize: 12, fontWeight: 600 }}>End Date</div>
                    <input
                      type="text"
                      className="t3-custom-input-text date"
                      style={{ fontSize: 13, marginTop: 6, height: 40 }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Quick filter buttons */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {quickFilters.map((f) => {
                    const active = f === activeQuickFilter;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setActiveQuickFilter(f)}
                        className="rounded-md"
                        style={{
                          background: active ? "var(--theme-color-nav-menu-active)" : "var(--surface-muted)",
                          color: active ? "var(--text-on-emphasis)" : "var(--action-primary-hover)",
                          border: `1px solid ${active ? "var(--theme-color-nav-menu-active)" : "var(--border-subtle)"}`,
                          fontFamily: "var(--base-font-family)",
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "10px 12px",
                        }}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>

                {/* Toggle tabs */}
                <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-md border" style={{ borderColor: "var(--border-subtle)" }}>
                  <button
                    type="button"
                    className="text-sm font-bold"
                    onClick={() => setTab("deposits")}
                    style={{
                      background: tab === "deposits" ? "var(--theme-color-nav-menu-active)" : "var(--surface-muted)",
                      color: tab === "deposits" ? "var(--text-on-emphasis)" : "var(--action-primary-hover)",
                      borderRight: "1px solid var(--border-subtle)",
                      padding: "10px 12px",
                    }}
                  >
                    Deposits
                  </button>
                  <button
                    type="button"
                    className="text-sm font-bold"
                    onClick={() => setTab("withdrawals")}
                    style={{
                      background: tab === "withdrawals" ? "var(--theme-color-nav-menu-active)" : "var(--surface-muted)",
                      color: tab === "withdrawals" ? "var(--text-on-emphasis)" : "var(--action-primary-hover)",
                      padding: "10px 12px",
                    }}
                  >
                    Withdrawals
                  </button>
                </div>

                {/* Data table */}
                <div
                  className="mt-4 overflow-hidden rounded-md border"
                  style={{ borderColor: "var(--border-subtle)", ...tableThemeVars }}
                >
                  <div className="overflow-x-auto">
                    <table className="t3-custom-table w-full border-collapse text-[13px]">
                      <thead>
                        <tr>
                          {["Date", "Amount", "Status", "Description"].map((h, colIdx) => (
                            <th
                              key={h}
                              className="h-[36px] px-3 text-center font-bold"
                              style={{
                                background: "var(--sidebar-bg)",
                                color: "var(--text-primary)",
                                borderBottom: "1px solid var(--border-strong)",
                                borderLeft: colIdx === 0 ? "none" : "1px solid var(--border-strong)",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.length === 0 ? (
                          <tr>
                            <td
                              colSpan={4}
                              style={{
                                textAlign: "center",
                                padding: "18px 0",
                                color: "var(--accent-strong)",
                                background: "var(--modal-table-body)",
                              }}
                            >
                              No Data Found
                            </td>
                          </tr>
                        ) : (
                          rows.map((r, idx) => (
                            <tr key={`${r.date}-${idx}`}>
                              <td
                                className="px-3 py-2.5"
                                style={{
                                  background: "var(--modal-table-body)",
                                  color: "var(--text-primary)",
                                  fontWeight: 700,
                                }}
                              >
                                {r.date}
                              </td>
                              <td
                                className="px-3 py-2.5 tabular-nums"
                                style={{
                                  background: "var(--modal-table-body)",
                                  color: "var(--accent-soft)",
                                  fontWeight: 900,
                                }}
                              >
                                {r.amount}
                              </td>
                              <td
                                className="px-3 py-2.5"
                                style={{
                                  background: "var(--modal-table-body)",
                                  color: "var(--text-secondary)",
                                  fontWeight: 700,
                                }}
                              >
                                {r.status}
                              </td>
                              <td
                                className="px-3 py-2.5"
                                style={{
                                  background: "var(--modal-table-body)",
                                  color: "var(--text-secondary)",
                                  fontWeight: 600,
                                }}
                              >
                                {r.description}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
