import React, { useMemo } from "react";
import { cn } from "@harmonia/react/cn";

export interface CodeProps {
  code: string;
  className?: string;
}

// Regex matching TSX syntax tokens in priority order
const TOKEN_PATTERN = new RegExp(
  [
    `(?<comment>//.*|/\\*[\\s\\S]*?\\*/)`,
    `(?<string>"[^"\\\\]*(?:\\\\.[^"\\\\]*)*"|'[^'\\\\]*(?:\\\\.[^'\\\\]*)*'|\`[^\`\\\\]*(?:\\\\.[^\`\\\\]*)*\`)`,
    `(?<tag><\\/?[A-Za-z0-9_.]+)`,
    `(?<prop>\\b[a-zA-Z_][a-zA-Z0-9_-]*(?=\\s*=))`,
    `(?<keyword>\\b(?:import|export|from|function|return|const|let|var|default|type|interface|as|switch|case|break|if|else)\\b)`,
    `(?<component>\\b[A-Z][a-zA-Z0-9_]*\\b)`,
  ].join("|"),
  "g"
);

/**
 * Tokenizes TSX / JavaScript code into styled React spans using Harmonia tokens.
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
      const prefix = matchedText.startsWith("</") ? "</" : "<";
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
    } else if (groups.component) {
      nodes.push(
        <span key={matchIndex} className="text-foreground font-semibold">
          {matchedText}
        </span>
      );
    } else {
      nodes.push(matchedText);
    }

    lastIndex = matchIndex + matchedText.length;
  }

  // Trailing plain text
  if (lastIndex < code.length) {
    nodes.push(code.slice(lastIndex));
  }

  return nodes;
}

export function Code({ code, className }: CodeProps) {
  const highlighted = useMemo(() => highlighter(code), [code]);

  return (
    <div
      className={cn(
        "overflow-x-auto text-xs font-mono leading-relaxed select-text",
        className
      )}
    >
      <pre className="text-foreground">
        <code>{highlighted}</code>
      </pre>
    </div>
  );
}
