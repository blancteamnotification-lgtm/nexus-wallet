import path from "path";

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

function requireHttpsUrl(name: string): string {
  const value = requireEnv(name);

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") {
      throw new Error(`${name} must use HTTPS`);
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    throw new Error(`${name} must be a valid HTTPS URL`);
  }
}

export function getBotConfig(): BotConfig {
  return {
    token: requireEnv("TELEGRAM_BOT_TOKEN"),
    webAppUrl: requireHttpsUrl("WEBAPP_URL"),
    welcomeImagePath: path.join(
      process.cwd(),
      "public/images/welcome-bot.png",
    ),
  };
}

export const startMessageCaption = `🚀 WELCOME TO NEXUS!

The new generation crypto wallet where you can earn daily APY, spend, get cashback, invest.

MAKE YOUR FIRST DEPOSIT TODAY AND GET $25 BONUS ON YOUR BALANCE INSTANTLY`;

export function getWebhookUrl(): string {
  const { webAppUrl } = getBotConfig();
  return `${webAppUrl}/api/telegram/webhook`;
}
