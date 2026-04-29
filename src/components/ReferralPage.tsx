import { useCallback, useMemo, useState } from "react";
import { DownlinesModal } from "./DownlinesModal";

type PageTab = "referral" | "rewards";

const referralLinkDefault = "https://leng855.com/register?ref=LEN855VIP";

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
      className="h-4 w-4 shrink-0 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : undefined, color: "var(--muted)" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
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
        style={{ background: "#1f2228", color: "#ffffff", fontFamily: "Poppins, sans-serif" }}
      >
        {text}
      </span>
    </span>
  );
}

// Figma icon assets for this frame (exact exports)
const imgCopy = "https://www.figma.com/api/mcp/asset/c5bd09be-d127-4471-b95e-f69e17e30bd2";
const imgShareOnFacebook = "https://www.figma.com/api/mcp/asset/63899948-cdda-4794-8c43-59cce5e6c107";
const imgShareOnTelegram = "https://www.figma.com/api/mcp/asset/57050813-26fd-4038-a9c9-31d0fa29a860";
const imgShareOnWhatsApp = "https://www.figma.com/api/mcp/asset/14e9dd20-5f8f-45d7-8994-01f5dfba20a3";
const imgStep01 = "https://www.figma.com/api/mcp/asset/fd857e24-eeae-43ca-ab74-5d6296511368";
const imgStep02 = "https://www.figma.com/api/mcp/asset/70faaa8f-2aa6-432c-83f9-6fecfd8c2265";
const imgStep03 = "https://www.figma.com/api/mcp/asset/f93ecb38-bf5a-4bd8-8ecf-fe616c69180b";
const imgInfoIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAMFBMVEUAAAB9fX19fX19fX18fHx8fHx+fn59fX16enp8fHx9fX16enp4eHh3d3d9fX19fX1tXtBLAAAAD3RSTlMA36+fgF/vYGDPj1AQIL+0MRL2AAAAkUlEQVQI12NgYOBpkv+pzgAG2/4DgTiIxfUfDByATH8I8xcDAzuQkr0GJDYwMAJJBSYgkcNQDyS/gBR9ZdD/DwWfGOYDBRn4gMyPDCCigBkkzAAiDCBMeRjzJ4M+mAnW1g9mgg07BtQWwAFUJsDADeSDHRLAwLAeYsMXoMtYIMwFIAc3gljZEG80zf+oeoCBAQD6u4RdPf8nFgAAAABJRU5ErkJggg==";

type CategoryPanel = { id: string; title: string; desc: string };

const categoryPanels: CategoryPanel[] = [
  { id: "live", title: "Live Casino", desc: "Commissions are calculated based on your downline activity and game type." },
  { id: "slots", title: "Slots", desc: "Slot commissions follow the campaign rates for your tier." },
  { id: "fish", title: "Fish Hunt", desc: "Fish Hunt downline rewards are credited according to the published terms." },
  { id: "sports", title: "Sports", desc: "Sports commissions depend on eligible wagers and status." },
];

const gameCommissionRows = [
  { provider: "Pragmatic Play", l1: "0.40%", l2: "0.35%", l3: "0.30%" },
  { provider: "PG Soft", l1: "0.38%", l2: "0.33%", l3: "0.28%" },
  { provider: "JILI", l1: "0.42%", l2: "0.36%", l3: "0.30%" },
  { provider: "Evolution Gaming", l1: "0.25%", l2: "0.22%", l3: "0.18%" },
  { provider: "SABA Sports", l1: "0.35%", l2: "0.30%", l3: "0.25%" },
];

