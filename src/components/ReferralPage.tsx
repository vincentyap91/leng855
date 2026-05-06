import { useCallback, useMemo, useState, type ReactNode } from "react";
import { copyIconSrc } from "../data/copyIcon";
import { assets } from "../data/assets";
import { DownlinesModal } from "./DownlinesModal";

import { DEFAULT_REFERRAL_LINK } from "../data/referralDefaults";
import { SegmentedTabs } from "./SegmentedTabs";

function ChevronRight() {
  return (
    <span aria-hidden className="inline-block" style={{ transform: "translateY(1px)" }}>
      &gt;
    </span>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      className="h-5 w-5 shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : undefined, color: "var(--accent-soft)" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoTooltip({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  return (
    <span className="group relative inline-flex items-center">
      <button
        type="button"
        aria-label={label}
        className="ml-1 inline-flex h-5 w-5 items-center justify-center"
      >
        <img src={imgInfoIcon} alt="" className="h-5 w-5 object-contain" aria-hidden />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-20 w-[230px] -translate-x-1/2 rounded-lg px-4 py-2.5 text-center text-[13px] font-semibold leading-6 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{ background: "var(--surface-inverse)", color: "var(--surface-base)", fontFamily: "Poppins, sans-serif" }}
      >
        {text}
      </span>
    </span>
  );
}

// Figma icon assets for this frame (exact exports)
const imgShareOnFacebook = "https://www.figma.com/api/mcp/asset/63899948-cdda-4794-8c43-59cce5e6c107";
const imgShareOnTelegram = "https://www.figma.com/api/mcp/asset/57050813-26fd-4038-a9c9-31d0fa29a860";
const imgShareOnWhatsApp = "https://www.figma.com/api/mcp/asset/14e9dd20-5f8f-45d7-8994-01f5dfba20a3";
const imgStep01 = "https://www.figma.com/api/mcp/asset/fd857e24-eeae-43ca-ab74-5d6296511368";
const imgStep02 = "https://www.figma.com/api/mcp/asset/70faaa8f-2aa6-432c-83f9-6fecfd8c2265";
const imgStep03 = "https://www.figma.com/api/mcp/asset/f93ecb38-bf5a-4bd8-8ecf-fe616c69180b";
const imgInfoIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAMFBMVEUAAAB9fX19fX19fX18fHx8fHx+fn59fX16enp8fHx9fX16enp4eHh3d3d9fX19fX1tXtBLAAAAD3RSTlMA36+fgF/vYGDPj1AQIL+0MRL2AAAAkUlEQVQI12NgYOBpkv+pzgAG2/4DgTiIxfUfDByATH8I8xcDAzuQkr0GJDYwMAJJBSYgkcNQDyS/gBR9ZdD/DwWfGOYDBRn4gMyPDCCigBkkzAAiDCBMeRjzJ4M+mAnW1g9mgg07BtQWwAFUJsDADeSDHRLAwLAeYsMXoMtYIMwFIAc3gljZEG80zf+oeoCBAQD6u4RdPf8nFgAAAABJRU5ErkJggg==";

type CommissionRow = { provider: string; l1: string; l2: string };

type CommissionCategoryBlock = {
  id: string;
  title: string;
  icon: ReactNode;
  rows: CommissionRow[];
};

/** Game commission accordion icons (CDN) */
const imgCommissionSport = "https://pksoftcdn.azureedge.net/media/icon-sport-202510290907156271.svg";
const imgCommissionCasino = "https://pksoftcdn.azureedge.net/media/icon-casino-202510290907294845.svg";
const imgCommissionFish = "https://pksoftcdn.azureedge.net/media/icon-fish-202510290908089225.svg";
const imgCommissionEsport = "https://pksoftcdn.azureedge.net/media/icon-esport-202510290908358335.svg";

