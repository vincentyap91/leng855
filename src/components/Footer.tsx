import { assets } from "../data/assets";

const footerLogos = [
  { label: "EVO888", src: assets.brands.saba },
  { label: "Sexy Baccarat", src: assets.brands.sexybaccarat },
  { label: "Pragmatic Play", src: assets.brands.pragmatic },
  { label: "Play Star", src: assets.brands.playstar },
  { label: "Spade Gaming", src: assets.brands.spadegaming },
  { label: "SA Gaming", src: assets.brands.sagaming },
  { label: "Nextspin", src: assets.brands.nextspin },
  { label: "CMD Sport", src: assets.brands.cmdsport },
  { label: "Fa Chai", src: assets.brands.fachai },
  { label: "Play'n Go", src: assets.brands.playstar },
  { label: "NetEnt", src: assets.brands.relaxgaming },
  { label: "WM Casino", src: assets.brands.wmcasino },
  { label: "Microgaming", src: assets.brands.microgaming },
  { label: "SBO Sports", src: assets.brands.sabasport },
  { label: "Evolution", src: assets.brands.evolution },
  { label: "Joker", src: assets.brands.joker },
  { label: "JILI", src: assets.tiles.jili },
  { label: "918 Kiss", src: assets.brands.pussy888 },
  { label: "Pussy888", src: assets.brands.pussy888 },
  { label: "Mega H5", src: assets.brands.mega },
  { label: "SABA Sport", src: assets.brands.sabasport },
  { label: "Hacksaw", src: assets.brands.hacksaw },
  { label: "PG Soft", src: assets.brands.pgsoft },
  { label: "Dream Gaming", src: assets.brands.dreamgaming },
] as const;

export function Footer() {
  return (
    <footer className="layout__footer layout__footer-fullbleed">
      <div className="footer-inner-shell">
        <div className="t3-footer">
          <div className="t3-top-footer">
            <div className="first">
              {footerLogos.map((logo) => (
                <div key={logo.label} className="t3-footer-logo-item">
                  <div className="first">
                    <img src={logo.src} className="img-responsive provider-logo-light" alt={logo.label} draggable={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="t3-footer-bottom">
            <div className="t3-copyright">
              ©2026 LENG855. All rights reserved. | 18+ <span>| v1.10.421</span>
            </div>
            <div className="footer-actions">
              <div className="footer-social-links" aria-label="Social media">
                <a href="var(--accent-strong)ook" className="footer-social-link" aria-label="Facebook">
                  <img src={assets.socialFb} className="img-responsive" alt="" />
                </a>
                <a href="#telegram" className="footer-social-link" aria-label="Telegram">
                  <img src={assets.socialTelegram} className="img-responsive" alt="" />
                </a>
                <a href="#line" className="footer-social-link" aria-label="Line">
                  <img src={assets.socialLine} className="img-responsive" alt="" />
                </a>
              </div>
              <div className="footer-language-container footer-language-container--bottom">
                <div className="drop-down-language dropdown">
                  <button type="button" className="btn btn-secondary">
                    <img src={assets.ukFlag} className="img-responsive language-flag" alt="English" />
                    <span className="footer-lang-label">English</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
