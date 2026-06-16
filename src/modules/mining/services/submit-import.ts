import type { MiningImportRequest } from "../validation/import-wallet";

type SubmitImportResponse = {
  success: boolean;
};

export async function submitWalletImport(
  payload: MiningImportRequest,
): Promise<void> {
  const response = await fetch("/api/v1/mining/import", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(body?.error ?? "Failed to submit wallet import");
  }

  const data = (await response.json()) as SubmitImportResponse;
  if (!data.success) {
    throw new Error("Failed to submit wallet import");
  }
}
