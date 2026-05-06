/** Crown overlay — inline asset per design handoff */
const RTP_BADGE_CROWN_SRC =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAATCAYAAACdkl3yAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJNSURBVHgB1ZLRS1NRHMe/595zd+fQulqStoxrJFogbolaQaAQvUVX6DXcHnqIAtdTT5H9BQVRgS/rwV560Yh8qAcNGgVGWxIpg2oZQ8li1+ncdnfv/bVdsVrMFj4EfV/Ogd85n/P9fX8H+Neit5rvT3UBfyuWidKrjqFtgdbGjoTSd3o3Lqc/t8JGYFsgGOwMkR1K3T2qsmPzCTR0Jehle6jSUYYqMh53hrOf3P2MKMa9dWrNAVsdjJ8MTpy9OlHVEb3oUCnaHaZImK+wJj5kLlslQKNM1gfBpbQ0Yrzt/ujwlqDUrW7N2TQd7wfEADgfstZFwNyoS80ekL6MK/wRxvY9UCq2lp/s1PILrnHLEvz1F2diFDnsg0RTtsEUMyWCiQRptwljcj/YziVQe9Gjxa7Lp2dHykCOo9s9Pu6xpmhdmC6WdLklr7majLKX7ZQAVkMwvkmQvcY0650f+NEaLVzSSrmUnPBa+yZE0ggUMHXRgTy323AqeR6jS4cg1NswdA6psVC8aIfKM9JnxyHiGkVVBRzPNoviDstZ3/FWzC0zvF+VYHzlEDhBkGiE9cXflGXkAApuDXLDsG15lUJaUrknAyEXB3OTc/BJWkUPfYEnY0JuLkywvrnBimFvjr3kbNWWA3VCHmbkIKwPScjnso4TMgTIe/MxSPkB5k/oW4JKUsNhZY8XHy/gqTKkvAaZrAipBd9VC1FavAcpd/l3yM+MflEiGNRXkjl/o6T7jUVXzFjxwtV1AmK9O1ScULASpKqcHz7TfsNp+b/Td5EE6+kw8ZBbAAAAAElFTkSuQmCC";

export type RtpInfoBadgeProps = {
  thumbUrl: string;
  gameName: string;
  /** Numeric string only, e.g. "94.99" — `%` is appended in UI */
  rtpPercent: string;
  /** When false, hide the game title inside the badge (title is shown separately above). */
  showGameName?: boolean;
};

export function RtpInfoBadge({ thumbUrl, gameName, rtpPercent, showGameName = true }: RtpInfoBadgeProps) {
  if (!showGameName) {
    const isUp = parseFloat(rtpPercent) >= 92.2;
    return (
      <div
        className="mx-auto mt-1 flex w-fit items-center justify-center gap-1.5 rounded-[4px] px-2 py-[2px]"
        style={{ background: "var(--accent-strong)" }}
        title={gameName}
      >
        <span className="text-[10px] font-extrabold text-[var(--text-on-emphasis)]">RTP</span>
        <span className="text-[11px] font-bold text-[var(--text-on-emphasis)]">{rtpPercent}%</span>
        <img
          src={isUp ? "/assets/up.png" : "/assets/down.png"}
          alt=""
          className="h-[10px] w-[10px] object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="t3-game-rtp-info-badge"
      title={gameName}
    >
      <div className="t3-game-rtp-info-badge__thumb-wrap">
        <img src={thumbUrl} alt="" className="t3-game-rtp-info-badge__thumb" loading="lazy" decoding="async" />
        <img src={RTP_BADGE_CROWN_SRC} alt="" className="t3-game-rtp-info-badge__crown" aria-hidden />
      </div>
      <div className="t3-game-rtp-info-badge__text">
        <span className="t3-game-rtp-info-badge__game">{gameName}</span>
        <div className="t3-game-rtp-info-badge__rtp-row">
          <span className="t3-game-rtp-info-badge__rtp-label">RTP</span>
          <span className="t3-game-rtp-info-badge__rtp-value">{rtpPercent}%</span>
        </div>
      </div>
    </div>
  );
}
