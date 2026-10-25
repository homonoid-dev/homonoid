import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import path from "node:path";
import { findStylesheetPath, setChromaSeed } from "../utils/css.js";

const DEFAULT_SEED = "#007aff";
const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export interface ChromaOptions {
  seed?: string;
}

export async function runChroma(targetDir: string, options: ChromaOptions = {}): Promise<void> {
  console.log("\n  Homonoid Chroma Theme Calibration\n");

  let seed = options.seed?.trim();

  if (!seed) {
    if (process.stdin.isTTY) {
      const rl = readline.createInterface({ input, output });
      const answer = await rl.question(`  Enter your brand seed color hex [default: ${DEFAULT_SEED}]: `);
      rl.close();
      seed = answer.trim() || DEFAULT_SEED;
    } else {
      seed = DEFAULT_SEED;
    }
  }

  if (!seed.startsWith("#")) {
    seed = `#${seed}`;
  }

  if (!HEX_REGEX.test(seed)) {
    console.error(`  Error: Invalid hex color format "${seed}". Please provide a valid 3 or 6 digit hex code.`);
    process.exit(1);
  }

  const cssPath = findStylesheetPath(targetDir);
  if (!cssPath) {
    console.error("  Error: Could not locate a stylesheet file in the current directory.");
    process.exit(1);
  }

  setChromaSeed(cssPath, seed);
  const relPath = path.relative(targetDir, cssPath);

  console.log(`  Updated Chroma seed color to ${seed} in ${relPath}`);
  console.log("  All hover, active, subtle, and dark mode palettes are now dynamically derived.\n");
}
