import { assets } from "../data/assets";

export type AppView = "home" | "hot-games" | "all-games" | "promotion" | "promotion-detail" | "referral" | "deposit" | "profile" | "rebate" | "recent-game";

type Item = {
  label: string;
  icon: string;
  badge?: number;
};

const mainItems: Item[] = [
  { label: "Home", icon: assets.iconHome },
  { label: "Hot Games", icon: assets.iconHotGames },
  { label: "All", icon: assets.iconAll },
  { label: "Live Casino", icon: assets.iconCasino },
  { label: "Slots", icon: assets.iconSlots },
  { label: "Sports", icon: assets.iconSport },
  { label: "Fish Hunt", icon: assets.iconFish },
  { label: "RNG", icon: assets.iconRng },
  { label: "Promotion", icon: assets.iconPromo, badge: 1 },
  { label: "Referral", icon: assets.iconReferral },
  { label: "Rebate", icon: assets.iconRebate },
];

/** Live Chat — same 24×24 + filter treatment as other sidebar rows */
function LiveChatIcon() {
  return (
    <img
      src={assets.iconLiveChat}
      alt=""
      className="h-[24px] w-[24px] shrink-0 object-contain pointer-events-none [filter:var(--sidebar-icon-filter)] group-hover:[filter:var(--sidebar-icon-filter-active)]"
      draggable={false}
      aria-hidden
    />
  );
}

type SideLinkProps = Item & { active: boolean; onSelect?: () => void };

function SideLink({ label, icon, badge, active, onSelect }: SideLinkProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "t3-sidemenu-item side-nav-item group relative w-full h-[44px] rounded-lg transition-[color,background-color,box-shadow] duration-200 ease-out flex items-center px-[12px] gap-[10px]",
        active ? "side-nav-item--active bg-[var(--nav-side-active)]" : "bg-bg-item hover:bg-[var(--nav-side-item-hover)]",
      ].join(" ")}
      style={{
        boxShadow: active ? "var(--nav-side-item-active-shadow)" : undefined,
      }}
    >
      <img
        src={icon}
        alt=""
        className="side-nav-icon w-[24px] h-[24px] object-contain shrink-0 transition"
      />
      <h6
        className={[
          "m-0 text-[13px] font-semibold leading-none flex-1 text-left",
          active
            ? "text-[var(--nav-side-text-active)]"
            : "text-[var(--nav-side-color)] group-hover:text-[var(--nav-side-text-hover)]",
        ].join(" ")}
      >
        {label}
      </h6>
      {badge !== undefined && (
        <span
          className={[
            "min-w-[18px] h-[18px] px-[5px] rounded-full text-[11px] font-bold flex items-center justify-center",
            active
              ? "bg-white text-[var(--primary)]"
              : "bg-[var(--primary)] text-white",
          ].join(" ")}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/** Plain row: icon + white label, no filled cell (screenshot: Recent Game) */
function RecentGameLink({ active, onSelect }: { active: boolean; onSelect?: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "t3-sidemenu-item group w-full h-[44px] rounded-lg flex items-center px-[12px] gap-[10px] text-left transition-colors",
        active ? "side-nav-item--active bg-[var(--nav-side-active)]" : "bg-bg-item hover:bg-[var(--nav-side-item-hover)]",
      ].join(" ")}
      style={{ boxShadow: active ? "var(--nav-side-item-active-shadow)" : undefined }}
    >
      <img
        src={assets.iconRecent}
        alt=""
        className={[
          "w-[24px] h-[24px] object-contain shrink-0",
          active ? "[filter:var(--sidebar-icon-filter-active)]" : "[filter:var(--sidebar-icon-filter)] group-hover:[filter:var(--sidebar-icon-filter-active)]",
        ].join(" ")}
      />
      <h6
        className={[
          "m-0 text-[13px] font-semibold leading-none",
          active ? "text-[var(--nav-side-text-active)]" : "text-[var(--nav-side-color)] group-hover:text-[var(--nav-side-text-hover)]",
        ].join(" ")}
      >
        Recent Game
      </h6>
    </button>
  );
}

/** Live Chat — layout/spacing matches Recent Game; badge matches SideLink pill */
function LiveChatLink() {
  return (
    <button
      type="button"
      className="t3-sidemenu-item group w-full h-[44px] rounded-lg flex items-center px-[12px] gap-[10px] text-left transition-colors bg-bg-item hover:bg-[var(--nav-side-item-hover)]"
    >
      <LiveChatIcon />
      <h6 className="m-0 text-[13px] font-semibold leading-none flex-1 text-left text-[var(--nav-side-color)] group-hover:text-[var(--nav-side-text-hover)]">
        Live Chat
      </h6>
      <span className="min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--primary)] text-white text-[11px] font-bold flex items-center justify-center">
        1
      </span>
    </button>
  );
}

