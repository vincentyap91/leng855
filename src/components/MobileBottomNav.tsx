import { assets } from "../data/assets";
import type { AppView } from "./Sidebar";

type MobileBottomNavProps = {
  view: AppView;
  onNavigate: (next: AppView) => void;
};

const itemClass =
  "mobile-bottom-nav__btn flex flex-1 flex-col items-center rounded-lg justify-center gap-0.5 border-0 bg-transparent p-2 text-[10px] font-semibold leading-tight text-[var(--mobile-nav-fg)] min-w-0";

function NavIcon({ src, active }: { src: string; active: boolean }) {
  return (
    <img
      src={src}
      alt=""
      className="mobile-bottom-nav__icon h-6 w-6 shrink-0 object-contain"
      data-active={active ? "true" : "false"}
      aria-hidden
    />
  );
}

function AccountGlyph() {
  return (
    <svg
      className="mobile-bottom-nav__icon mobile-bottom-nav__icon--svg h-6 w-6 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

export function MobileBottomNav({ view, onNavigate }: MobileBottomNavProps) {
  const promoActive = view === "promotion" || view === "promotion-detail";
  const referralActive = view === "referral";
  const profileActive = view === "profile";
  const homeActive = view === "home";
  const liveChatActive = view === "live-chat";

  return (
    <nav className="mobile-bottom-nav lg:hidden" role="navigation" aria-label="Mobile primary">
      <button
        type="button"
        className={itemClass}
        data-active={homeActive ? "true" : "false"}
        aria-current={homeActive ? "page" : undefined}
        onClick={() => onNavigate("home")}
      >
        <NavIcon src={assets.iconHome} active={homeActive} />
        <span>Home</span>
      </button>
      <button
        type="button"
        className={itemClass}
        data-active={referralActive ? "true" : "false"}
        aria-current={referralActive ? "page" : undefined}
        onClick={() => onNavigate("referral")}
      >
        <NavIcon src={assets.iconReferral} active={referralActive} />
        <span>Referral</span>
      </button>
      <button
        type="button"
        className={`${itemClass} mobile-bottom-nav__btn--badge`}
        data-active={promoActive ? "true" : "false"}
        aria-current={promoActive ? "page" : undefined}
        onClick={() => onNavigate("promotion")}
      >
        <span className="mobile-bottom-nav__badge" aria-hidden>
          1
        </span>
        <NavIcon src={assets.iconPromo} active={promoActive} />
        <span>Promotion</span>
      </button>
      <button
        type="button"
        className={`${itemClass} mobile-bottom-nav__btn--badge`}
        data-active={liveChatActive ? "true" : "false"}
        aria-current={liveChatActive ? "page" : undefined}
        aria-label="Live chat"
        onClick={() => onNavigate("live-chat")}
      >
        <span className="mobile-bottom-nav__badge" aria-hidden>
          1
        </span>
        <NavIcon src={assets.iconLiveChat} active={liveChatActive} />
        <span>Livechat</span>
      </button>
      <button
        type="button"
        className={itemClass}
        data-active={profileActive ? "true" : "false"}
        aria-current={profileActive ? "page" : undefined}
        onClick={() => onNavigate("profile")}
      >
        <AccountGlyph />
        <span>Account</span>
      </button>
    </nav>
  );
}
