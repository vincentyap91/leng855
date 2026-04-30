/**
 * Mobile-only: auth row, profile card, referral promo (CDN banner + CTA grid).
 * Desktop: full-width referral hub with CDN background + white “hub” card (`DesktopReferralHubBanner`).
 */

import { useCallback } from "react";
import { assets } from "../data/assets";
import { copyIconSrc } from "../data/copyIcon";
import { DEFAULT_REFERRAL_LINK } from "../data/referralDefaults";

type MobileAuthBarProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export function MobileAuthBar({ onLoginClick, onRegisterClick }: MobileAuthBarProps) {
  return (
    <div className="home-mobile-only mt-4 flex w-full gap-3 px-0">
      <button
        type="button"
        className="min-h-[48px] flex-1 rounded-lg border-2 text-sm font-extrabold transition hover:brightness-[0.98]"
        style={{
          borderColor: "var(--border-strong)",
          background: "var(--bg)",
          color: "var(--gold)",
        }}
        onClick={onLoginClick}
      >
        LOG IN
      </button>
      <button
        type="button"
        className="min-h-[48px] flex-1 rounded-lg border-0 text-sm font-extrabold text-[var(--on-primary)] transition hover:brightness-110"
        style={{ background: "var(--cta-gradient)" }}
        onClick={onRegisterClick}
      >
        REGISTER
      </button>
    </div>
  );
}

function IconDepositPill() {
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/25 text-[11px] font-black text-white" aria-hidden>
      $
    </span>
  );
}

function IconWithdrawWallet() {
  return (
    <svg className="h-6 w-6 shrink-0 text-white/95" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

function IconRefresh() {
  return (
    <svg className="h-5 w-5 shrink-0 text-white/95" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </svg>
  );
}

function IconMembershipBadge() {
  return (
    <svg className="h-5 w-5 shrink-0 opacity-75" viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ color: "var(--gold)" }}>
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7 2h8.6l1.55 2H6.14L7.7 18z" />
    </svg>
  );
}

type MobileProfileCardProps = {
  username: string;
  balanceDisplay: string;
  membershipStatus?: string;
  onBalanceRefresh?: () => void;
  /** Rollover wagering progress (display only until API wired). */
  rolloverCurrent?: number;
  rolloverTarget?: number;
};

export function MobileProfileCard({
  username,
  balanceDisplay,
  membershipStatus = "Normal",
  onBalanceRefresh,
  rolloverCurrent = 50,
  rolloverTarget = 100,
}: MobileProfileCardProps) {
  const labelColor = "var(--primary-dark)";
  const rolloverPct =
    rolloverTarget > 0 ? Math.min(100, Math.max(0, Math.round((rolloverCurrent / rolloverTarget) * 100))) : 0;

  return (
    <section className="home-mobile-profile-card home-mobile-only mt-4 overflow-hidden rounded-xl border p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="truncate text-base font-extrabold" style={{ color: labelColor }}>
          {username}
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-right text-xs font-bold leading-tight" style={{ color: labelColor }}>
            Membership: {membershipStatus}
          </span>
          <IconMembershipBadge />
        </div>
      </div>

      <div
        className="my-3 h-px w-full"
        style={{ background: "color-mix(in srgb, var(--primary-dark) 22%, var(--border) 78%)" }}
        aria-hidden
      />

      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-extrabold" style={{ color: labelColor }}>
            Balance:
          </div>
          <div className="mt-0.5 text-[26px] font-black tabular-nums leading-none tracking-tight" style={{ color: labelColor }}>
            {balanceDisplay}
          </div>
          <div className="mt-3 space-y-1 text-[11px] font-bold" style={{ color: labelColor }}>
            <div>Min Deposit: -</div>
            <div>Min Withdrawal: -</div>
          </div>
        </div>

        <div className="flex w-[128px] shrink-0 flex-col justify-center gap-2">
          <a
            href="#/deposit"
            className="flex min-h-[40px] items-center gap-2 rounded-lg px-2.5 text-xs font-extrabold text-white no-underline"
            style={{ background: "var(--cta-gradient)" }}
          >
            <IconDepositPill />
            Deposit
          </a>
          <a
            href="#/deposit?tab=withdrawal"
            className="flex min-h-[40px] items-center gap-1.5 rounded-lg px-2.5 text-xs font-extrabold text-white no-underline"
            style={{ background: "var(--gold-gradient)" }}
          >
            <IconWithdrawWallet />
            Withdraw
          </a>
          <button
            type="button"
            className="flex min-h-[40px] items-center gap-2 rounded-lg px-2.5 text-left text-xs font-extrabold text-white"
            style={{ background: "var(--gold-gradient)" }}
            onClick={() => onBalanceRefresh?.()}
          >
            <IconRefresh />
            Refresh
          </button>
        </div>
      </div>

      <div className="home-mobile-profile-card__rollover">
        <p className="m-0 text-[11px] font-bold leading-snug" style={{ color: labelColor }}>
          Your Rollover Progress is{" "}
          <span className="font-extrabold" style={{ color: "var(--gold)" }}>
            {rolloverCurrent} / {rolloverTarget}
          </span>
          .
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <div className="home-mobile-profile-card__rollover-track min-w-0 flex-1">
            <div className="home-mobile-profile-card__rollover-fill" style={{ width: `${rolloverPct}%` }} />
          </div>
          <span
            className="shrink-0 text-xs font-extrabold tabular-nums leading-none"
            style={{ color: "var(--primary-dark)" }}
          >
            {rolloverPct}%
          </span>
        </div>
      </div>
    </section>
  );
}

