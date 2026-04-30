import { assets } from "../data/assets";
import type { LobbyGameFilter } from "../data/lobbyGameFilters";
import { tileMatchesLobbyFilter } from "../data/lobbyGameFilters";
import { RtpInfoBadge } from "./RtpInfoBadge";

/**
 * "All Game" grid. Uses t3-game-list-* class names so theme.css tokens can
 * control spacing, card surfaces, borders, and hover states from one place.
 */
type Tile = {
  id: string;
  label: string;
  src: string;
  provider: string;
  providerLogo: string;
  href?: string;
  rtpBadgeThumbUrl?: string;
  rtpGameName?: string;
  rtpPercentOverride?: string;
};

function rtpPercentForId(id: string): string {
  let s = 0;
  for (let i = 0; i < id.length; i++) s = (s + id.charCodeAt(i) * (i + 3)) % 1000;
  return (94 + (s % 70) / 10).toFixed(2);
}

const tiles: Tile[] = [
  {
    id: "live22-metaspace",
    label: "Live22 Showcase",
    src: assets.tiles.nextspin,
    provider: "Live22",
    providerLogo: assets.logoNextspin,
    rtpBadgeThumbUrl: assets.rtpMetaSpaceThumb,
    rtpGameName: "MetaSpace",
    rtpPercentOverride: "94.99",
  },
  {
    id: "pgsoft-mahjong-ways",
    label: "Mahjong Ways",
    src: assets.tiles.pgsoft,
    provider: "PGSoft",
    providerLogo: assets.brands.pgsoft,
    href: "#/provider/pgsoft",
  },
  {
    id: "pragmatic-sugar-rush",
    label: "Sugar Rush",
    src: assets.tiles.pragmatic,
    provider: "Pragmatic Play",
    providerLogo: assets.brands.pragmatic,
  },
  {
    id: "nextspin-dragon-burst",
    label: "Dragon Burst",
    src: assets.tiles.nextspin,
    provider: "Nextspin",
    providerLogo: assets.brands.nextspin,
    href: "#/provider/nextspin",
  },
  {
    id: "jili-super-ace",
    label: "Super Ace",
    src: assets.tiles.jili,
    provider: "JILI",
    providerLogo: assets.brands.spribe,
  },
  {
    id: "fachai-lucky-fa",
    label: "Lucky Fa",
    src: assets.tiles.fachai,
    provider: "Fa Chai",
    providerLogo: assets.brands.fachai,
  },
  {
    id: "spade-thunder-god",
    label: "Thunder God",
    src: assets.tiles.spadegaming,
    provider: "Spade Gaming",
    providerLogo: assets.brands.spadegaming,
  },
  {
    id: "fastspin-golden-ox",
    label: "Golden Ox",
    src: assets.tiles.fastspin,
    provider: "FastSpin",
    providerLogo: assets.brands.fastspin,
  },
  {
    id: "hacksaw-chaos-crew",
    label: "Chaos Crew",
    src: assets.tiles.hacksaw,
    provider: "Hacksaw",
    providerLogo: assets.brands.hacksaw,
  },
  {
    id: "playtech-age-of-the-gods",
    label: "Age of the Gods",
    src: assets.tiles.playtech,
    provider: "PlayTech",
    providerLogo: assets.brands.wmcasino,
  },
  {
    id: "microgaming-break-da-bank",
    label: "Break Da Bank",
    src: assets.tiles.microgaming,
    provider: "Micro Gaming",
    providerLogo: assets.brands.microgaming,
  },
  {
    id: "joker-koi-gate",
    label: "Koi Gate",
    src: assets.tiles.joker,
    provider: "Joker",
    providerLogo: assets.brands.joker,
  },
  {
    id: "vpower-royal-crown",
    label: "Royal Crown",
    src: assets.tiles.vpower,
    provider: "VPower",
    providerLogo: assets.brands.playstar,
  },
  {
    id: "playstar-neon-city",
    label: "Neon City",
    src: assets.tiles.playstar,
    provider: "Play Star",
    providerLogo: assets.brands.playstar,
  },
  {
    id: "pussy888-sweet-jungle",
    label: "Sweet Jungle",
    src: assets.tiles.pussy888,
    provider: "Pussy888",
    providerLogo: assets.brands.pussy888,
  },
  {
    id: "mega888-bonus-bonanza",
    label: "Bonus Bonanza",
    src: assets.tiles.mega888,
    provider: "Mega888",
    providerLogo: assets.brands.mega,
  },
  {
    id: "relaxgaming-money-train",
    label: "Money Train",
    src: assets.tiles.relaxgaming,
    provider: "Relax Gaming",
    providerLogo: assets.brands.relaxgaming,
  },
  {
    id: "pgsoft-fortune-tiger",
    label: "Fortune Tiger",
    src: assets.tiles.pgsoft,
    provider: "PGSoft",
    providerLogo: assets.brands.pgsoft,
    href: "#/provider/pgsoft",
  },
  {
    id: "pragmatic-gates-olympus",
    label: "Gates of Olympus",
    src: assets.tiles.pragmatic,
    provider: "Pragmatic Play",
    providerLogo: assets.brands.pragmatic,
  },
  {
    id: "jili-bao-boon",
    label: "Bao Boon",
    src: assets.tiles.jili,
    provider: "JILI",
    providerLogo: assets.brands.spribe,
  },
  {
    id: "spade-candy-pop",
    label: "Candy Pop",
    src: assets.tiles.spadegaming,
    provider: "Spade Gaming",
    providerLogo: assets.brands.spadegaming,
  },
  {
    id: "hacksaw-stack-em",
    label: "Stack'Em",
    src: assets.tiles.hacksaw,
    provider: "Hacksaw",
    providerLogo: assets.brands.hacksaw,
  },
  {
    id: "joker-lucky-naga",
    label: "Lucky Naga",
    src: assets.tiles.joker,
    provider: "Joker",
    providerLogo: assets.brands.joker,
  },
  {
    id: "nextspin-phoenix-flame",
    label: "Phoenix Flame",
    src: assets.tiles.nextspin,
    provider: "Nextspin",
    providerLogo: assets.brands.nextspin,
    href: "#/provider/nextspin",
  },
  {
    id: "fachai-power-lion",
    label: "Power Lion",
    src: assets.tiles.fachai,
    provider: "Fa Chai",
    providerLogo: assets.brands.fachai,
  },
];

