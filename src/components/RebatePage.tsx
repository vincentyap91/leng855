export function RebatePage() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1430px]">
        <h1
          className="mb-2 text-[18px] font-extrabold leading-tight"
          style={{ color: "var(--primary-dark)", fontFamily: "Poppins, sans-serif" }}
        >
          Our Rebate System
        </h1>

        <div
          className="rounded-[12px] border px-4 py-3"
          style={{
            background: "var(--surface-3)",
            borderColor: "var(--panel-item-border)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <p
            className="m-0 text-[13px] font-semibold leading-snug"
            style={{ color: "var(--primary-dark)", fontFamily: "Poppins, sans-serif" }}
          >
            Claimable Rebate:{" "}
            <span className="font-extrabold" style={{ color: "var(--gold)" }}>
              0.000
            </span>
          </p>
        </div>

        <div
          className="mt-3 rounded-[12px] border p-4"
          style={{
            background: "var(--surface-3)",
            borderColor: "var(--panel-item-border)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <h2
            className="m-0 text-[18px] font-extrabold leading-tight"
            style={{ color: "var(--primary-dark)", fontFamily: "Poppins, sans-serif" }}
          >
            My Rebate & Sales
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div
              className="rounded-[10px] border px-4 py-3"
              style={{ background: "var(--surface)", borderColor: "var(--panel-item-border)", boxShadow: "var(--card-shadow)" }}
            >
              <p className="m-0 text-[13px] font-semibold leading-snug" style={{ color: "var(--primary-dark)" }}>
                Total Lifetime Rebate
              </p>
              <p className="m-0 mt-1 text-[18px] font-extrabold leading-none" style={{ color: "var(--gold)" }}>
                0.000
              </p>
            </div>

            <div
              className="rounded-[10px] border px-4 py-3"
              style={{ background: "var(--surface)", borderColor: "var(--panel-item-border)", boxShadow: "var(--card-shadow)" }}
            >
              <p className="m-0 text-[13px] font-semibold leading-snug" style={{ color: "var(--primary-dark)" }}>
                My Individual Sales
              </p>
              <p className="m-0 mt-1 text-[18px] font-extrabold leading-none" style={{ color: "var(--gold)" }}>
                0.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

