import { useState } from "react";
import { assets } from "../data/assets";

const FLOATING_DOWNLOAD_DISMISSED_KEY = "floating-download-banner-dismissed";

function readDownloadBannerDismissed(): boolean {
  try {
    return (
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(FLOATING_DOWNLOAD_DISMISSED_KEY) === "1"
    );
  } catch {
    return false;
  }
}

/**
 * Fixed-position overlays that appear on top of the landing page content
 * (matches kh168.live): a download banner at bottom-left and a live-chat
 * agent bubble at bottom-right.
 */
export function FloatingOverlays() {
  const [downloadBannerDismissed, setDownloadBannerDismissed] = useState(
    readDownloadBannerDismissed,
  );

  const dismissDownloadBanner = () => {
    try {
      sessionStorage.setItem(FLOATING_DOWNLOAD_DISMISSED_KEY, "1");
    } catch {
      /* quota / private mode */
    }
    setDownloadBannerDismissed(true);
  };

  return (
    <>
      {/* Bottom-left "Super Apps / Download" banner. The image itself contains
          the KH168 mark, tagline, and DOWNLOAD button. */}
      {!downloadBannerDismissed && (
        <div className="fixed left-[220px] bottom-0 z-40 pointer-events-none">
          <div className="pointer-events-auto relative inline-block">
            <button
              type="button"
              className="relative block"
              aria-label="Download KH168 app"
            >
              <img
                src={assets.floatingDownload}
                alt="KH168 Super Apps — Download"
                className="h-[74px] w-auto select-none"
              />
            </button>
            <button
              type="button"
              onClick={dismissDownloadBanner}
              aria-label="Dismiss download banner"
              className="absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full border text-[11px] leading-none grid place-items-center transition-colors"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#D4AF37",
                color: "#991B1B",
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom-right: live-chat agent avatar */}
      <button
        type="button"
        aria-label="Live chat"
        className="fixed right-4 bottom-4 z-40 w-14 h-14 rounded-full overflow-hidden border-2 shadow-lg bg-white"
        style={{ borderColor: "#B91C1C" }}
      >
        <img
          src={assets.chatAvatar}
          alt="Live chat agent"
          className="w-full h-full object-cover"
        />
      </button>
    </>
  );
}
