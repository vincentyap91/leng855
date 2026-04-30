import { useCallback, useEffect, useState } from "react";
import { Header, type HeaderSession } from "./components/Header";
import { Sidebar, type AppView } from "./components/Sidebar";
import { PromotionPage } from "./components/PromotionPage";
import { PromotionDetailPage } from "./components/PromotionDetailPage";
import { ReferralPage } from "./components/ReferralPage";
import { DepositPage } from "./components/DepositPage";
import { ProfilePage } from "./components/ProfilePage";
import { RebatePage } from "./components/RebatePage";
import { RecentGamePage } from "./components/RecentGamePage";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { PromoBanners } from "./components/PromoBanners";
import { CategoryChips } from "./components/CategoryChips";
import { GamesGrid } from "./components/GamesGrid";
import { LiveTransactions } from "./components/LiveTransactions";
import { RecentBigWins } from "./components/RecentBigWins";
import { HotProviders } from "./components/HotProviders";
import { Footer } from "./components/Footer";
import { FloatingOverlays } from "./components/FloatingOverlays";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { MobileAuthBar, MobilePassiveIncomeBanner, MobileProfileCard, DesktopReferralHubBanner } from "./components/MobileHomeBlocks";
import { AuthModal, type AuthMode } from "./components/AuthModal";
import { ProviderDetailPage } from "./components/ProviderDetailPage";
import { lobbyFilterFromView } from "./data/lobbyGameFilters";

type RouteState = { view: AppView; promoSlug: string | null; providerSlug: string | null };

function parseRoute(): RouteState {
  const raw = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  const h = raw.split("?")[0] ?? "";
  if (h === "hot-games" || h === "/hot-games") {
    return { view: "hot-games", promoSlug: null, providerSlug: null };
  }
  if (h === "games" || h === "all-games" || h === "/games" || h === "/all-games") {
    return { view: "all-games", promoSlug: null, providerSlug: null };
  }
  if (h === "live-casino" || h === "/live-casino") {
    return { view: "live-casino", promoSlug: null, providerSlug: null };
  }
  if (h === "slots" || h === "/slots") {
    return { view: "slots", promoSlug: null, providerSlug: null };
  }
  if (h === "sports" || h === "/sports") {
    return { view: "sports", promoSlug: null, providerSlug: null };
  }
  if (h === "fish-hunt" || h === "/fish-hunt") {
    return { view: "fish-hunt", promoSlug: null, providerSlug: null };
  }
  if (h === "rng" || h === "/rng") {
    return { view: "rng", promoSlug: null, providerSlug: null };
  }
  if (h === "promotion" || h === "/promotion") {
    return { view: "promotion", promoSlug: null, providerSlug: null };
  }
  if (h === "referral" || h === "/referral") {
    return { view: "referral", promoSlug: null, providerSlug: null };
  }
  if (h === "deposit" || h === "/deposit") {
    return { view: "deposit", promoSlug: null, providerSlug: null };
  }
  if (h === "profile" || h === "/profile") {
    return { view: "profile", promoSlug: null, providerSlug: null };
  }
  if (h === "rebate" || h === "/rebate") {
    return { view: "rebate", promoSlug: null, providerSlug: null };
  }
  if (h === "recent-game" || h === "/recent-game") {
    return { view: "recent-game", promoSlug: null, providerSlug: null };
  }
  if (h.startsWith("provider/")) {
    const slug = h.slice("provider/".length).replace(/\/$/, "");
    if (slug) {
      return { view: "home", promoSlug: null, providerSlug: decodeURIComponent(slug) };
    }
  }
  if (h.startsWith("promotion/")) {
    const slug = h.slice("promotion/".length).replace(/\/$/, "");
    if (slug) {
      return { view: "promotion-detail", promoSlug: decodeURIComponent(slug), providerSlug: null };
    }
  }
  return { view: "home", promoSlug: null, providerSlug: null };
}

const USER_TOKEN_KEY = "userToken";
const USERNAME_KEY = "username";

