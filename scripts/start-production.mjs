import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT || "3000";
const nextBin = path.join(projectRoot, "node_modules", ".bin", "next");

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
