export type ChainId =
  | "solana"
  | "ethereum"
  | "bitcoin"
  | "base"
  | "polygon"
  | "tron"
  | "ton";

export type Chain = {
  id: ChainId;
  name: string;
  address: string;
  icon: string;
  warningNetwork: string;
};

export type Asset = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
};

export type AppScreen = "welcome" | "loading" | "main" | "deposit";

export type ModalType = "chain-select" | null;
