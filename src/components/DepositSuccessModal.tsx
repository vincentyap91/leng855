import { useEffect } from "react";
import { getCenteredModalDialogStyle } from "./modalDialogShared";

export type DepositSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function XCloseIcon() {
  return (
    <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true" style={{ width: 14, height: 14 }}>
      <path d="M512 439.603l-362.035-362.035-72.397 72.397 362.035 362.035-362.035 362.035 72.397 72.397 362.035-362.035 362.035 362.035 72.397-72.397-362.035-362.035 362.035-362.035-72.397-72.397z" fill="currentColor" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "var(--state-success)",
        marginBottom: 20,
        boxShadow: "0 4px 12px rgba(18, 183, 106, 0.25)"
      }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}

export function DepositSuccessModal({ isOpen, onClose }: DepositSuccessModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal show" role="dialog" tabIndex={-1} style={{ display: "block", zIndex: 1060 }}>
      <button type="button" className="modal-backdrop" aria-label="Close success modal" onClick={onClose} />

      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={getCenteredModalDialogStyle({ width: 440 })}
      >
        <div className="modal-content t3-login-register-modal t3-custom-modal overflow-hidden rounded-2xl relative">
          <button 
            type="button" 
            className="absolute right-4 top-4 text-[var(--text-muted)] transition-opacity hover:opacity-70" 
            onClick={onClose} 
            aria-label="Close"
          >
            <XCloseIcon />
          </button>

          {/* Body */}
          <div className="modal-body text-center" style={{ background: "var(--surface-base)", padding: "50px 30px" }}>
            <SuccessIcon />
            
            <h2 
              className="mb-8 text-[16px] font-semibold leading-relaxed" 
              style={{ color: "var(--text-primary)" }}
            >
              We are verifying your payment. Once we received the money, your account balance will be updated
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="h-[48px] w-full rounded-xl font-bold text-white shadow-md transition-all active:scale-[0.98] hover:brightness-110"
              style={{ 
                background: "var(--brand-3)",
                fontSize: "15px"
              }}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
