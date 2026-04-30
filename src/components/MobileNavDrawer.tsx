import { useEffect, useState } from "react";
import { assets } from "../data/assets";
import type { AppView } from "./Sidebar";

/** Full-screen mobile menu — screenshot: white rows, icon + label both #a01a1a (no gradient icon tiles). */
const MENU = {
  panelBg: "#e0e4e8",
  langBg: "#2b1b09",
  langAccent: "#c5a059",
  label: "#a01a1a",
  cardBorder: "#e2e6ea",
  footerMuted: "#8b6914",
  /** Renders colored PNG/SVG nav glyphs as ~#a01a1a */
  iconFilter:
    "brightness(0) saturate(100%) invert(14%) sepia(72%) saturate(4156%) hue-rotate(335deg) brightness(96%) contrast(101%)",
} as const;

const BUILD_LABEL = "Build v1.1.10421";

type RouteItem = { label: string; icon: string; target: AppView; badge?: number };

const routeItems: RouteItem[] = [
  { label: "Home", icon: assets.iconHome, target: "home" },
  { label: "All", icon: assets.iconAll, target: "all-games" },
  { label: "ESport", icon: assets.iconHotGames, target: "hot-games" },
  { label: "Live Casino", icon: assets.iconCasino, target: "live-casino" },
  { label: "Slots", icon: assets.iconSlots, target: "slots" },
  { label: "Sports", icon: assets.iconSport, target: "sports" },
  { label: "Fish Hunt", icon: assets.iconFish, target: "fish-hunt" },
  { label: "RNG", icon: assets.iconRng, target: "rng" },
  { label: "Promotion", icon: assets.iconPromo, target: "promotion", badge: 1 },
  { label: "Referral", icon: assets.iconReferral, target: "referral" },
  { label: "Rebate", icon: assets.iconRebate, target: "rebate" },
];

function isRouteActive(view: AppView, target: AppView): boolean {
  if (target === "promotion") return view === "promotion" || view === "promotion-detail";
  return view === target;
}

function NavIcon({ src }: { src: string }) {
  return (
    <span className="inline-flex h-9 w-[38px] shrink-0 items-center justify-center" aria-hidden>
      <img
        src={src}
        alt=""
        className="h-7 w-7 max-h-7 max-w-7 object-contain"
        style={{ filter: MENU.iconFilter }}
      />
    </span>
  );
}

type MobileNavDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  view: AppView;
  onNavigate: (next: AppView) => void;
};

