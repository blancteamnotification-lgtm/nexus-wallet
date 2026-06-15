import { setupBotWebhook } from "./setup-webhook";

setupBotWebhook()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Webhook setup failed", error);
    process.exit(1);
  });
