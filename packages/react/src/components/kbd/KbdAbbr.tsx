"use client";

import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { KbdAbbrProps } from "./types";

export const KEY_SYMBOLS: Record<string, { symbol: string; title: string }> = {
  command: { symbol: "⌘", title: "Command" },
  cmd: { symbol: "⌘", title: "Command" },
  shift: { symbol: "⇧", title: "Shift" },
  ctrl: { symbol: "⌃", title: "Control" },
  control: { symbol: "⌃", title: "Control" },
  option: { symbol: "⌥", title: "Option" },
  alt: { symbol: "⌥", title: "Option" },
  enter: { symbol: "↵", title: "Enter" },
  return: { symbol: "↵", title: "Return" },
  delete: { symbol: "⌫", title: "Delete" },
  backspace: { symbol: "⌫", title: "Backspace" },
  escape: { symbol: "⎋", title: "Escape" },
  esc: { symbol: "⎋", title: "Escape" },
  tab: { symbol: "⇥", title: "Tab" },
  capslock: { symbol: "⇪", title: "Caps Lock" },
  up: { symbol: "↑", title: "Up Arrow" },
  arrowup: { symbol: "↑", title: "Up Arrow" },
  down: { symbol: "↓", title: "Down Arrow" },
  arrowdown: { symbol: "↓", title: "Down Arrow" },
  left: { symbol: "←", title: "Left Arrow" },
  arrowleft: { symbol: "←", title: "Left Arrow" },
  right: { symbol: "→", title: "Right Arrow" },
  arrowright: { symbol: "→", title: "Right Arrow" },
  space: { symbol: "␣", title: "Space" },
};

export const KbdAbbr = forwardRef<HTMLElement, KbdAbbrProps>(
  function KbdAbbr(
    {
      keyValue,
      className,
      children,
      title,
      ...props
    },
    ref
  ) {
    const keyInfo = keyValue ? KEY_SYMBOLS[keyValue.toLowerCase()] : undefined;
    const resolvedTitle = cond(
      Boolean(title),
      title,
      cond(Boolean(keyInfo?.title), keyInfo?.title, keyValue)
    );
    const resolvedSymbol = cond(
      Boolean(children),
      children,
      cond(Boolean(keyInfo?.symbol), keyInfo?.symbol, keyValue)
    );

    return (
      <abbr
        ref={ref}
        title={resolvedTitle}
        className={cn("no-underline select-none font-mono text-[1.20em]", className)}
        {...props}
      >
        {resolvedSymbol}
      </abbr>
    );
  }
);

KbdAbbr.displayName = "Kbd.Abbr";
