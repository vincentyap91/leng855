import { GamesGrid } from "./GamesGrid";

/**
 * Game-list style view: welcome banner + full games grid.
 * Reached from the left sidebar "All" item.
 */
type AllGamesPageProps = {
  bannerSrc?: string;
  bannerAlt?: string;
};

export function AllGamesPage({
  bannerSrc = "https://pksoftcdn.azureedge.net/media/kh168_gamecategory_welcome-202507070958451856.jpg",
  bannerAlt = "KH168 game category welcome",
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
