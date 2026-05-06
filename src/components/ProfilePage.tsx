import { useState } from "react";

import { ChangeLanguageModal } from "./ChangeLanguageModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { DownlinesModal } from "./DownlinesModal";
import { HistoryRecordModal } from "./HistoryRecordModal";
import { MyProfileModal } from "./MyProfileModal";

const PROFILE_ACTIONS = [
  "My Profile",
  "Deposit",
  "Withdrawal",
  "History Record",
  "Referral",
  "Downlines",
  "Change Language",
  "Change Password",
];

// From Figma node `8116:39919` asset exports (data extracted from MCP payload)
const imgSvg = "https://www.figma.com/api/mcp/asset/b43e2a67-04d0-4bb7-a966-92b14eefc8a5";
const imgSvg1 = "https://www.figma.com/api/mcp/asset/072de15d-c9bf-4621-9e5e-d667dae260e3";
const imgSvg2 = "https://www.figma.com/api/mcp/asset/27b79e2c-d367-4a16-bde5-2ea05834e68c";
const imgSvg3 = "https://www.figma.com/api/mcp/asset/6ab88921-eb5c-4ad7-a6ef-f142f5fcafb5";
const imgSvg4 = "https://www.figma.com/api/mcp/asset/b541f599-6e08-4800-a027-dfb92caf8510";
const imgSvg5 = "https://www.figma.com/api/mcp/asset/08316bf0-3d10-4156-96f5-fa47ec0a1959";
const imgSvg6 = "https://www.figma.com/api/mcp/asset/acffdca1-813c-4987-9e3c-34b7ccd0379d";
const imgSvg7 = "https://www.figma.com/api/mcp/asset/101d65b7-baba-45e4-b4b1-4565b9ec1df9";
const imgSvg8 = "https://www.figma.com/api/mcp/asset/3b0248b5-4dd7-4593-8b81-498132a3192f";

const ICON_LEFT_BY_LABEL: Record<string, string> = {
  "My Profile": imgSvg,
  Deposit: imgSvg2,
  Withdrawal: imgSvg3,
  "History Record": imgSvg4,
  Referral: imgSvg5,
  Downlines: imgSvg6,
  "Change Language": imgSvg7,
  "Change Password": imgSvg8,
};

function RowChevron() {
  return (
    <img src={imgSvg1} alt="" aria-hidden className="h-[18px] w-[18px] object-contain" />
  );
}

type ProfilePageProps = {
  onLogout?: () => void;
};

