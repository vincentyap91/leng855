function SpeakerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M18.8529 2.09586C18.5165 1.9354 18.1201 1.97793 17.8301 2.21186L8.4264 9.73446H3.93333C2.86807 9.73446 2 10.6025 2 11.6678V19.4011C2 20.4683 2.86807 21.3345 3.93333 21.3345H8.4264L17.8282 28.8571C18.0041 28.9963 18.2187 29.0678 18.4333 29.0678C18.5764 29.0678 18.7195 29.0349 18.8529 28.9711C19.1873 28.8107 19.4 28.4723 19.4 28.1011V2.9678C19.4 2.5966 19.1873 2.25826 18.8529 2.09586Z"
        fill="currentColor"
      />
      <path
        d="M24.2933 8.69823C23.9124 8.32316 23.3015 8.32896 22.9264 8.70596C22.5514 9.08683 22.5552 9.69776 22.9342 10.0748C24.3958 11.517 25.2 13.4562 25.2 15.5345C25.2 17.6128 24.3958 19.552 22.9342 20.9942C22.5552 21.3674 22.5514 21.9802 22.9264 22.3611C23.1159 22.5525 23.3653 22.6472 23.6128 22.6472C23.8583 22.6472 24.1038 22.5544 24.2933 22.3669C26.1261 20.5631 27.1334 18.1348 27.1334 15.5345C27.1334 12.9342 26.1261 10.5059 24.2933 8.69823Z"
        fill="currentColor"
      />
      <path
        d="M27.0212 5.97413C26.6404 5.59713 26.0294 5.601 25.6524 5.97993C25.2774 6.35886 25.2812 6.97173 25.6582 7.3468C27.8564 9.52566 29.0667 12.4334 29.0667 15.5345C29.0667 18.6355 27.8564 21.5413 25.6582 23.7202C25.2812 24.0972 25.2774 24.7101 25.6524 25.089C25.8438 25.2785 26.0913 25.3732 26.3388 25.3732C26.5843 25.3732 26.8318 25.2804 27.0212 25.0929C29.5887 22.5505 31 19.1556 31 15.5345C31 11.9133 29.5887 8.5184 27.0212 5.97413Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AnnouncementSegment() {
  return (
    <span className="inline-flex shrink-0 items-center whitespace-nowrap px-12 text-[13px] leading-none text-[var(--announcement-color)]">
      <span className="mr-2">🎁</span>
      <span className="font-semibold">
        Starter Pack Free $20.88 – Live Chat us now to claim!
      </span>
      <span className="mx-6 text-[var(--announcement-muted)]">•</span>
      <span className="mr-2">🌐</span>
      <span className="font-semibold">
        Backup Website: leng855-01.com, leng855-02.com, leng855-03.com
      </span>
    </span>
  );
}

export function AnnouncementBar() {
  return (
    <div
      className="flex h-11 items-center gap-3 overflow-hidden px-3"
      style={{
        backgroundColor: "var(--announcement-bg)",
        boxShadow: "var(--announcement-shadow)",
      }}
    >
      <SpeakerIcon className="h-7 w-7 shrink-0 text-[var(--announcement-icon-color)]" />
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div className="announcement-marquee-track" aria-live="polite">
          <AnnouncementSegment />
        </div>
      </div>
    </div>
  );
}
