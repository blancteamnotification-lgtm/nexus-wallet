"use client";

import { AnimatePresence, motion } from "framer-motion";

type CopyToastProps = {
  isVisible: boolean;
};

export function CopyToast({ isVisible }: CopyToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed left-1/2 top-16 z-[60] -translate-x-1/2 rounded-full bg-[#2a2a2a] px-5 py-3 text-sm font-medium text-white/90 shadow-lg"
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        >
          Copied
        </motion.div>
      )}
    </AnimatePresence>
  );
}
