"use client";

import Image from "next/image";
import type { Chain } from "@/modules/wallet/types";
import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { trackEvent } from "@/shared/analytics/amplitude";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";
import { CHAINS } from "@/modules/wallet/data/wallets";
import { MiningHeader } from "./MiningHeader";

type MiningSelectChainScreenProps = {
  userName: string;
  onInviteFriends: () => void;
  onSelectChain: (chain: Chain) => void;
};

export function MiningSelectChainScreen({
  userName,
  onInviteFriends,
  onSelectChain,
}: MiningSelectChainScreenProps) {
  useTrackScreenView("mining_select_chain_viewed");

  return (
    <ScreenLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pt-3 sm:gap-4 sm:pt-4">
        <MiningHeader onInviteFriends={onInviteFriends} userName={userName} />

        <div className="flex flex-col gap-2 px-3 pt-6 sm:px-4 sm:pt-10">
          <h1 className="text-[clamp(1.375rem,5vw,1.625rem)] font-black uppercase leading-tight tracking-[-0.4px] text-white">
            Select Chain
          </h1>
          <p className="text-sm leading-5 text-white/70">
            Select chain of your wallet you want to connect
          </p>
        </div>

        <div className="flex flex-col gap-2 px-3 pb-3 sm:px-4">
          {CHAINS.map((chain) => (
            <button
              className="flex items-center gap-3 rounded-[20px] bg-white/5 p-3"
              key={chain.id}
              onClick={() => {
                trackEvent("mining_chain_selected", { chain_id: chain.id });
                onSelectChain(chain);
              }}
              type="button"
            >
              <Image
                alt={chain.name}
                className="size-10 shrink-0 rounded-full object-cover"
                height={40}
                src={chain.icon}
                width={40}
              />
              <span className="text-sm font-medium text-white/90">{chain.name}</span>
            </button>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
}
