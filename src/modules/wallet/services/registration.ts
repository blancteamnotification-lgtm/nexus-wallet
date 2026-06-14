const STORAGE_PREFIX = "nexus_wallet_registered";

function getStorageKey(userId: number | string): string {
  return `${STORAGE_PREFIX}_${userId}`;
}

export function isUserRegistered(userId: number | string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(getStorageKey(userId)) === "true";
}

export function markUserRegistered(userId: number | string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(userId), "true");
}