export function MobileNavDrawer({ isOpen, onClose, view, onNavigate }: MobileNavDrawerProps) {
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setLangOpen(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const go = (target: AppView) => {
    onNavigate(target);
    onClose();
  };

  const cardBase =
    "mobile-nav-drawer__card relative flex w-full items-center gap-2.5 rounded-lg bg-white px-1 py-1 text-left outline-none transition  active:brightness-[0.98]";

  const cardStyle = { borderColor: MENU.cardBorder, boxShadow: "0 1px 2px rgba(0,0,0,0.07)" } as const;

  const activeRing = "ring-2 ring-[#a01a1a]/28 ring-offset-2 ring-offset-[#e0e4e8]";

  return (
    <div
      className="mobile-nav-drawer fixed inset-0 z-[240] flex flex-col lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close menu" onClick={onClose} />

      <div
        className="relative z-[1] flex min-h-0 flex-1 flex-col"
        style={{
          background: MENU.panelBg,
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-4">
          <div className="relative min-w-0">
            <button
              type="button"
              className="flex max-w-[220px] items-center gap-2.5 rounded-[10px] border-0 px-3.5 py-2.5 text-left text-[13px] font-extrabold shadow-md"
              style={{
                background: MENU.langBg,
                color: MENU.langAccent,
                boxShadow: "0 2px 10px rgba(0,0,0,0.22)",
              }}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              onClick={() => setLangOpen((v) => !v)}
            >
              <img src={assets.ukFlag} alt="" className="h-6 w-6 shrink-0 rounded-lg object-cover ring-1 ring-white/20" />
              <span className="min-w-0 flex-1 truncate font-medium text-sm">English</span>
              <span className="-rotate-90"><svg focusable="false" color="#ffffff" aria-hidden="true" viewBox="0 0 24 24" data-testid="ExpandMoreIcon" fill="white" height="20px" className="language-arrow-down"><path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
              </span>
            </button>
            {langOpen ? (
              <div
                className="absolute left-0 top-[calc(100%+8px)] z-10 min-w-[220px] overflow-hidden rounded-[10px] border py-1 shadow-lg"
                style={{ borderColor: MENU.cardBorder, background: "#ffffff" }}
                role="listbox"
              >
                <button
                  type="button"
                  role="option"
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] font-bold hover:bg-black/[0.04]"
                  style={{ color: "#1a1a1a" }}
                  onClick={() => setLangOpen(false)}
                >
                  <img src={assets.cambodiaFlag} alt="" className="h-5 w-5 rounded-full object-cover" /> Khmer
                </button>
                <button
                  type="button"
                  role="option"
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] font-bold hover:bg-black/[0.04]"
                  style={{ color: "#1a1a1a" }}
                  onClick={() => setLangOpen(false)}
                >
                  <img src={assets.ukFlag} alt="" className="h-5 w-5 rounded-full object-cover" /> English
                </button>
                <button
                  type="button"
                  role="option"
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] font-bold hover:bg-black/[0.04]"
                  style={{ color: "#1a1a1a" }}
                  onClick={() => setLangOpen(false)}
                >
                  <img src={assets.chinaFlag} alt="" className="h-5 w-5 rounded-full object-cover" /> 简体中文
                </button>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="grid h-11 min-w-[44px] shrink-0 place-items-center rounded-[10px] border-0 bg-transparent text-[2rem] font-light leading-none transition hover:opacity-90"
            style={{ color: MENU.langAccent }}
            aria-label="Close menu"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <nav className="mobile-nav-drawer__nav min-h-0 flex-1 overflow-y-auto px-4" aria-label="Site sections">
          <div className="flex flex-col gap-3 pb-3">
            {routeItems.map((item) => {
              const active = isRouteActive(view, item.target);
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => go(item.target)}
                  className={[cardBase, active ? activeRing : ""].filter(Boolean).join(" ")}
                  style={cardStyle}
                >
                  <NavIcon src={item.icon} />
                  <span className="min-w-0 flex-1 text-[15px] font-extrabold leading-snug tracking-tight" style={{ color: MENU.label }}>
                    {item.label}
                  </span>
                  {item.badge !== undefined ? (
                    <span
                      className="min-w-[22px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold text-white"
                      style={{ background: MENU.label }}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => go("recent-game")}
              className={[cardBase, isRouteActive(view, "recent-game") ? activeRing : ""].filter(Boolean).join(" ")}
              style={cardStyle}
            >
              <NavIcon src={assets.iconRecent} />
              <span className="text-[15px] font-extrabold leading-snug tracking-tight" style={{ color: MENU.label }}>
                Recent Game
              </span>
            </button>

            <button
              type="button"
              className={cardBase}
              style={cardStyle}
              onClick={onClose}
            >
              <NavIcon src={assets.iconLiveChat} />
              <span className="min-w-0 flex-1 text-[15px] font-extrabold leading-snug tracking-tight" style={{ color: MENU.label }}>
                Live Chat
              </span>
              <span
                className="min-w-[22px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold text-white"
                style={{ background: MENU.label }}
              >
                1
              </span>
            </button>
          </div>
        </nav>

        <footer
          className="shrink-0 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-1 text-center text-[11px] font-semibold tabular-nums"
          style={{ color: MENU.footerMuted }}
        >
          {BUILD_LABEL}
        </footer>
      </div>
    </div>
  );
}
