"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@homonoid/react/cn";
import { all, any, cond, when } from "@homonoid/react";

export interface CodeProps {
  code: string;
  className?: string;
  animated?: boolean;
  lineNumbers?: boolean;
}

const REGEX = /(\/\/.*)|("[^"]*"|'[^']*'|`[^`]*`)|(<\/?[A-Za-z0-9_.]+|\/?>)|(\b[a-zA-Z_][a-zA-Z0-9_-]*(?=\s*=))|(\b(?:import|export|from|function|return|const|let|var|default|type|interface|switch|case|break|if|else)\b|\bas(?=\s+const\b))/g;

/**
 * Tokenizes TSX / JavaScript code into styled React spans using Homonoid tokens.
 */
export function highlighter(code: string): React.ReactNode[] {
  if (!code) return [];
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  REGEX.lastIndex = 0;

  while ((match = REGEX.exec(code)) !== null) {
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
        <span
          key={match.index}
          className={cond(
            any(keyword === "function", keyword === "const"),
            "text-primary font-medium",
            "text-destructive font-medium"
          )}
        >
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

export function Code({
  code,
  className,
  animated = false,
  lineNumbers = true,
}: CodeProps) {
  const shouldReduceMotion = useReducedMotion();
  const lines = useMemo(() => code.split("\n"), [code]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [code]);

  const isAnimated = all(animated, !shouldReduceMotion);
  const Line = cond(isAnimated, motion.span, "span");

  return (
    <div
      ref={scrollRef}
      className={cn(
        "w-full h-full overflow-auto text-xs font-mono leading-relaxed select-text",
        className
      )}
    >
      <pre className="py-surface-sm pr-surface-sm pl-0 text-foreground w-fit min-w-full">
        <code className="block w-fit min-w-full">
          {lines.map((line, index) => (
            <Line
              key={index}
              className="flex min-h-[1.5em] w-fit min-w-full pr-surface-sm"
              {...(isAnimated
                ? {
                  initial: { opacity: 0, y: 4 },
                  animate: { opacity: 1, y: 0 },
                  transition: {
                    duration: 0.20,
                    delay: Math.min(index * 0.015, 0.35),
                    ease: [0.15, 1, 0.35, 1],
                  },
                }
                : {})}
            >
              {when(
                lineNumbers,
                <span className="sticky left-0 z-10 inline-block w-10 text-center select-none text-muted/40 bg-background tabular-nums shrink-0 font-mono">
                  {index + 1}
                </span>
              )}
              <span className="flex-1 min-w-0 pl-1">
                {cond(line.length > 0, highlighter(line), "\u00A0")}
              </span>
            </Line>
          ))}
        </code>
      </pre>
    </div>
  );
}
