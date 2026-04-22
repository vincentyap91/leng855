import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "flex min-h-screen flex-col bg-bg-page text-[var(--text)]", style: { background: "var(--page-bg-gradient)" }, children: [_jsx(Header, {}), _jsxs("div", { className: "flex min-h-0 w-full min-w-0 flex-1", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [_jsx("main", { className: "min-w-0 flex-1", style: { background: "transparent" }, children: _jsxs("div", { className: "mx-auto max-w-[1280px] space-y-6 px-6 py-5", children: [_jsx(PromoBanners, {}), _jsx(AnnouncementBar, {}), _jsx("div", { className: "flex justify-end", children: _jsx(CategoryChips, {}) }), _jsx(GamesGrid, {}), _jsx(LiveTransactions, {}), _jsx(RecentBigWins, {}), _jsx(HotProviders, {}), _jsx(BrandsGrid, {})] }) }), _jsx(Footer, {})] })] }), _jsx(FloatingOverlays, {})] }));
}