const referralHubGoldBtn =
  "rounded-lg border-0 py-3 text-sm font-extrabold transition hover:brightness-105 min-h-[44px]";
const referralHubGoldBtnStyle = {
  background: "var(--nav-header-register-bg)",
  color: "var(--nav-header-register-color)",
} as const;

function goReferralPage() {
  window.location.hash = "#/referral";
}

/** Mobile: CDN art + white CTA strip (Share | Downlines / More Info). */
export function MobilePassiveIncomeBanner() {
  return (
    <section
      className="home-mobile-only mt-5 overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--panel-item-border)" }}
    >
      <img
        src={assets.referralBannerMobile}
        alt="Invite your friends and earn passive income"
        className="block h-auto w-full object-cover"
        width={1024}
        height={549}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
      <div className="px-3 pb-4 pt-3" style={{ background: "var(--bg)" }}>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className={referralHubGoldBtn}
            style={referralHubGoldBtnStyle}
            onClick={goReferralPage}
          >
            Share
          </button>
          <button
            type="button"
            className={referralHubGoldBtn}
            style={referralHubGoldBtnStyle}
            onClick={goReferralPage}
          >
            Downlines
          </button>
          <button
            type="button"
            className={`${referralHubGoldBtn} col-span-2`}
            style={referralHubGoldBtnStyle}
            onClick={goReferralPage}
          >
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

/** Desktop (lg+): CDN background + left “Your Unique Referral Hub” card. */
export function DesktopReferralHubBanner() {
  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(DEFAULT_REFERRAL_LINK);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section
      className="home-desktop-referral-hub relative mt-6 hidden overflow-hidden rounded-2xl border lg:block"
      style={{ borderColor: "var(--panel-item-border)" }}
    >
      <div className="relative min-h-[240px] w-full md:min-h-[300px]">
        <img
          src={assets.referralBannerDesktop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1544}
          height={451}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-[1] flex min-h-[240px] items-center p-5 md:min-h-[300px] md:p-10">
          <div className="home-desktop-referral-hub__card w-full max-w-[400px] rounded-xl border-2 bg-[var(--bg)] p-6 md:p-7 md:ml-[5%]">
            <h3 className="m-0 text-lg font-extrabold tracking-tight md:text-xl" style={{ color: "var(--gold)" }}>
              Your Unique Referral Hub
            </h3>
            <p className="m-0 mt-5 text-xs font-extrabold md:text-[13px]" style={{ color: "var(--gold)" }}>
              My Referral Link
            </p>
            <div
              className="relative mt-2 flex min-h-[46px] items-center rounded-[10px] border px-3 pr-12"
              style={{
                borderColor: "color-mix(in srgb, var(--gold) 35%, var(--border) 65%)",
                background: "var(--surface-3)",
              }}
            >
              <span
                className="min-w-0 flex-1 truncate text-left text-[12px] font-semibold md:text-[13px]"
                style={{ color: "var(--text)" }}
              >
                {DEFAULT_REFERRAL_LINK}
              </span>
              <button
                type="button"
                aria-label="Copy referral link"
                className="absolute right-1.5 grid h-10 w-10 place-items-center rounded-full border-0 bg-transparent transition hover:opacity-90"
                style={{ color: "var(--gold)" }}
                onClick={copyLink}
              >
                <img src={copyIconSrc} alt="" className="h-[18px] w-[18px] object-contain opacity-95" aria-hidden />
              </button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                className={referralHubGoldBtn}
                style={referralHubGoldBtnStyle}
                onClick={goReferralPage}
              >
                Share
              </button>
              <button
                type="button"
                className={referralHubGoldBtn}
                style={referralHubGoldBtnStyle}
                onClick={goReferralPage}
              >
                Downlines
              </button>
              <button
                type="button"
                className={`${referralHubGoldBtn} col-span-2`}
                style={referralHubGoldBtnStyle}
                onClick={goReferralPage}
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
