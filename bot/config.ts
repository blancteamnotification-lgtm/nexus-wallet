export type BotConfig = {
  token: string;
  webAppUrl: string;
  welcomeImagePath: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function normalizeUrlInput(value: string): string {
  const cleaned = value.trim().replace(/^["']|["']$/g, "");

  if (/^https?:\/\//i.test(cleaned)) {
    return cleaned;
  }

  return `https://${cleaned.replace(/^\/+/, "")}`;
}

export function resolveWebAppUrl(): string | null {
  const candidates = [
    process.env.WEBAPP_URL,
    process.env.NEXT_PUBLIC_WEBAPP_URL,
    process.env.RAILWAY_PUBLIC_DOMAIN
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
      : undefined,
  ];

  for (const candidate of candidates) {
    if (!candidate?.trim()) {
      continue;
    }

    try {
      const url = new URL(normalizeUrlInput(candidate));
      if (url.protocol !== "https:") {
        continue;
      }
      return url.toString().replace(/\/$/, "");
    } catch {
      continue;
    }
  }

  return null;
}

export function getBotConfig(): BotConfig {
  const webAppUrl = resolveWebAppUrl();

  if (!webAppUrl) {
    throw new Error(
      "WEBAPP_URL must be a valid HTTPS URL (or set RAILWAY_PUBLIC_DOMAIN on Railway)",
    );
  }

  return {
    token: requireEnv("TELEGRAM_BOT_TOKEN"),
    webAppUrl,
    welcomeImagePath: `${process.cwd()}/public/images/welcome-bot.png`,
  };
}

export const startMessageCaption = `🚀 WELCOME TO NEXUS!

The new generation crypto wallet where you can earn daily APY, spend, get cashback, invest.

MAKE YOUR FIRST DEPOSIT TODAY AND GET $25 BONUS ON YOUR BALANCE INSTANTLY`;

export function getWebhookUrl(): string {
  const { webAppUrl } = getBotConfig();
  return `${webAppUrl}/api/telegram/webhook`;
}

export function isBotConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() && resolveWebAppUrl(),
  );
}
