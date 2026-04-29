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

function UserAvatar() {
  return (
    <div
      className="grid h-[72px] w-[72px] place-items-center rounded-md border-2"
      style={{ borderColor: "color-mix(in srgb, var(--primary) 45%, transparent)", background: "var(--surface)" }}
      aria-hidden
    >
      {/* From Figma node `8116:39925` (avatar icon) */}
      <img
        src="https://www.figma.com/api/mcp/asset/78f25659-de5b-4941-baee-aec4c4051819"
        alt=""
        className="h-[52px] w-[52px] object-contain"
      />
    </div>
  );
}

export function ProfilePage() {
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [draftFullName, setDraftFullName] = useState("");
  const [isHistoryRecordOpen, setIsHistoryRecordOpen] = useState(false);
  const [isDownlinesOpen, setIsDownlinesOpen] = useState(false);
  const [isChangeLanguageOpen, setIsChangeLanguageOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <section className="mx-auto w-full max-w-[760px] px-4 py-6">
      <article className="rounded-md p-4" style={{ background: "var(--surface-3)" }}>
        <div className="flex items-start gap-4">
          <UserAvatar />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 text-[var(--primary-dark)]">
              <h2 className="truncate text-sm font-bold">test123</h2>
              <span className="truncate text-xs font-normal">85512121212</span>
            </div>
            <p className="mt-1 text-xs font-normal text-[var(--primary-dark)]">Normal</p>

            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="truncate text-xs font-normal text-[var(--primary-dark)]">Please Enjoy Your VIP Privileges !</p>
              <span className="shrink-0 text-xs text-[var(--muted)]">100%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded" style={{ background: "var(--surface)" }}>
              <div className="h-full rounded" style={{ width: "100%", background: "var(--cta-gradient)" }} />
            </div>
          </div>
        </div>
      </article>

      <article className="mt-3 rounded-md p-4" style={{ background: "var(--surface-3)" }}>
        <div className="flex items-center justify-between gap-3 rounded-md px-4 py-2.5" style={{ background: "var(--surface)" }}>
          <div>
            <div className="text-xs font-semibold text-[var(--primary)]">Balance</div>
            <div className="text-sm font-bold text-[var(--primary-dark)]">0.00</div>
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.hash = "#/deposit";
            }}
            className="rounded-lg px-5 py-2 text-sm font-bold"
            style={{ background: "var(--cta-gradient)", color: "var(--on-primary)" }}
          >
            Deposit
          </button>
        </div>
      </article>

      <div className="mt-4 space-y-2">
        {PROFILE_ACTIONS.map((label) => (
          <button
            key={label}
            type="button"
            className="flex h-[46px] w-full items-center justify-between rounded-md px-3 text-left"
            style={{ background: "var(--surface-3)" }}
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
              <span className="truncate text-sm font-normal text-[var(--primary-dark)]">{label}</span>
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
        username="test123"
        birthDate="29-04-2008"
        phone="85512121212"
        initialFullName={draftFullName}
      />

      <HistoryRecordModal isOpen={isHistoryRecordOpen} onClose={() => setIsHistoryRecordOpen(false)} />
      <DownlinesModal isOpen={isDownlinesOpen} onClose={() => setIsDownlinesOpen(false)} />
      <ChangeLanguageModal isOpen={isChangeLanguageOpen} onClose={() => setIsChangeLanguageOpen(false)} />
      <ChangePasswordModal isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
    </section>
  );
}