/** Monochrome / dark CDN icons → tint to match `var(--accent-soft)` */
const commissionIconSecondaryFilter =
  "brightness(0) saturate(100%) invert(72%) sepia(55%) saturate(520%) hue-rotate(2deg) brightness(98%) contrast(90%)";

function CommissionCategoryIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      className="h-6 w-6 object-contain"
      style={{ filter: commissionIconSecondaryFilter }}
      aria-hidden
    />
  );
}

/** Slots — inline SVG painted with theme gold */
function IconSlots({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--accent-soft)" strokeWidth="1.85" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <rect x="6" y="8" width="4.5" height="5" rx="1" fill="var(--accent-soft)" opacity={0.15} stroke="none" />
      <rect x="13.5" y="8" width="4.5" height="5" rx="1" fill="var(--accent-soft)" opacity={0.15} stroke="none" />
      <circle cx="8.25" cy="10.3" r="0.95" fill="var(--accent-soft)" stroke="none" />
      <circle cx="15.75" cy="10.3" r="0.95" fill="var(--accent-soft)" stroke="none" />
    </svg>
  );
}

const commissionCategories: CommissionCategoryBlock[] = [
  {
    id: "sports",
    title: "Sports",
    icon: <CommissionCategoryIcon src={imgCommissionSport} />,
    rows: [
      { provider: "SBO Sports", l1: "0.50", l2: "0.25" },
      { provider: "SABA Sport", l1: "0.48", l2: "0.23" },
      { provider: "M8Bet", l1: "0.42", l2: "0.21" },
      { provider: "CMD Sport", l1: "0.40", l2: "0.20" },
    ],
  },
  {
    id: "live-casino",
    title: "Live Casino",
    icon: <CommissionCategoryIcon src={imgCommissionCasino} />,
    rows: [
      { provider: "Evolution Gaming", l1: "0.25", l2: "0.18" },
      { provider: "Sexy Baccarat", l1: "0.22", l2: "0.16" },
      { provider: "Dream Gaming", l1: "0.20", l2: "0.15" },
      { provider: "SA Gaming", l1: "0.18", l2: "0.14" },
    ],
  },
  {
    id: "slots",
    title: "Slots",
    icon: <IconSlots />,
    rows: [
      { provider: "Pragmatic Play", l1: "0.40", l2: "0.35" },
      { provider: "PG Soft", l1: "0.38", l2: "0.33" },
      { provider: "JILI", l1: "0.42", l2: "0.36" },
      { provider: "Joker Slot", l1: "0.35", l2: "0.30" },
    ],
  },
  {
    id: "esports",
    title: "Esports",
    icon: <CommissionCategoryIcon src={imgCommissionEsport} />,
    rows: [
      { provider: "TF Gaming", l1: "0.48", l2: "0.24" },
      { provider: "IM Esports", l1: "0.44", l2: "0.22" },
      { provider: "CMD Esports", l1: "0.40", l2: "0.20" },
      { provider: "SABA Esports", l1: "0.38", l2: "0.19" },
    ],
  },
  {
    id: "fish-hunt",
    title: "Fish Hunt",
    icon: <CommissionCategoryIcon src={imgCommissionFish} />,
    rows: [
      { provider: "JILI Fishing", l1: "0.45", l2: "0.38" },
      { provider: "Fa Chai Fishing", l1: "0.40", l2: "0.34" },
      { provider: "SpadeGaming Fish", l1: "0.36", l2: "0.30" },
    ],
  },
];

