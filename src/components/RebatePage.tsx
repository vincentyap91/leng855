export type RebatePageProps = {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
};

export function RebatePage({ isLoggedIn = false, onLoginClick }: RebatePageProps) {
  const titleStyle = {
    color: "var(--primary-dark)",
    fontFamily: "var(--base-font-family, Poppins, system-ui, sans-serif)",
  } as const;

  return (
    <section className="t3-rebate-content w-full">
      <div className="mx-auto w-full max-w-[1430px]">
        <h1 className="m-0 mb-3 text-[18px] font-bold leading-tight md:text-[19px]" style={titleStyle}>
          Our Rebate System
        </h1>

        {!isLoggedIn ? (
          <div className="t3-rebate-login-gate">
            <p className="t3-rebate-login-gate__title">Log In to View Your Rebate Info</p>
            <button type="button" className="t3-rebate-login-gate__cta" onClick={() => onLoginClick?.()}>
              Login Now!
            </button>
          </div>
        ) : (
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
              style={{ color: "var(--primary-dark)", fontFamily: "var(--base-font-family, Poppins, system-ui, sans-serif)" }}
            >
              Claimable Rebate:{" "}
              <span className="font-extrabold" style={{ color: "var(--gold)" }}>
                0.000
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
