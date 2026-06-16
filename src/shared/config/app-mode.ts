export const APP_MODES = ["wallet", "waitlist", "mining"] as const;

export type AppMode = (typeof APP_MODES)[number];

export function getAppMode(): AppMode {
  const mode = process.env.NEXT_PUBLIC_APP_MODE;

  if (mode === "waitlist" || mode === "mining") {
    return mode;
  }

  return "wallet";
}

export function isWaitlistMode(): boolean {
  return getAppMode() === "waitlist";
}

export function isMiningMode(): boolean {
  return getAppMode() === "mining";
}
