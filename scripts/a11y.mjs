import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const host = "127.0.0.1";
const port = "4173";
const origin = `http://${host}:${port}`;

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} exited with ${code ?? "signal"}`));
    });
  });
}

async function waitForPreview() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The preview server is still starting.
    }
    await delay(250);
  }
  throw new Error("Preview server did not start");
}

const preview = spawn(
  "npx",
  ["vite", "preview", "--host", host, "--port", port, "--strictPort"],
  { stdio: "inherit" },
);

try {
  await waitForPreview();
  await run("npx", [
    "axe",
    `${origin}/?a11y=1`,
    `${origin}/home?a11y=1`,
    `${origin}/conversation?a11y=1`,
    "--tags",
    "wcag2a,wcag2aa",
    "--exit",
    "--load-delay",
    "1000",
    "--chrome-options",
    "no-sandbox,disable-dev-shm-usage",
  ]);
} finally {
  preview.kill("SIGTERM");
}
