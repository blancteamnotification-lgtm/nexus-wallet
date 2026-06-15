export const APP_MODES = ["wallet", "waitlist"] as const;

export type AppMode = (typeof APP_MODES)[number];

export function getAppMode(): AppMode {
  const mode = process.env.NEXT_PUBLIC_APP_MODE;

  if (mode === "waitlist") {
    return "waitlist";
  }

  return "wallet";
}

export function isWaitlistMode(): boolean {
  return getAppMode() === "waitlist";
}
