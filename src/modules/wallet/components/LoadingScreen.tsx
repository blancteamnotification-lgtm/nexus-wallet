"use client";

import { Loader } from "@/shared/components/Loader";
import { ScreenLayout } from "@/shared/components/ScreenLayout";
import { useTrackScreenView } from "@/shared/analytics/useTrackScreenView";

export function LoadingScreen() {
  useTrackScreenView("loading_viewed");

  return (
    <ScreenLayout className="justify-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
        <Loader />
        <div className="text-center">
          <p className="text-[28px] font-semibold leading-8 text-white">
            Creating wallet
          </p>
          <p className="mt-2 text-sm text-white/70">It will take few sec</p>
        </div>
      </div>
    </ScreenLayout>
  );
}
