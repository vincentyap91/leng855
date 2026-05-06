import { useState } from "react";

// ---------------------------------------------------------------------------
// Tier data
// ---------------------------------------------------------------------------
type TierId = "normal" | "bronze" | "silver" | "gold" | "platinum" | "diamond";

type TierData = {
  id: TierId;
  label: string;
  icon: string;
  benefits: BenefitItem[];
  upgrade: { label: string; value: string };
  retention: { label: string; value: string };
  renewal: string;
};

type BenefitItem = { label: string; value: string };

const TIERS: TierData[] = [
  {
    id: "normal",
    label: "Normal",
    icon: "https://pksoftcdn.azureedge.net/media/vip_icon_1-202604301455583530.webp",
    benefits: [
      { label: "Deposits and Withdrawals", value: "High Priority" },
      { label: "Daily Withdrawal Limitation", value: "No Limit" },
    ],
    upgrade: { label: "Progressive Deposit", value: "-" },
    retention: { label: "Past 3 Months Accumulated Deposit", value: "-" },
    renewal: "Lifetime",
  },
  {
    id: "bronze",
    label: "Bronze",
    icon: "https://pksoftcdn.azureedge.net/media/vip_icon_2-202604301452198747.webp",
    benefits: [
      { label: "Deposits and Withdrawals", value: "High Priority" },
      { label: "Daily Withdrawal Limitation", value: "No Limit" },
    ],
    upgrade: { label: "Progressive Deposit", value: "MYR 3,000" },
    retention: { label: "Past 3 Months Accumulated Deposit", value: "MYR 3,000" },
    renewal: "3 Months",
  },
  {
    id: "silver",
    label: "Silver",
    icon: "https://pksoftcdn.azureedge.net/media/vip_icon_3-202604301452198855.webp",
    benefits: [
      { label: "Deposits and Withdrawals", value: "High Priority" },
      { label: "Daily Withdrawal Limitation", value: "No Limit" },
    ],
    upgrade: { label: "Progressive Deposit", value: "MYR 10,000" },
    retention: { label: "Past 3 Months Accumulated Deposit", value: "MYR 10,000" },
    renewal: "3 Months",
  },
  {
    id: "gold",
    label: "Gold",
    icon: "https://pksoftcdn.azureedge.net/media/vip_icon_3a-202604301455583685.webp",
    benefits: [
      { label: "Deposits and Withdrawals", value: "High Priority" },
      { label: "Daily Withdrawal Limitation", value: "No Limit" },
    ],
    upgrade: { label: "Progressive Deposit", value: "MYR 30,000" },
    retention: { label: "Past 3 Months Accumulated Deposit", value: "MYR 30,000" },
    renewal: "3 Months",
  },
  {
    id: "platinum",
    label: "Platinum",
    icon: "https://pksoftcdn.azureedge.net/media/vip_icon_5-202604301452198006.webp",
    benefits: [
      { label: "Deposits and Withdrawals", value: "High Priority" },
      { label: "Daily Withdrawal Limitation", value: "No Limit" },
    ],
    upgrade: { label: "Progressive Deposit", value: "MYR 100,000" },
    retention: { label: "Past 3 Months Accumulated Deposit", value: "MYR 100,000" },
    renewal: "3 Months",
  },
  {
    id: "diamond",
    label: "Diamond",
    icon: "https://pksoftcdn.azureedge.net/media/vip_icon_6-202604301452199139.webp",
    benefits: [
      { label: "Deposits and Withdrawals", value: "VIP Priority" },
      { label: "Daily Withdrawal Limitation", value: "No Limit" },
    ],
    upgrade: { label: "Progressive Deposit", value: "MYR 500,000" },
    retention: { label: "Past 3 Months Accumulated Deposit", value: "MYR 500,000" },
    renewal: "3 Months",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Single tier card in the top selector row */
function TierCard({
  tier,
  active,
  onSelect,
}: {
  tier: TierData;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      id={`membership-tier-${tier.id}`}
      onClick={onSelect}
      className="flex flex-1 flex-col items-center justify-center gap-[6px] rounded-[8px] py-3 px-2 transition-all duration-200 cursor-pointer border"
      style={{
        background: active ? "var(--accent-strong)" : "var(--surface-muted)",
        borderColor: active ? "var(--action-primary-hover)" : "var(--border-strong)",
        boxShadow: active ? "0 2px 8px color-mix(in srgb, var(--accent-strong) 25%, transparent)" : "none",
      }}
    >
      <img
        src={tier.icon}
        alt={tier.label}
        draggable={false}
        className="h-[48px] w-[48px] object-contain"
      />
      <span
        className="text-[12px] font-bold leading-none"
        style={{
          color: active ? "var(--surface-base)" : "var(--action-primary-hover)",
        }}
      >
        {tier.label}
      </span>
    </button>
  );
}

/** A single benefit row — label left, value right, with a divider underneath */
function BenefitRow({ item, last }: { item: BenefitItem; last?: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between py-[14px] px-[20px]">
        <span
          className="text-[13px] font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {item.label}
        </span>
        <span
          className="text-[13px] font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {item.value}
        </span>
      </div>
      {!last && (
        <div
          className="mx-[20px] h-px"
          style={{ background: "var(--border-subtle)" }}
        />
      )}
    </>
  );
}



/** Two-column requirement cell */
function RequirementCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-[20px] py-[14px] rounded-xl border"
      style={{ background: "var(--surface-muted)", borderColor: "var(--panel-item-border)" }}
    >
      <span className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
        {label}
      </span>
      <span className="text-[13px] font-semibold ml-2" style={{ color: "var(--text-primary)" }}>
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export function MembershipPage() {
  const [selectedId, setSelectedId] = useState<TierId>("normal");
  const tier = TIERS.find((t) => t.id === selectedId) ?? TIERS[0];

  const titleStyle = {
    color: "var(--action-primary-hover)",
    fontFamily: "var(--base-font-family, Poppins, system-ui, sans-serif)",
  } as const;



  return (
    <section
      className="t3-membership-content w-full"
      style={{ fontFamily: "var(--base-font-family, Poppins, system-ui, sans-serif)" }}
    >
      <div className="mx-auto w-full max-w-[1430px]">
        {/* Page title */}
        <h1
          className="m-0 mb-4 text-[18px] font-bold leading-tight md:text-[19px]"
          style={titleStyle}
        >
          Our Membership Program
        </h1>

        {/* ── Tier Selector Grid ── */}
        <div className="flex gap-[8px] mb-4">
          {TIERS.map((t) => (
            <TierCard
              key={t.id}
              tier={t}
              active={t.id === selectedId}
              onSelect={() => setSelectedId(t.id)}
            />
          ))}
        </div>

        {/* ── Benefits Container ── */}
        <div
          className="rounded-xl border p-[20px] space-y-[20px]"
          style={{
            background: "var(--surface-base)",
            borderColor: "var(--panel-item-border)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {/* Membership Benefits */}
          <div>
            <h2
              className="text-[15px] font-extrabold mb-[10px]"
              style={titleStyle}
            >
              Membership Benefits
            </h2>
            <div
              className="overflow-hidden rounded-xl border"
              style={{
                borderColor: "var(--panel-item-border)",
                background: "var(--surface-muted)",
              }}
            >
              {tier.benefits.map((item, i) => (
                <BenefitRow
                  key={item.label}
                  item={item}
                  last={i === tier.benefits.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Requirements — 2-column grid */}
          <div>
            <div className="grid grid-cols-2 gap-[12px] mb-[10px]">
              <h2
                className="text-[15px] font-extrabold leading-tight"
                style={titleStyle}
              >
                Monthly Level Upgrade Requirement
              </h2>
              <h2
                className="text-[15px] font-extrabold leading-tight"
                style={titleStyle}
              >
                Monthly Level Retention Requirement
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-[12px]">
              <RequirementCell
                label={tier.upgrade.label}
                value={tier.upgrade.value}
              />
              <RequirementCell
                label={tier.retention.label}
                value={tier.retention.value}
              />
            </div>
          </div>

          {/* Membership Renewal — full width */}
          <div>
            <h2
              className="text-[15px] font-extrabold mb-[10px]"
              style={titleStyle}
            >
              Membership Renewal
            </h2>
            <div
              className="flex items-center justify-between px-[20px] py-[14px] rounded-xl border"
              style={{
                background: "var(--surface-muted)",
                borderColor: "var(--panel-item-border)",
              }}
            >
              <span className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
                Membership Renewal
              </span>
              <span
                className="text-[13px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {tier.renewal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
