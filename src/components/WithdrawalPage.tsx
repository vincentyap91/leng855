import { useState, useId } from "react";
import { assets } from "../data/assets";

type Step = 1 | 2;

function TabChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor" width="20" height="20">
      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  );
}

function BankCategoryIcon() {
  return (
    <svg
      className="theme-icon-size-24 shrink-0 text-[var(--brand-3)]"
      viewBox="0 0 1088 1024"
      aria-hidden
      width={24}
      height={24}
      style={{ display: "inline-block", stroke: "currentColor", fill: "currentColor" }}
    >
      <path d="M1024 960v-64h-64v-384h64v-64h-192v64h64v384h-192v-384h64v-64h-192v64h64v384h-192v-384h64v-64h-192v64h64v384h-192v-384h64v-64h-192v64h64v384h-192v-384h64v-64h-192v64h64v384h-64v64h-64v64h1088v-64h-64z" />
      <path d="M512 0h64l512 320v64h-1088v-64l512-320z" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor" width={24} height={24}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor" width={20} height={20}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

function MenuChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor" width={20} height={20}>
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}

export function WithdrawalPage({ onNavigate }: { onNavigate?: (view: "deposit" | "withdrawal") => void }) {
  const [step, setStep] = useState<Step>(1);
  const amountId = useId();
  const bankId = useId();
  const accountNameId = useId();
  const accountNumberId = useId();

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic here
  };

  return (
    <section className="withdrawal-page mx-auto w-full max-w-4xl px-4 py-4" style={{ background: "var(--surface-base)" }}>
      {/* Deposit / Withdrawal Tabs */}
      <div className="t3-two-custom-tabs deposit-page-tabs" role="tablist" aria-label="Deposit or withdrawal">
        <div
          role="tab"
          tabIndex={0}
          aria-selected={false}
          className=""
          onClick={() => onNavigate?.("deposit")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onNavigate?.("deposit");
          }}
        >
          Deposit
          <TabChevronRight className="deposit-tab-chevron ml-1 h-4 w-4 shrink-0" />
        </div>
        <div
          role="tab"
          tabIndex={0}
          aria-selected={true}
          className="active"
        >
          Withdrawal
        </div>
      </div>

      {step === 1 ? (
        <div className="withdrawal-selection animate-in fade-in duration-300">
          <h2 className="mb-3 text-[14px] font-semibold" style={{ color: "var(--brand-3)" }}>
            Choose one from the available options
          </h2>

          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-xl border p-2.5 text-left transition-colors duration-200"
            style={{
              borderColor: "var(--ref-30)",
              background: "var(--surface-muted)",
              boxShadow: "var(--effect-shadow-soft)"
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "var(--surface-base)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "var(--surface-muted)")}
            onClick={() => setStep(2)}
          >
            <BankCategoryIcon />
            <div className="flex-1">
              <div className="text-[15px] font-bold" style={{ color: "var(--text-primary)", lineHeight: "1.2" }}>Bank Transfer</div>
              <div className="text-[12px] font-normal" style={{ color: "var(--text-secondary)", lineHeight: "1.3", marginTop: "1px" }}>Normal Bank Transfer</div>
            </div>
            <div className="text-[var(--brand-3)]">
              <ChevronRight />
            </div>
          </button>
        </div>
      ) : (
        <div className="withdrawal-form animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="deposit-bank-transfer__subheader mb-4">
            <button type="button" className="deposit-bank-transfer__back" onClick={() => setStep(1)}>
              <ChevronLeft />
              Back
            </button>
            <h2 className="deposit-bank-transfer__title">Normal Bank Transfer</h2>
          </div>

          {/* Info Panel */}
          <div className="deposit-bank-transfer__panel mb-6">
            <div className="deposit-bank-transfer__info-row">
              <span>Balance</span>
              <span className="deposit-bank-transfer__info-val">0.00</span>
            </div>
            <div className="deposit-bank-transfer__info-row">
              <span>Min Withdrawal</span>
              <span className="deposit-bank-transfer__info-val">-</span>
            </div>
            <div className="deposit-bank-transfer__notes-rule">
              <p className="deposit-bank-transfer__notes-label">Notes :</p>
              <p className="deposit-bank-transfer__notes-body">
                Bank transfer takes up to 24 hours to reflect in your bank account<br /><br />
                If the entered and bank account are inconsistent, the company reserves the right to reject the application..
              </p>
            </div>
          </div>

          {/* Bank Account Info Section */}
          <div className="space-y-4">
            <h3 className="deposit-bank-transfer__section-title">Bank Account Info</h3>

            <div className="deposit-bank-transfer__panel deposit-bank-transfer__panel--brand-surface space-y-4">
              {/* Bank Name */}
              <div className="flex items-center gap-4">
                <label htmlFor={bankId} className="w-[120px] shrink-0 text-sm font-bold" style={{ color: "var(--action-primary-hover)" }}>
                  Bank Name
                </label>
                <div className="relative flex-1">
                  <select
                    id={bankId}
                    className="h-[44px] w-full appearance-none rounded-lg border-none px-4 pr-10 text-sm outline-none"
                    style={{ background: "var(--surface-base)", color: "var(--text-primary)" }}
                    defaultValue=""
                  >
                    <option value="" disabled>Please Select Bank</option>
                    <option value="aba">ABA BANK</option>
                    <option value="wing">WING BANK</option>
                    <option value="acleda">ACLEDA BANK</option>
                  </select>
                  <MenuChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                </div>
              </div>

              {/* Account Name */}
              <div className="flex items-center gap-4">
                <label htmlFor={accountNameId} className="w-[120px] shrink-0 text-sm font-bold" style={{ color: "var(--action-primary-hover)" }}>
                  Account Name
                </label>
                <input
                  id={accountNameId}
                  type="text"
                  placeholder="Enter Your Account Name"
                  className="h-[44px] flex-1 rounded-lg border-none px-4 text-sm outline-none"
                  style={{ background: "var(--surface-raised)", color: "var(--text-primary)" }}
                />
              </div>

              {/* Warning Alert */}
              <div className="flex items-center gap-2 rounded-lg border border-red-500 p-3 text-[13px] font-bold text-red-500 bg-white">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-red-500 text-xs">!</div>
                Your Account Balance is 0.00
              </div>

              {/* Account Number */}
              <div className="flex items-center gap-4">
                <label htmlFor={accountNumberId} className="w-[120px] shrink-0 text-sm font-bold" style={{ color: "var(--action-primary-hover)" }}>
                  Account Number
                </label>
                <input
                  id={accountNumberId}
                  type="text"
                  placeholder="Enter Your Account Number"
                  className="h-[44px] flex-1 rounded-lg border-none px-4 text-sm outline-none"
                  style={{ background: "var(--surface-raised)", color: "var(--text-primary)" }}
                />
              </div>

              {/* Amount */}
              <div className="flex items-center gap-4">
                <label htmlFor={amountId} className="w-[120px] shrink-0 text-sm font-bold" style={{ color: "var(--action-primary-hover)" }}>
                  Amount
                </label>
                <div className="flex h-[44px] flex-1 overflow-hidden rounded-lg" style={{ background: "var(--surface-raised)" }}>
                  <div className="flex w-[60px] items-center justify-center text-sm font-bold text-white" style={{ background: "var(--action-primary-hover)" }}>
                    USD
                  </div>
                  <input
                    id={amountId}
                    type="text"
                    placeholder="Please Enter Amount"
                    className="flex-1 border-none bg-transparent px-4 text-right text-sm outline-none"
                    style={{ color: "var(--text-primary)" }}
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                disabled
                className="h-[48px] w-full max-w-[200px] rounded-lg text-sm font-bold text-white opacity-50 shadow-md transition-all"
                style={{ background: "var(--action-primary-hover)" }}
                onClick={handleWithdraw}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )
      }
    </section>
  );
}
