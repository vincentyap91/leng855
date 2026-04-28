/** Shared promotion list + detail copy for Promotion / Promotion Detail routes. */

export const promoAsset = (name: string) => `/assets/promotions/${name}`;

export type PromotionListItem = {
  id: string;
  title: string;
  image: string;
};

export type PromotionSectionGroup = {
  title: string;
  items: PromotionListItem[];
};

export type PromotionDetailSection = {
  applicableProviders: string[];
  bonusPlayConditions: string[];
  eligibility: string[];
  howToClaim: string[];
  termsAndConditions: string[];
};

export type PromotionDetailData = {
  id: string;
  title: string;
  tagline: string;
  image: string;
  /** Countdown target (ISO). */
  endDate: string;
  sections: PromotionDetailSection;
};

export const promotionSectionGroups: PromotionSectionGroup[] = [
  {
    title: "NEW MEMBER / NEW REGISTER",
    items: [
      {
        id: "welcome-gift-get-free-88-8",
        title: "Welcome Bonus 88.8",
        image: promoAsset("welcome-gift-get-free-88-8.png"),
      },
      { id: "88-welcome-bonus", title: "Welcome Bonus 88%", image: promoAsset("88-welcome-bonus.png") },
      {
        id: "30-welcome-bonus-for-slots",
        title: "Welcome Bonus 30% For Slots",
        image: promoAsset("30-welcome-bonus-for-slots.png"),
      },
      {
        id: "30-welcome-bonus-for-live-casino-sports",
        title: "Welcome Bonus 30% For Live Casino & Sports",
        image: promoAsset("30-welcome-bonus-for-live-casino-sports.png"),
      },
    ],
  },
  {
    title: "VIP BENEFIT",
    items: [
      { id: "daily-rebate", title: "Daily Rebate Up To 10%", image: promoAsset("daily-rebate.png") },
      {
        id: "weekly-rebate-up-to-6",
        title: "Weekly Rebate Up To 6%",
        image: promoAsset("weekly-rebate-up-to-6.png"),
      },
      {
        id: "vip-monthly-special-bonus",
        title: "VIP Monthly Special Bonus",
        image: promoAsset("vip-monthly-special-bonus.png"),
      },
      { id: "vip-birthday-bonus", title: "VIP Birthday Bonus", image: promoAsset("vip-birthday-bonus.png") },
    ],
  },
  {
    title: "INVITE FRIEND PROGRAM",
    items: [
      { id: "30-recommend-bonus", title: "Recommend Bonus 30%", image: promoAsset("30-recommend-bonus.png") },
      {
        id: "referral-commissions",
        title: "Referral Commissions",
        image: promoAsset("referral-commissions.png"),
      },
    ],
  },
  {
    title: "SPECIAL BONUS",
    items: [
      { id: "weekly-attendance", title: "Weekly Attendance", image: promoAsset("weekly-attendance.png") },
      {
        id: "limited-time-daily-check-in-bonus",
        title: "Limited-Time Daily Check-In Bonus",
        image: promoAsset("limited-time-daily-check-in-bonus.png"),
      },
    ],
  },
  {
    title: "DAILY BONUS / UNLIMITED BONUS",
    items: [
      { id: "daily-bonus-20", title: "Daily Bonus 20%", image: promoAsset("daily-bonus-20.png") },
      {
        id: "10-unlimited-bonus-slots",
        title: "10% Unlimited Bonus Slots",
        image: promoAsset("10-unlimited-bonus-slots.png"),
      },
      {
        id: "5-unlimited-bonus-live-casino",
        title: "5% Unlimited Bonus Live Casino",
        image: promoAsset("5-unlimited-bonus-live-casino.png"),
      },
      {
        id: "5-unlimited-bonus-sports",
        title: "5% Unlimited Bonus Sports",
        image: promoAsset("5-unlimited-bonus-sports.png"),
      },
    ],
  },
];

function allListItems(): PromotionListItem[] {
  return promotionSectionGroups.flatMap((g) => g.items);
}

