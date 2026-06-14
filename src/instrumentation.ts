export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const { setupBotWebhook } = await import("../bot/setup-webhook");
  await setupBotWebhook();
}
