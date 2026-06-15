"use client";

import Image from "next/image";
import type { Chain } from "../types";
import { truncateAddress } from "../data/wallets";
import { ChainQrCode } from "./ChainQrCode";
import { ChevronDownIcon, CopyIcon } from "@/shared/components/Icons";
import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { trackEvent } from "@/shared/analytics/amplitude";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";

type DepositScreenProps = {
  chain: Chain;
  onSelectChain: () => void;
  onCopy: (address: string) => void;
};

export function DepositScreen({
  chain,
  onSelectChain,
  onCopy,
}: DepositScreenProps) {
  useTrackScreenView("deposit_viewed");

  return (
    <ScreenLayout>
      <div className="flex flex-1 flex-col gap-4 px-4 py-4 pt-[54px]">
        <div className="flex flex-col items-center gap-4">
          <button
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1 pr-2"
            onClick={() => {
              trackEvent("deposit_chain_selector_clicked", {
                chain_id: chain.id,
              });
              onSelectChain();
            }}
            type="button"
          >
            <Image
              alt={chain.name}
              className="size-6 rounded-full object-cover"
              height={24}
              src={chain.icon}
              width={24}
            />
            <span className="text-sm font-semibold text-white/90">
              {chain.name}
            </span>
            <ChevronDownIcon />
          </button>

          <ChainQrCode chain={chain} />

          <p className="text-center text-sm text-white/70">
            {chain.name} network deposit address
          </p>

          <button
            className="flex w-full items-center gap-4 rounded-full px-3 py-4"
            onClick={() => {
              trackEvent("deposit_copy_address_clicked", {
                chain_id: chain.id,
              });
              onCopy(chain.address);
            }}
            type="button"
          >
            <span className="flex-1 truncate text-left text-sm text-white/70">
              {truncateAddress(chain.address, 16, 12)}
            </span>
            <CopyIcon />
          </button>
        </div>

        <div className="rounded-2xl bg-[#45310f] px-4 py-3">
          <p className="text-sm font-medium text-[#f3c84f]">
            Only deposit tokens from the {chain.warningNetwork} network
          </p>
          <p className="mt-1 text-xs text-[#e8ae27]">
            Deposits from other networks may be lost
          </p>
        </div>
      </div>
    </ScreenLayout>
  );
}
