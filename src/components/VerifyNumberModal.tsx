import { useState, useEffect } from "react";
import { getCenteredModalDialogStyle } from "./modalDialogShared";
import { assets } from "../data/assets";

export type VerifyNumberModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mobileNumber?: string;
};

function XCloseIcon() {
  return (
    <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true">
      <path d="M512 439.603l-362.035-362.035-72.397 72.397 362.035 362.035-362.035 362.035 72.397 72.397 362.035-362.035 362.035 362.035 72.397-72.397-362.035-362.035 362.035-362.035-72.397-72.397-362.035 362.035z" />
    </svg>
  );
}

export function VerifyNumberModal({ isOpen, onClose, onSuccess, mobileNumber = "1222" }: VerifyNumberModalProps) {
  const [tacCode, setTacCode] = useState("");
  const [countdown, setCountdown] = useState(42);

  useEffect(() => {
    if (isOpen) {
      setTacCode("");
      setCountdown(42);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maskedMobile = mobileNumber.length >= 4
    ? `*******${mobileNumber.slice(-4)}`
    : `*******${mobileNumber}`;

  return (
    <div className="modal show" role="dialog" tabIndex={-1} style={{ display: "block" }}>
      <button type="button" className="modal-backdrop" aria-label="Close verify modal" onClick={onClose} />

      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={getCenteredModalDialogStyle({ width: 560 })}
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
              borderBottom: "none",
              background: "var(--surface-muted)",
            }}
          >
            <img src={assets.leng855Logo} style={{ height: 40, objectFit: "contain" }} alt="logo" />
            <button type="button" className="t3-close-modal" onClick={onClose} aria-label="Close">
              <XCloseIcon />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body" style={{ background: "var(--surface-base)", padding: 0 }}>
            <div style={{ display: "flex" }}>
              {/* Left image */}
              <div
                style={{
                  width: 200,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--surface-base)",
                  padding: 16,
                }}
              >
                <img
                  src="https://riocity-cdn.azureedge.net/riocity/login-register-202403302309448938.png"
                  alt="casino asset"
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </div>

              {/* Right content */}
              <div style={{ flex: 1, padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontWeight: 900, fontSize: 18, color: "var(--action-primary-hover)", marginBottom: 8 }}>
                  Verify Your Number
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 24 }}>
                  Enter the code we sent to {maskedMobile}.
                </div>

                {/* TAC Code Input */}
                <input
                  type="text"
                  className="t3-custom-input-text"
                  maxLength={6}
                  value={tacCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setTacCode(val);
                    if (val.length === 6) {
                      setTimeout(() => onSuccess(), 400);
                    }
                  }}
                  style={{
                    width: 160,
                    margin: "0 auto",
                    textAlign: "center",
                    letterSpacing: "0.4em",
                    fontSize: 20,
                    fontWeight: 900,
                    height: 48,
                    border: "1.5px solid var(--border-subtle)",
                    display: "block",
                  }}
                  placeholder="000000"
                  autoFocus
                />

                {/* Countdown */}
                <div
                  style={{
                    marginTop: 16,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--accent-strong)",
                  }}
                >
                  {countdown > 0 ? `TAC Code Sent. ${countdown}s` : (
                    <button
                      type="button"
                      onClick={() => setCountdown(42)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent-strong)",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Resend TAC Code
                    </button>
                  )}
                </div>

                {/* Spinner while counting */}
                {countdown > 0 && (
                  <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
                    <svg
                      style={{ width: 24, height: 24, color: "var(--accent-strong)", animation: "spin 1s linear infinite" }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
