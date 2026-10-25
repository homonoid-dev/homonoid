import fs from "node:fs";
import path from "node:path";
import { findStylesheetPath } from "../utils/css.js";

export async function runDoctor(targetDir: string): Promise<void> {
  console.log("\n  Homonoid Diagnostic Health Check\n");

  const pkgJsonPath = path.join(targetDir, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    console.error("  Error: No package.json found in current directory.");
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const hasTokens = Boolean(deps["@homonoid/tokens"]);
  const hasReact = Boolean(deps["@homonoid/react"]);

  console.log(`  ${hasTokens ? "✓" : "✗"} @homonoid/tokens dependency: ${hasTokens ? deps["@homonoid/tokens"] : "missing"}`);
  console.log(`  ${hasReact ? "✓" : "✗"} @homonoid/react dependency: ${hasReact ? deps["@homonoid/react"] : "missing"}`);

  const cssPath = findStylesheetPath(targetDir);
  if (cssPath) {
    const relPath = path.relative(targetDir, cssPath);
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    const hasTokenCss = cssContent.includes("@homonoid/tokens/css");
    const hasReactCss = cssContent.includes("@homonoid/react/styles.css");
    const hasSource = cssContent.includes("@source") && cssContent.includes("@homonoid/react");
    const hasSeed = cssContent.includes("--seed");

    console.log(`  ✓ Stylesheet located at ${relPath}`);
    console.log(`  ${hasTokenCss ? "✓" : "✗"} Token stylesheet import: ${hasTokenCss ? "present" : "missing"}`);
    console.log(`  ${hasReactCss ? "✓" : "✗"} React stylesheet import: ${hasReactCss ? "present" : "missing"}`);
    console.log(`  ${hasSource ? "✓" : "✗"} Tailwind @source directive: ${hasSource ? "present" : "missing"}`);
    console.log(`  ${hasSeed ? "✓" : "•"} Custom Chroma seed override: ${hasSeed ? "configured" : "using canonical default"}`);
  } else {
    console.log("  ✗ Active stylesheet: not found");
  }

  console.log("\n  Health check complete.\n");
}
