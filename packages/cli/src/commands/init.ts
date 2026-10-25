import fs from "node:fs";
import path from "node:path";
import { detectPackageManager, installPackages } from "../utils/pm.js";
import { findStylesheetPath, ensureHomonoidCss } from "../utils/css.js";

export interface InitOptions {
  tokensOnly?: boolean;
}

export async function runInit(targetDir: string, options: InitOptions = {}): Promise<void> {
  console.log("\n  Homonoid Design System Initialization\n");

  const pkgJsonPath = path.join(targetDir, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    console.error("  Error: No package.json found in current directory.");
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  const existingDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  const pm = detectPackageManager(targetDir);

  const neededPackages: string[] = [];
  if (!existingDeps["@homonoid/tokens"]) {
    neededPackages.push("@homonoid/tokens@latest");
  }
  if (!options.tokensOnly && !existingDeps["@homonoid/react"]) {
    neededPackages.push("@homonoid/react@latest");
  }

  if (neededPackages.length > 0) {
    console.log(`  Installing ${neededPackages.join(", ")} using ${pm}...`);
    installPackages(targetDir, neededPackages, pm);
    console.log("  Dependencies installed successfully.\n");
  } else {
    console.log("  Dependencies are already installed.\n");
  }

  const cssPath = findStylesheetPath(targetDir);
  if (cssPath) {
    const { changed } = ensureHomonoidCss(cssPath, targetDir);
    const relPath = path.relative(targetDir, cssPath);
    if (changed) {
      console.log(`  Injected Homonoid tokens and Tailwind sources into ${relPath}`);
    } else {
      console.log(`  Homonoid stylesheet configuration is already present in ${relPath}`);
    }
  } else {
    console.warn("  Warning: No stylesheet found. Please import '@homonoid/tokens/css' in your CSS.");
  }

  const nextConfigTs = path.join(targetDir, "next.config.ts");
  const nextConfigMjs = path.join(targetDir, "next.config.mjs");
  const activeNextConfig = fs.existsSync(nextConfigTs)
    ? nextConfigTs
    : fs.existsSync(nextConfigMjs)
      ? nextConfigMjs
      : null;

  if (activeNextConfig) {
    let nextContent = fs.readFileSync(activeNextConfig, "utf-8");
    if (!nextContent.includes("transpilePackages")) {
      const matchPattern = nextContent.includes("const nextConfig: NextConfig = {")
        ? "const nextConfig: NextConfig = {"
        : nextContent.includes("const nextConfig = {")
          ? "const nextConfig = {"
          : null;

      if (matchPattern) {
        nextContent = nextContent.replace(
          matchPattern,
          `${matchPattern}\n  transpilePackages: ["@homonoid/react", "@homonoid/tokens"],`
        );
        fs.writeFileSync(activeNextConfig, nextContent, "utf-8");
        console.log(`  Configured transpilePackages in ${path.basename(activeNextConfig)}`);
      }
    }
  }

  console.log("\n  Homonoid initialization complete. Happy building.\n");
}
