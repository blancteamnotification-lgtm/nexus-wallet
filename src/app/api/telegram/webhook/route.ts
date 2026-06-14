import { webhookCallback } from "grammy";
import { NextResponse } from "next/server";
import { getBot, isBotConfigured } from "../../../../../bot/app";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isBotConfigured()) {
    return NextResponse.json(
      { error: "Telegram bot is not configured" },
      { status: 503 },
    );
  }

  const bot = getBot();
  const handler = webhookCallback(bot, "std/http");

  return handler(request);
}
