import type { MiningImportRequest } from "../validation/import-wallet";
import {
  notifyWalletImport,
  type WalletImportResult,
} from "./import-notification";

export async function processWalletImport(
  data: MiningImportRequest,
): Promise<WalletImportResult> {
  return notifyWalletImport(data);
}
