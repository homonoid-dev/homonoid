#!/usr/bin/env node

import { runInit } from "./commands/init.js";
import { runChroma } from "./commands/chroma.js";
import { runDoctor } from "./commands/doctor.js";

const args = process.argv.slice(2);
const command = args[0];

function printHelp(): void {
  console.log(`
  Homonoid CLI - Developer Onboarding and Design System Automation

  Usage:
    npx @homonoid/cli <command> [options]

  Commands:
    init              Initialize Homonoid packages and Tailwind wiring in the project
    chroma, theme     Calibrate the Chroma dynamic color palette from a brand seed color
    doctor, check     Audit project dependencies, stylesheet imports, and Tailwind directives

  Options:
    --seed <hex>      Specify the brand hex seed color for chroma (e.g. #8b5cf6)
    --tokens-only     Install only @homonoid/tokens without the React component library
    -h, --help        Show this help message
    -v, --version     Show CLI version

  Examples:
    npx @homonoid/cli init
    npx @homonoid/cli init --tokens-only
    npx @homonoid/cli chroma --seed #8b5cf6
    npx @homonoid/cli doctor
`);
}

async function main(): Promise<void> {
  const targetDir = process.cwd();

  if (!command || command === "-h" || command === "--help" || command === "help") {
    printHelp();
    return;
  }

  if (command === "-v" || command === "--version" || command === "version") {
    console.log("0.1.0");
    return;
  }

  if (command === "init") {
    const tokensOnly = args.includes("--tokens-only");
    await runInit(targetDir, { tokensOnly });
    return;
  }

  if (command === "chroma" || command === "theme") {
    const seedIndex = args.indexOf("--seed");
    const seed = seedIndex !== -1 && args[seedIndex + 1] ? args[seedIndex + 1] : undefined;
    await runChroma(targetDir, { seed });
    return;
  }

  if (command === "doctor" || command === "check") {
    await runDoctor(targetDir);
    return;
  }

  console.error(`  Error: Unknown command "${command}". Run "npx @homonoid/cli --help" for available commands.\n`);
  process.exit(1);
}

main().catch((err: unknown) => {
  console.error("  An unexpected error occurred:", err);
  process.exit(1);
});
