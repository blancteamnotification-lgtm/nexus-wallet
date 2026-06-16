"use client";

import { useCallback, useEffect, useState } from "react";
import { useTelegram } from "@/shared/hooks/useTelegram";
import {
  isWaitlistJoined,
  markWaitlistJoined,
} from "../services/registration";
import { WaitlistScreen } from "./WaitlistScreen";

export function WaitlistApp() {
  const { isReady, userName, userId, haptic, shareInvite } = useTelegram();
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    setIsJoined(isWaitlistJoined(userId));
  }, [isReady, userId]);

  const handleJoinWaitlist = useCallback(() => {
    haptic("medium");
    markWaitlistJoined(userId);
    setIsJoined(true);
  }, [haptic, userId]);

  if (!isReady) {
    return (
      <WaitlistScreen
        isJoined={false}
        onInviteFriends={shareInvite}
        onJoinWaitlist={() => {}}
        userName={userName}
      />
    );
  }

  return (
    <WaitlistScreen
      isJoined={isJoined}
      onInviteFriends={shareInvite}
      onJoinWaitlist={handleJoinWaitlist}
      userName={userName}
    />
  );
}
