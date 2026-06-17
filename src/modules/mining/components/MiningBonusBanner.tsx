"use client";

import Image from "next/image";
import { trackEvent } from "@/shared/analytics/amplitude";

type MiningBonusBannerProps = {
  onConnect: () => void;
};

export function MiningBonusBanner({ onConnect }: MiningBonusBannerProps) {
  return (
    <div className="relative min-h-[150px] overflow-hidden rounded-2xl border border-white/20 bg-black px-4 py-3">
      <div className="relative z-10 flex w-[min(173px,55%)] flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-[17px] font-bold leading-[22px] tracking-[-0.4px] text-white">
            $25 USDT bonus
          </p>
          <p className="text-[13px] leading-4 tracking-[-0.08px] text-[#aaa]">
            Connect wallet and get bonus instantly on your ballance
          </p>
        </div>
        <button
          className="w-full rounded-[20px] bg-white px-3 py-2 text-[15px] font-semibold text-black"
          onClick={() => {
            trackEvent("mining_bonus_banner_connect_clicked");
            onConnect();
          }}
          type="button"
        >
          Connect
        </button>
      </div>
      <div className="pointer-events-none absolute right-0 top-[-1px] h-[150px] w-[154px] overflow-hidden">
        <Image
          alt=""
          className="pointer-events-none absolute left-[-25.31%] top-[-24.46%] h-[209.65%] w-[198.07%] max-w-none select-none object-cover"
          height={150}
          src="/images/starburst-small.png"
          unoptimized
          width={154}
        />
      </div>
    </div>
  );
}
