import { useEffect, useState } from "react";

import { getCenteredModalDialogStyle } from "./modalDialogShared";

type MyProfileModalProps = {
  isOpen: boolean;
  username: string;
  birthDate: string;
  phone: string;
  initialFullName?: string;
  onClose: () => void;
  onSave?: (payload: { fullName: string }) => void;
};

function InfoIcon() {
  return (
    <svg
      className="vicon vicon--info"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      style={{ width: 14, height: 14 }}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" strokeLinecap="round" />
      <path d="M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      className="vicon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      style={{ width: 18, height: 18 }}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.59 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.16a2 2 0 0 1 2.11-.45c.8.27 1.64.47 2.5.59A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function XCloseIcon() {
  return (
    <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true" style={{ color: "var(--text-primary)" }}>
      <path d="M512 439.603l-362.035-362.035-72.397 72.397 362.035 362.035-362.035 362.035 72.397 72.397 362.035-362.035 362.035 362.035 72.397-72.397-362.035-362.035 362.035-362.035-72.397-72.397z" fill="currentColor" />
    </svg>
  );
}

export function MyProfileModal({
  isOpen,
  username,
  birthDate,
  phone,
  initialFullName,
  onClose,
  onSave,
}: MyProfileModalProps) {
  const [fullName, setFullName] = useState(initialFullName ?? "");

  useEffect(() => {
    if (!isOpen) return;
    setFullName(initialFullName ?? "");
  }, [isOpen, initialFullName]);

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
      <button type="button" className="modal-backdrop" aria-label="Close profile modal" onClick={onClose} />

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
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "var(--surface-base)",
            boxShadow: "var(--card-shadow)",
            width: "100%",
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
              My Profile
            </div>

            <button
              type="button"
              className="t3-close-modal"
              onClick={onClose}
              aria-label="Close"
              style={{ color: "var(--text-primary)" }}
            >
              <XCloseIcon />
            </button>
          </div>

          <div className="modal-body text-sm" style={{ flex: "1 1 auto", overflowY: "auto", background: "var(--modal-body)" }}>
            <div className="p-6" style={{ background: "var(--surface-base)" }}>
              <div className="mt-1">
                <div style={{ color: "var(--accent-strong)", fontWeight: 700, lineHeight: 1.2 }}>General</div>

                <div className="mt-5 space-y-3">
                  <div
                    style={{
                      background: "var(--surface-muted)",
                      borderRadius: 10,
                      minHeight: 44,
                      display: "flex",
                      alignItems: "center",
                      padding: "0 16px",
                      gap: 20,
                    }}
                  >
                    <span style={{ color: "var(--accent-strong)", fontWeight: 600, minWidth: 112 }}>Username</span>
                    <span style={{ color: "var(--accent-strong)", fontWeight: 600 }}>{username}</span>
                  </div>

                  <div
                    style={{
                      background: "var(--surface-muted)",
                      borderRadius: 10,
                      minHeight: 44,
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 8px 4px 16px",
                      gap: 14,
                    }}
                  >
                    <span style={{ color: "var(--accent-strong)", fontWeight: 600, minWidth: 112 }}>Full Name</span>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Please enter your full name"
                      className="w-full rounded-lg border-0 px-5 py-2.5 outline-none"
                      style={{
                        background: "var(--surface-base)",
                        color: "var(--text-primary)",
                        fontWeight: 500,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      background: "var(--surface-muted)",
                      borderRadius: 10,
                      minHeight: 44,
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 8px 4px 16px",
                      gap: 14,
                    }}
                  >
                    <span style={{ color: "var(--accent-strong)", fontWeight: 600, minWidth: 112 }}>Birth Date</span>
                    <div
                      style={{
                        background: "var(--surface-base)",
                        borderRadius: 8,
                        width: "100%",
                        padding: "8px 20px",
                        color: "color-mix(in srgb, var(--text-primary) 80%, transparent)",
                        fontWeight: 600,
                        lineHeight: 1.2,
                      }}
                    >
                      {birthDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5" style={{ color: "var(--feedback-danger)" }}>
                    <InfoIcon />
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      Please enter your date of birth to receive additional bonus
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <div style={{ color: "var(--accent-strong)", fontWeight: 700, lineHeight: 1.2 }}>Contact Details</div>

                <div className="mt-4">
                  <div
                    style={{
                      background: "var(--surface-muted)",
                      borderRadius: 10,
                      minHeight: 44,
                      display: "flex",
                      alignItems: "center",
                      padding: "0 16px",
                      gap: 14,
                      color: "var(--accent-strong)",
                    }}
                  >
                    <span aria-hidden style={{ display: "flex", alignItems: "center" }}>
                      <PhoneIcon />
                    </span>
                    <span style={{ fontWeight: 600 }}>{phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onSave?.({ fullName });
                    onClose();
                  }}
                  className="t3-profile-action-btn"
                  style={{ minWidth: 154, boxShadow: "var(--card-shadow)" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