function loadSession(): HeaderSession | null {
  try {
    const userToken = localStorage.getItem(USER_TOKEN_KEY);
    const username = localStorage.getItem(USERNAME_KEY);
    if (userToken && username) {
      return { username };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute());
  const { view, promoSlug, providerSlug } = route;
  const [session, setSession] = useState<HeaderSession | null>(() => loadSession());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => loadSession() !== null);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goView = useCallback((next: AppView) => {
    setRoute({ view: next, promoSlug: null, providerSlug: null });
    if (next === "hot-games") {
      window.location.hash = "#/hot-games";
    } else if (next === "all-games") {
      window.location.hash = "#/games";
    } else if (next === "live-casino") {
      window.location.hash = "#/live-casino";
    } else if (next === "slots") {
      window.location.hash = "#/slots";
    } else if (next === "sports") {
      window.location.hash = "#/sports";
    } else if (next === "fish-hunt") {
      window.location.hash = "#/fish-hunt";
    } else if (next === "rng") {
      window.location.hash = "#/rng";
    } else if (next === "promotion") {
      window.location.hash = "#/promotion";
    } else if (next === "referral") {
      window.location.hash = "#/referral";
    } else if (next === "deposit") {
      window.location.hash = "#/deposit";
    } else if (next === "profile") {
      window.location.hash = "#/profile";
    } else if (next === "rebate") {
      window.location.hash = "#/rebate";
    } else if (next === "recent-game") {
      window.location.hash = "#/recent-game";
    } else {
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", `${pathname}${search}`);
    }
  }, []);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (username: string, userToken?: string) => {
    const next = { username };
    setSession(next);
    setIsLoggedIn(true);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(USER_TOKEN_KEY, userToken ?? `token_${Date.now()}`);
  };

  const handleLogout = () => {
    setSession(null);
    setIsLoggedIn(false);
    localStorage.removeItem(USER_TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem("userMobile");
  };

  return (
    <div
      className="t3-default-lobby flex min-h-screen flex-col bg-bg-page text-[var(--text)]"
      style={{ background: "var(--page-bg-gradient)" }}
    >
      <Header
        session={isLoggedIn ? session : null}
        balanceDisplay="0.00"
        onLoginClick={() => openAuthModal("login")}
        onRegisterClick={() => openAuthModal("register")}
        onLogout={handleLogout}
        appView={view}
        onMenuNavigate={goView}
      />

      <div className="flex min-h-0 w-full min-w-0 flex-1">
        <Sidebar view={view} onNavigate={goView} />

        <div className="ml-0 flex min-w-0 flex-1 flex-col lg:ml-[220px]">
          <main className="min-w-0 flex-1 pb-20 lg:pb-5" style={{ background: "transparent" }}>
            <div className="mx-auto w-full max-w-[1430px] space-y-6 px-4 py-5 sm:px-6">
              {view === "promotion" ? (
                <PromotionPage />
              ) : view === "referral" ? (
                <ReferralPage isLoggedIn={isLoggedIn} onLoginClick={() => openAuthModal("login")} />
              ) : view === "deposit" ? (
                <DepositPage />
              ) : view === "profile" ? (
                <ProfilePage
                  onLogout={() => {
                    handleLogout();
                    goView("home");
                  }}
                />
              ) : view === "rebate" ? (
                <RebatePage />
              ) : view === "recent-game" ? (
                <RecentGamePage />
              ) : view === "promotion-detail" && promoSlug ? (
                <PromotionDetailPage slug={promoSlug} />
              ) : providerSlug === "pgsoft" ? (
                <ProviderDetailPage provider="pgsoft" />
              ) : (
                <>
                  <PromoBanners />

                  <AnnouncementBar />

                  {session ? <MobileProfileCard username={session.username} balanceDisplay="0.00" /> : null}

                  {!isLoggedIn ? (
                    <MobileAuthBar
                      onLoginClick={() => openAuthModal("login")}
                      onRegisterClick={() => openAuthModal("register")}
                    />
                  ) : null}

                  <MobilePassiveIncomeBanner />

                  <LiveTransactions />

                  <DesktopReferralHubBanner />

                  <RecentBigWins />

                  <div className="provider-category-container hidden w-full justify-end lg:flex">
                    <CategoryChips variant="all" />
                  </div>
                  <div className="provider-category-container flex w-full justify-stretch lg:hidden">
                    <CategoryChips variant="homeStrip" />
                  </div>

                  <GamesGrid filter={lobbyFilterFromView(view)} />

                  <HotProviders />
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      <MobileBottomNav view={view} onNavigate={goView} />
      <Footer />

      <FloatingOverlays />
      <AuthModal
        isOpen={isAuthOpen}
        mode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onModeChange={setAuthMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
