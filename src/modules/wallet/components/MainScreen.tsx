"use client";

import Image from "next/image";
import { POPULAR_ASSETS } from "../data/wallets";
import {
  PersonAddIcon,
  TrendUpIcon,
} from "@/shared/components/Icons";
import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { trackEvent } from "@/shared/analytics/amplitude";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";

type MainScreenProps = {
  userName: string;
  onAddFunds: () => void;
  onTopUp: () => void;
  onInviteFriends: () => void;
};

export function MainScreen({
  userName,
  onAddFunds,
  onTopUp,
  onInviteFriends,
}: MainScreenProps) {
  useTrackScreenView("main_viewed");

  return (
    <ScreenLayout className="pb-0">
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pt-4">
        <div className="flex items-center gap-2 px-2">
          <Image
            alt="Avatar"
            className="size-10 rounded-full object-cover"
            height={40}
            src="/images/profile.png"
            width={40}
          />
          <p className="flex-1 text-base font-semibold text-white/90">
            {userName}
          </p>
          <button
            className="flex items-center gap-1.5 rounded-[20px] bg-white/[0.08] px-3 py-2 text-[15px] font-semibold text-white/95"
            onClick={() => {
              trackEvent("invite_friends_clicked");
              onInviteFriends();
            }}
            type="button"
          >
            <PersonAddIcon />
            Invite friends
          </button>
        </div>

        <div className="px-4 pt-2">
          <p className="text-[32px] font-extrabold leading-10 text-white/90">
            $0.00
          </p>
          <p className="mt-1 text-sm text-white/70">
            Add funds to get +$25 bonus on your balance
          </p>
        </div>

        <div className="px-4 pt-3">
          <button
            className="w-full rounded-2xl bg-[#007aff] py-3.5 text-[17px] font-semibold text-white"
            onClick={() => {
              trackEvent("add_funds_clicked");
              onAddFunds();
            }}
            type="button"
          >
            Add funds
          </button>
        </div>

        <div className="px-4 pt-4">
          <div className="relative min-h-[150px] overflow-hidden rounded-2xl border border-white/20 bg-black px-4 py-3">
            <div className="relative z-10 flex w-[173px] flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <p className="text-[17px] font-bold leading-[22px] tracking-[-0.4px] text-white">
                  $25 bonus for your first deposit
                </p>
                <p className="text-[13px] leading-4 tracking-[-0.08px] text-[#aaa]">
                  Top up and get bonus instantly on your ballance
                </p>
              </div>
              <button
                className="w-full rounded-[20px] bg-white px-3 py-2 text-[15px] font-semibold text-black"
                onClick={() => {
                  trackEvent("top_up_clicked");
                  onTopUp();
                }}
                type="button"
              >
                Top up
              </button>
            </div>
            <div className="pointer-events-none absolute left-[188px] top-[-1px] h-[150px] w-[154px] overflow-hidden">
              <Image
                alt=""
                className="absolute left-[-25.31%] top-[-24.46%] h-[209.65%] w-[198.07%] max-w-none"
                height={150}
                src="/images/starburst-small.png"
                unoptimized
                width={154}
              />
            </div>
          </div>
        </div>

        <p className="px-4 pt-4 text-base font-semibold text-white/90">
          Popular assets
        </p>

        <div className="flex flex-col gap-1 px-4 pb-4">
          {POPULAR_ASSETS.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center gap-2 rounded-2xl bg-white/5 p-2"
            >
              <Image
                alt={asset.name}
                className="size-10 shrink-0 rounded-full object-cover"
                height={40}
                src={asset.icon}
                width={40}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white/90">
                  {asset.name}
                </p>
                <p className="text-xs text-white/70">
                  0{" "}
                  <span className="text-white/50">{asset.symbol}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white/90">$0</p>
                <div className="flex items-center justify-end gap-1">
                  <TrendUpIcon />
                  <span className="text-sm font-semibold text-[#2cb44e]">
                    $0
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
}
