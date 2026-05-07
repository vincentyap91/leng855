import { useState, useEffect } from "react";
import { assets } from "../data/assets";

import { ChangeLanguageModal } from "./ChangeLanguageModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { DownlinesModal } from "./DownlinesModal";
import { HistoryRecordModal } from "./HistoryRecordModal";
import { MyProfileModal } from "./MyProfileModal";
import { ProfileUpdateReminderModal } from "./ProfileUpdateReminderModal";

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

const ICON_LEFT_BY_LABEL: Record<string, string> = {
  "My Profile": assets.profileUser,
  Deposit: assets.profileDeposit,
  Withdrawal: assets.profileWithdrawal,
  "History Record": assets.profileHistory,
  Referral: assets.profileReferral,
  Downlines: assets.profileDownlines,
  "Change Language": assets.profileLanguage,
  "Change Password": assets.profilePassword,
};

function RowChevron() {
  return (
    <img src={assets.profileChevron} alt="" aria-hidden className="h-[18px] w-[18px] object-contain" />
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
          src={assets.profileAvatar}
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
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  // Check for missing profile info on mount
  useEffect(() => {
    const storedFullName = localStorage.getItem("userFullName") || draftFullName;
    const storedBirthDate = localStorage.getItem("userBirthDate"); // Assuming it's stored or default
    
    if (!storedFullName || !storedBirthDate) {
      setIsReminderOpen(true);
    }
  }, []);

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
      
      <ProfileUpdateReminderModal 
        isOpen={isReminderOpen} 
        onClose={() => setIsReminderOpen(false)} 
        onContinue={() => {
          setIsReminderOpen(false);
          setIsMyProfileOpen(true);
        }}
      />
    </section>
  );
}
