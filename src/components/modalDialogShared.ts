import type { CSSProperties } from "react";

export function getCenteredModalDialogStyle(opts: {
  width: number | string;
  height?: number;
}) {
  return {
    position: "absolute",
    zIndex: 1,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: opts.width,
    maxWidth: "min(700px, calc(100vw - 32px))",
    height: opts.height,
    maxHeight: "calc(100vh - 32px)",
    margin: 0,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
  } satisfies CSSProperties;
}