function UserAvatar() {
  return (
    <div
      className="flex h-[84px] w-[84px] shrink-0 items-center justify-center bg-[var(--surface-base)]"
      style={{ border: "2px solid var(--accent-muted)", padding: "4px" }}
      aria-hidden
    >
      <div className="flex h-full w-full items-center justify-center border border-[var(--accent-muted)] bg-[var(--surface-base)]">
        <img
          src="https://www.figma.com/api/mcp/asset/78f25659-de5b-4941-baee-aec4c4051819"
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const registeredUsername = localStorage.getItem("username") ?? "test123";
  const registeredMobile = localStorage.getItem("userMobile") ?? "85512121212";
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [draftFullName, setDraftFullName] = useState("");
  const [isHistoryRecordOpen, setIsHistoryRecordOpen] = useState(false);
  const [isDownlinesOpen, setIsDownlinesOpen] = useState(false);
  const [isChangeLanguageOpen, setIsChangeLanguageOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <section className="mx-auto w-full max-w-[760px] px-4 py-6">
      {/* Top Card: User Info */}
      <article className="rounded-md p-4" style={{ background: "var(--surface-muted)" }}>
        <div className="flex items-center gap-4">
          <UserAvatar />
          <div className="min-w-0 flex-1">
            {/* Username row */}
            <div className="flex items-center gap-3">
              <h2 className="text-[17px] font-extrabold" style={{ color: "var(--action-primary-hover)" }}>Demo</h2>
              <div className="h-4 w-[1px] bg-[var(--border-strong)]" />
              <span className="text-[14px] font-medium" style={{ color: "var(--text-secondary)" }}>6012300001234</span>
            </div>

            {/* Rank info row */}
            <div className="mt-2 flex items-center justify-between text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>
              <span>Orichalcum</span>
              <span>
                Deposit <span style={{ color: "var(--accent-muted)" }}>900,723.48</span> to become <span style={{ color: "var(--accent-muted)" }}>Orichalcum II</span>!
              </span>
            </div>

            {/* Progress bar row */}
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-base)] border border-[var(--border-default)]">
                <div className="h-full rounded-full" style={{ width: "10%", background: "var(--accent-strong)" }} />
              </div>
              <span className="text-[12px] font-medium text-[var(--text-muted)]">10%</span>
            </div>
          </div>
        </div>
      </article>

      {/* Bottom Card: Wallet Info */}
      <article className="mt-3 rounded-md p-3" style={{ background: "var(--surface-muted)" }}>
        <div className="rounded-md bg-[var(--surface-base)] p-4 shadow-sm border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold" style={{ color: "var(--feedback-danger)" }}>Main Wallet</span>
              <span className="mt-0.5 text-[18px] font-extrabold" style={{ color: "var(--action-primary-hover)" }}>100.00</span>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.hash = "#/deposit";
              }}
              className="rounded-lg px-6 py-2.5 text-[15px] font-bold text-[var(--text-on-emphasis)] shadow-md transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(180deg, var(--accent-strong) 0%, var(--action-primary-hover) 100%)" }}
            >
              Deposit
            </button>
          </div>

          <div className="mt-5">
            <div className="text-[13px] font-semibold" style={{ color: "var(--text-secondary)" }}>
              Deposit Rollover <span className="ml-1 font-bold" style={{ color: "var(--accent-muted)" }}>0 / 100</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-muted)]">
                <div className="h-full rounded-full" style={{ width: "0%", background: "var(--accent-strong)" }} />
              </div>
              <span className="text-[12px] font-medium" style={{ color: "var(--text-secondary)" }}>0%</span>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-4 space-y-2">
        {PROFILE_ACTIONS.map((label) => (
          <button
            key={label}
            type="button"
            className="flex h-[46px] w-full items-center justify-between rounded-md px-3 text-left"
            style={{ background: "var(--surface-muted)" }}
            onClick={() => {
              if (label === "My Profile") {
                setIsMyProfileOpen(true);
                setIsHistoryRecordOpen(false);
              }
              if (label === "History Record") {
                setIsHistoryRecordOpen(true);
                setIsMyProfileOpen(false);
              }
              if (label === "Downlines") {
                setIsDownlinesOpen(true);
                setIsMyProfileOpen(false);
                setIsHistoryRecordOpen(false);
                setIsChangeLanguageOpen(false);
                setIsChangePasswordOpen(false);
              }
              if (label === "Deposit") {
                window.location.hash = "#/deposit";
              }
              if (label === "Withdrawal") {
                window.location.hash = "#/deposit?tab=withdrawal";
              }
              if (label === "Change Language") {
                setIsChangeLanguageOpen(true);
                setIsMyProfileOpen(false);
                setIsHistoryRecordOpen(false);
                setIsDownlinesOpen(false);
                setIsChangePasswordOpen(false);
              }
              if (label === "Change Password") {
                setIsChangePasswordOpen(true);
                setIsMyProfileOpen(false);
                setIsHistoryRecordOpen(false);
                setIsDownlinesOpen(false);
                setIsChangeLanguageOpen(false);
              }
            }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={ICON_LEFT_BY_LABEL[label]}
                alt=""
                aria-hidden
                className="h-[20px] w-[20px] shrink-0 object-contain"
              />
              <span className="truncate text-sm font-normal text-[var(--action-primary-hover)]">{label}</span>
            </div>
            <span className="shrink-0">
              <RowChevron />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          className="t3-profile-action-btn"
          onClick={() => {
            onLogout?.();
          }}
        >
          Logout
        </button>
      </div>

      <MyProfileModal
        isOpen={isMyProfileOpen}
        onClose={() => setIsMyProfileOpen(false)}
        onSave={({ fullName }) => {
          setDraftFullName(fullName);
        }}
        username={registeredUsername}
        birthDate="29-04-2008"
        phone={registeredMobile}
        initialFullName={draftFullName}
      />

      <HistoryRecordModal isOpen={isHistoryRecordOpen} onClose={() => setIsHistoryRecordOpen(false)} />
      <DownlinesModal isOpen={isDownlinesOpen} onClose={() => setIsDownlinesOpen(false)} />
      <ChangeLanguageModal isOpen={isChangeLanguageOpen} onClose={() => setIsChangeLanguageOpen(false)} />
      <ChangePasswordModal isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
    </section>
  );
}