function defaultEndDate(): string {
  const t = new Date();
  t.setDate(t.getDate() + 7);
  t.setHours(23, 59, 59, 999);
  return t.toISOString();
}

function genericDetail(item: PromotionListItem): PromotionDetailData {
  const endDate = defaultEndDate();
  return {
    id: item.id,
    title: item.title,
    tagline: "Read the full rules below. Leng855 reserves the right to amend or end this offer at any time.",
    image: item.image,
    endDate,
    sections: {
      applicableProviders: [
        "Participating providers are shown in the Leng855 lobby for this promotion. Restrictions may apply by product type.",
      ],
      bonusPlayConditions: [
        `Bonus usage and turnover requirements apply to "${item.title}" as described in the general promotion rules. Unless stated otherwise, standard wallet transfer and wagering rules apply.`,
        "Example: If the offer includes a turnover requirement, you must complete it before withdrawal of bonus-related winnings.",
      ],
      eligibility: [
        "Registered Leng855 members in good standing.",
        "One claim per player / household / device unless the promotion states otherwise.",
        "Leng855 may verify identity and payment method before crediting any bonus.",
      ],
      howToClaim: [
        "Log in to your Leng855 account.",
        "Open Promotions and select this offer (if opt-in is required).",
        "Complete any deposit or gameplay steps listed for this campaign.",
        "Tap Claim or contact Live Chat if the bonus is applied manually.",
      ],
      termsAndConditions: [
        "This promotion is offered by Leng855 and may be changed or withdrawn without prior notice.",
        "Abuse, arbitrage, or irregular betting patterns may void the bonus and winnings.",
        "Leng855’s general terms and conditions apply.",
      ],
    },
  };
}

type DetailOverride = Partial<Omit<PromotionDetailData, "sections">> & {
  sections?: Partial<PromotionDetailSection>;
};

const detailOverrides: Record<string, DetailOverride> = {
  "welcome-gift-get-free-88-8": {
    tagline: "New members only — claim your welcome gift after your first qualifying deposit.",
    sections: {
      applicableProviders: [
        "Slots and selected RNG games from Pragmatic Play, PG Soft, JILI, Fastspin, and other providers shown with the “Welcome Gift” tag in the Leng855 lobby.",
      ],
      bonusPlayConditions: [
        "Bonus amount is subject to turnover requirements before withdrawal. Turnover is counted on eligible games only.",
        "Example: If you receive a $88.80 bonus with 20× turnover, you must wager $1,776 on eligible games before requesting a withdrawal of bonus-related winnings.",
      ],
      eligibility: [
        "New registered members who have not claimed this offer before.",
        "One claim per player, IP, device, and household.",
        "Leng855 may request KYC documents before releasing funds.",
      ],
      howToClaim: [
        "Register a Leng855 account and complete verification if asked.",
        "Make your first qualifying deposit using an approved method.",
        "Open Promotions → Welcome Gift and tap Claim (or it may credit automatically per campaign rules).",
        "Start playing eligible games; track progress in your bonus wallet.",
      ],
      termsAndConditions: [
        "Standard Leng855 promotion and bonus rules apply.",
        "Maximum bet limits may apply while a bonus is active.",
        "Leng855 reserves the right to void bonuses in cases of fraud, multi-accounting, or breach of rules.",
        "Decisions by Leng855 management are final.",
      ],
    },
  },
};

export function getPromotionById(id: string): PromotionListItem | undefined {
  return allListItems().find((p) => p.id === id);
}

export function getPromotionDetail(id: string): PromotionDetailData | undefined {
  const item = getPromotionById(id);
  if (!item) return undefined;
  const base = genericDetail(item);
  const over = detailOverrides[id];
  if (!over) return base;
  const { sections: secOver, ...rest } = over;
  return {
    ...base,
    ...rest,
    title: rest.title ?? base.title,
    tagline: rest.tagline ?? base.tagline,
    image: rest.image ?? base.image,
    endDate: rest.endDate ?? base.endDate,
    sections: secOver ? { ...base.sections, ...secOver } : base.sections,
  };
}
