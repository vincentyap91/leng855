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
    <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true" style={{ color: "var(--text)" }}>
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

  const fieldBoxStyle = {
    background: "var(--surface-3)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    paddingLeft: 14,
    paddingRight: 14,
    minHeight: 40,
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box" as const,
    color: "var(--text)",
    fontSize: 12,
    fontWeight: 600,
  };

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
            minWidth: 700,
            width: 700,
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
            background: "var(--bg)",
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
              My Profile
            </div>

            <button
              type="button"
              className="t3-close-modal"
              onClick={onClose}
              aria-label="Close"
              style={{ color: "var(--text)" }}
            >
              <XCloseIcon />
            </button>
          </div>

          <div className="modal-body" style={{ flex: "1 1 auto", overflowY: "auto", background: "var(--modal-body)" }}>
            <div className="p-6" style={{ background: "var(--bg)" }}>
              <div className="mt-2">
                <div
                  className="font-bold"
                  style={{
                    color: "var(--text)",
                    fontFamily: "var(--base-font-family)",
                    fontSize: 13,
                    lineHeight: 1.2,
                  }}
                >
                  General
                </div>

                <div
                  className="mt-4 grid gap-y-3"
                  style={{
                    gridTemplateColumns: "128px 1fr",
                    columnGap: 16,
                    rowGap: 10,
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "var(--text)", fontSize: 12, fontWeight: 600 }}>Username</div>
                  <div style={fieldBoxStyle}>{username}</div>

                  <div style={{ color: "var(--text)", fontSize: 12, fontWeight: 600 }}>Full Name</div>
                  <div>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Please enter your full name"
                      className="t3-custom-input-text text-[12px] min-h-[34px] h-[34px]"
                      style={{
                        paddingLeft: 12,
                        paddingRight: 12,
                        background: "var(--surface-3)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                    />
                  </div>

                  <div style={{ color: "var(--text)", fontSize: 12, fontWeight: 600 }}>Birth Date</div>
                  <div style={fieldBoxStyle}>{birthDate}</div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <div className="mt-1 flex items-start gap-2" style={{ color: "var(--primary)" }}>
                      <InfoIcon />
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>
                        Please enter your date of birth...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div
                  className="font-bold"
                  style={{
                    color: "var(--text)",
                    fontFamily: "var(--base-font-family)",
                    fontSize: 13,
                    lineHeight: 1.2,
                  }}
                >
                  Contact Details
                </div>

                <div className="mt-4">
                  <div style={fieldBoxStyle}>
                    <span style={{ color: "var(--text)", display: "flex", alignItems: "center" }} aria-hidden>
                      <PhoneIcon />
                    </span>
                    <span style={{ marginLeft: 10 }}>{phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onSave?.({ fullName });
                    onClose();
                  }}
                  className="rounded-lg px-8 py-2.5 text-sm font-bold"
                  style={{ background: "var(--cta-gradient)", color: "var(--on-primary)" }}
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

