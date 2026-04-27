import { GamesGrid } from "./GamesGrid";

/**
 * Game-list style view: welcome banner + full games grid.
 * Reached from the left sidebar "All" item.
 */
export function AllGamesPage() {
  return (
    <div className="all-games-page space-y-5">
      <div className="overflow-hidden rounded-xl">
        <img
          src="https://pksoftcdn.azureedge.net/media/kh168_gamecategory_welcome-202507070958451856.jpg"
          alt="KH168 game category welcome"
          className="block h-auto w-full object-cover"
        />
      </div>
      <GamesGrid />
    </div>
  );
}
