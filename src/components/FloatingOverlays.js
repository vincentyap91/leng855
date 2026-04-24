import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { assets } from "../data/assets";
const FLOATING_DOWNLOAD_DISMISSED_KEY = "floating-download-banner-dismissed";
function readDownloadBannerDismissed() {
    try {
        return (typeof sessionStorage !== "undefined" &&
            sessionStorage.getItem(FLOATING_DOWNLOAD_DISMISSED_KEY) === "1");
    }
    catch {
        return false;
    }
}
/**
 * Fixed-position overlays that appear on top of the landing page content
 * (matches leng855.live): a download banner at bottom-left and a live-chat
 * agent bubble at bottom-right.
 */
export function FloatingOverlays() {
    const [downloadBannerDismissed, setDownloadBannerDismissed] = useState(readDownloadBannerDismissed);
    const dismissDownloadBanner = () => {
        try {
            sessionStorage.setItem(FLOATING_DOWNLOAD_DISMISSED_KEY, "1");
        }
        catch {
            /* quota / private mode */
        }
        setDownloadBannerDismissed(true);
    };
    return (_jsxs(_Fragment, { children: [!downloadBannerDismissed && (_jsx("div", { className: "fixed left-0 bottom-0 z-40 pointer-events-none", children: _jsxs("div", { className: "pointer-events-auto relative inline-block", children: [_jsx("button", { type: "button", className: "relative block", "aria-label": "Download Leng855 app", children: _jsx("img", { src: assets.floatingDownload, alt: "Leng855 Super Apps \u2014 Download", className: "h-[74px] w-auto select-none" }) }), _jsx("button", { type: "button", onClick: dismissDownloadBanner, "aria-label": "Dismiss download banner", className: "absolute -top-2 -right-2 z-10 w-5 h-5 rounded-full border text-[11px] leading-none grid place-items-center transition-colors", style: {
                                backgroundColor: "#FFFFFF",
                                borderColor: "#D4AF37",
                                color: "#991B1B",
                            }, children: _jsx("span", { "aria-hidden": "true", children: "\u00D7" }) })] }) })), _jsx("button", { type: "button", "aria-label": "Live chat", className: "fixed right-4 bottom-4 z-40 w-14 h-14 rounded-full overflow-hidden border-2 shadow-lg bg-white", style: { borderColor: "#B91C1C" }, children: _jsx("img", { src: assets.chatAvatar, alt: "Live chat agent", className: "w-full h-full object-cover" }) })] }));
}
