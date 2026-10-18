#!/usr/bin/env node

/**
 * PreToolUse Safety Guard Hook for Harmonia
 * Protects against:
 * 1. Committing, adding, or modifying sensitive .env / secret files.
 * 2. Destructive git actions (force pushing, hard resetting main).
 * 3. Hazardous global package mutations (sudo, npm -g).
 */

const fs = require("fs");

function readStdin() {
  try {
    return fs.readFileSync(0, "utf-8");
  } catch {
    return "";
  }
}

function main() {
  const inputRaw = readStdin();
  if (!inputRaw.trim()) {
    console.log(JSON.stringify({ decision: "allow" }));
    return;
  }

  let payload;
  try {
    payload = JSON.parse(inputRaw);
  } catch {
    console.log(JSON.stringify({ decision: "allow" }));
    return;
  }

  const toolCall = payload.toolCall || {};
  const toolName = toolCall.name || "";
  const args = toolCall.args || {};

  // 1. Guard against writing secret / .env files
  if (toolName === "write_to_file" || toolName === "replace_file_content" || toolName === "multi_replace_file_content") {
    const targetFile = args.TargetFile || "";
    if (/\.env($|\.|\/)/i.test(targetFile) || /(id_rsa|id_ed25519|\.pem|\.key)$/i.test(targetFile)) {
      console.log(JSON.stringify({
        decision: "deny",
        reason: "Security Guard: Modifying or creating environment files or credentials is strictly prohibited."
      }));
      return;
    }
  }

  // 2. Guard against dangerous CLI commands
  if (toolName === "run_command") {
    const cmd = (args.CommandLine || "").trim();

    // Block staging .env files
    if (/\bgit\s+(add|commit)\b.*\.env/i.test(cmd)) {
      console.log(JSON.stringify({
        decision: "deny",
        reason: "Security Guard: Adding or committing environment files is blocked."
      }));
      return;
    }

    // Block force pushes
    if (/\bgit\s+push\b.*(--force|-f|\+)/i.test(cmd)) {
      console.log(JSON.stringify({
        decision: "deny",
        reason: "Safety Guard: Force pushing to remote repositories is prohibited."
      }));
      return;
    }

    // Require confirmation for destructive hard resets
    if (/\bgit\s+reset\s+--hard\b/i.test(cmd)) {
      console.log(JSON.stringify({
        decision: "force_ask",
        reason: "Safety Guard: Hard git resets destroy working tree changes."
      }));
      return;
    }

    // Block global package installs or sudo
    if (/^\s*sudo\b/i.test(cmd) || /\bnpm\s+install\s+(-g|--global)\b/i.test(cmd)) {
      console.log(JSON.stringify({
        decision: "deny",
        reason: "Safety Guard: Global installations and sudo commands are restricted."
      }));
      return;
    }
  }

  console.log(JSON.stringify({ decision: "allow" }));
}

main();
