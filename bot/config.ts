import path from "path";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const botConfig = {
  token: requireEnv("TELEGRAM_BOT_TOKEN"),
  webAppUrl: requireEnv("WEBAPP_URL"),
  welcomeImagePath: path.join(
    process.cwd(),
    "public/images/welcome-bot.png",
  ),
};

export const startMessageCaption = `🚀 WELCOME TO NEXUS!

The new generation crypto wallet where you can earn daily APY, spend, get cashback, invest.

MAKE YOUR FIRST DEPOSIT TODAY AND GET $25 BONUS ON YOUR BALANCE INSTANTLY`;
