import { useEffect, useState } from "react";

import { getCenteredModalDialogStyle } from "./modalDialogShared";

type ChangePasswordModalProps = {
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

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-5 w-5">
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58" strokeLinecap="round" />
      <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c5 0 9.27 3.11 11 7-1.05 2.35-2.83 4.29-5.02 5.45" strokeLinecap="round" />
      <path d="M6.61 6.61C4.62 7.92 3.06 9.79 2 12c1.73 3.89 6 7 10 7a10.9 10.9 0 0 0 4.13-.81" strokeLinecap="round" />
    </svg>
  );
}

function RuleItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border text-[11px] font-bold" style={{ borderColor: "var(--accent-strong)", color: "var(--accent-strong)" }}>
        ✓
      </span>
      <span className="text-[13px] leading-5" style={{ color: "var(--text-primary)" }}>
        {text}
      </span>
    </div>
  );
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal show" role="dialog" tabIndex={-1} style={{ display: "block" }}>
      <button type="button" className="modal-backdrop" aria-label="Close change password modal" onClick={onClose} />

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
          style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
        >
          <div
            className="modal-header"
            style={{
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--surface-raised)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div className="modal-title font-extrabold" style={{ color: "var(--accent-strong)", lineHeight: 1.2 }}>
              Change Password
            </div>
            <button type="button" className="t3-close-modal" onClick={onClose} aria-label="Close" style={{ color: "var(--feedback-info)" }}>
              <XCloseIcon />
            </button>
          </div>

          <div className="modal-body" style={{ background: "var(--surface-base)", padding: 0, flex: "1 1 auto", overflowY: "auto" }}>
            <form className="px-5 py-6" onSubmit={(e) => e.preventDefault()}>
              {[
                {
                  id: "current-password",
                  label: "Current Password",
                  value: currentPassword,
                  setValue: setCurrentPassword,
                  placeholder: "Enter Your Current Password",
                },
                {
                  id: "new-password",
                  label: "New Password",
                  value: newPassword,
                  setValue: setNewPassword,
                  placeholder: "Enter New Password",
                },
                {
                  id: "confirm-password",
                  label: "Confirm New Password",
                  value: confirmPassword,
                  setValue: setConfirmPassword,
                  placeholder: "Confirm New Password",
                },
              ].map((field) => (
                <div key={field.id} className="mb-4">
                  <label htmlFor={field.id} className="mb-2 block text-[15px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                    {field.label} <span style={{ color: "var(--accent-strong)" }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      id={field.id}
                      type="password"
                      value={field.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border py-2.5 pl-4 pr-10 text-[14px] font-medium outline-none"
                      style={{ borderColor: "var(--border-subtle)", color: "var(--text-primary)", background: "var(--surface-base)" }}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                      <EyeOffIcon />
                    </span>
                  </div>
                </div>
              ))}

              <div className="space-y-1">
                <RuleItem text="Include at least 8 characters, containing both a letter and a number, with no symbols allowed." />
                <RuleItem text="Only letters (A-Z, a-z) and numbers (0-9)." />
                <RuleItem text="No special characters / symbols." />
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  type="submit"
                  className="t3-profile-action-btn"
                  style={{ boxShadow: "var(--card-shadow)" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
