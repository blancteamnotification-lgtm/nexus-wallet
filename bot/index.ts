import fs from "fs";
import "dotenv/config";
import { Bot, GrammyError, HttpError, InputFile, type Context } from "grammy";
import { botConfig, startMessageCaption } from "./config";

const bot = new Bot(botConfig.token);

function buildStartKeyboard() {
  return {
    inline_keyboard: [
      [
        {
          text: "Open Nexus Wallet",
          web_app: { url: botConfig.webAppUrl },
        },
      ],
    ],
  };
}

async function sendStartMessage(ctx: Context) {
  const keyboard = buildStartKeyboard();

  if (fs.existsSync(botConfig.welcomeImagePath)) {
    await ctx.replyWithPhoto(new InputFile(botConfig.welcomeImagePath), {
      caption: startMessageCaption,
      reply_markup: keyboard,
    });
    return;
  }

  console.error("Welcome image not found", {
    path: botConfig.welcomeImagePath,
  });

  await ctx.reply(startMessageCaption, {
    reply_markup: keyboard,
  });
}

bot.command("start", async (ctx) => {
  console.info("Received /start", {
    userId: ctx.from?.id,
    chatId: ctx.chat?.id,
    chatType: ctx.chat?.type,
  });

  try {
    await sendStartMessage(ctx);
    return;
  } catch (error) {
    console.error("Start message with photo failed", {
      userId: ctx.from?.id,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  try {
    await ctx.reply(startMessageCaption, {
      reply_markup: buildStartKeyboard(),
    });
    return;
  } catch (error) {
    console.error("Start message with web_app button failed", {
      userId: ctx.from?.id,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  await ctx.reply(
    `${startMessageCaption}\n\nOpen: ${botConfig.webAppUrl}`,
  );
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error("Bot error while handling update", {
    updateId: ctx.update.update_id,
    error:
      err.error instanceof GrammyError
        ? err.error.description
        : err.error instanceof HttpError
          ? err.error.message
          : String(err.error),
  });
});

console.info("Nexus Wallet bot starting...", {
  webAppUrl: botConfig.webAppUrl,
  welcomeImageExists: fs.existsSync(botConfig.welcomeImagePath),
  welcomeImagePath: botConfig.welcomeImagePath,
});

bot.start({
  onStart: (info) => {
    console.info("Nexus Wallet bot is running", {
      username: info.username,
      id: info.id,
    });
  },
});
