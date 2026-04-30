import type { AppView } from "../components/Sidebar";

/** CDN hero banners for game category and promotion list routes. */
const base = "https://pksoftcdn.azureedge.net/media";

export const gameCategoryBanners = {
  welcome: `${base}/welcome_gamecategorybanner-202604271609013392.webp`,
  liveCasino: `${base}/casino_gamecategorybanner-202604271609275344.webp`,
  slots: `${base}/slots_gamecategorybanner-202604271609360524.webp`,
  sports: `${base}/sports_gamecategorybanner-202604271609135329.webp`,
  fishHunt: `${base}/fishing_gamecategorybanner-202604271609448383.webp`,
  promotion: `${base}/promotion_gamecategorybanner-202604271610051933.webp`,
} as const;

/** Hero image for sidebar game routes (live casino, slots, etc.). */
export function lobbyHeroBannerForView(view: AppView): string {
  switch (view) {
    case "live-casino":
      return gameCategoryBanners.liveCasino;
    case "slots":
      return gameCategoryBanners.slots;
    case "sports":
      return gameCategoryBanners.sports;
    case "fish-hunt":
      return gameCategoryBanners.fishHunt;
    case "all-games":
      return gameCategoryBanners.welcome;
    case "hot-games":
    case "rng":
      return gameCategoryBanners.welcome;
    default:
      return gameCategoryBanners.welcome;
  }
}
