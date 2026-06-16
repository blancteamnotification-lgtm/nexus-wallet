"use client";

import { useEffect, useState } from "react";
import { identifyAmplitudeUser } from "@/shared/analytics/amplitude";

type TelegramUser = {
  id?: number;
  first_name?: string;
  username?: string;
};

type TelegramBackButton = {
  show: () => void;
  hide: () => void;
  onClick: (handler: () => void) => void;
  offClick: (handler: () => void) => void;
};

type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  close: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  openTelegramLink?: (url: string) => void;
  BackButton?: TelegramBackButton;
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy") => void;
  };
  initDataUnsafe?: {
    user?: TelegramUser;
    start_param?: string;
  };
};

const INVITE_MESSAGE =
  "Join Nexus Wallet and get $25 bonus on your first deposit!";

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

const LOCAL_USER_ID = "local";

function initTelegramWebApp() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return null;

  try {
    tg.ready();
    tg.expand();
    tg.setHeaderColor("#08040d");
    tg.setBackgroundColor("#08040d");
  } catch {
    /* older Telegram clients may not support all APIs */
  }

  return tg;
}

export function useTelegram() {
  const [isReady, setIsReady] = useState(false);
  const [userName, setUserName] = useState("Account 1");
  const [userId, setUserId] = useState<number | string>(LOCAL_USER_ID);
  const [telegramUsername, setTelegramUsername] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;

    const bootstrap = () => {
      if (cancelled) return;

      const tg = initTelegramWebApp();
      const user = tg?.initDataUnsafe?.user;

      const nextUserId = user?.id ?? LOCAL_USER_ID;

      setUserId(nextUserId);
      setTelegramUsername(user?.username);
      setUserName(user?.first_name ?? user?.username ?? "Account 1");

      try {
        identifyAmplitudeUser(nextUserId, {
          telegram_username: user?.username,
          telegram_first_name: user?.first_name,
          start_param: tg?.initDataUnsafe?.start_param,
        });
      } catch {
        /* analytics must not block app render */
      }

      setIsReady(true);
    };

    bootstrap();

    if (!window.Telegram?.WebApp) {
      const timer = window.setTimeout(bootstrap, 100);
      const fallbackTimer = window.setTimeout(bootstrap, 500);

      return () => {
        cancelled = true;
        window.clearTimeout(timer);
        window.clearTimeout(fallbackTimer);
      };
    }

    const retryTimer = window.setTimeout(bootstrap, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
    };
  }, []);

  const haptic = (style: "light" | "medium" | "heavy" = "light") => {
    try {
      window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(style);
    } catch {
      /* noop */
    }
  };

  const shareInvite = () => {
    haptic("light");

    const appUrl =
      process.env.NEXT_PUBLIC_WEBAPP_URL ??
      (typeof window !== "undefined" ? window.location.origin : "");

    const shareLink = `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(INVITE_MESSAGE)}`;

    try {
      const tg = window.Telegram?.WebApp;
      if (tg?.openTelegramLink) {
        tg.openTelegramLink(shareLink);
        return;
      }
    } catch {
      /* fallback below */
    }

    window.open(shareLink, "_blank");
  };

  return { isReady, userName, userId, telegramUsername, haptic, shareInvite };
}
