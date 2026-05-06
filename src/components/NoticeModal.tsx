import { useState, useEffect } from "react";
import { getCenteredModalDialogStyle } from "./modalDialogShared";

export type NoticeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { fullName: string; bankName: string; accountNumber: string }) => void;
};

function XCloseIcon() {
  return (
    <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true">
      <path d="M512 439.603l-362.035-362.035-72.397 72.397 362.035 362.035-362.035 362.035 72.397 72.397 362.035-362.035 362.035 362.035 72.397-72.397-362.035-362.035 362.035-362.035-72.397-72.397-362.035 362.035z" />
    </svg>
  );
}

export function NoticeModal({ isOpen, onClose, onSubmit }: NoticeModalProps) {
  const [fullName, setFullName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal show" role="dialog" tabIndex={-1} style={{ display: "block" }}>
      <button type="button" className="modal-backdrop" aria-label="Close notice modal" onClick={onClose} />

      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={getCenteredModalDialogStyle({ width: 480 })}
      >
        <div className="modal-content t3-login-register-modal t3-custom-modal">
          {/* Header */}
          <div
            className="modal-header"
            style={{
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div
              className="modal-title"
              style={{ fontWeight: 800, color: "var(--accent-strong)", fontSize: 14 }}
            >
              Notice
            </div>
            <button type="button" className="t3-close-modal" onClick={onClose} aria-label="Close">
              <XCloseIcon />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body" style={{ background: "var(--surface-base)", padding: "20px 24px" }}>
            {/* Warning icon */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--feedback-warning)",
                  marginBottom: 12,
                }}
              >
                <span style={{ color: "var(--text-on-emphasis)", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>!</span>
              </div>
              <div style={{ color: "var(--action-primary-hover)", fontWeight: 800, fontSize: 15, marginBottom: 4 }}>
                You're almost there!
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 500 }}>
                Please complete the information below before moving to the next step!
              </div>
            </div>

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Full Name */}
              <div>
                <div style={{ color: "var(--accent-strong)", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                  Full Name
                </div>
                <input
                  type="text"
                  className="t3-custom-input-text"
                  style={{ height: 40, fontSize: 13, border: "1.5px solid var(--border-subtle)" }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Warning note */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: "1.5px solid var(--accent-strong)",
                  background: "var(--surface-base)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: 16, height: 16, color: "var(--accent-strong)", flexShrink: 0, marginTop: 2 }}>
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path d="M12 8v4m0 4h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "var(--accent-strong)", lineHeight: 1.5 }}>
                  Ensure your full name matches the name on your bank account, or the company may decline your application.
                </p>
              </div>

              {/* Bank Name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ minWidth: 110, color: "var(--text-secondary)", fontSize: 12, fontWeight: 700 }}>Bank Name</div>
                <select
                  className="t3-custom-input-text"
                  style={{ flex: 1, height: 40, fontSize: 13, border: "1.5px solid var(--border-subtle)" }}
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <option value="">Please Select Bank</option>
                  <option value="Maybank">Maybank</option>
                  <option value="CIMB">CIMB</option>
                  <option value="Public Bank">Public Bank</option>
                  <option value="Hong Leong Bank">Hong Leong Bank</option>
                </select>
              </div>

              {/* Account Number */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ minWidth: 110, color: "var(--text-secondary)", fontSize: 12, fontWeight: 700 }}>Account Number</div>
                <input
                  type="text"
                  className="t3-custom-input-text"
                  style={{ flex: 1, height: 40, fontSize: 13, border: "1.5px solid var(--border-subtle)" }}
                  placeholder="Enter Your Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                />
              </div>

              {/* Submit */}
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <button
                  type="button"
                  disabled={!fullName || !bankName || !accountNumber}
                  onClick={() => onSubmit({ fullName, bankName, accountNumber })}
                  className="t3-profile-action-btn"
                  style={{
                    background: !fullName || !bankName || !accountNumber
                      ? "var(--surface-muted)"
                      : "var(--cta-gradient)",
                    minWidth: 140,
                    padding: "10px 24px",
                    fontSize: 14,
                    opacity: !fullName || !bankName || !accountNumber ? 0.6 : 1,
                    cursor: !fullName || !bankName || !accountNumber ? "not-allowed" : "pointer",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
