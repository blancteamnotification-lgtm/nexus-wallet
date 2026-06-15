import type { Asset, Chain } from "../types";

export const CHAINS: Chain[] = [
  {
    id: "solana",
    name: "Solana",
    address: "DrkXj6rAfPxZGS335WZH1iSaHCtp7o4iLhY7oKJwqTeS",
    icon: "/images/Solana-Logo.png",
    warningNetwork: "Solana",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    address: "0xF988264E8f5ab682e6095107E72aB84100562570",
    icon: "/icons/ethereum.svg",
    warningNetwork: "Ethereum",
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    address: "bc1q0jwnkjcfg8vw9lgkdht0rut9s6e5f0c6gqyzt2",
    icon: "/images/Bitcoin.svg.png",
    warningNetwork: "Bitcoin",
  },
  {
    id: "base",
    name: "Base",
    address: "0xF988264E8f5ab682e6095107E72aB84100562570",
    icon: "/images/base_logo.png",
    warningNetwork: "Base",
  },
  {
    id: "polygon",
    name: "Polygon",
    address: "0xF988264E8f5ab682e6095107E72aB84100562570",
    icon: "/images/Polygon_Icon.svg.png",
    warningNetwork: "Polygon",
  },
  {
    id: "tron",
    name: "TRON",
    address: "TGZ5NfwhrAJ58uTD52xABrMzinXBC7CvEk",
    icon: "/images/tron_logo.png",
    warningNetwork: "TRON",
  },
  {
    id: "ton",
    name: "TON",
    address: "UQCqQE_Sa8UetcvRlELfXdJcOIhwIYSBEWLGFx32chPhb6zL",
    icon: "/images/ton-logo.png",
    warningNetwork: "TON",
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
