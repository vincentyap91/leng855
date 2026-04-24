import { assets } from "../data/assets";

const socials = [
  { label: "Facebook", src: assets.socialFb, href: "#" },
  { label: "Telegram", src: assets.socialTelegram, href: "#" },
  { label: "Line", src: assets.socialLine, href: "#" },
];

export function Footer() {
  return (
    <footer
      className="t3-footer footer-container text-[var(--nav-footer-color)]"
      style={{
        background: "var(--nav-footer-gradient)",
        borderBottom: "var(--nav-footer-border)",
      }}
    >
      <div className="flex flex-wrap items-center justify-end gap-3 px-8 py-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="grid h-9 w-9 place-items-center overflow-hidden rounded-md"
          >
            <img
              src={s.src}
              alt={s.label}
              className="h-full w-full object-contain"
            />
          </a>
        ))}

        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-md border px-3"
          style={{ borderColor: "var(--nav-footer-control-border)" }}
        >
          <img src={assets.ukFlag} alt="" className="h-5 w-5 rounded-full" />
          <span className="text-sm text-[var(--nav-footer-color)]">English</span>
          <img
            src={assets.chevronIcon}
            alt=""
            className="h-3 w-3 opacity-70"
          />
        </button>
      </div>

      <div className="text-center pb-6 text-xs text-[var(--nav-footer-copyright-color)] font-light">
        ©2026 Leng855. All rights reserved. | 18+ | v1.10.334
      </div>
    </footer>
  );
}
