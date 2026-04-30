import { assets } from "../data/assets";

type ProviderDetailPageProps = {
  provider: "pgsoft";
};

type ProviderTile = {
  id: string;
  label: string;
  src: string;
};

const pgSoftTiles: ProviderTile[] = [
  { id: "pg-1", label: "Mahjong Ways", src: assets.tiles.pgsoft },
  { id: "pg-2", label: "Fortune Tiger", src: assets.tiles.pgsoft },
  { id: "pg-3", label: "Lucky Neko", src: assets.tiles.pgsoft },
  { id: "pg-4", label: "Wild Bandito", src: assets.tiles.pgsoft },
  { id: "pg-5", label: "Treasures of Aztec", src: assets.tiles.pgsoft },
  { id: "pg-6", label: "Dragon Hatch", src: assets.tiles.pgsoft },
  { id: "pg-7", label: "Candy Bonanza", src: assets.tiles.pgsoft },
  { id: "pg-8", label: "Rise of Apollo", src: assets.tiles.pgsoft },
  { id: "pg-9", label: "Prosperity Lion", src: assets.tiles.pgsoft },
  { id: "pg-10", label: "Cocktail Nights", src: assets.tiles.pgsoft },
  { id: "pg-11", label: "Medusa II", src: assets.tiles.pgsoft },
  { id: "pg-12", label: "Genie 3 Wishes", src: assets.tiles.pgsoft },
  { id: "pg-13", label: "Ganesha Gold", src: assets.tiles.pgsoft },
  { id: "pg-14", label: "Heist Stakes", src: assets.tiles.pgsoft },
  { id: "pg-15", label: "Piggy Gold", src: assets.tiles.pgsoft },
  { id: "pg-16", label: "Mafia Mayhem", src: assets.tiles.pgsoft },
  { id: "pg-17", label: "Leprechaun Riches", src: assets.tiles.pgsoft },
  { id: "pg-18", label: "Queen of Bounty", src: assets.tiles.pgsoft },
  { id: "pg-19", label: "Fortune Mouse", src: assets.tiles.pgsoft },
  { id: "pg-20", label: "Dreams of Macau", src: assets.tiles.pgsoft },
  { id: "pg-21", label: "Jurassic Kingdom", src: assets.tiles.pgsoft },
  { id: "pg-22", label: "Egypt's Book", src: assets.tiles.pgsoft },
  { id: "pg-23", label: "Flirting Scholar", src: assets.tiles.pgsoft },
  { id: "pg-24", label: "The Great Icescape", src: assets.tiles.pgsoft },
];

const providerMeta = {
  pgsoft: {
    title: "PG Soft",
    banner: "https://pksoftcdn.azureedge.net/media/kh168_pgsoft_providerbanner_200x200px-202508270801367795.jpg",
  },
} as const;

export function ProviderDetailPage({ provider }: ProviderDetailPageProps) {
  const meta = providerMeta[provider];
  const tiles = pgSoftTiles;

  return (
    <section className="space-y-5">
      <div className="overflow-hidden rounded-xl">
        <img src={meta.banner} alt={`${meta.title} banner`} className="block h-auto w-full object-cover" />
      </div>

      <section className="t3-game-list-box">
        <div className="mb-3 px-1 text-sm font-bold uppercase tracking-wide" style={{ color: "var(--primary-dark)" }}>
          {meta.title} Games
        </div>
        <div className="t3-game-list-grid">
          {tiles.map((t) => (
            <article key={t.id} className="t3-game-list-item">
              <div className="t3-game-list-image-box">
                <div className="image">
                  <img src={t.src} alt={t.label} className="t3-game-list-image first" />
                </div>
              </div>
              <div className="t3-game-list-meta">
                <p className="t3-game-list-title">{t.label}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

