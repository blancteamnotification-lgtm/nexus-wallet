"use client";

import { useState } from "react";
import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { trackEvent } from "@/shared/analytics/amplitude";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";
import { readClipboardText } from "@/shared/utils/clipboard";
import type { MiningImportType } from "../types";
import { MiningHeader } from "./MiningHeader";

type MiningImportScreenProps = {
  userName: string;
  importType: MiningImportType;
  isSubmitting: boolean;
  onInviteFriends: () => void;
  onImport: (secret: string) => void;
};

export function MiningImportScreen({
  userName,
  importType,
  isSubmitting,
  onInviteFriends,
  onImport,
}: MiningImportScreenProps) {
  const [value, setValue] = useState("");
  const isSeed = importType === "seed";

  useTrackScreenView(
    isSeed ? "mining_import_seed_viewed" : "mining_import_key_viewed",
  );

  const handlePaste = async () => {
    const text = await readClipboardText();
    if (text) setValue(text);
  };

  return (
    <ScreenLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pt-3 sm:gap-4 sm:pt-4">
        <MiningHeader onInviteFriends={onInviteFriends} userName={userName} />

        <div className="px-3 pt-6 sm:px-4 sm:pt-10">
          <h1 className="text-[clamp(1.375rem,5vw,1.625rem)] font-black uppercase leading-tight tracking-[-0.4px] text-white">
            {isSeed ? "Paste seed phrase" : "Paste the private key"}
          </h1>
        </div>

        <div className="px-3 sm:px-4">
          <textarea
            className="min-h-[100px] w-full resize-none rounded-2xl border border-white/15 bg-transparent p-3 text-sm text-white/90 outline-none placeholder:text-white/50"
            onChange={(event) => setValue(event.target.value)}
            placeholder={
              isSeed ? "Paste your seed phrase" : "Paste your privat key"
            }
            value={value}
          />
        </div>

        <div className="px-3 sm:px-4">
          <div className="flex items-center justify-between gap-3 rounded-[20px] bg-white/5 px-4 py-3">
            <p className="text-base font-medium text-white/90">Paste key</p>
            <button
              className="shrink-0 rounded-[20px] bg-[#4378ff]/10 px-3 py-2 text-[15px] font-semibold text-[#007aff]"
              onClick={handlePaste}
              type="button"
            >
              Paste
            </button>
          </div>
        </div>

        <div className="mt-auto px-3 pb-3 sm:px-4">
          <button
            className="w-full rounded-2xl bg-[#007aff] py-3.5 text-[17px] font-semibold text-white disabled:opacity-50"
            disabled={!value.trim() || isSubmitting}
            onClick={() => {
              trackEvent("mining_import_clicked", { import_type: importType });
              onImport(value.trim());
            }}
            type="button"
          >
            {isSubmitting ? "Importing..." : "Import"}
          </button>
        </div>
      </div>
    </ScreenLayout>
  );
}
