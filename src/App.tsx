import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar, type AppView } from "./components/Sidebar";
import { AllGamesPage } from "./components/AllGamesPage";
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

function readViewFromHash(): AppView {
  const h = window.location.hash.replace(/^#/, "").toLowerCase();
  if (h === "games" || h === "all-games" || h === "/games" || h === "/all-games") {
    return "all-games";
  }
  return "home";
}

export default function App() {
  const [view, setView] = useState<AppView>(() => readViewFromHash());
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setView(readViewFromHash());
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goView = useCallback((next: AppView) => {
    setView(next);
    if (next === "all-games") {
      window.location.hash = "#/games";
    } else {
      const { pathname, search } = window.location;
      window.history.replaceState(null, "", `${pathname}${search}`);
    }
  }, []);

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div
      className="t3-default-lobby flex min-h-screen flex-col bg-bg-page text-[var(--text)]"
      style={{ background: "var(--page-bg-gradient)" }}
    >
      <Header
        onLoginClick={() => openAuthModal("login")}
        onRegisterClick={() => openAuthModal("register")}
      />

      <div className="flex min-h-0 w-full min-w-0 flex-1">
        <Sidebar view={view} onNavigate={goView} />

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-w-0 flex-1" style={{ background: "transparent" }}>
            <div className="mx-auto max-w-[1280px] space-y-6 px-6 py-5">
              {view === "all-games" ? (
                <AllGamesPage />
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
      />
    </div>
  );
}
