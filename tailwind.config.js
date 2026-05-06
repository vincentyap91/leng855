/** @type {import('tailwindcss').Config} */
// All design tokens resolve to CSS variables declared in src/theme.css.
// To re-theme the site, edit src/theme.css (no code changes required).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--theme-font-family-base)", "Poppins", "sans-serif"],
      },
      colors: {
        // Surface tokens
        bg: {
          page: "var(--theme-color-bg-base)",
          header: "var(--theme-color-bg-nav)",
          sidebar: "var(--nav-side-bg)",
          footer: "var(--nav-footer-bg)",
          card: "var(--payout-bg)",
          row: "var(--dashboard-table-row-odd)",
          rowAlt: "var(--dashboard-table-row-even)",
          chip: "var(--game-category-tab-bg)",
          chipActive: "var(--game-category-tab-active)",
          item: "var(--nav-side-item)",
          tableHeader: "var(--dashboard-table-th)",
          menu: "var(--nav-controls-bg)",
        },
        // Action / accent tokens
        brand: {
          emphasis: "var(--base-highlight)",
          link: "var(--base-link)",
          payout: "var(--payout-item-highlight)",
        },
        divider: "var(--dashboard-table-border)",
        mutedText: "var(--nav-side-color)",
      },
      backgroundImage: {
        // Themeable gradients — values come from theme.css
        register: "var(--register-btn-bg)",
        "accent-cta": "var(--secondary-cta-gradient)",
        "accent-header": "var(--secondary-gradient)",
        "card-grad": "var(--payout-item-bg)",
        "mobile-profile": "var(--mobile-profile-bg)",
        "sidebar-daily": "var(--daily-checkin-button)",
        "sidebar-spin": "var(--spin-wheel-button)",
        "sidebar-download": "var(--apk-banner-button)",
      },
      boxShadow: {
        register: "0 4px 8px 0 color-mix(in srgb, var(--surface-inverse) 10%, transparent)",
        payout: "inset 0 0 20px 0 color-mix(in srgb, var(--feedback-danger) 20%, transparent)",
      },
    },
  },
  plugins: [],
};
