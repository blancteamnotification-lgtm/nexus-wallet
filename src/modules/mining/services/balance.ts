const BALANCE_PREFIX = "nexus_mining_balance";
const WELCOME_CLAIMED_PREFIX = "nexus_mining_welcome_claimed";
const WALLET_CONNECTED_PREFIX = "nexus_mining_wallet_connected";

const WELCOME_BONUS_AMOUNT = 100;

function getKey(prefix: string, userId: number | string): string {
  return `${prefix}_${userId}`;
}

export function getMiningBalance(userId: number | string): number {
  if (typeof window === "undefined") return 0;

  const stored = localStorage.getItem(getKey(BALANCE_PREFIX, userId));
  if (!stored) return 0;

  const parsed = Number(stored);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function isWelcomeBonusClaimed(userId: number | string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(getKey(WELCOME_CLAIMED_PREFIX, userId)) === "true";
}

export function claimWelcomeBonus(userId: number | string): number {
  if (typeof window === "undefined") return WELCOME_BONUS_AMOUNT;

  localStorage.setItem(getKey(BALANCE_PREFIX, userId), String(WELCOME_BONUS_AMOUNT));
  localStorage.setItem(getKey(WELCOME_CLAIMED_PREFIX, userId), "true");

  return WELCOME_BONUS_AMOUNT;
}

export function isWalletConnected(userId: number | string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(getKey(WALLET_CONNECTED_PREFIX, userId)) === "true";
}

export function markWalletConnected(userId: number | string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getKey(WALLET_CONNECTED_PREFIX, userId), "true");
}
