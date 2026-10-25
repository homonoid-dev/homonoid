import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export function detectPackageManager(targetDir: string): PackageManager {
  if (fs.existsSync(path.join(targetDir, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (fs.existsSync(path.join(targetDir, "yarn.lock"))) {
    return "yarn";
  }
  if (
    fs.existsSync(path.join(targetDir, "bun.lockb")) ||
    fs.existsSync(path.join(targetDir, "bun.lock"))
  ) {
    return "bun";
  }
  return "npm";
}

export function installPackages(
  targetDir: string,
  packages: string[],
  pm: PackageManager
): void {
  const packageList = packages.join(" ");
  let command = `npm install ${packageList}`;

  if (pm === "pnpm") {
    command = `pnpm add ${packageList}`;
  } else if (pm === "yarn") {
    command = `yarn add ${packageList}`;
  } else if (pm === "bun") {
    command = `bun add ${packageList}`;
  }

  execSync(command, { cwd: targetDir, stdio: "inherit" });
}
