"use client";

import { StarburstDecoration } from "@/shared/components/Icons";
import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { trackEvent } from "@/shared/analytics/amplitude";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";

type WelcomeScreenProps = {
  onCreateWallet: () => void;
};

export function WelcomeScreen({ onCreateWallet }: WelcomeScreenProps) {
  useTrackScreenView("welcome_viewed");

  return (
    <ScreenLayout>
      <div className="nx-welcome relative flex min-h-0 flex-1 flex-col">
        <StarburstDecoration />

        <div className="nx-welcome-content relative z-10 flex flex-col gap-2 px-4 pt-[54px]">
          <h1 className="nx-welcome-title text-[38px] font-black uppercase leading-none tracking-[-0.4px] text-white">
            NEXUS - new generation Crypto wallet
          </h1>
          <p className="nx-welcome-subtitle text-lg text-[#08f]">
            Get $25 bonus after your first deposit
          </p>
        </div>

        <div className="nx-welcome-footer relative z-20 mt-auto px-4 pb-3">
          <button
            className="nx-welcome-btn relative z-20 w-full rounded-2xl bg-black py-3.5 text-[17px] font-semibold tracking-[0.1px] text-white"
            onClick={() => {
              trackEvent("create_wallet_clicked");
              onCreateWallet();
            }}
            type="button"
          >
            Create wallet
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
