import { getCenteredModalDialogStyle } from "./modalDialogShared";

export type ProfileUpdateReminderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};

function WarningCircleIcon() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="var(--state-warning)" />
      <rect x="46" y="28" width="8" height="30" rx="4" fill="white" />
      <circle cx="50" cy="68" r="4" fill="white" />
    </svg>
  );
}

function SmallWarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function ProfileUpdateReminderModal({ isOpen, onClose, onContinue }: ProfileUpdateReminderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal show" role="dialog" tabIndex={-1} style={{ display: "block", zIndex: 1060 }}>
      <button type="button" className="modal-backdrop" aria-label="Close reminder modal" onClick={onClose} />

      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
        style={getCenteredModalDialogStyle({ width: 440 })}
      >
        <div className="modal-content overflow-hidden rounded-[32px] border-none bg-white p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            {/* Main Warning Icon */}
            <div className="mb-6">
              <WarningCircleIcon />
            </div>

            {/* Main Title Text */}
            <h2 className="mb-6 text-[18px] font-medium leading-relaxed text-[var(--brand-3)]" style={{ fontFamily: "inherit" }}>
              Click 'Continue' to finish completing your profile and access exclusive benefits!
            </h2>

            {/* Red Alert Box */}
            <div className="mb-8 flex items-center gap-3 rounded-xl border border-[var(--brand-3)] p-4 text-left">
              <div className="shrink-0 text-[var(--brand-3)]">
                <SmallWarningIcon />
              </div>
              <p className="m-0 text-[14px] font-medium leading-normal text-[var(--brand-3)]">
                To qualify for certain promotions, please complete your profile first.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-[48px] flex-1 rounded-xl font-bold text-white transition-colors hover:brightness-110"
                style={{ background: "var(--ref-70)" }}
              >
                Later
              </button>
              <button
                type="button"
                onClick={onContinue}
                className="h-[48px] flex-1 rounded-xl font-bold text-white transition-colors hover:brightness-110"
                style={{ background: "var(--brand-3)" }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
