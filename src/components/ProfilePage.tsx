import { useState } from "react";

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
const imgSvg = "http://localhost:3845/assets/5d2ef9b4d2e298afe1708ec574df81824a35495b.svg";
const imgSvg1 = "http://localhost:3845/assets/17677a8777d52bc2d86aa8a6814fa510452d9739.svg";
const imgSvg2 = "http://localhost:3845/assets/d22a1aae2db90862b31afbc2ace3c8aeb8f642f3.svg";
const imgSvg3 = "http://localhost:3845/assets/e9907b69ce42e49cbdc525742ecdfd0c77c32159.svg";
const imgSvg4 = "http://localhost:3845/assets/6bbe609931419cad444e075297b2b2d11b58cba4.svg";
const imgSvg5 = "http://localhost:3845/assets/0f6ccec3d7689310b18d24f8ad957a07691b4d86.svg";
const imgSvg6 = "http://localhost:3845/assets/2e703fbbb4d613b4340b7ef07f594f82421d8c55.svg";
const imgSvg7 = "http://localhost:3845/assets/3558c9faded8e83d021562af8540a72eb3c245bd.svg";
const imgSvg8 = "http://localhost:3845/assets/6e5ba4e91d2aef82de39a1353d0172406bdfd798.svg";

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
        src="http://localhost:3845/assets/e8dec21ac7af7956edf1513a862e823a1b306176.png"
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
          className="rounded-lg px-5 py-2.5 text-sm font-bold"
          style={{ background: "var(--cta-gradient)", color: "var(--on-primary)" }}
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
    </section>
  );
}

