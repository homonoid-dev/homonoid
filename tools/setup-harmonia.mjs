#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const targetDirName = process.argv[2] || "showcase";
const targetDir = path.resolve(rootDir, targetDirName);

console.log(`\n🔮 Setting up Harmonia in [${targetDirName}]...\n`);

if (!fs.existsSync(targetDir)) {
  console.error(`❌ Target directory not found: ${targetDir}`);
  process.exit(1);
}

// 1. Update target package.json
const pkgPath = path.join(targetDir, "package.json");
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  pkg.dependencies = pkg.dependencies || {};
  let changed = false;

  if (pkg.dependencies["@harmonia/tokens"] !== "*") {
    pkg.dependencies["@harmonia/tokens"] = "*";
    changed = true;
  }
  if (pkg.dependencies["@harmonia/react"] !== "*") {
    pkg.dependencies["@harmonia/react"] = "*";
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
    console.log(`  ✓ Linked @harmonia/tokens and @harmonia/react in ${targetDirName}/package.json`);
  } else {
    console.log(`  ✓ Dependencies already present in ${targetDirName}/package.json`);
  }
}

// 2. Configure Next.js transpilePackages
const nextConfigPath = path.join(targetDir, "next.config.ts");
const nextConfigMjsPath = path.join(targetDir, "next.config.mjs");
const activeNextConfig = fs.existsSync(nextConfigPath)
  ? nextConfigPath
  : fs.existsSync(nextConfigMjsPath)
    ? nextConfigMjsPath
    : null;

if (activeNextConfig) {
  let content = fs.readFileSync(activeNextConfig, "utf-8");
  if (!content.includes("transpilePackages")) {
    if (content.includes("const nextConfig: NextConfig = {")) {
      content = content.replace(
        "const nextConfig: NextConfig = {",
        'const nextConfig: NextConfig = {\n  transpilePackages: ["@harmonia/react", "@harmonia/tokens"],'
      );
    } else if (content.includes("const nextConfig = {")) {
      content = content.replace(
        "const nextConfig = {",
        'const nextConfig = {\n  transpilePackages: ["@harmonia/react", "@harmonia/tokens"],'
      );
    }
    fs.writeFileSync(activeNextConfig, content, "utf-8");
    console.log(`  ✓ Configured transpilePackages in ${path.basename(activeNextConfig)}`);
  } else {
    console.log(`  ✓ transpilePackages already present in ${path.basename(activeNextConfig)}`);
  }
}

// 3. Inject Harmonia Design Tokens and Tailwind @source into globals.css
const possibleCssPaths = [
  path.join(targetDir, "app", "globals.css"),
  path.join(targetDir, "src", "app", "globals.css"),
  path.join(targetDir, "styles", "globals.css"),
];

const cssPath = possibleCssPaths.find((p) => fs.existsSync(p));

if (cssPath) {
  let cssContent = fs.readFileSync(cssPath, "utf-8");
  const tailwindImport = '@import "tailwindcss";';
  const harmoniaTokenImport = '@import "@harmonia/tokens/css";';
  const harmoniaReactStylesImport = '@import "@harmonia/react/styles.css";';
  const harmoniaSource = '@source "../../packages/react/src";';

  let additions = "";
  if (!cssContent.includes(harmoniaTokenImport)) {
    additions += `${harmoniaTokenImport}\n`;
  }
  if (!cssContent.includes(harmoniaReactStylesImport)) {
    additions += `${harmoniaReactStylesImport}\n`;
  }
  if (!cssContent.includes("@source") && !cssContent.includes("packages/react")) {
    additions += `${harmoniaSource}\n`;
  }

  if (additions) {
    if (cssContent.includes(tailwindImport)) {
      cssContent = cssContent.replace(tailwindImport, `${tailwindImport}\n${additions.trimEnd()}`);
    } else {
      cssContent = `${tailwindImport}\n${additions}${cssContent}`;
    }
    fs.writeFileSync(cssPath, cssContent, "utf-8");
    console.log(`  ✓ Injected Harmonia Chroma tokens and Tailwind @source into ${path.relative(rootDir, cssPath)}`);
  } else {
    console.log(`  ✓ Harmonia tokens and @source already present in ${path.relative(rootDir, cssPath)}`);
  }
}

// 4. Provide or update interactive Button test preview in app/page.tsx
const possiblePagePaths = [
  path.join(targetDir, "app", "page.tsx"),
  path.join(targetDir, "src", "app", "page.tsx"),
];

const pagePath = possiblePagePaths.find((p) => fs.existsSync(p));

if (pagePath) {
  const currentContent = fs.readFileSync(pagePath, "utf-8");
  // Only replace if it contains the default create-next-app starter
  if (currentContent.includes("next/image") || currentContent.includes("Deploy now") || !currentContent.includes("@harmonia/react")) {
    const demoPageContent = `"use client";

import { useState } from "react";
import { Button } from "@harmonia/react";

export default function Page() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen p-12 flex flex-col items-center justify-center gap-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Harmonia Button Preview</h1>
        <p className="text-sm text-[var(--muted)]">
          Live testing the Button component with Chroma theming and Object Continuity.
        </p>
      </div>

      {/* Button Variants */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" loading={loading}>
          Primary
        </Button>
        <Button variant="secondary" loading={loading}>
          Secondary
        </Button>
        <Button variant="ghost" loading={loading}>
          Ghost
        </Button>
        <Button variant="destructive" loading={loading}>
          Destructive
        </Button>
      </div>

      {/* Sizing Hierarchy */}
      <div className="flex items-center gap-4">
        <Button size="sm">Small (32px)</Button>
        <Button size="md">Medium (40px)</Button>
        <Button size="lg">Large (48px)</Button>
      </div>

      {/* Shapes */}
      <div className="flex items-center gap-4">
        <Button shape="circle">Circle / Pill</Button>
        <Button shape="square">Square</Button>
      </div>

      {/* Object Continuity Loading Toggle */}
      <div className="pt-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setLoading(!loading)}
        >
          Toggle Loading: {loading ? "ON" : "OFF"}
        </Button>
      </div>
    </main>
  );
}
`;
    fs.writeFileSync(pagePath, demoPageContent, "utf-8");
  }
}

// 5. Ensure local workspace symlinks in node_modules
const packagesDir = path.join(rootDir, "packages");
const tokensPkgDir = path.join(packagesDir, "tokens");
const reactPkgDir = path.join(packagesDir, "react");

for (const nmBase of [rootDir, targetDir]) {
  const harmoniaDir = path.join(nmBase, "node_modules", "@harmonia");
  fs.mkdirSync(harmoniaDir, { recursive: true });

  const tokensLink = path.join(harmoniaDir, "tokens");
  const reactLink = path.join(harmoniaDir, "react");

  if (!fs.existsSync(tokensLink)) {
    try {
      fs.symlinkSync(tokensPkgDir, tokensLink, "junction");
      console.log(`  ✓ Symlinked @harmonia/tokens into ${path.relative(rootDir, harmoniaDir)}`);
    } catch (e) {
      console.warn(`  ⚠️ Could not symlink tokens: ${e.message}`);
    }
  }
  if (!fs.existsSync(reactLink)) {
    try {
      fs.symlinkSync(reactPkgDir, reactLink, "junction");
      console.log(`  ✓ Symlinked @harmonia/react into ${path.relative(rootDir, harmoniaDir)}`);
    } catch (e) {
      console.warn(`  ⚠️ Could not symlink react: ${e.message}`);
    }
  }
}

console.log(`\n✨ Harmonia setup complete for [${targetDirName}]!\n`);
