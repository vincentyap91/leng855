import { useEffect, useRef, useState } from "react";
import { assets } from "../data/assets";
import type { AppView } from "./Sidebar";
import { MobileNavDrawer } from "./MobileNavDrawer";

export type HeaderSession = {
  username: string;
};

type HeaderProps = {
  session: HeaderSession | null;
  balanceDisplay?: string;
  /** Shown in wallet dropdown for “Game Wallet”; defaults to `0.00` */
  gameWalletDisplay?: string;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogout: () => void;
  onBalanceRefresh?: () => void;
  appView: AppView;
  onMenuNavigate: (next: AppView) => void;
  onToggleDesktopSidebar?: () => void;
};

/** Wallet dropdown chevron — matches `header.txt` / `t3-chevon-ddl` markup */
function WalletDdlChevron() {
  return (
    <svg className="img" viewBox="0 0 1024 1024" style={{ display: "block", stroke: "currentColor", fill: "currentColor" }} aria-hidden="true">
      <path d="M225.835 414.165l256 256c16.683 16.683 43.691 16.683 60.331 0l256-256c16.683-16.683 16.683-43.691 0-60.331s-43.691-16.683-60.331 0l-225.835 225.835-225.835-225.835c-16.683-16.683-43.691-16.683-60.331 0s-16.683 43.691 0 60.331z" />
    </svg>
  );
}

/** Deposit piggy SVG — paths from reference `header.txt` (`vicon` viewBox 1024) */
function DepositViconSvg() {
  return (
    <svg
      className="vicon shrink-0"
      viewBox="0 0 1024 1024"
      style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}
      aria-hidden
    >
      <path d="M928 832h-832c-8.487 0-16.626 3.374-22.628 9.375-6.001 5.996-9.372 14.137-9.372 22.625s3.371 16.629 9.372 22.625c6.001 6.002 14.141 9.375 22.628 9.375h832c8.488 0 16.629-3.374 22.625-9.375 6.002-5.996 9.375-14.137 9.375-22.625s-3.374-16.629-9.375-22.625c-5.996-6.002-14.137-9.375-22.625-9.375z" />
      <path d="M797.44 767.977c49.653-55.177 82.25-123.557 93.844-196.875 11.6-73.316 1.695-148.421-28.507-216.227-30.197-67.805-79.406-125.405-141.659-165.828s-134.889-61.936-209.118-61.936c-74.227 0-146.863 21.513-209.118 61.936s-111.46 98.022-141.661 165.828c-30.201 67.806-40.102 142.911-28.506 216.227 11.596 73.318 44.193 141.699 93.845 196.875h570.88zM448 543.977c-16.973 0-33.252-6.742-45.255-18.745s-18.745-28.281-18.745-45.255v-64c0-16.974 6.743-33.252 18.745-45.255s28.281-18.745 45.255-18.745h32v-32c0-8.487 3.372-16.626 9.373-22.627s14.14-9.373 22.627-9.373c8.487 0 16.626 3.372 22.628 9.373s9.372 14.14 9.372 22.627v32h64c8.488 0 16.629 3.372 22.63 9.373 5.996 6.001 9.37 14.14 9.37 22.627s-3.374 16.626-9.37 22.628c-6.002 6.001-14.143 9.372-22.63 9.372h-160v64h128c16.976 0 33.252 6.743 45.255 18.745s18.745 28.281 18.745 45.255v64.001c0 16.976-6.741 33.252-18.745 45.255s-28.279 18.745-45.255 18.745h-32v32c0 8.488-3.371 16.629-9.372 22.625-6.001 6.002-14.14 9.375-22.628 9.375s-16.626-3.374-22.627-9.375c-6.001-5.996-9.373-14.137-9.373-22.625v-32h-64c-8.487 0-16.626-3.374-22.627-9.375-6.001-5.996-9.373-14.137-9.373-22.625s3.372-16.629 9.373-22.63c6.001-5.996 14.14-9.37 22.627-9.37h160v-64.001h-128z" />
    </svg>
  );
}

