import * as amplitude from "@amplitude/analytics-browser";
import {
  ANALYTICS_EVENTS,
  type AnalyticsEventName,
} from "@/shared/analytics/events";

let initialized = false;

export function initAmplitude(): void {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey || initialized || typeof window === "undefined") return;

  amplitude.init(apiKey, {
    serverZone: "EU",
    autocapture: false,
    defaultTracking: {
      sessions: true,
      pageViews: false,
      formInteractions: false,
      fileDownloads: false,
    },
  });

  initialized = true;
}

export function identifyAmplitudeUser(
  userId: string | number,
  traits?: {
    telegram_username?: string;
    telegram_first_name?: string;
    start_param?: string;
  },
): void {
  initAmplitude();
  if (!process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) return;

  amplitude.setUserId(String(userId));

  if (!traits) return;

  const identify = new amplitude.Identify();

  if (traits.telegram_username) {
    identify.set("telegram_username", traits.telegram_username);
  }
  if (traits.telegram_first_name) {
    identify.set("telegram_first_name", traits.telegram_first_name);
  }
  if (traits.start_param) {
    identify.set("start_param", traits.start_param);
  }

  amplitude.identify(identify);
}

export function trackEvent(
  event: AnalyticsEventName,
  properties?: Record<string, string | number | boolean>,
): void {
  initAmplitude();
  if (!process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) return;

  amplitude.track(ANALYTICS_EVENTS[event].name, properties);
}
