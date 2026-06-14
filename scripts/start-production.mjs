import { spawn } from "node:child_process";

const port = process.env.PORT || "3000";
const children = [];

function spawnProcess(label, command, args) {
  const child = spawn(command, args, {
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    console.error(`${label} exited`, { code, signal });
    shutdown(label, code ?? 1);
  });

  children.push(child);
  return child;
}

function shutdown(reason, exitCode = 0) {
  console.info(`Shutting down (${reason})...`);

  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(exitCode), 1000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

if (process.env.TELEGRAM_BOT_TOKEN && process.env.WEBAPP_URL) {
  spawnProcess("Bot", "npx", ["tsx", "bot/index.ts"]);
} else {
  console.warn(
    "TELEGRAM_BOT_TOKEN or WEBAPP_URL is missing — Telegram bot will not start",
  );
}

spawnProcess("Web", "npx", ["next", "start", "-H", "0.0.0.0", "-p", port]);
