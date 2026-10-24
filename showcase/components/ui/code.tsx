"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@homonoid/react/cn";
import { any, cond } from "@homonoid/react";

export interface CodeProps {
  code: string;
  className?: string;
  animated?: boolean;
}

const TOKEN_REGEX = /(\/\/.*)|("[^"]*"|'[^']*'|`[^`]*`)|(<\/?[A-Za-z0-9_.]+|\/?>)|(\b[a-zA-Z_][a-zA-Z0-9_-]*(?=\s*=))|(\b(?:import|export|from|function|return|const|let|var|default|type|interface|switch|case|break|if|else)\b|\bas(?=\s+const\b))/g;

/**
 * Tokenizes TSX / JavaScript code into styled React spans using Homonoid tokens.
 */
export function highlighter(code: string): React.ReactNode[] {
  if (!code) return [];
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(code.slice(lastIndex, match.index));
    }
    const [, comment, string, tag, prop, keyword] = match;
    if (comment) {
      nodes.push(
        <span key={match.index} className="text-muted/60 italic">
          {comment}
        </span>
      );
    } else if (string) {
      nodes.push(
        <span key={match.index} className="text-muted">
          {string}
        </span>
      );
    } else if (tag) {
      const isClose = tag.startsWith("</");
      const isOpen = tag.startsWith("<");
      const name = cond(isClose, tag.slice(2), cond(isOpen, tag.slice(1), ""));
      nodes.push(
        cond(
          Boolean(name),
          <React.Fragment key={match.index}>
            {cond(isClose, "</", "<")}
            <span className="text-primary font-semibold">{name}</span>
          </React.Fragment>,
          tag
        )
      );
    } else if (prop) {
      nodes.push(
        <span key={match.index} className="text-muted">
          {prop}
        </span>
      );
    } else if (keyword) {
      nodes.push(
        <span key={match.index} className="text-primary">
          {keyword}
        </span>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < code.length) {
    nodes.push(code.slice(lastIndex));
  }
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
                duration: 0.2,
                delay: Math.min(index * 0.02, 0.4),
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
