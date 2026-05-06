import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getPromotionDetail } from "../data/promotions";

type Remaining = { days: number; hours: number; mins: number; secs: number };

function useCountdown(endIso: string): Remaining {
  const end = useMemo(() => new Date(endIso).getTime(), [endIso]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const diff = end - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, mins: 0, secs: 0 };
  }
  const secs = Math.floor(diff / 1000);
  const days = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return { days, hours, mins, secs: s };
}

function CountdownPanel({ endDate }: { endDate: string }) {
  const rem = useCountdown(endDate);

  const cells: { label: string; value: number }[] = [
    { label: "Days", value: rem.days },
    { label: "Hours", value: rem.hours },
    { label: "Mins", value: rem.mins },
    { label: "Secs", value: rem.secs },
  ];

  return (
    <div
      className="flex shrink-0 flex-col gap-3 rounded-xl px-4 py-4 md:min-w-[200px]"
      style={{
        background: "var(--surface-muted)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <p
        className="m-0 text-center text-[11px] font-bold uppercase tracking-wider"
        style={{ color: "var(--action-primary-hover)" }}
      >
        Remaining Time
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-4">
        {cells.map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className="flex h-10 w-full max-w-[52px] items-center justify-center rounded-lg text-[15px] font-extrabold tabular-nums sm:h-11 sm:text-[16px]"
              style={{
                background: "var(--surface-base)",
                color: "var(--accent-strong)",
                boxShadow: "0 1px 3px var(--shadow-soft)",
              }}
            >
              {value}
            </div>
            <span className="text-[10px] font-semibold" style={{ color: "var(--text-secondary)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3
        className="m-0 text-[15px] font-extrabold leading-snug"
        style={{ color: "var(--action-primary-hover)" }}
      >
        {title}
      </h3>
      <div className="text-[13px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ol className="m-0 list-decimal space-y-2 pl-5 [padding-inline-start:1.1rem]">
      {items.map((line, idx) => (
        <li key={idx} className="pl-1 marker:font-semibold">
          {line}
        </li>
      ))}
    </ol>
  );
}

type PromotionDetailPageProps = {
  slug: string;
};

export function PromotionDetailPage({ slug }: PromotionDetailPageProps) {
  const detail = getPromotionDetail(slug);

  if (!detail) {
    return (
      <div className="t3-promotion-detail rounded-2xl px-4 py-10 text-center md:px-8">
        <p className="m-0 text-[15px] font-semibold" style={{ color: "var(--action-primary-hover)" }}>
          Promotion not found.
        </p>
        <a
          href="#/promotion"
          className="mt-4 inline-block text-[14px] font-semibold underline underline-offset-4"
          style={{ color: "var(--accent-strong)" }}
        >
          Back to promotions
        </a>
      </div>
    );
  }

  const { sections: s } = detail;

  return (
    <div className="t3-promotion-detail space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="m-0 text-[18px] font-extrabold tracking-tight" style={{ color: "var(--action-primary-hover)" }}>
          Promotion Details
        </h1>
        <a
          href="#/promotion"
          className="text-[13px] font-semibold no-underline transition-opacity hover:opacity-80"
          style={{ color: "var(--accent-soft)" }}
        >
          ← All promotions
        </a>
      </div>

      <div
        className="overflow-hidden rounded-2xl"
        style={{
          background: "var(--surface-base)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <div className="flex flex-col gap-4 p-4 md:p-6">
          <div className="min-w-0 overflow-hidden flex justify-center rounded-xl">
            <img
              src={detail.image}
              alt={detail.title}
              className="block h-auto max-w-full object-contain object-left"
            />
          </div>
          <div className="flex justify-end">
            <CountdownPanel endDate={detail.endDate} />
          </div>
        </div>

        <div className="space-y-6 border-t px-4 pb-8 pt-6 md:px-8" style={{ borderColor: "var(--border-subtle)" }}>
          <div>
            <h2
              className="m-0 text-[22px] font-extrabold leading-tight tracking-tight"
              style={{ color: "var(--action-primary-hover)" }}
            >
              {detail.title}
            </h2>
            <p className="mt-2 m-0 text-[14px] font-semibold leading-snug" style={{ color: "var(--accent-strong)" }}>
              {detail.tagline}
            </p>
          </div>

          <SectionBlock title="Applicable Providers">
            <BulletList items={s.applicableProviders} />
          </SectionBlock>

          <SectionBlock title="Bonus Play Conditions">
            <BulletList items={s.bonusPlayConditions} />
          </SectionBlock>

          <SectionBlock title="Eligibility">
            <BulletList items={s.eligibility} />
          </SectionBlock>

          <SectionBlock title="How To Claim Your Bonus">
            <BulletList items={s.howToClaim} />
          </SectionBlock>

          <SectionBlock title="Terms & Conditions">
            <BulletList items={s.termsAndConditions} />
          </SectionBlock>

          <button
            type="button"
            className="w-full rounded-xl py-3.5 text-[15px] font-extrabold tracking-wide text-[var(--text-on-emphasis)] transition-[filter] hover:brightness-105 active:brightness-95"
            style={{
              background: "var(--cta-gradient)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}