export type GamesGridProps = {
  /** When set, only tiles tagged for this lobby tab are shown. */
  filter?: LobbyGameFilter;
};

export function GamesGrid({ filter = "all" }: GamesGridProps) {
  const visible = tiles.filter((t) => tileMatchesLobbyFilter(t.id, filter));

  return (
    <section className="t3-game-list-box">
      <div className="t3-game-list-grid">
        {visible.map((t) => {
          const rtp = t.rtpPercentOverride ?? rtpPercentForId(t.id);
          return (
            <article key={t.id} className="t3-game-list-item">
              <a
                href={t.href ?? "#"}
                onClick={(event) => {
                  if (!t.href) event.preventDefault();
                }}
                className="block no-underline"
              >
                <div className="t3-game-list-image-box">
                  <div className="image">
                    <img src={t.src} alt={t.label} className="t3-game-list-image first" />
                  </div>
                </div>

                <div className="t3-game-list-meta">
                  <div className="t3-game-list-provider t3-game-list-provider--emphasis">
                    <span className="t3-game-list-provider-name">{t.provider}</span>
                  </div>
                  <RtpInfoBadge
                    thumbUrl={t.rtpBadgeThumbUrl ?? t.src}
                    gameName={t.rtpGameName ?? t.label}
                    rtpPercent={rtp}
                  />
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
