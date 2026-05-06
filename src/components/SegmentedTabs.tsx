import React from "react";

export type TabOption<T extends string> = {
  id: T;
  label: string;
};

export type SegmentedTabsProps<T extends string> = {
  options: TabOption<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
};

/**
 * A shared segmented tab component that follows the platform's standardized 't3-referral-subtabs' design.
 * Primarily used for sub-navigation within pages like Referral, FAQ, etc.
 */
export function SegmentedTabs<T extends string>({ 
  options, 
  activeId, 
  onChange,
  className = ""
}: SegmentedTabsProps<T>) {
  return (
    <div className={`t3-referral-subtabs ${className}`} role="tablist">
      {options.map((opt) => {
        const isActive = opt.id === activeId;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.id)}
            className={[
              "t3-referral-subtabs__tab transition-all duration-200",
              isActive ? "t3-referral-subtabs__tab--active shadow-sm" : "text-[var(--text-primary)] hover:opacity-70"
            ].join(" ")}
            style={{ 
              cursor: isActive ? "default" : "pointer"
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
