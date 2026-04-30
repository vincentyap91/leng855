import { gameCategoryBanners } from "../data/gameCategoryBanners";
import type { LobbyGameFilter } from "../data/lobbyGameFilters";
import { GamesGrid } from "./GamesGrid";

/**
 * Game-list style view: category hero banner + games grid (optionally filtered).
 */
type AllGamesPageProps = {
  bannerSrc?: string;
  bannerAlt?: string;
  gridFilter?: LobbyGameFilter;
};

export function AllGamesPage({
  bannerSrc = gameCategoryBanners.welcome,
  bannerAlt = "Leng855 games",
  gridFilter = "all",
}: AllGamesPageProps) {
  return (
    <div className="all-games-page space-y-5">
      <div className="overflow-hidden rounded-xl">
        <img src={bannerSrc} alt={bannerAlt} className="block h-auto w-full object-cover" />
      </div>
      <GamesGrid filter={gridFilter} />
    </div>
  );
}
