import fs from "node:fs";
import path from "node:path";

const COMMON_CSS_PATHS = [
  "app/globals.css",
  "src/app/globals.css",
  "src/index.css",
  "src/globals.css",
  "styles/globals.css",
  "src/styles/globals.css",
  "src/App.css",
  "app.css"
];

export function findStylesheetPath(targetDir: string): string | null {
  for (const relativePath of COMMON_CSS_PATHS) {
    const fullPath = path.join(targetDir, relativePath);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

export function ensureHomonoidCss(cssPath: string): { changed: boolean } {
  let content = fs.readFileSync(cssPath, "utf-8");
  const tailwindImport = '@import "tailwindcss";';
  const tokensImport = '@import "@homonoid/tokens/css";';
  const reactStylesImport = '@import "@homonoid/react/styles.css";';
  const reactSource = '@source "../node_modules/@homonoid/react";';

  let additions = "";
  if (!content.includes(tokensImport)) {
    additions += `${tokensImport}\n`;
  }
  if (!content.includes(reactStylesImport)) {
    additions += `${reactStylesImport}\n`;
  }
  if (!content.includes("@source") || !content.includes("@homonoid/react")) {
    additions += `${reactSource}\n`;
  }

  if (!additions) {
    return { changed: false };
  }

  if (content.includes(tailwindImport)) {
    content = content.replace(tailwindImport, `${tailwindImport}\n${additions.trimEnd()}`);
  } else {
    content = `${additions}${content}`;
  }

  fs.writeFileSync(cssPath, content, "utf-8");
  return { changed: true };
}

export function setChromaSeed(cssPath: string, seedColor: string): void {
  let content = fs.readFileSync(cssPath, "utf-8");
  const seedRegex = /--seed:\s*[^;]+;/;

  if (seedRegex.test(content)) {
    content = content.replace(seedRegex, `--seed: ${seedColor};`);
    fs.writeFileSync(cssPath, content, "utf-8");
    return;
  }

  const seedBlock = `\n@layer base {\n  :root {\n    --seed: ${seedColor};\n  }\n}\n`;
  content = `${content.trimEnd()}\n${seedBlock}`;
  fs.writeFileSync(cssPath, content, "utf-8");
}
