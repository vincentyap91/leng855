import { gameCategoryBanners } from "../data/gameCategoryBanners";
import { GamesGrid } from "./GamesGrid";

/**
 * Game-list style view: category hero banner + full games grid.
 * Used for All, Hot Games, Live Casino, and Slots routes.
 */
type AllGamesPageProps = {
  bannerSrc?: string;
  bannerAlt?: string;
};

export function AllGamesPage({
  bannerSrc = gameCategoryBanners.welcome,
  bannerAlt = "Leng855 games",
}: AllGamesPageProps) {
  return (
    <div className="all-games-page space-y-5">
      <div className="overflow-hidden rounded-xl">
        <img
          src={bannerSrc}
          alt={bannerAlt}
          className="block h-auto w-full object-cover"
        />
      </div>
      <GamesGrid />
    </div>
  );
}
