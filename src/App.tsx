import { useCallback, useEffect, useState } from "react";
import { Header, type HeaderSession } from "./components/Header";
import { Sidebar, type AppView } from "./components/Sidebar";
import { AllGamesPage } from "./components/AllGamesPage";
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
import { BrandsGrid } from "./components/BrandsGrid";
import { Footer } from "./components/Footer";
import { FloatingOverlays } from "./components/FloatingOverlays";
import { AuthModal, type AuthMode } from "./components/AuthModal";

type RouteState = { view: AppView; promoSlug: string | null };

function parseRoute(): RouteState {
  const raw = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  const h = raw.split("?")[0] ?? "";
  if (h === "hot-games" || h === "/hot-games") {
    return { view: "hot-games", promoSlug: null };
  }
  if (h === "games" || h === "all-games" || h === "/games" || h === "/all-games") {
    return { view: "all-games", promoSlug: null };
  }
  if (h === "promotion" || h === "/promotion") {
    return { view: "promotion", promoSlug: null };
  }
  if (h === "referral" || h === "/referral") {
    return { view: "referral", promoSlug: null };
  }
  if (h === "deposit" || h === "/deposit") {
    return { view: "deposit", promoSlug: null };
  }
  if (h === "profile" || h === "/profile") {
    return { view: "profile", promoSlug: null };
  }
  if (h === "rebate" || h === "/rebate") {
    return { view: "rebate", promoSlug: null };
  }
  if (h === "recent-game" || h === "/recent-game") {
    return { view: "recent-game", promoSlug: null };
  }
  if (h.startsWith("promotion/")) {
    const slug = h.slice("promotion/".length).replace(/\/$/, "");
    if (slug) {
      return { view: "promotion-detail", promoSlug: decodeURIComponent(slug) };
    }
  }
  return { view: "home", promoSlug: null };
}

const SESSION_KEY = "leng855_session";

function loadSession(): HeaderSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { username?: unknown };
    if (parsed && typeof parsed.username === "string") {
      return { username: parsed.username };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseRoute());
  const { view, promoSlug } = route;
  const [session, setSession] = useState<HeaderSession | null>(() => loadSession());
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goView = useCallback((next: AppView) => {
    setRoute({ view: next, promoSlug: null });
    if (next === "hot-games") {
      window.location.hash = "#/hot-games";
    } else if (next === "all-games") {
      window.location.hash = "#/games";
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

  const handleLoginSuccess = (username: string) => {
    const next = { username };
    setSession(next);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
  };

  const handleLogout = () => {
    setSession(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <div
      className="t3-default-lobby flex min-h-screen flex-col bg-bg-page text-[var(--text)]"
      style={{ background: "var(--page-bg-gradient)" }}
    >
      <Header
        session={session}
        balanceDisplay="0.00"
        onLoginClick={() => openAuthModal("login")}
        onRegisterClick={() => openAuthModal("register")}
        onLogout={handleLogout}
      />

      <div className="flex min-h-0 w-full min-w-0 flex-1">
        <Sidebar view={view} onNavigate={goView} />

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-w-0 flex-1" style={{ background: "transparent" }}>
            <div className="mx-auto w-full max-w-[1430px] space-y-6 px-6 py-5">
              {view === "hot-games" ? (
                <AllGamesPage
                  bannerSrc="https://pksoftcdn.azureedge.net/media/kh168_gamecategory_hotgames-202507070909452469.jpg"
                  bannerAlt="Leng855 hot games"
                />
              ) : view === "all-games" ? (
                <AllGamesPage />
              ) : view === "promotion" ? (
                <PromotionPage />
              ) : view === "referral" ? (
                <ReferralPage />
              ) : view === "deposit" ? (
                <DepositPage />
              ) : view === "profile" ? (
                <ProfilePage />
              ) : view === "rebate" ? (
                <RebatePage />
              ) : view === "recent-game" ? (
                <RecentGamePage />
              ) : view === "promotion-detail" && promoSlug ? (
                <PromotionDetailPage slug={promoSlug} />
              ) : (
                <>
                  <PromoBanners />

                  <AnnouncementBar />

                  <div className="provider-category-container flex justify-end">
                    <CategoryChips />
                  </div>

                  <GamesGrid />

                  <LiveTransactions />

                  <RecentBigWins />

                  <HotProviders />

                  <BrandsGrid />
                </>
              )}
            </div>
          </main>

          <Footer />
        </div>
      </div>

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
