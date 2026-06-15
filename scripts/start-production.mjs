import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT || "3000";
const nextBin = path.join(projectRoot, "node_modules", ".bin", "next");
const tsxBin = path.join(projectRoot, "node_modules", ".bin", "tsx");

function configureWebhook() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.WEBAPP_URL) {
    console.warn("Skipping Telegram webhook setup — missing env vars");
    return;
  }

  const result = spawnSync(tsxBin, ["bot/setup-once.ts"], {
    cwd: projectRoot,
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    console.error("Telegram webhook setup failed, continuing web server start");
  }
}

configureWebhook();

console.info("Starting Nexus Wallet...", { port });

const webProcess = spawn(
  nextBin,
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

process.on("SIGTERM", () => {
  webProcess.kill("SIGTERM");
});

process.on("SIGINT", () => {
  webProcess.kill("SIGINT");
});
