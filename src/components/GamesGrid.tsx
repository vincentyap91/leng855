import { assets } from "../data/assets";

/**
 * Provider game tiles under the category tabs, 6 columns like kh168.live/en.
 * The tile images already contain the red pedestal and provider logo,
 * so the card itself is transparent.
 */
type Tile = { label: string; src: string };

const tiles: Tile[] = [
  { label: "PGSoft", src: assets.tiles.pgsoft },
  { label: "Pragmatic Play Slot", src: assets.tiles.pragmatic },
  { label: "Nextspin", src: assets.tiles.nextspin },
  { label: "JILI Slot", src: assets.tiles.jili },
  { label: "FaChai Slots", src: assets.tiles.fachai },
  { label: "Spade Gaming Slot", src: assets.tiles.spadegaming },
  { label: "FastSpin Slots", src: assets.tiles.fastspin },
  { label: "Hacksaw", src: assets.tiles.hacksaw },
  { label: "PlayTech Slots", src: assets.tiles.playtech },
  { label: "Micro Gaming Slot", src: assets.tiles.microgaming },
  { label: "Joker Slot", src: assets.tiles.joker },
  { label: "VPower", src: assets.tiles.vpower },
  { label: "Play Star", src: assets.tiles.playstar },
  { label: "Pussy888 H5", src: assets.tiles.pussy888 },
  { label: "MegaH5", src: assets.tiles.mega888 },
  { label: "Relax Gaming", src: assets.tiles.relaxgaming },
];

export function GamesGrid() {
  return (
    <section>
      <div className="grid grid-cols-6 gap-x-[14px] gap-y-[8px]">
        {tiles.map((t) => (
          <div key={t.label} className="flex flex-col items-center select-none">
            <div className="w-full max-w-[180px] rounded-xl bg-white p-1">
              <img
                src={t.src}
                alt={t.label}
                className="w-full aspect-square object-contain transition-transform hover:scale-[1.03] cursor-pointer"
              />
            </div>
            <p className="mt-1 text-[13px] font-semibold text-[var(--text)] text-center">
              {t.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
