import type { Asset, Chain } from "../types";

/** Замените адреса на свои реальные кошельки */
export const CHAINS: Chain[] = [
  {
    id: "solana",
    name: "Solana",
    address: "9TpZsJHdE3vqmR4YaK8mN2xP7wQ5vL3bF6pCzWDtLqHVZL",
    icon: "/images/Solana-Logo.png",
    warningNetwork: "Solana",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    address: "0x9TpZsJHdE3vqmR4YaK8mN2xP7wQ5vL3bF6pCzWDtLqHVZL",
    icon: "/icons/ethereum.svg",
    warningNetwork: "Ethereum",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    address: "bc1p9TpZsJHdE3vqmR4YaK8mN2xP7wQ5vL3bF640et",
    icon: "/images/Bitcoin.svg.png",
    warningNetwork: "Bitcoin",
  },
  {
    id: "base",
    name: "Base",
    address: "0x6B5F9TpZsJHdE3vqmR4YaK8mN2xP7wQ5vL3b7DeF",
    icon: "/images/base_logo.png",
    warningNetwork: "Base",
  },
  {
    id: "polygon",
    name: "Polygon",
    address: "0x6B5F9TpZsJHdE3vqmR4YaK8mN2xP7wQ5vL3b7DeF",
    icon: "/images/Polygon_Icon.svg.png",
    warningNetwork: "Polygon",
  },
  {
    id: "tron",
    name: "TRON",
    address: "TX6B5F9TpZsJHdE3vqmR4YaK8mN2xP7wQ5vL3b7DeF",
    icon: "/images/tron_logo.png",
    warningNetwork: "TRON",
  },
];

export const POPULAR_ASSETS: Asset[] = [
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: "/images/Solana-Logo.png",
  },
  {
    id: "usdc",
    name: "USDC",
    symbol: "USDC",
    icon: "/images/USDC_Logo.png",
  },
  {
    id: "usdt",
    name: "USDT",
    symbol: "USDT",
    icon: "/images/USDT_Logo.png",
  },
  {
    id: "jito",
    name: "Jito Stacked SOL",
    symbol: "JITO",
    icon: "/images/JitoSOL_Token_Logo_Green.png",
  },
  {
    id: "bonk",
    name: "Bonk",
    symbol: "BONK",
    icon: "/images/bonk1-bonk-logo.png",
  },
  {
    id: "wif",
    name: "dogwifhat",
    symbol: "WIF",
    icon: "/images/dogwifhat-bsc-wif-logo.webp",
  },
  {
    id: "trump",
    name: "OFFICIAL TRUMP",
    symbol: "TRUMP",
    icon: "/images/trump_coin.png",
  },
];

export function truncateAddress(
  address: string,
  prefixLen = 4,
  suffixLen = 4,
): string {
  if (address.length <= prefixLen + suffixLen + 3) return address;

  const prefix = address.startsWith("0x")
    ? address.slice(0, prefixLen + 2)
    : address.slice(0, prefixLen);

  return `${prefix}...${address.slice(-suffixLen)}`;
}
