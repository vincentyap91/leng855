import type { AppView } from "../components/Sidebar";

/** Category tab / sidebar targets for the home games grid */
export type LobbyGameFilter =
  | "all"
  | "hot-games"
  | "live-casino"
  | "slots"
  | "sports"
  | "fish-hunt"
  | "rng";

/** Map app route to grid filter (home defaults to Slots to match category chips). */
export function lobbyFilterFromView(view: AppView): LobbyGameFilter {
  switch (view) {
    case "home":
      return "slots";
    case "hot-games":
      return "hot-games";
    case "all-games":
      return "all";
    case "live-casino":
      return "live-casino";
    case "slots":
      return "slots";
    case "sports":
      return "sports";
    case "fish-hunt":
      return "fish-hunt";
    case "rng":
      return "rng";
    default:
      return "all";
  }
}

/** Which lobby tabs each tile appears under (tile can sit in multiple categories). */
export const LOBBY_TAGS_BY_TILE_ID: Record<string, LobbyGameFilter[]> = {
  "live22-metaspace": ["slots", "hot-games"],
  "pgsoft-mahjong-ways": ["slots", "hot-games"],
  "pragmatic-sugar-rush": ["slots", "hot-games", "sports"],
  "nextspin-dragon-burst": ["slots", "sports"],
  "jili-super-ace": ["slots", "hot-games", "fish-hunt"],
  "fachai-lucky-fa": ["slots", "fish-hunt"],
  "spade-thunder-god": ["slots", "fish-hunt"],
  "fastspin-golden-ox": ["slots"],
  "hacksaw-chaos-crew": ["slots", "hot-games", "rng"],
  "playtech-age-of-the-gods": ["slots", "live-casino"],
  "microgaming-break-da-bank": ["slots", "live-casino"],
  "joker-koi-gate": ["slots", "live-casino"],
  "vpower-royal-crown": ["slots", "sports"],
  "playstar-neon-city": ["slots"],
  "pussy888-sweet-jungle": ["slots"],
  "mega888-bonus-bonanza": ["slots"],
  "relaxgaming-money-train": ["slots", "rng"],
  "pgsoft-fortune-tiger": ["slots", "hot-games"],
  "pragmatic-gates-olympus": ["slots", "hot-games", "rng"],
  "jili-bao-boon": ["slots", "fish-hunt"],
  "spade-candy-pop": ["slots"],
  "hacksaw-stack-em": ["slots", "rng"],
  "joker-lucky-naga": ["slots"],
  "nextspin-phoenix-flame": ["slots"],
  "fachai-power-lion": ["slots", "fish-hunt"],
};

export function tileMatchesLobbyFilter(tileId: string, filter: LobbyGameFilter): boolean {
  if (filter === "all") return true;
  const tags = LOBBY_TAGS_BY_TILE_ID[tileId];
  return tags != null && tags.includes(filter);
}

/** Routes that use category hero + games grid (not the full home promo stack). */
const LOBBY_CATEGORY_PAGE_VIEWS = new Set<AppView>([
  "hot-games",
  "all-games",
  "live-casino",
  "slots",
  "sports",
  "fish-hunt",
  "rng",
]);

export function isLobbyCategoryPageView(view: AppView): boolean {
  return LOBBY_CATEGORY_PAGE_VIEWS.has(view);
}
