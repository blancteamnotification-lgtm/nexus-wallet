"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { CHAINS } from "../data/wallets";
import {
  isUserRegistered,
  markUserRegistered,
} from "../services/registration";
import type { AppScreen, Chain } from "../types";
import { ChainSelectSheet } from "./ChainSelectSheet";
import { DepositScreen } from "./DepositScreen";
import { LoadingScreen } from "./LoadingScreen";
import { MainScreen } from "./MainScreen";
import { WelcomeScreen } from "./WelcomeScreen";
import { CopyToast } from "@/shared/components/CopyToast";
import { useTelegramBackButton } from "@/shared/hooks/useTelegramBackButton";
import { useTelegram } from "@/shared/hooks/useTelegram";
import { trackEvent } from "@/shared/analytics/amplitude";

const LOADER_DURATION_MS = 1000;

export function WalletApp() {
  const { isReady, userName, userId, haptic, shareInvite } = useTelegram();
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const [selectedChain, setSelectedChain] = useState<Chain>(CHAINS[0]);
  const [isChainSheetOpen, setIsChainSheetOpen] = useState(false);
  const [chainSheetSource, setChainSheetSource] = useState<"main" | "deposit">(
    "main",
  );
  const [isCopyToastVisible, setIsCopyToastVisible] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    setScreen(isUserRegistered(userId) ? "main" : "welcome");
  }, [isReady, userId]);

  const handleCreateWallet = useCallback(() => {
    haptic("medium");
    setScreen("loading");
    window.setTimeout(() => {
      markUserRegistered(userId);
      setScreen("main");
    }, LOADER_DURATION_MS);
  }, [haptic, userId]);

  const handleCopy = useCallback(
    async (address: string) => {
      haptic("light");
      try {
        await navigator.clipboard.writeText(address);
        setIsCopyToastVisible(true);
        window.setTimeout(() => setIsCopyToastVisible(false), 2000);
      } catch {
        /* clipboard unavailable */
      }
    },
    [haptic],
  );

  const openChainSelectFromMain = useCallback(() => {
    haptic("light");
    setChainSheetSource("main");
    setIsChainSheetOpen(true);
  }, [haptic]);

  const openChainSelectFromDeposit = useCallback(() => {
    haptic("light");
    setChainSheetSource("deposit");
    setIsChainSheetOpen(true);
  }, [haptic]);

  const handleChainPick = useCallback(
    (chain: Chain) => {
      setSelectedChain(chain);
      setIsChainSheetOpen(false);
      if (chainSheetSource === "main") {
        setScreen("deposit");
      }
    },
    [chainSheetSource],
  );

  const handleTelegramBack = useCallback(() => {
    haptic("light");
    trackEvent("telegram_back_clicked", {
      screen,
      is_chain_sheet_open: isChainSheetOpen,
    });
    if (isChainSheetOpen) {
      setIsChainSheetOpen(false);
      return;
    }
    if (screen === "deposit") {
      setScreen("main");
    }
  }, [haptic, isChainSheetOpen, screen]);

  useTelegramBackButton(
    isChainSheetOpen || screen === "deposit",
    handleTelegramBack,
  );

  const screenVariants = {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          animate="animate"
          exit="exit"
          initial={false}
          key={screen}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          variants={screenVariants}
        >
          {screen === "welcome" && (
            <WelcomeScreen onCreateWallet={handleCreateWallet} />
          )}
          {screen === "loading" && <LoadingScreen />}
          {screen === "main" && (
            <MainScreen
              onAddFunds={openChainSelectFromMain}
              onInviteFriends={shareInvite}
              onTopUp={openChainSelectFromMain}
              userName={userName}
            />
          )}
          {screen === "deposit" && (
            <DepositScreen
              chain={selectedChain}
              onCopy={handleCopy}
              onSelectChain={openChainSelectFromDeposit}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <ChainSelectSheet
        isOpen={isChainSheetOpen}
        onClose={() => setIsChainSheetOpen(false)}
        onCopy={handleCopy}
        onPick={handleChainPick}
        selectedChainId={selectedChain.id}
      />

      <CopyToast isVisible={isCopyToastVisible} />
    </>
  );
}
