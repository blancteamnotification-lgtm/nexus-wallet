"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/shared/analytics/amplitude";
import type { AnalyticsEventName } from "@/shared/analytics/events";

export function useTrackScreenView(
  event: AnalyticsEventName,
  enabled = true,
): void {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!enabled || trackedRef.current) return;

    trackEvent(event);
    trackedRef.current = true;
  }, [enabled, event]);
}
