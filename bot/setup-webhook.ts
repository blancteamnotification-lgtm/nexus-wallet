import { getBot, isBotConfigured } from "./app";
import { getWebhookUrl, resolveWebAppUrl } from "./config";

export async function setupBotWebhook(): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (!isBotConfigured()) {
    console.warn("Telegram bot webhook skipped — missing TELEGRAM_BOT_TOKEN or public URL");
    return;
  }

  try {
    const bot = getBot();
    const webhookUrl = getWebhookUrl();
    const webAppUrl = resolveWebAppUrl();

    console.info("Configuring Telegram bot webhook...", { webAppUrl, webhookUrl });

    await bot.api.deleteWebhook({ drop_pending_updates: true });

    await bot.api.setWebhook(webhookUrl, {
      allowed_updates: ["message", "callback_query"],
      drop_pending_updates: true,
    });

    const me = await bot.api.getMe();
    const info = await bot.api.getWebhookInfo();

    console.info("Telegram bot webhook configured", {
      username: me.username,
      webhookUrl: info.url,
      pendingUpdates: info.pending_update_count,
    });
  } catch (error) {
    console.error("Failed to configure Telegram bot webhook", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
