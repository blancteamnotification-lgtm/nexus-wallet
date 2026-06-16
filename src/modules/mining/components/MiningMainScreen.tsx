"use client";

import type { ReactNode } from "react";
import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { trackEvent } from "@/shared/analytics/amplitude";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";
import { MiningHeader } from "./MiningHeader";

type MiningMainScreenProps = {
  userName: string;
  balance: number;
  isWalletConnected: boolean;
  isWelcomeBonusClaimed: boolean;
  onConnectWallet: () => void;
  onClaimWelcomeBonus: () => void;
  onConnectTask: () => void;
  onInviteFriends: () => void;
  onInviteTask: () => void;
};

const HOW_IT_WORKS = [
  {
    emoji: "🔗",
    title: "Connect Your Wallets",
    description:
      "Link one or multiple wallets. Your Mining Power is calculated based on the total value of assets you hold across all connected wallets",
  },
  {
    emoji: "⛏️",
    title: "Mine Every 6 Hours",
    description:
      "Mining runs automatically. The higher your Mining Power, the more tokens you generate during each 6-hour mining cycle",
  },
  {
    emoji: "🎁",
    title: "Claim & Repeat",
    description:
      "Once the timer ends, claim your mined tokens and instantly start a new mining cycle to continue earning rewards",
  },
] as const;

function TaskNumber({ value }: { value: number }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white/5 text-base font-semibold text-white/90">
      {value}
    </div>
  );
}

function SecondaryActionButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="shrink-0 rounded-[20px] bg-[#4378ff]/10 px-3 py-2 text-[15px] font-semibold text-[#007aff]"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function PrimaryActionButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="shrink-0 rounded-[20px] bg-[#007aff] px-3 py-2 text-[15px] font-semibold text-white"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function MiningMainScreen({
  userName,
  balance,
  isWalletConnected,
  isWelcomeBonusClaimed,
  onConnectWallet,
  onClaimWelcomeBonus,
  onConnectTask,
  onInviteFriends,
  onInviteTask,
}: MiningMainScreenProps) {
  useTrackScreenView("mining_main_viewed");

  return (
    <ScreenLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pt-3 sm:gap-4 sm:pt-4">
        <MiningHeader onInviteFriends={onInviteFriends} userName={userName} />

        <div className="flex flex-col items-center gap-2 px-3 pt-6 text-center sm:px-4 sm:pt-10">
          <p className="text-sm font-medium text-white/90">Epoch 1: 06:00:00</p>
          <p className="text-[clamp(1.375rem,5vw,1.625rem)] font-black uppercase leading-tight tracking-[-0.4px] text-white">
            {balance} NEX POINTS
          </p>
          <p className="max-w-[20rem] text-sm leading-5 text-white/70">
            Connect wallet and start mining Nexus token
          </p>
        </div>

        <div className="px-3 sm:px-4">
          {isWalletConnected ? (
            <button
              className="w-full rounded-2xl bg-[#2990ff]/15 py-3.5 text-[17px] font-semibold text-[#2990ff]"
              onClick={() => {
                trackEvent("mining_connect_one_more_clicked");
                onConnectWallet();
              }}
              type="button"
            >
              Connect one more
            </button>
          ) : (
            <button
              className="w-full rounded-2xl bg-[#007aff] py-3.5 text-[17px] font-semibold text-white"
              onClick={() => {
                trackEvent("mining_connect_wallet_clicked");
                onConnectWallet();
              }}
              type="button"
            >
              Connect wallet
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2.5 px-3 sm:px-4">
          <h2 className="text-lg font-medium text-white/90">How it works</h2>
          <div className="flex flex-col gap-2.5 rounded-[20px] bg-white/5 p-4">
            {HOW_IT_WORKS.map((item) => (
              <div className="flex gap-3" key={item.title}>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white/5 text-base">
                  {item.emoji}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium text-white/90">{item.title}</p>
                  <p className="text-sm text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4">
          <h2 className="text-lg font-medium text-white/90">Tasks</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-[20px] bg-white/5 px-3 py-3 sm:gap-3 sm:px-4">
              <TaskNumber value={1} />
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-white/90">Welcome bonus</p>
                <p className="text-sm text-white/70">100 Nexus tokens</p>
              </div>
              {isWelcomeBonusClaimed ? (
                <span className="shrink-0 text-[15px] font-semibold text-white/50">
                  Claimed
                </span>
              ) : (
                <SecondaryActionButton
                  onClick={() => {
                    trackEvent("mining_claim_clicked");
                    onClaimWelcomeBonus();
                  }}
                >
                  Claim
                </SecondaryActionButton>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-[20px] bg-white/5 px-3 py-3 sm:gap-3 sm:px-4">
              <TaskNumber value={2} />
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-white/90">Connect wallet</p>
                <p className="text-sm text-white/70">1000 Nexus tokens</p>
              </div>
              {isWalletConnected ? (
                <SecondaryActionButton onClick={onConnectTask}>
                  Connect
                </SecondaryActionButton>
              ) : (
                <PrimaryActionButton
                  onClick={() => {
                    trackEvent("mining_task_connect_clicked");
                    onConnectTask();
                  }}
                >
                  Connect
                </PrimaryActionButton>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-[20px] bg-white/5 px-3 py-3 sm:gap-3 sm:px-4">
              <TaskNumber value={3} />
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-white/90">Invite friend</p>
                <p className="text-sm text-white/70">500 Nexus tokens</p>
              </div>
              <PrimaryActionButton
                onClick={() => {
                  trackEvent("mining_task_invite_clicked");
                  onInviteTask();
                }}
              >
                Invite
              </PrimaryActionButton>
            </div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
}
