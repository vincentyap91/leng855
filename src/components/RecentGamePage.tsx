export function RecentGamePage() {
  return (
    <section className="flex min-h-[60vh] w-full items-start justify-center pt-16">
      <div className="flex flex-col items-center">
        <img src="/assets/no-record.webp" alt="No record" className="h-[72px] w-[72px] object-contain opacity-80" />
        <p className="mt-2 text-[13px] font-medium" style={{ color: "color-mix(in srgb, var(--text) 35%, transparent)" }}>
          Oops! There is no data yet!
        </p>
      </div>
    </section>
  );
}

