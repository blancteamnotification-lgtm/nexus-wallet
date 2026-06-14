import "dotenv/config";
import { getBot, isBotConfigured } from "./app";

async function main() {
  if (!isBotConfigured()) {
    throw new Error("TELEGRAM_BOT_TOKEN and WEBAPP_URL are required");
  }

  const bot = getBot();
  const config = await import("./config").then((m) => m.getBotConfig());

  console.info("Starting Telegram bot with polling...", {
    webAppUrl: config.webAppUrl,
  });

  await bot.api.deleteWebhook({ drop_pending_updates: true });

  bot.start({
    onStart: (info) => {
      console.info("Telegram bot is running (polling)", {
        username: info.username,
        id: info.id,
      });
    },
  });
}

main().catch((error) => {
  console.error("Bot failed to start", {
    error: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
});
