"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { trackEvent } from "@/shared/analytics/amplitude";
import type { AnalyticsEventName } from "@/shared/analytics/events";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  closeClickedEvent?: AnalyticsEventName;
  backdropClickedEvent?: AnalyticsEventName;
};

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  closeClickedEvent,
  backdropClickedEvent,
}: BottomSheetProps) {
  const handleBackdropClick = () => {
    if (backdropClickedEvent) {
      trackEvent(backdropClickedEvent);
    }
    onClose();
  };

  const handleCloseClick = () => {
    if (closeClickedEvent) {
      trackEvent(closeClickedEvent);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 bg-[rgba(8,4,13,0.5)]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          <motion.div
            animate={{ y: 0 }}
            className="fixed bottom-0 left-1/2 z-50 flex max-h-[85dvh] w-full max-w-[min(100%,430px)] -translate-x-1/2 flex-col rounded-t-[20px] bg-[#171717] shadow-[0_4px_12px_rgba(8,4,13,0.1),0_0_2px_rgba(8,4,13,0.1)]"
            exit={{ y: "100%" }}
            initial={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex justify-center pt-2">
              <div className="h-[5px] w-9 rounded-full bg-white/20" />
            </div>

            <div className="flex h-10 items-center justify-between px-4">
              <button
                aria-label="Close"
                className="flex size-6 items-center justify-center rounded-full bg-white/5"
                onClick={handleCloseClick}
                type="button"
              >
                <svg fill="none" height="12" viewBox="0 0 8 12" width="8">
                  <path
                    d="M6.5 1L1.5 6L6.5 11"
                    stroke="rgba(255,255,255,0.9)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <p className="text-base font-semibold text-white/90">{title}</p>
              <div className="size-6" />
            </div>

            <div className="overflow-y-auto px-2 pb-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
