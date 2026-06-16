"use client";

import Image from "next/image";
import { PersonAddIcon } from "@/shared/components/Icons";
import { trackEvent } from "@/shared/analytics/amplitude";

type MiningHeaderProps = {
  userName: string;
  onInviteFriends: () => void;
};

export function MiningHeader({ userName, onInviteFriends }: MiningHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-2 sm:px-3">
      <Image
        alt="Avatar"
        className="size-9 shrink-0 rounded-full object-cover sm:size-10"
        height={40}
        src="/images/profile.png"
        width={40}
      />
      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-white/90 sm:text-base">
        {userName}
      </p>
      <button
        className="flex shrink-0 items-center gap-1 rounded-[20px] bg-white/[0.08] px-2.5 py-2 text-[13px] font-semibold text-white/95 sm:gap-1.5 sm:px-3 sm:text-[15px]"
        onClick={() => {
          trackEvent("mining_invite_friends_clicked");
          onInviteFriends();
        }}
        type="button"
      >
        <PersonAddIcon />
        Invite friend
      </button>
    </div>
  );
}
