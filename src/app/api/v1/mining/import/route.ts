import { NextResponse } from "next/server";
import { processWalletImport } from "@/modules/mining/services/import-wallet";
import { miningImportRequestSchema } from "@/modules/mining/validation/import-wallet";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = miningImportRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const result = await processWalletImport(parsed.data);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Mining import failed", {
      chainId: parsed.data.chainId,
      importType: parsed.data.importType,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { error: "Failed to process wallet import" },
      { status: 500 },
    );
  }
}
