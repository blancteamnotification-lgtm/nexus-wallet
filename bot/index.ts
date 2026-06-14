import "dotenv/config";
import { Bot, InputFile } from "grammy";
import { botConfig, startMessageCaption } from "./config";

const bot = new Bot(botConfig.token);

bot.command("start", async (ctx) => {
  await ctx.replyWithPhoto(new InputFile(botConfig.welcomeImagePath), {
    caption: startMessageCaption,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Nexus Wallet",
            web_app: { url: botConfig.webAppUrl },
          },
        ],
      ],
    },
  });
});

bot.catch((error) => {
  console.error("Bot error:", error);
});

console.log("Nexus Wallet bot is running...");
bot.start();