function GameCommissionAccordionTable({
  rows,
}: {
  rows: CommissionRow[];
}) {
  const columns = ["Provider", "Downlines L1", "Downlines L2"] as const;
  const thTdBase = "px-[20px] py-[14px] align-middle";

  return (
    <div className="overflow-x-auto" style={{ background: "var(--surface-muted)" }}>
      <table className="w-full min-w-[440px] border-collapse text-[13px]">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            {columns.map((label, idx) => (
              <th
                key={label}
                className={`${thTdBase} font-extrabold ${idx === 0 ? "text-left" : "text-center"}`}
                style={{
                  color: "var(--brand-3)",
                  borderLeft: idx === 0 ? "none" : "1px solid var(--border-subtle)",
                  fontSize: "14px"
                }}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={`${row.provider}-${i}`}
              style={{
                borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border-subtle)",
              }}
            >
              <td className={`${thTdBase} text-left font-medium`} style={{ color: "var(--text-primary)" }}>
                {row.provider}
              </td>
              <td
                className={`${thTdBase} text-center tabular-nums`}
                style={{ color: "var(--text-primary)" }}
              >
                {row.l1}
              </td>
              <td className={`${thTdBase} text-center tabular-nums`} style={{ color: "var(--text-primary)" }}>
                {row.l2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type ReferralPageProps = {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
};

export function ReferralPage({ isLoggedIn = false, onLoginClick }: ReferralPageProps) {
  const [openCommissionCategoryId, setOpenCommissionCategoryId] = useState<string | null>(
    commissionCategories[0]?.id ?? null,
  );
  const [link] = useState(DEFAULT_REFERRAL_LINK);

  const [isDownlinesOpen, setIsDownlinesOpen] = useState(false);

  const shareIcons = useMemo(
    () => [
      { label: "Facebook", href: "#share-fb", color: "var(--feedback-info)", src: imgShareOnFacebook },
      { label: "Telegram", href: "#share-telegram", color: "var(--feedback-info)", src: imgShareOnTelegram },
      { label: "WhatsApp", href: "#share-whatsapp", color: "var(--feedback-success)", src: imgShareOnWhatsApp },
    ],
    [],
  );

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      /* ignore */
    }
  }, [link]);

  const toggleCommissionCategory = (id: string) =>
    setOpenCommissionCategoryId((prev) => (prev === id ? null : id));

  const passiveIncomeSection = (
    <div
      className="mt-6 rounded-xl border p-[20px]"
      style={{
        borderColor: "var(--panel-item-border)",
        background: "var(--surface-base)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div className="text-center text-[18px] font-extrabold" style={{ color: "var(--action-primary-hover)" }}>
        Invite Your Friends to Earn Passive Income
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { label: "Step 01", text: "Share your Registration Link", src: imgStep01 },
          { label: "Step 02", text: "Friends Registered Successfully", src: imgStep02 },
          { label: "Step 03", text: "Earn Bonus from Your Downlines", src: imgStep03 },
        ].map(({ label, text, src }) => (
          <div
            key={label}
            className="relative rounded-xl border p-[20px] text-center"
            style={{ borderColor: "var(--panel-item-border)", background: "var(--surface-muted)" }}
          >
            <div
              className="absolute left-0 top-0 w-fit px-5 py-1 text-[14px] font-extrabold"
              style={{
                background: "var(--cta-gradient)",
                color: "var(--text-on-emphasis)",
                boxShadow: "0 3px 8px rgba(185, 28, 28, 0.36)",
                borderRadius: "10px 0px 10px 0px",
              }}
            >
              {label}
            </div>

            <div className=" flex items-center justify-center">
              <img src={src} alt="" className="h-16 w-16 object-contain" aria-hidden />
            </div>

            <div className="mt-4 text-[15px] font-bold" style={{ color: "var(--text-primary)", lineHeight: 1.35 }}>
              {text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const gameCommissionSection = (
    <div
      className="mt-5 rounded-xl border p-[20px]"
      style={{
        borderColor: "var(--panel-item-border)",
        background: "var(--surface-base)",
        boxShadow: "var(--card-shadow)",
        ["--commission-title" as string]: "var(--text-primary)",
      }}
    >
      <div>
        <h2
          className="m-0 text-[17px] font-extrabold leading-tight tracking-tight"
          style={{ color: "var(--commission-title, var(--text-primary))" }}
        >
          Game Commission Rate
        </h2>
        <p className="m-0 mt-1.5 text-[13px] font-semibold leading-snug" style={{ color: "var(--accent-strong)" }}>
          Listing of commission rates you earn from your downlines&apos; bets by game type and provider.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {commissionCategories.map((cat) => {
          const open = openCommissionCategoryId === cat.id;
          return (
            <div
              key={cat.id}
              className="overflow-hidden rounded-[10px] border"
              style={{
                borderColor: "var(--brand-1)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`commission-panel-${cat.id}`}
                id={`commission-trigger-${cat.id}`}
                onClick={() => toggleCommissionCategory(cat.id)}
                className="flex w-full items-center px-[20px] py-[8px] text-left transition-all hover:brightness-110"
                style={{
                  background: "var(--ref-110)",
                  borderBottom: open ? "1px solid var(--brand-1)" : "none",
                  color: "var(--brand-1)",
                  minHeight: 60,
                }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center">{cat.icon}</span>
                <span className="min-w-0 flex-1 text-[17px] font-extrabold leading-snug tracking-wide">{cat.title}</span>
                <span className="shrink-0 text-[var(--brand-1)]">
                  <ChevronDown open={open} />
                </span>
              </button>
              <div id={`commission-panel-${cat.id}`} role="region" aria-labelledby={`commission-trigger-${cat.id}`}>
                {open && (
                  <div className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    <GameCommissionAccordionTable rows={cat.rows} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="t3-referral-content" style={{ background: "var(--surface-base)" }}>
      <div className="mx-auto w-full max-w-[1430px] px-4 py-5">
        {/* Breadcrumbs — pill */}
        <div
          className="inline-flex w-fit max-w-full items-center gap-2 rounded-full text-sm font-semibold"
          style={{
            background: "var(--surface-muted)",
            color: "var(--text-secondary)",
            padding: "3px 20px",
            lineHeight: "36px",
          }}
        >
          <a href="#/" style={{ color: "var(--text-secondary)", textDecoration: "none" }} aria-label="Home">
            Home
          </a>
          <ChevronRight />
          <span style={{ color: "var(--action-primary-hover)" }}>Referral</span>
        </div>

        <SegmentedTabs 
          className="mt-4"
          options={[{ id: "info", label: "Referral Info" }]} 
          activeId="info" 
          onChange={() => {}} 
        />

        {!isLoggedIn ? (
          <>
            <div className="referral-login t3-referral-login-banner">
              <p className="t3-referral-login-banner__title">Log In to View Your Unique Referral Info</p>
              <button type="button" className="t3-referral-login-banner__cta" onClick={() => onLoginClick?.()}>
                Login Now!
              </button>
            </div>

            <div className="t3-referral-promo-row">
              <div className="t3-referral-promo-card t3-referral-promo-card--commission">
                <img
                  src={assets.referralPromoCommission}
                  alt=""
                  className="t3-referral-promo-card__art"
                  width={180}
                  height={160}
                />
                <div className="t3-referral-promo-card__body t3-referral-promo-card__body--end">
                  <p className="t3-referral-promo-card__eyebrow">Invite friends to receive</p>
                  <p className="t3-referral-promo-card__headline">
                    Referral Commission Bonus when your downlines play
                  </p>
                </div>
              </div>
              <div className="t3-referral-promo-card t3-referral-promo-card--deposit">
                <div className="t3-referral-promo-card__body t3-referral-promo-card__body--start">
                  <p className="t3-referral-promo-card__eyebrow">Invite friends to receive</p>
                  <p className="t3-referral-promo-card__headline">
                    Referral Deposit Bonus when your downlines make a valid deposit
                  </p>
                </div>
                <img
                  src={assets.referralPromoDeposit}
                  alt=""
                  className="t3-referral-promo-card__art"
                  width={180}
                  height={160}
                />
              </div>
            </div>

            {passiveIncomeSection}
            {gameCommissionSection}
          </>
        ) : (
          <>
            {/* Main content — 50% / 50%; stack on small screens */}
            <div className="mt-5 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Left: invite */}
                    <div
                      className="referral-invite-card flex min-w-0 flex-col gap-4 rounded-xl border p-[20px]"
                      style={{
                        background: "var(--surface-muted)",
                        borderColor: "var(--panel-item-border)",
                        boxShadow: "var(--card-shadow)",
                      }}
                    >
                    <h1 className="m-0 text-lg font-extrabold leading-snug md:text-[18px]" style={{ color: "var(--action-primary-hover)" }}>
                      Invite friends now to get more reward
                    </h1>
                    <p className="m-0 text-[13px] leading-relaxed md:text-[14px]" style={{ color: "var(--text-secondary)" }}>
                      Invite your friends to join through our referral program! Share your unique code or link and earn rewards as they sign up and engage with our platform.
                    </p>
                      <div
                        className="h-px w-full shrink-0"
                        style={{
                          background: "var(--border-subtle)",
                          margin: "20px 0px",
                        }}
                        aria-hidden
                      />

                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-extrabold md:text-[15px]" style={{ color: "var(--action-primary-hover)" }}>
                        My Referral Link
                      </div>
                      <div className="relative w-full min-w-0">
                        <div
                          className="relative flex min-h-[46px] w-full items-center rounded-lg border pl-4 pr-14 text-left"
                          style={{
                            borderColor: "var(--panel-item-border)",
                            background: "var(--surface-base)",
                            boxShadow: "inset 0 1px 0 rgba(0, 0, 0, 0.04)",
                          }}
                        >
                          <div className="min-w-0 flex-1 overflow-hidden py-3">
                            <div className="truncate text-[13px] font-semibold md:text-sm" style={{ color: "var(--text-primary)" }}>
                              {link}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={copyLink}
                            aria-label="Copy referral link"
                            className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full"
                            style={{
                              color: "var(--accent-soft)",
                              background: "transparent",
                            }}
                          >
                            <img src={copyIconSrc} alt="" className="h-[18px] w-[18px] object-contain opacity-95" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
                      <span className="shrink-0 text-sm font-extrabold md:text-[15px]" style={{ color: "var(--action-primary-hover)" }}>
                        Share via social media
                      </span>
                      <div className="flex flex-wrap items-center gap-2.5 sm:justify-end">
                        {shareIcons.map(({ label, href, color, src }) => (
                          <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="grid h-11 w-11 place-items-center rounded-full border shadow-sm"
                            style={{
                              borderColor: "var(--panel-item-border)",
                              background: "var(--surface-base)",
                              color,
                              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <img src={src} alt="" className="h-5 w-5 object-contain" aria-hidden />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: stats + Downlines */}
                  <div
                    className="flex min-h-[100%] min-w-0 flex-col gap-4 rounded-xl border p-[20px]"
                    style={{
                      background: "var(--surface-muted)",
                      borderColor: "var(--panel-item-border)",
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div className="flex flex-1 flex-col gap-4">
                      <div
                        className="rounded-lg border p-[20px]"
                        style={{ background: "var(--surface-muted)", borderColor: "var(--panel-item-border)" }}
                      >
                        <div className="flex items-center text-[13px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                          Total Referral Commission Bonus
                          <InfoTooltip
                            label="Total referral commission bonus info"
                            text="Your total commissions earned. Commissions are calculated from the total bets placed by your referrals."
                          />
                        </div>
                        <div
                          className="mt-2 text-[20px] font-extrabold tabular-nums tracking-tight"
                          style={{ color: "var(--accent-soft)" }}
                        >
                          0.000
                        </div>
                      </div>
                      <div
                        className="rounded-lg border p-[20px]"
                        style={{ background: "var(--surface-muted)", borderColor: "var(--panel-item-border)" }}
                      >
                        <div className="flex items-center text-[13px] font-semibold" style={{ color: "var(--text-secondary)" }}>
                          Total Referral Deposit Bonus
                          <InfoTooltip
                            label="Total referral deposit bonus info"
                            text="Your total referral deposit bonus earned. Bonus is calculated from the total deposit by your referrals."
                          />
                        </div>
                        <div
                          className="mt-2 text-[20px] font-extrabold tabular-nums tracking-tight"
                          style={{ color: "var(--accent-soft)" }}
                        >
                          0.000
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsDownlinesOpen(true)}
                      className="mt-auto w-full rounded-lg py-3 text-[14px] font-extrabold"
                        style={{
                          background: "var(--cta-gradient)",
                          color: "var(--text-on-emphasis)",
                          border: "1px solid var(--ref-40)",
                          boxShadow: "var(--card-shadow)",
                        }}
                    >
                      Downlines
                    </button>
                  </div>
                </div>

                {passiveIncomeSection}
                {gameCommissionSection}
                <ReferralFAQSection />
          </>
        )}
      </div>

      <DownlinesModal isOpen={isDownlinesOpen} onClose={() => setIsDownlinesOpen(false)} />
    </section>
  );
}

function ReferralFAQSection() {
  const [activeTab, setActiveTab] = useState<"faq" | "terms">("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does our Referral Program work?",
      a: "You can earn cash rewards up to three referral tiers when you refer your friends. Invite your friends to join together and be entitled for lifetime cash rewards each time your friends Deposit.",
    },
    {
      q: "What Should You Do?",
      a: "Simply share your unique referral link with your friends. Once they register and start playing, you will begin earning rewards based on their activity levels and deposits across all game categories.",
    },
    {
      q: "Test 123",
      a: "This section demonstrates the accordion functionality. Each question can be expanded to reveal detailed information about the specific topic.",
    },
    {
      q: "friend limitation",
      a: "There are no limits to the number of friends you can refer. The more friends you invite to join our platform, the higher your potential passive income rewards will be.",
    },
  ];

  const terms = [
    {
      q: "General Terms & Conditions",
      a: "By participating in the Referral Program, you agree to abide by all platform rules. Rewards are calculated based on valid turnover and deposits from verified accounts only.",
    },
    {
      q: "Abuse Policy",
      a: "Any attempt to manipulate the referral system through multiple accounts or fraudulent activity will lead to immediate disqualification and forfeiture of all accumulated rewards.",
    },
  ];

  const items = activeTab === "faq" ? faqs : terms;

  return (
    <div 
      className="mt-8 rounded-xl border p-[20px]" 
      style={{ 
        borderColor: "var(--panel-item-border)", 
        background: "var(--surface-base)", 
        boxShadow: "var(--card-shadow)" 
      }}
    >
      <h2 
        className="m-0 text-[18px] font-extrabold tracking-tight" 
        style={{ color: "var(--brand-3)", fontFamily: "var(--base-font-family)" }}
      >
        Frequently Asked Questions
      </h2>

      {/* Tab Switcher */}
      <SegmentedTabs
        className="mt-6"
        options={[
          { id: "faq", label: "FAQ" },
          { id: "terms", label: "Terms & Conditions" }
        ]}
        activeId={activeTab}
        onChange={(id) => { setActiveTab(id); setOpenIndex(0); }}
      />

      {/* Accordion List */}
      <div className="mt-6 flex flex-col overflow-hidden rounded-xl border" style={{ borderColor: "var(--border-default)" }}>
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="border-b last:border-b-0" 
              style={{ borderColor: "var(--border-default)" }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors"
                style={{ background: "var(--surface-muted)" }}
              >
                <span className="text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>{item.q}</span>
                <span style={{ color: "var(--brand-3)" }}>
                  <svg 
                    className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div 
                  className="px-5 py-5 text-[14px] leading-[1.6] animate-in fade-in slide-in-from-top-1 duration-200" 
                  style={{ background: "var(--surface-base)", color: "var(--text-primary)" }}
                >
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
