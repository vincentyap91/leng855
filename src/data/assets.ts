/**
 * Static image paths — files live in `public/assets/` (served at `/assets/*`).
 * Asset paths for Leng855 (see `scripts/fetch-assets.ps1` for CDN fetch).
 * To replace an image, drop a new file in `public/assets/` and update the path here.
 */

const base = "/assets";

export const assets = {
  // Header + flags
  leng855Logo: `${base}/Leng855_logo.png`,
  ukFlag: `${base}/flag-uk.svg`,
  cambodiaFlag: `${base}/flag-cambodia.svg`,
  chinaFlag: `${base}/flag-china.svg`,

  // Sidebar / category icons
  iconHotGames: `${base}/icon-hotgames.png`,
  iconHome: `${base}/icon-home.png`,
  iconAll: `${base}/icon-all.png`,
  iconCasino: `${base}/icon-casino.png`,
  iconSlots: `${base}/icon-slots.png`,
  iconSport: `${base}/icon-sport.png`,
  iconFish: `${base}/icon-fish.png`,
  iconRng: `${base}/icon-rng.png`,
  iconPromo: `${base}/icon-promo.png`,
  /** Daily Bonus strip (sidebar) — gift / calendar art */
  iconDailyBonusPromo: `${base}/icon-daily-bonus-promo.png`,
  iconReferral: `${base}/icon-referral.png`,
  iconRebate: `${base}/icon-rebate.png`,
  iconRecent: `${base}/icon-recent.png`,
  /** Live Chat — Figma RioCity (8093:29219); valid .svg (MCP “png” was SVG data) */
  iconLiveChat: `${base}/icon-live-chat.svg`,
  iconAndroid: `${base}/icon-android.png`,
  iconSpinWheel: `${base}/icon-spin-wheel.svg`,

  // Header / inline UI icons (kept as inline SVGs in public/)
  menuIcon: `${base}/icon-menu.svg`,
  chevronIcon: `${base}/icon-chevron.svg`,
  /** Rollover / deposit CTA — target + arrow (source: 88cam target.2dbb81c6.svg) */
  targetDeposit: `${base}/target-deposit.svg`,
  speakerIcon: `${base}/icon-speaker.svg`,

  // Promo banners (landing page hero row)
  bannerExclusive: `${base}/banner-exclusive.jpg`,
  banner50Welcome: `${base}/banner-50-welcome.jpg`,
  banner10Daily: `${base}/banner-10-daily.jpg`,

  /** Homepage referral promo — Azure CDN WebP (mobile + desktop). */
  referralBannerMobile:
    "https://pksoftcdn.azureedge.net/media/leng855_referralbannermobile_1024x549-202605041123121081.webp",
  referralBannerDesktop:
    "https://pksoftcdn.azureedge.net/media/leng855_referralbannerdesktop_1544x451-202605041122582326.webp",

  // Provider game tiles (200×200 red-pedestal PNGs)
  tiles: {
    pgsoft: `${base}/tile-pgsoft.png`,
    pragmatic: `${base}/tile-pragmatic.png`,
    nextspin: `${base}/tile-nextspin.png`,
    jili: `${base}/tile-jili.png`,
    fachai: `${base}/tile-fachai.png`,
    spadegaming: `${base}/tile-spadegaming.png`,
    fastspin: `${base}/tile-fastspin.png`,
    hacksaw: `${base}/tile-hacksaw.png`,
    playtech: `${base}/tile-playtech.png`,
    microgaming: `${base}/tile-microgaming.png`,
    joker: `${base}/tile-joker.png`,
    vpower: `${base}/tile-vpower.png`,
    playstar: `${base}/tile-playstar.png`,
    pussy888: `${base}/tile-pussy888.png`,
    mega888: `${base}/tile-mega888.png`,
    relaxgaming: `${base}/tile-relaxgaming.png`,
  },

  // Brand logos (color PNGs, used for Hot Providers + bottom brand strip)
  brands: {
    pragmatic: `${base}/brand-pragmatic.png`,
    playstar: `${base}/brand-playstar.png`,
    spadegaming: `${base}/brand-spadegaming.png`,
    saba: `${base}/brand-saba.png`,
    sagaming: `${base}/brand-sagaming.png`,
    nextspin: `${base}/brand-nextspin.png`,
    cmdsport: `${base}/brand-cmdsport.png`,
    sexybaccarat: `${base}/brand-sexybaccarat.png`,
    fastspin: `${base}/brand-fastspin.png`,
    fachai: `${base}/brand-fachai.png`,
    wmcasino: `${base}/brand-wmcasino.png`,
    microgaming: `${base}/brand-microgaming.png`,
    spribe: `${base}/brand-spribe.png`,
    evolution: `${base}/brand-evolution.png`,
    joker: `${base}/brand-joker.png`,
    pussy888: `${base}/brand-pussy888.png`,
    mega: `${base}/brand-mega.png`,
    dreamgaming: `${base}/brand-dreamgaming.png`,
    sabasport: `${base}/brand-sabasport.png`,
    hacksaw: `${base}/brand-hacksaw.png`,
    relaxgaming: `${base}/brand-relaxgaming.png`,
    pgsoft: `${base}/brand-pgsoft.png`,
    m2: `${base}/brand-m2.png`,
  },

  /** Game grid RTP badge — MetaSpace reference thumb (Live22 CDN) */
  rtpMetaSpaceThumb: "https://gth.l22play.com/thumbs/web/30013.png",
  /** Red banner strip logo (used for Live22-style tile row; local asset) */
  logoNextspin: `${base}/logo-nextspin.png`,

  // Recent big wins — small game thumbnails
  bigwins: {
    chargeBuffalo: `${base}/bigwin-charge-buffalo.png`,
    fortuneGems2: `${base}/bigwin-fortune-gems-2.png`,
    pirateQueen2: `${base}/bigwin-pirate-queen-2.png`,
  },

  // Social + misc
  socialFb: `${base}/social-fb.png`,
  socialTelegram: `${base}/social-telegram.png`,
  socialLine: `${base}/social-line.png`,

  chatAvatar: `${base}/chat-avatar.png`,
  floatingDownload: `${base}/floating-download.png`,

  // Referral promos (Figma Riocity 875:20 / 875:28)
  referralPromoCommission: `${base}/referral-promo-commission.png`,
  referralPromoDeposit: `${base}/referral-promo-deposit.png`,

  // Profile Page Icons
  profileUser: `${base}/my-profile.svg`,
  profileDeposit: `${base}/deposit.svg`,
  profileWithdrawal: `${base}/withdrawal.svg`,
  profileHistory: `${base}/history-record.svg`,
  profileReferral: `${base}/referral.svg`,
  profileDownlines: `${base}/downlines.svg`,
  profileLanguage: `${base}/change-language.svg`,
  profilePassword: `${base}/change-password.svg`,
  profileAvatar: `${base}/profile-img.png`,
  profileChevron: `${base}/chevon-right.svg`,

  // Trophy gif for "Recent Big Wins" header
  trophyGif: `${base}/trophy.gif`,
} as const;
