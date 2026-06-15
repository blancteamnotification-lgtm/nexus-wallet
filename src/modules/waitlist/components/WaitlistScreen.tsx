"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { PersonAddIcon } from "@/shared/components/Icons";
import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { trackEvent } from "@/shared/analytics/amplitude";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";
import {
  BankIcon,
  CardIcon,
  CashbackIcon,
  ShieldIcon,
} from "./WaitlistFeatureIcons";

type WaitlistScreenProps = {
  userName: string;
  isJoined: boolean;
  onJoinWaitlist: () => void;
  onInviteFriends: () => void;
};

const FEATURES = [
  { icon: BankIcon, text: "Non-custodial crypto wallet in your Telegram" },
  { icon: CashbackIcon, text: "Cashback on every purchase" },
  { icon: CardIcon, text: "Nexus crypto card" },
  { icon: BankIcon, text: "Bank account, ACH, Wire and Swift transfers" },
  { icon: ShieldIcon, text: "Security and speed" },
] as const;

function FeatureItem({
  icon: Icon,
  text,
}: {
  icon: () => ReactNode;
  text: string;
}) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white/5 p-2">
        <Icon />
      </div>
      <p className="flex-1 text-sm font-medium leading-5 text-white/90">{text}</p>
    </div>
  );
}

export function WaitlistScreen({
  userName,
  isJoined,
  onJoinWaitlist,
  onInviteFriends,
}: WaitlistScreenProps) {
  useTrackScreenView(isJoined ? "waitlist_joined_viewed" : "waitlist_viewed");

  return (
    <ScreenLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pt-4">
        <div className="flex items-center gap-2 px-2">
          <Image
            alt="Avatar"
            className="size-10 rounded-full object-cover"
            height={40}
            src="/images/profile.png"
            width={40}
          />
          <p className="flex-1 text-base font-semibold text-white/90">{userName}</p>
          <button
            className="flex items-center gap-1.5 rounded-[20px] bg-white/[0.08] px-3 py-2 text-[15px] font-semibold text-white/95"
            onClick={() => {
              trackEvent("waitlist_invite_friends_clicked");
              onInviteFriends();
            }}
            type="button"
          >
            <PersonAddIcon />
            Invite friends
          </button>
        </div>

        <div className="flex justify-center px-4">
          <Image
            alt="Nexus card"
            className="h-auto w-full max-w-[280px] object-contain"
            height={222}
            priority
            src="/images/nexus-waitlist.png"
            width={374}
          />
        </div>

        <div className="flex flex-col gap-4 px-4">
          <h1 className="text-[26px] font-black uppercase leading-none tracking-[-0.4px] text-white">
            NEXUS - new generation Crypto wallet
          </h1>

          <div className="flex flex-col gap-2">
            {FEATURES.map((feature) => (
              <FeatureItem
                icon={feature.icon}
                key={feature.text}
                text={feature.text}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto px-4 pb-3">
          {isJoined ? (
            <p className="text-sm leading-5 text-white/70">
              You are in the waitlist. Thank you for your support. We will
              announce you when you can start using service
            </p>
          ) : (
            <button
              className="w-full rounded-2xl bg-[#007aff] py-3.5 text-[17px] font-semibold tracking-[0.1px] text-white"
              onClick={() => {
                trackEvent("waitlist_join_clicked");
                onJoinWaitlist();
              }}
              type="button"
            >
              Join waitlist
            </button>
          )}
        </div>
      </div>
    </ScreenLayout>
  );
}
