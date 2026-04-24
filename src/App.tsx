import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
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

export default function App() {
  return (
    <div
      className="t3-default-lobby flex min-h-screen flex-col bg-bg-page text-[var(--text)]"
      style={{ background: "var(--page-bg-gradient)" }}
    >
      <Header />

      <div className="flex min-h-0 w-full min-w-0 flex-1">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="min-w-0 flex-1" style={{ background: "transparent" }}>
            <div className="mx-auto max-w-[1280px] space-y-6 px-6 py-5">
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
            </div>
          </main>

          <Footer />
        </div>
      </div>

      <FloatingOverlays />
    </div>
  );
}
