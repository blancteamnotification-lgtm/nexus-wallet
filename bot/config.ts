export type BotConfig = {
  token: string;
  webAppUrl: string;
  caption: string;
  imagePath: string;
  buttonText: string;
};

export type StartMessageConfig = {
  caption: string;
  imagePath: string;
  buttonText: string;
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
    ...getStartMessageConfig(),
  };
}

export const startMessageCaption = `🚀 WELCOME TO NEXUS!

The new generation crypto wallet where you can earn daily APY, spend, get cashback, invest.

MAKE YOUR FIRST DEPOSIT TODAY AND GET $25 BONUS ON YOUR BALANCE INSTANTLY`;

export const miningStartMessageCaption = `🔥 Early Access Is Live

Mine future tokens using the strength of your crypto portfolio.

No tapping.
No staking.
No deposits.

Simply connect your wallet and start earning.

How it works:

• Connect your wallet
• Receive Mining Power based on your portfolio value
• Complete a mining cycle every 6 hours
• Claim rewards and continue mining

Early miners will be eligible for future token distribution and ecosystem rewards.

The earlier you start, the more you can accumulate.

👇 Launch the app and activate your Mining Power.`;

function resolveAppMode(): "wallet" | "waitlist" | "mining" {
  const mode = process.env.NEXT_PUBLIC_APP_MODE;

  if (mode === "waitlist" || mode === "mining") {
    return mode;
  }

  return "wallet";
}

export function getStartMessageConfig(): StartMessageConfig {
  if (resolveAppMode() === "mining") {
    return {
      caption: miningStartMessageCaption,
      imagePath: `${process.cwd()}/public/images/mining-start-pic.png`,
      buttonText: "Launch Mining",
    };
  }

  return {
    caption: startMessageCaption,
    imagePath: `${process.cwd()}/public/images/welcome-bot.png`,
    buttonText: "Open Nexus Wallet",
  };
}

export function getWebhookUrl(): string {
  const { webAppUrl } = getBotConfig();
  return `${webAppUrl}/api/telegram/webhook`;
}

export function isBotConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() && resolveWebAppUrl(),
  );
}
