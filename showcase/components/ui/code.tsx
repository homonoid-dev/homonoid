"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@homonoid/react/cn";
import { any, cond, when } from "@homonoid/react";

export interface CodeProps {
  code: string;
  className?: string;
  animated?: boolean;
}

// Regex matching TSX syntax tokens in priority order
const TOKEN_PATTERN = new RegExp(
  [
    `(?<comment>//.*|/\\*[\\s\\S]*?\\*/)`,
    `(?<string>"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|'[^'\\\\]*(?:\\\\.[^'\\\\]*)*'|\`[^\`\\\\]*(?:\\\\.[^\`\\\\]*)*\`)`,
    `(?<tag><\\/?[A-Za-z0-9_.]+)`,
    `(?<prop>\\b[a-zA-Z_][a-zA-Z0-9_-]*(?=\\s*=))`,
    `(?<keyword>\\b(?:import|export|from|function|return|const|let|var|default|type|interface|as|switch|case|break|if|else)\\b)`,
  ].join("|"),
  "g"
);

/**
 * Tokenizes TSX / JavaScript code into styled React spans using Homonoid tokens.
 */
export function highlighter(code: string): React.ReactNode[] {
  if (!code) return [];
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_PATTERN.lastIndex = 0;

  while ((match = TOKEN_PATTERN.exec(code)) !== null) {
    const matchedText = match[0];
    const matchIndex = match.index;

    // Plain text before match
    if (matchIndex > lastIndex) {
      nodes.push(code.slice(lastIndex, matchIndex));
    }

    const groups = match.groups || {};

    if (groups.comment) {
      nodes.push(
        <span key={matchIndex} className="text-muted/60 italic">
          {matchedText}
        </span>
      );
    } else if (groups.string) {
      nodes.push(
        <span key={matchIndex} className="text-muted">
          {matchedText}
        </span>
      );
    } else if (groups.tag) {
      const prefix = cond(matchedText.startsWith("</"), "</", "<");
      const tagName = matchedText.slice(prefix.length);
      nodes.push(
        <React.Fragment key={matchIndex}>
          {prefix}
          <span className="text-primary font-semibold">{tagName}</span>
        </React.Fragment>
      );
    } else if (groups.prop) {
      nodes.push(
        <span key={matchIndex} className="text-muted">
          {matchedText}
        </span>
      );
    } else if (groups.keyword) {
      nodes.push(
        <span key={matchIndex} className="text-primary">
          {matchedText}
        </span>
      );
    } else {
      nodes.push(matchedText);
    }

    lastIndex = matchIndex + matchedText.length;
  }

  // Trailing plain text
  when(lastIndex < code.length, () => {
    nodes.push(code.slice(lastIndex));
  });

  return nodes;
}

export function Code({ code, className, animated = false }: CodeProps) {
  const shouldReduceMotion = useReducedMotion();
  const lines = useMemo(() => code.split("\n"), [code]);

  if (any(!animated, shouldReduceMotion)) {
    return (
      <div
        className={cn(
          "overflow-x-auto text-xs font-mono leading-relaxed select-text",
          className
        )}
      >
        <pre className="text-foreground">
          <code>
            {lines.map((line, index) => (
              <span key={index} className="block min-h-[1.5em]">
                {cond(line.length > 0, highlighter(line), "\u00A0")}
              </span>
            ))}
          </code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-x-auto text-xs font-mono leading-relaxed select-text",
        className
      )}
    >
      <pre className="text-foreground">
        <code>
          {lines.map((line, index) => (
            <motion.span
              key={index}
              className="block min-h-[1.5em]"
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: 0.20,
                delay: Math.min(index * 0.020, 0.40),
                ease: [0.15, 1, 0.35, 1],
              }}
            >
              {cond(line.length > 0, highlighter(line), "\u00A0")}
            </motion.span>
          ))}
        </code>
      </pre>
    </div>
  );
}
