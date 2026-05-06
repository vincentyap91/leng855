import { useEffect, useState } from "react";

import { getCenteredModalDialogStyle } from "./modalDialogShared";

type Language = "khmer" | "english";

type ChangeLanguageModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LANGUAGE_STORAGE_KEY = "selectedLanguage";

function XCloseIcon() {
  return (
    <svg className="vicon" viewBox="0 0 1024 1024" aria-hidden="true">
      <path d="M512 439.603l-362.035-362.035-72.397 72.397 362.035 362.035-362.035 362.035 72.397 72.397 362.035-362.035 362.035 362.035 72.397-72.397-362.035-362.035 362.035-362.035-72.397-72.397z" />
    </svg>
  );
}

export function ChangeLanguageModal({ isOpen, onClose }: ChangeLanguageModalProps) {
  const [selected, setSelected] = useState<Language>("english");

  const handleLanguageSwitch = (language: Language) => {
    setSelected(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "khmer" || saved === "english") {
      setSelected(saved);
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal show" role="dialog" tabIndex={-1} style={{ display: "block" }}>
      <button type="button" className="modal-backdrop" aria-label="Close change language modal" onClick={onClose} />

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
              Change Language
            </div>
            <button type="button" className="t3-close-modal" onClick={onClose} aria-label="Close" style={{ color: "var(--feedback-info)" }}>
              <XCloseIcon />
            </button>
          </div>

          <div className="modal-body" style={{ background: "var(--surface-base)", padding: 0, flex: "1 1 auto", overflowY: "auto" }}>
            <div className="px-5 py-6">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left"
                style={{ background: "var(--surface-muted)", color: "var(--action-primary-hover)" }}
                onClick={() => handleLanguageSwitch("khmer")}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://pksoftcdn.azureedge.net/media/cambodia_flag_rounded_resize-202507011320000458.svg"
                    alt=""
                    aria-hidden
                    style={{ width: 24, height: 24, borderRadius: "9999px", flexShrink: 0 }}
                  />
                  <span className="text-[14px] font-bold leading-none" style={{ color: "var(--action-primary-hover)" }}>
                    Khmer
                  </span>
                </div>
                <span className="text-[14px] font-medium leading-none" style={{ color: "var(--action-primary-hover)" }}>
                  {selected === "khmer" ? "Selected" : "Select"}
                </span>
              </button>

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-between rounded-lg px-4 py-3 text-left"
                style={{ background: "var(--surface-muted)", color: "var(--action-primary-hover)" }}
                onClick={() => handleLanguageSwitch("english")}
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://pksoftcdn.azureedge.net/media/flag-uk-202410031642117287-202410091104207783-202604270833191592.svg"
                    alt=""
                    aria-hidden
                    style={{ width: 24, height: 24, borderRadius: "9999px", flexShrink: 0 }}
                  />
                  <span className="text-[14px] font-bold leading-none" style={{ color: "var(--action-primary-hover)" }}>
                    English
                  </span>
                </div>
                <span className="text-[14px] font-medium leading-none" style={{ color: "var(--action-primary-hover)" }}>
                  {selected === "english" ? "Selected" : "Select"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
