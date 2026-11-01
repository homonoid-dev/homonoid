#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const require = createRequire(import.meta.url);
let ts;
try {
  ts = require(path.resolve(rootDir, "node_modules/.pnpm/typescript@5.9.3/node_modules/typescript/lib/typescript.js"));
} catch {
  ts = require("typescript");
}

const projects = [
  "packages/react/tsconfig.json",
  "packages/tokens/tsconfig.json",
  "packages/cli/tsconfig.json",
  "showcase/tsconfig.json",
];

const deprecations = [];
const seen = new Set();

for (const projectRelative of projects) {
  const configPath = path.resolve(rootDir, projectRelative);
  if (!fs.existsSync(configPath)) continue;

  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) continue;

  const parsed = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath)
  );

  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    if (
      sourceFile.isDeclarationFile ||
      sourceFile.fileName.includes("node_modules") ||
      sourceFile.fileName.includes(".next") ||
      sourceFile.fileName.includes("/dist/")
    ) {
      continue;
    }

    function checkNode(node) {
      // If node is the expression of a CallExpression (e.g. fn() or obj.method()),
      // skip checking it in isolation; the CallExpression itself checks the resolved signature.
      if (
        ts.isCallExpression(node.parent) &&
        node.parent.expression === node
      ) {
        return;
      }

      // If node is a property identifier inside a property access that is called, skip it.
      if (
        ts.isIdentifier(node) &&
        ts.isPropertyAccessExpression(node.parent) &&
        node.parent.name === node &&
        ts.isCallExpression(node.parent.parent) &&
        node.parent.parent.expression === node.parent
      ) {
        return;
      }

      let depTag = null;
      let symbolName = "";

      // For call expressions, resolve the specific signature that was invoked
      if (ts.isCallExpression(node)) {
        const signature = checker.getResolvedSignature(node);
        if (signature) {
          const sigTags = signature.getJsDocTags();
          const found = sigTags.find((t) => t.name === "deprecated");
          if (found) {
            depTag = found;
            symbolName = node.expression.getText();
          }
        }
      } else {
        let symbol = checker.getSymbolAtLocation(node);
        if (symbol) {
          if (symbol.flags & ts.SymbolFlags.Alias) {
            try {
              symbol = checker.getAliasedSymbol(symbol);
            } catch {
              // ignore
            }
          }

          const decls = symbol.getDeclarations() || [];
          for (const decl of decls) {
            const tags = ts.getJSDocTags(decl);
            const found = tags.find((t) => t.tagName.text === "deprecated");
            if (found) {
              depTag = {
                name: "deprecated",
                text: found.comment
                  ? [
                      {
                        text:
                          typeof found.comment === "string"
                            ? found.comment
                            : ts.getTextOfJSDocComment(found.comment),
                      },
                    ]
                  : [],
              };
              symbolName = symbol.getName();
              break;
            }
          }
        }
      }

      if (depTag && symbolName) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(
          node.getStart()
        );
        const relPath = path.relative(rootDir, sourceFile.fileName);
        const key = `${relPath}:${line}:${symbolName}`;

        if (!seen.has(key)) {
          seen.add(key);
          const reason = depTag.text?.map((t) => t.text).join("") || "";
          deprecations.push({
            file: relPath,
            line: line + 1,
            col: character + 1,
            symbol: symbolName,
            reason,
          });
        }
      }
    }

    function visit(node) {
      if (
        ts.isIdentifier(node) ||
        ts.isPropertyAccessExpression(node) ||
        ts.isCallExpression(node)
      ) {
        checkNode(node);
      }
      ts.forEachChild(node, visit);
    }

    visit(sourceFile);
  }
}

if (deprecations.length > 0) {
  console.warn(`\n⚠️  Found ${deprecations.length} deprecated usage(s):`);
  for (const dep of deprecations) {
    const reasonText = dep.reason ? ` - ${dep.reason}` : "";
    console.warn(`  ${dep.file}:${dep.line}:${dep.col} -> '${dep.symbol}'${reasonText}`);
  }
  console.warn("");
} else {
  console.log("✓ Zero deprecated usages found across codebase.");
}