function ProfileExpandIcon() {
  return (
    <svg focusable="false" aria-hidden="true" className="profile-expand-svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}



function WalletInfoVicon() {
  return (
    <svg
      className="vicon vicon--info"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" strokeLinecap="round" />
      <path d="M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}

function WalletRefreshVicon() {
  return (
    <svg
      className="vicon vicon--refresh"
      viewBox="0 0 1024 1024"
      style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}
      aria-hidden="true"
    >
      <path d="M303.9 573.127c14.206-16.295 2.634-41.738-18.986-41.738h-64.727c-0.422-6.405-0.658-12.859-0.658-19.367 0-161.27 131.201-292.471 292.47-292.471 77.5 0 148.042 30.31 200.431 79.684l91.273-106.776c-79.895-73.090-182.721-113.125-291.703-113.125-115.575 0-224.232 45.009-305.956 126.731-81.722 81.724-126.731 190.381-126.731 305.956 0 6.48 0.162 12.935 0.444 19.367h-54.52c-21.619 0-33.193 25.444-18.985 41.741l148.824 170.706 148.825-170.706z" />
      <path d="M1017.748 490.819l-148.821-170.708-148.821 170.708c-14.205 16.296-2.634 41.74 18.984 41.74h64.649c-10.576 151.723-137.375 271.935-291.736 271.935-67.383 0-129.508-22.921-179.015-61.355l-91.278 106.786c76.467 61.406 170.808 94.783 270.295 94.783 115.572 0 224.23-45.005 305.956-126.731 76.863-76.863 121.236-177.556 126.242-285.416h54.562c21.618-0.002 33.189-25.446 18.984-41.742z" />
    </svg>
  );
}


export function Header({
  session,
  balanceDisplay = "0.00",
  gameWalletDisplay = "0.00",
  onLoginClick,
  onRegisterClick,
  onBalanceRefresh,
  appView,
  onMenuNavigate,
  onToggleDesktopSidebar,
}: HeaderProps) {
  const loggedIn = session != null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [balanceOpen, setBalanceOpen] = useState(false);
  const [rolloverOpen, setRolloverOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const balanceWrapRef = useRef<HTMLDivElement | null>(null);
  const rolloverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!langOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [langOpen]);

  useEffect(() => {
    if (!balanceOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (balanceWrapRef.current && !balanceWrapRef.current.contains(e.target as Node)) setBalanceOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [balanceOpen]);

  useEffect(() => {
    if (!rolloverOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (rolloverRef.current && !rolloverRef.current.contains(e.target as Node)) setRolloverOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [rolloverOpen]);

  return (
    <>
      <header className="t3-header sticky top-0 z-50 flex h-[60px] min-w-0 shrink-0 items-center gap-3 border-b border-t px-3 sm:px-5 md:gap-4">
        {/* Mobile Hamburger (Visible on Mobile) */}
        <button
          type="button"
          aria-label="Open mobile menu"
          className="mobile-header-open-menu grid h-[30px] w-[30px] shrink-0 place-items-center opacity-90 hover:opacity-100 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <img
            src={assets.menuIcon}
            alt=""
            className="h-[24px] w-[24px]"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(74%) sepia(63%) saturate(438%) hue-rotate(6deg) brightness(95%) contrast(90%)",
            }}
          />
        </button>

        {/* Desktop Hamburger (Visible on Desktop only) */}
        <button
          type="button"
          aria-label="Toggle desktop sidebar"
          className="hidden lg:block outline-none"
          onClick={onToggleDesktopSidebar}
        >
          <div className="burger cursor-pointer">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="theme-menu-icon">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 22.5C4.5 21.6715 5.17156 21 6 21H24C24.8284 21 25.5 21.6715 25.5 22.5C25.5 23.3284 24.8284 24 24 24H6C5.17156 24 4.5 23.3284 4.5 22.5ZM4.5 7.5C4.5 6.67156 5.17156 6 6 6H24C24.8284 6 25.5 6.67156 25.5 7.5C25.5 8.32842 24.8284 9 24 9H6C5.17156 9 4.5 8.32842 4.5 7.5ZM4.5 15C4.5 14.1716 5.17156 13.5 6 13.5H15C15.8285 13.5 16.5 14.1716 16.5 15C16.5 15.8285 15.8285 16.5 15 16.5H6C5.17156 16.5 4.5 15.8285 4.5 15Z"></path>
            </svg>
          </div>
        </button>
        <a
          href="#"
          className="ml-0.5 block shrink-0 rounded-[4px] px-1 py-0.5 sm:ml-1"
          aria-label="Leng855 home"
        >
          <img
            src={assets.leng855Logo}
            alt="Leng855"
            className="h-10 max-h-10 w-[min(200px,38vw)] max-w-[200px] object-contain object-left lg:h-[50px] lg:max-h-[50px] lg:w-[min(320px,42vw)] lg:max-w-[320px]"
          />
        </a>

        <div className={`second ml-auto flex shrink-0 items-center gap-3 sm:gap-3${loggedIn ? " t3-header-logged-second" : ""}`}>
          {loggedIn ? (
            <>
              <div
                className="t3-header-balance-deposit-box"
                style={{
                  background: "var(--header-auth-panel-bg)",
                  borderColor: "var(--header-auth-panel-border)",
                }}
              >
                <div className="t3-header-balance-dropdown-wrap" ref={balanceWrapRef}>
                  <div className="t3-balance-btn">
                    <button
                      type="button"
                      style={{ cursor: "pointer", display: "flex", alignItems: "center", position: "relative" }}
                      aria-label="Balance wallet"
                    >
                      <div className="header-balance-column">
                        <span className="font-size-header-balance">Balance:</span>
                        <b className="font-size-header-balance balance-amount" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {balanceDisplay}
                        </b>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="t3-chevon-ddl header-balance-ddl-toggle"
                      aria-label="Toggle wallet breakdown"
                      aria-expanded={balanceOpen}
                      aria-haspopup="dialog"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBalanceOpen((o) => !o);
                      }}
                    >
                      <WalletDdlChevron />
                    </button>
                  </div>

                  {balanceOpen ? (
                    <div
                      className="header-balance-dropdown"
                      role="dialog"
                      aria-label="Wallet balances"
                      aria-modal="false"
                    >
                      <div className="header-balance-dropdown-panel">
                        <div className="header-balance-dropdown-inner">
                          <div className="header-balance-dropdown-rows">
                            <div className="header-balance-dropdown-row">
                              <span className="header-balance-dropdown-wallet-label">Main Wallet :</span>
                              <span className="header-balance-dropdown-amount">{balanceDisplay}</span>
                            </div>
                            <div className="header-balance-dropdown-row">
                              <WalletInfoVicon />
                              <span className="header-balance-dropdown-wallet-label">Game Wallet :</span>
                              <span className="header-balance-dropdown-amount" style={{ fontVariantNumeric: "tabular-nums" }}>
                                {gameWalletDisplay}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="header-balance-dropdown-refresh"
                          aria-label="Refresh balances"
                          onClick={() => onBalanceRefresh?.()}
                        >
                          <WalletRefreshVicon />
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                <a
                  href="#/deposit"
                  className="t3-header-deposit inline-flex cursor-pointer items-center text-inherit no-underline"
                  style={{ background: "var(--header-auth-deposit-bg)" }}
                >
                  <div>
                    <DepositViconSvg />
                  </div>
                  <div className="text">Deposit</div>
                </a>
              </div>

              <div ref={rolloverRef} className="relative">
                <button
                  type="button"
                  className="t3-rollover-btn"
                  aria-label="Activity"
                  aria-haspopup="dialog"
                  aria-expanded={rolloverOpen}
                  onClick={() => setRolloverOpen((v) => !v)}
                  style={{
                    background: "var(--header-auth-target-bg)",
                    color: "var(--header-auth-target-color)",
                  }}
                >
                  <IconTargetDeposit className="img" />
                </button>
                {rolloverOpen ? (
                  <div
                    role="dialog"
                    aria-label="Rollover information"
                    className="absolute right-0 top-[calc(100%+8px)] z-[120] w-[290px] rounded-xl border p-3"
                    style={{
                      background: "var(--rollover-modal-popup-header)",
                      borderColor: "var(--header-auth-panel-border)",
                      boxShadow: "var(--card-shadow)",
                    }}
                  >
                    <div
                      className="header-rollover-dropdown-card flex items-stretch gap-3 rounded-lg px-3 py-2.5"
                      style={{ background: "var(--rollover-modal-popup-panel)" }}
                    >
                      <div className="min-w-0 flex-1 self-center">
                        <div className="text-sm font-bold" style={{ color: "var(--action-primary-hover)", lineHeight: 1.2 }}>
                          Deposit Now
                        </div>
                        <div className="mt-0.5 text-[12px] font-medium" style={{ color: "var(--text-secondary)" }}>
                          Deposit to View Your Rollover
                        </div>
                      </div>
                      <div className="header-rollover-dropdown-target-wrap flex shrink-0 items-center" aria-hidden>
                        <IconTargetDeposit className="header-rollover-dropdown-target-icon" />
                      </div>
                    </div>
                    <a
                      href="#/deposit"
                      className="mt-3 block rounded-lg px-4 py-2 text-center text-sm font-bold no-underline"
                      style={{ background: "var(--cta-gradient)", color: "var(--text-on-emphasis)" }}
                      onClick={() => setRolloverOpen(false)}
                    >
                      Deposit Now
                    </a>
                  </div>
                ) : null}
              </div>

              <a href="#/profile" className="t3-header-profile-box no-underline">
                <div className="second">
                  <div>{session.username}</div>
                  <div>
                    <span>Normal</span>
                  </div>
                </div>
                <div className="third" style={{ color: "var(--header-auth-chip-color)" }} aria-hidden>
                  <ProfileExpandIcon />
                </div>
              </a>
            </>
          ) : (
            <>
              <button
                type="button"
                id="header-login-btn"
                className="header-login-btn hidden md:block"
                onClick={onLoginClick}
              >
                Log In
              </button>
              <button
                type="button"
                id="header-register-btn"
                className="header-register-btn hidden md:block"
                onClick={onRegisterClick}
              >
                Register
              </button>
            </>
          )}

          <div ref={langRef} className="drop-down-language header-language-container dropdown relative">
            <button
              type="button"
              className="header-lang-toggle flex h-10 shrink-0 items-center justify-center rounded-lg border-0 transition hover:brightness-110 gap-1"
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((o) => !o)}
              style={{
                background: "var(--header-lang-bg, var(--text-inverse))",
                paddingLeft: "8px",
                paddingRight: "6px",
                minWidth: "40px",
              }}
            >
              <img src={assets.ukFlag} alt="" className="h-6 w-6 rounded-full object-cover shadow-sm" />
              <svg
                className="language-arrow-down"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="currentColor"
                aria-hidden="true"
                style={{
                  filter: "var(--header-lang-chevron-filter, brightness(0) invert(1))",
                  flexShrink: 0,
                  marginLeft: "2px"
                }}
              >
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
              </svg>
            </button>
            {langOpen ? (
              <div
                tabIndex={-1}
                role="menu"
                className="language-dropdown-menu dropdown-menu absolute top-full right-0 z-[100] mt-2 max-h-[min(260px,calc(100vh-140px))] min-w-[200px] overflow-auto rounded-xl border shadow-lg"
                style={{ borderColor: "var(--border-subtle)", background: "var(--surface-base)" }}
              >
                <button type="button" tabIndex={0} role="menuitem" className="dropdown-item flex w-full items-center gap-2 px-4 py-2 text-left hover:brightness-[0.98]" onClick={() => setLangOpen(false)}>
                  <img src={assets.cambodiaFlag} alt="" height={20} className="h-5 w-5 rounded-full object-cover" /> <span className="ml-1 text-[13px] text-[var(--text-primary)]">Khmer</span>
                </button>
                <button type="button" tabIndex={0} role="menuitem" className="dropdown-item flex w-full items-center gap-2 px-4 py-2 text-left hover:brightness-[0.98]" onClick={() => setLangOpen(false)}>
                  <img src={assets.ukFlag} alt="" height={20} className="h-5 w-5 rounded-full object-cover" /> <span className="ml-1 text-[13px] text-[var(--text-primary)]">English</span>
                </button>
                <button type="button" tabIndex={0} role="menuitem" className="dropdown-item flex w-full items-center gap-2 px-4 py-2 text-left hover:brightness-[0.98]" onClick={() => setLangOpen(false)}>
                  <img src={assets.chinaFlag} alt="" height={20} className="h-5 w-5 rounded-full object-cover" />{" "}
                  <span className="ml-1 text-[13px] text-[var(--text-primary)]">简体中文</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        view={appView}
        onNavigate={onMenuNavigate}
      />
    </>
  );
}

/** Target + arrow — from https://88cam.vip/static/media/target.2dbb81c6.svg (fill → currentColor) */
function IconTargetDeposit({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M28.788 6.288 25.975 9.1a.94.94 0 0 1-.663.275h-3.361l-6.288 6.288a.934.934 0 0 1-1.326 0 .937.937 0 0 1 0-1.326l6.288-6.288V4.688c0-.25.099-.488.275-.663l2.812-2.813a.936.936 0 0 1 1.6.663v2.813h2.813a.938.938 0 0 1 .663 1.6m-7.61 6.509-4.19 4.19a2.8 2.8 0 0 1-1.988.826 2.813 2.813 0 0 1-1.988-4.8l4.191-4.191A6.3 6.3 0 0 0 15 8.438 6.57 6.57 0 0 0 8.438 15 6.57 6.57 0 0 0 15 21.563 6.57 6.57 0 0 0 21.563 15c0-.778-.132-1.519-.385-2.203M29.062 15c0 7.753-6.309 14.063-14.062 14.063S.938 22.753.938 15 7.247.938 15 .938c1.828 0 3.619.356 5.288 1.05l-.713.712a2.8 2.8 0 0 0-.825 1.987v2.588l-.113.112A8.45 8.45 0 0 0 15 6.563c-4.65 0-8.437 3.787-8.437 8.437S10.35 23.438 15 23.438 23.438 19.65 23.438 15c0-1.303-.3-2.531-.825-3.637l.112-.113h2.587c.75 0 1.453-.29 1.988-.825l.712-.713A13.7 13.7 0 0 1 29.062 15"
      />
    </svg>
  );
}
