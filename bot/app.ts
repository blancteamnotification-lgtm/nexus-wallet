import fs from "fs";
import { Bot, InputFile, type Context } from "grammy";
import { getBotConfig, startMessageCaption } from "./config";

function buildStartKeyboard(webAppUrl: string) {
  return {
    inline_keyboard: [
      [
        {
          text: "Open Nexus Wallet",
          web_app: { url: webAppUrl },
        },
      ],
    ],
  };
}

async function sendStartMessage(ctx: Context, webAppUrl: string, welcomeImagePath: string) {
  const keyboard = buildStartKeyboard(webAppUrl);

  if (fs.existsSync(welcomeImagePath)) {
    await ctx.replyWithPhoto(new InputFile(welcomeImagePath), {
      caption: startMessageCaption,
      reply_markup: keyboard,
    });
    return;
  }

  console.error("Welcome image not found", { path: welcomeImagePath });

  await ctx.reply(startMessageCaption, {
    reply_markup: keyboard,
  });
}

function registerHandlers(bot: Bot, webAppUrl: string, welcomeImagePath: string) {
  bot.command("start", async (ctx) => {
    console.info("Received /start", {
      userId: ctx.from?.id,
      chatId: ctx.chat?.id,
      chatType: ctx.chat?.type,
    });

    try {
      await sendStartMessage(ctx, webAppUrl, welcomeImagePath);
      return;
    } catch (error) {
      console.error("Start message with photo failed", {
        userId: ctx.from?.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    try {
      await ctx.reply(startMessageCaption, {
        reply_markup: buildStartKeyboard(webAppUrl),
      });
      return;
    } catch (error) {
      console.error("Start message with web_app button failed", {
        userId: ctx.from?.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    await ctx.reply(`${startMessageCaption}\n\nOpen: ${webAppUrl}`);
  });

  bot.catch((err) => {
    console.error("Bot error while handling update", {
      updateId: err.ctx.update.update_id,
      error:
        err.error instanceof Error ? err.error.message : String(err.error),
    });
  });
}

let botInstance: Bot | null = null;

export function getBot(): Bot {
  if (botInstance) {
    return botInstance;
  }

  const config = getBotConfig();
  const bot = new Bot(config.token);

  registerHandlers(bot, config.webAppUrl, config.welcomeImagePath);
  botInstance = bot;

  return bot;
}

export function isBotConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.WEBAPP_URL?.trim());
}