export function ReferralPage() {
  const [pageTab, setPageTab] = useState<PageTab>("referral");
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [link] = useState(referralLinkDefault);

  const [isDownlinesOpen, setIsDownlinesOpen] = useState(false);

  const shareIcons = useMemo(
    () => [
      { label: "Facebook", href: "#share-fb", color: "#1877F2", src: imgShareOnFacebook },
      { label: "Telegram", href: "#share-telegram", color: "#229ED9", src: imgShareOnTelegram },
      { label: "WhatsApp", href: "#share-whatsapp", color: "#25D366", src: imgShareOnWhatsApp },
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

  const toggleCategory = (id: string) => setOpenCategory((prev) => (prev === id ? null : id));

  return (
    <section className="t3-referral-content" style={{ background: "var(--bg)" }}>
      <div className="mx-auto w-full max-w-[1430px] px-4 py-5">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <a href="#/" style={{ color: "var(--muted)", textDecoration: "none" }} aria-label="Home">
            Home
          </a>
          <ChevronRight />
          <span style={{ color: "var(--primary-dark)" }}>Referral</span>
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setPageTab("referral")}
            className="rounded-md px-4 py-2 text-sm font-extrabold"
            style={{
              background: pageTab === "referral" ? "var(--cta-gradient)" : "var(--surface-3)",
              color: pageTab === "referral" ? "var(--on-primary)" : "var(--text)",
            }}
          >
            Referral Info
          </button>
          <button
            type="button"
            onClick={() => setPageTab("rewards")}
            className="rounded-md px-4 py-2 text-sm font-extrabold"
            style={{
              background: pageTab === "rewards" ? "var(--cta-gradient)" : "var(--surface-3)",
              color: pageTab === "rewards" ? "var(--on-primary)" : "var(--text)",
            }}
          >
            My Rewards
          </button>
        </div>

        {pageTab === "rewards" ? (
          <div
            className="mt-5 rounded-xl border p-6"
            style={{ background: "var(--surface)", borderColor: "var(--panel-item-border)" }}
          >
            <div className="text-sm font-extrabold" style={{ color: "var(--primary-dark)" }}>
              My Rewards
            </div>
            <div className="mt-2 text-[13px]" style={{ color: "var(--muted)" }}>
              Rewards details will appear here.
            </div>
          </div>
        ) : (
          <>
            {/* Main two-card section */}
            <div className="mt-5 grid grid-cols-12 gap-4">
              {/* Left card */}
              <div className="col-span-12 lg:col-span-7">
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--panel-item-border)",
                    boxShadow: "var(--card-shadow)",
                  }}
                >
                  <h1 className="m-0 text-[18px] font-extrabold" style={{ color: "var(--primary-dark)" }}>
                    Invite friends now to get more reward
                  </h1>
                  <p className="m-0 mt-3 text-[13px]" style={{ color: "var(--muted)" }}>
                    Invite your friends to join through our referral program! Share your unique code or link and earn rewards as they sign up and engage with our platform.
                  </p>

                  <div className="mt-4">
                    <div className="text-[14px] font-extrabold" style={{ color: "var(--gold)" }}>
                      My Referral Link
                    </div>
                    <div
                      className="mt-2 flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5"
                      style={{
                        borderColor: "var(--panel-item-border)",
                        background: "var(--surface-3)",
                      }}
                    >
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <div className="truncate text-[13px] font-semibold" style={{ color: "var(--text)" }}>
                          {link}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={copyLink}
                        aria-label="Copy referral link"
                        className="grid h-9 w-9 place-items-center rounded-md border"
                        style={{
                          borderColor: "var(--panel-item-border)",
                          background: "var(--surface)",
                          color: "var(--primary)",
                          flexShrink: 0,
                        }}
                      >
                        <img src={imgCopy} alt="" className="h-4 w-4 object-contain" aria-hidden />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-[14px] font-extrabold" style={{ color: "var(--muted)" }}>
                      Share via social media
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {shareIcons.map(({ label, href, color, src }) => (
                        <a
                          key={label}
                          href={href}
                          aria-label={label}
                          className="grid h-10 w-10 place-items-center rounded-lg border"
                          style={{
                            borderColor: "var(--panel-item-border)",
                            background: "var(--surface)",
                            color,
                          }}
                        >
                          <img src={src} alt="" className="h-5 w-5 object-contain" aria-hidden />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right stats card */}
              <div className="col-span-12 lg:col-span-5">
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--panel-item-border)",
                    boxShadow: "var(--card-shadow)",
                    height: "100%",
                  }}
                >
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4" style={{ background: "var(--surface-3)", borderColor: "var(--panel-item-border)" }}>
                      <div className="flex items-center text-[13px] font-semibold" style={{ color: "var(--muted)" }}>
                        Total Referral Commission Bonus
                        <InfoTooltip
                          label="Total referral commission bonus info"
                          text="Your total commissions earned. Commissions are calculated from the total bets placed by your referrals."
                        />
                      </div>
                      <div className="mt-2 text-[18px] font-extrabold" style={{ color: "var(--gold)" }}>
                        $0.000
                      </div>
                    </div>
                    <div className="rounded-lg border p-4" style={{ background: "var(--surface-3)", borderColor: "var(--panel-item-border)" }}>
                      <div className="flex items-center text-[13px] font-semibold" style={{ color: "var(--muted)" }}>
                        Total Referral Deposit Bonus
                        <InfoTooltip
                          label="Total referral deposit bonus info"
                          text="Your total referral deposit bonus earned. Bonus is calculated from the total deposit by your referrals."
                        />
                      </div>
                      <div className="mt-2 text-[18px] font-extrabold" style={{ color: "var(--gold)" }}>
                        $0.000
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDownlinesOpen(true)}
                    className="mt-5 w-full rounded-lg py-3 text-[14px] font-extrabold"
                    style={{
                      background: "var(--gold-gradient)",
                      color: "var(--on-gold)",
                      border: "1px solid var(--panel-item-border)",
                    }}
                  >
                    Downlines
                  </button>
                </div>
              </div>
            </div>

            {/* Instruction section */}
            <div
              className="mt-6 rounded-xl border p-6"
              style={{ borderColor: "var(--panel-item-border)", background: "var(--surface-3)" }}
            >
              <div className="text-center text-[18px] font-extrabold" style={{ color: "var(--primary-dark)" }}>
                Invite Your Friends to Earn Passive Income
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {[
                  { label: "Step 01", text: "Share your Registration Link", src: imgStep01 },
                  { label: "Step 02", text: "Friends Registered Successfully", src: imgStep02 },
                  { label: "Step 03", text: "Earn Bonus from Your Downlines", src: imgStep03 },
                ].map(({ label, text, src }) => (
                  <div
                    key={label}
                    className="relative rounded-xl border px-5 pb-5 pt-8 text-center"
                    style={{ borderColor: "var(--panel-item-border)", background: "var(--surface)" }}
                  >
                    <div
                      className="absolute left-0 top-0 w-fit rounded-md px-4 py-1 text-[12px] font-extrabold"
                      style={{
                        background: "var(--cta-gradient)",
                        color: "var(--on-primary)",
                        boxShadow: "0 3px 8px color-mix(in srgb, var(--primary-dark) 36%, transparent)",
                      }}
                    >
                      {label}
                    </div>

                    <div className="mt-5 flex items-center justify-center">
                      <img src={src} alt="" className="h-16 w-16 object-contain" aria-hidden />
                    </div>

                    <div className="mt-4 text-[15px] font-bold" style={{ color: "var(--text)", lineHeight: 1.35 }}>
                      {text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Commission Rate */}
            <div
              className="mt-5 rounded-xl border p-5"
              style={{ borderColor: "var(--panel-item-border)", background: "var(--surface)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[16px] font-extrabold" style={{ color: "var(--primary-dark)" }}>
                    Game Commission Rate
                  </div>
                  <div className="mt-1 text-[13px]" style={{ color: "var(--muted)" }}>
                    Listing of commission rates you earn from your downlines&apos; bets by game type and provider.
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="t3-custom-table w-full min-w-[520px] border-collapse text-[13px]">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left">Provider</th>
                      <th className="px-3 py-2 text-center">Downlines L1</th>
                      <th className="px-3 py-2 text-center">Downlines L2</th>
                      <th className="px-3 py-2 text-center">Downlines L3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameCommissionRows.map((row) => (
                      <tr key={row.provider}>
                        <td className="downline-table-username px-3 py-2 font-medium">{row.provider}</td>
                        <td className="px-3 py-2 text-center">{row.l1}</td>
                        <td className="px-3 py-2 text-center">{row.l2}</td>
                        <td className="px-3 py-2 text-center">{row.l3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Category accordions */}
              <div className="mt-4 space-y-2">
                {categoryPanels.map((c) => {
                  const open = openCategory === c.id;
                  return (
                    <div
                      key={c.id}
                      className="t3-referral-accordion overflow-hidden rounded-lg border"
                      style={{ borderColor: "var(--panel-item-border)", background: "var(--surface-3)" }}
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-[13px] font-bold"
                        style={{ color: "var(--text)" }}
                        onClick={() => toggleCategory(c.id)}
                        aria-expanded={open}
                      >
                        {c.title}
                        <ChevronDown open={open} />
                      </button>
                      {open && (
                        <div
                          className="border-t px-4 py-3 text-[13px] leading-relaxed"
                          style={{ borderColor: "var(--panel-item-border)", color: "var(--muted)" }}
                        >
                          {c.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      <DownlinesModal isOpen={isDownlinesOpen} onClose={() => setIsDownlinesOpen(false)} />
    </section>
  );
}

