"use client";

import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { trackEvent } from "@/shared/analytics/amplitude";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";
import type { MiningImportType } from "../types";
import { MiningHeader } from "./MiningHeader";

type MiningConnectionMethodScreenProps = {
  userName: string;
  onInviteFriends: () => void;
  onSelectMethod: (method: MiningImportType) => void;
};

const METHODS = [
  {
    id: "seed" as const,
    emoji: "🌱",
    title: "Import Seed Phrase",
    description: "Connect your wallet using your recovery phrase",
  },
  {
    id: "private-key" as const,
    emoji: "🔑",
    title: "Import Private Key",
    description: "Connect your wallet using a private key",
  },
];

export function MiningConnectionMethodScreen({
  userName,
  onInviteFriends,
  onSelectMethod,
}: MiningConnectionMethodScreenProps) {
  useTrackScreenView("mining_connection_method_viewed");

  return (
    <ScreenLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pt-3 sm:gap-4 sm:pt-4">
        <MiningHeader onInviteFriends={onInviteFriends} userName={userName} />

        <div className="flex flex-col gap-2 px-3 pt-6 sm:px-4 sm:pt-10">
          <h1 className="text-[clamp(1.375rem,5vw,1.625rem)] font-black uppercase leading-tight tracking-[-0.4px] text-white">
            Choose a connection method
          </h1>
          <p className="text-sm leading-5 text-white/70">
            Connect your wallet to calculate your Mining Power and start earning
            rewards based on your on-chain assets
          </p>
        </div>

        <div className="flex flex-col gap-2 px-3 pb-3 sm:px-4">
          {METHODS.map((method) => (
            <button
              className="flex items-center gap-3 rounded-[20px] bg-white/5 px-3 py-3 text-left sm:px-4"
              key={method.id}
              onClick={() => {
                trackEvent("mining_connection_method_selected", {
                  method: method.id,
                });
                onSelectMethod(method.id);
              }}
              type="button"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white/5 text-base">
                {method.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-white/90">{method.title}</p>
                <p className="text-sm text-white/70">{method.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
}
