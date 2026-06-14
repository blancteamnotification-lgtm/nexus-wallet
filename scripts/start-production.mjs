import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT || "3000";
const bin = (name) => path.join(projectRoot, "node_modules", ".bin", name);

let webProcess = null;
let botProcess = null;

function startBot() {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.WEBAPP_URL) {
    console.warn(
      "TELEGRAM_BOT_TOKEN or WEBAPP_URL is missing — Telegram bot will not start",
    );
    return;
  }

  botProcess = spawn(bin("tsx"), ["bot/index.ts"], {
    cwd: projectRoot,
    stdio: "inherit",
    env: process.env,
  });

  botProcess.on("exit", (code, signal) => {
    console.error("Bot process exited", { code, signal });
    botProcess = null;
  });
}

function shutdown(signal) {
  console.info(`Shutting down (${signal})...`);

  if (botProcess && !botProcess.killed) {
    botProcess.kill("SIGTERM");
  }

  if (webProcess && !webProcess.killed) {
    webProcess.kill("SIGTERM");
  }

  setTimeout(() => process.exit(0), 1000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

webProcess = spawn(
  bin("next"),
  ["start", "-H", "0.0.0.0", "-p", port],
  {
    cwd: projectRoot,
    stdio: "inherit",
    env: process.env,
  },
);

webProcess.on("exit", (code, signal) => {
  console.error("Web process exited", { code, signal });
  process.exit(code ?? 1);
});

setTimeout(startBot, 5000);

console.info("Starting Nexus Wallet web server...", { port });
