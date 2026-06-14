"use client";

import { useEffect } from "react";

type BackButtonHandler = () => void;

export function useTelegramBackButton(
  isVisible: boolean,
  onBack: BackButtonHandler,
) {
  useEffect(() => {
    const backButton = window.Telegram?.WebApp?.BackButton;
    if (!backButton) return;

    try {
      if (isVisible) {
        backButton.show();
        backButton.onClick(onBack);
      } else {
        backButton.hide();
      }
    } catch {
      /* BackButton not supported */
    }

    return () => {
      try {
        backButton.offClick(onBack);
        backButton.hide();
      } catch {
        /* noop */
      }
    };
  }, [isVisible, onBack]);
}
