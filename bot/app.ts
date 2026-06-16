import { Bot, InputFile, type Context } from "grammy";
import { saveNotifyChatId } from "../src/modules/mining/services/import-notify-store";
import { getBotConfig, isBotConfigured } from "./config";

function buildStartKeyboard(webAppUrl: string, buttonText: string) {
  return {
    inline_keyboard: [
      [
        {
          text: buttonText,
          web_app: { url: webAppUrl },
        },
      ],
    ],
  };
}

async function sendStartMessage(
  ctx: Context,
  webAppUrl: string,
  imagePath: string,
  caption: string,
  buttonText: string,
) {
  const keyboard = buildStartKeyboard(webAppUrl, buttonText);

  try {
    await ctx.replyWithPhoto(new InputFile(imagePath), {
      caption,
      reply_markup: keyboard,
    });
    return;
  } catch (error) {
    console.error("Start message with photo failed", {
      path: imagePath,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  await ctx.reply(caption, {
    reply_markup: keyboard,
  });
}

function registerHandlers(bot: Bot, config: ReturnType<typeof getBotConfig>) {
  bot.command("start", async (ctx) => {
    console.info("Received /start", {
      userId: ctx.from?.id,
      chatId: ctx.chat?.id,
      chatType: ctx.chat?.type,
    });

    const notifyUsername =
      process.env.TELEGRAM_IMPORT_NOTIFY_USERNAME?.trim() || "x_zera";

    if (
      ctx.from?.username?.toLowerCase() === notifyUsername.toLowerCase() &&
      ctx.chat?.id
    ) {
      try {
        await saveNotifyChatId(ctx.chat.id, ctx.from.username);
      } catch (error) {
        console.error("Failed to save import notify chat id", {
          username: ctx.from.username,
          chatId: ctx.chat.id,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    try {
      await sendStartMessage(
        ctx,
        config.webAppUrl,
        config.imagePath,
        config.caption,
        config.buttonText,
      );
      return;
    } catch (error) {
      console.error("Start message failed", {
        userId: ctx.from?.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    try {
      await ctx.reply(config.caption, {
        reply_markup: buildStartKeyboard(config.webAppUrl, config.buttonText),
      });
      return;
    } catch (error) {
      console.error("Start message with web_app button failed", {
        userId: ctx.from?.id,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    await ctx.reply(`${config.caption}\n\nOpen: ${config.webAppUrl}`);
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

  registerHandlers(bot, config);
  botInstance = bot;

  return bot;
}

export { isBotConfigured } from "./config";
