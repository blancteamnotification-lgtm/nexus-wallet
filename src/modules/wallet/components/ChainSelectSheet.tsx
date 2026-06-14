"use client";

import Image from "next/image";
import { CHAINS, truncateAddress } from "../data/wallets";
import type { Chain } from "../types";
import { BottomSheet } from "@/shared/components/BottomSheet";
import { CopyIcon, QrIcon } from "@/shared/components/Icons";

type ChainSelectSheetProps = {
  isOpen: boolean;
  selectedChainId: string;
  onClose: () => void;
  onPick: (chain: Chain) => void;
  onCopy: (address: string) => void;
};

export function ChainSelectSheet({
  isOpen,
  selectedChainId,
  onClose,
  onPick,
  onCopy,
}: ChainSelectSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select chain">
      <div className="flex flex-col gap-2">
        {CHAINS.map((chain) => (
          <div
            key={chain.id}
            className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${
              chain.id === selectedChainId ? "bg-white/5" : ""
            }`}
          >
            <Image
              alt={chain.name}
              className="size-10 rounded-full object-cover"
              height={40}
              src={chain.icon}
              width={40}
            />
            <button
              className="min-w-0 flex-1 text-left"
              onClick={() => onPick(chain)}
              type="button"
            >
              <p className="text-sm font-semibold text-white/90">{chain.name}</p>
              <p className="text-xs text-white/70">
                {truncateAddress(chain.address)}
              </p>
            </button>
            <div className="flex gap-2">
              <button
                aria-label={`QR ${chain.name}`}
                className="flex size-[38px] items-center justify-center rounded-xl bg-[#007aff]/15"
                onClick={() => onPick(chain)}
                type="button"
              >
                <QrIcon />
              </button>
              <button
                aria-label={`Copy ${chain.name}`}
                className="flex size-[38px] items-center justify-center rounded-xl bg-[#007aff]/15"
                onClick={() => onCopy(chain.address)}
                type="button"
              >
                <CopyIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