function SocialSidebarRow() {
  const linkClass =
    "block w-[34px] h-[34px] rounded-[6px] overflow-hidden ring-1 ring-white/10 shadow-sm hover:brightness-110 transition-[filter] duration-150";

  return (
    <div className="flex items-center justify-center gap-2.5 pt-3 pb-1">
      <a href="#facebook" className={linkClass} aria-label="Facebook">
        <img
          src={assets.socialFb}
          alt=""
          className="w-full h-full object-cover"
        />
      </a>
      <a href="#telegram" className={linkClass} aria-label="Telegram">
        <img
          src={assets.socialTelegram}
          alt=""
          className="w-full h-full object-cover"
        />
      </a>
      <a href="#line" className={linkClass} aria-label="Line">
        <img
          src={assets.socialLine}
          alt=""
          className="w-full h-full object-cover"
        />
      </a>
    </div>
  );
}

/**
 * Top promo row (Daily Bonus / Spin Wheel / Download).
 * Backgrounds use `--daily-checkin-button`, `--spin-wheel-button`, `--apk-banner-button`;
 * text shadow uses `--nav-side-promo-text-shadow` (see `theme.css`).
 */
function PromoStrip({
  variant,
  icon,
  children,
}: {
  variant: "daily" | "spin" | "download";
  icon: string;
  children: React.ReactNode;
}) {
  const bgClass =
    variant === "daily"
      ? "bg-sidebar-daily"
      : variant === "spin"
        ? "bg-sidebar-spin"
        : "bg-sidebar-download";

  return (
    <button
      type="button"
      className={[
        "w-full h-[48px] rounded-[6px] flex items-center px-[12px] gap-[11px]",
        "text-white font-bold text-[13px] leading-[1.15] text-left",
        "ring-1 ring-white/10 shadow-[0_3px_6px_rgba(0,0,0,0.35)]",
        "transition hover:brightness-110 active:brightness-95",
        bgClass,
      ].join(" ")}
      style={{ textShadow: "var(--nav-side-promo-text-shadow)" }}
    >
      <img
        src={icon}
        alt=""
        className="w-[32px] h-[32px] object-contain shrink-0 drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]"
      />
      <span>{children}</span>
    </button>
  );
}

type SidebarProps = {
  view: AppView;
  onNavigate: (next: AppView) => void;
};

function navTargetForLabel(label: string): AppView | null {
  if (label === "Hot Games") return "hot-games";
  if (label === "All") return "all-games";
  if (label === "Promotion") return "promotion";
  if (label === "Referral") return "referral";
  if (label === "Home") return "home";
  if (label === "Rebate") return "rebate";
  if (label === "Recent Game") return "recent-game";
  return null;
}

function isItemActive(view: AppView, label: string): boolean {
  if (view === "hot-games" && label === "Hot Games") return true;
  if (view === "all-games" && label === "All") return true;
  if ((view === "promotion" || view === "promotion-detail") && label === "Promotion") return true;
  if (view === "referral" && label === "Referral") return true;
  if (view === "rebate" && label === "Rebate") return true;
  if (view === "recent-game" && label === "Recent Game") return true;
  if (view === "home" && label === "Home") return true;
  return false;
}

export function Sidebar({ view, onNavigate }: SidebarProps) {
  return (
    <aside
      className="t3-side-menu t3-sidemenu-box sticky top-[60px] h-[calc(100vh-60px)] w-[220px] shrink-0 overflow-y-auto bg-bg-sidebar relative pb-4 border-r"
      style={{
        borderRightColor: "var(--sidebar-container-border)",
      }}
      aria-label="Primary navigation"
    >
      <div className="flex flex-col gap-[7px] pt-[12px] px-[8px]">
        <PromoStrip variant="daily" icon={assets.iconDailyBonusPromo}>
          Daily Bonus Claim
        </PromoStrip>
        <PromoStrip variant="spin" icon={assets.iconSpinWheel}>
          Spin Wheel Bonus
        </PromoStrip>
        <PromoStrip variant="download" icon={assets.iconAndroid}>
          Download
        </PromoStrip>
      </div>

      <nav
        className="flex flex-col gap-[6px] pt-[10px] px-[8px]"
        aria-label="Main"
      >
        {mainItems.map((item) => {
          const target = navTargetForLabel(item.label);
          return (
            <SideLink
              key={item.label}
              {...item}
              active={isItemActive(view, item.label)}
              onSelect={target != null ? () => onNavigate(target) : undefined}
            />
          );
        })}

        <RecentGameLink active={view === "recent-game"} onSelect={() => onNavigate("recent-game")} />
        <div
          className="mt-2 border-t border-b py-2.5 -mx-[8px] px-[8px]"
          style={{ borderColor: "var(--nav-side-chat-section-border)" }}
        >
          <LiveChatLink />
        </div>
      </nav>

      <SocialSidebarRow />
    </aside>
  );
}
