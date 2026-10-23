"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { KbdAbbr } from "./KbdAbbr";
import { KbdContent } from "./KbdContent";
import type { KbdProps } from "./types";

export const variants = cva(
  "inline-flex items-center justify-center font-mono font-medium text-muted bg-surface border border-border select-none",
  {
    variants: {
      size: {
        sm: "text-[10px] px-1 min-w-4 h-4.5 gap-0.5",
        md: "text-xs px-1.5 min-w-4.5 h-5 gap-1",
        lg: "text-xs px-1.5 min-w-5 h-5.5 gap-1",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full px-2",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        className: "rounded-sm",
      },
      {
        size: "md",
        className: "rounded-md",
      },
      {
        size: "lg",
        className: "rounded-lg",
      },
    ],
    defaultVariants: {
      size: "md",
    },
  }
);

export interface KbdComponent
  extends React.ForwardRefExoticComponent<
    KbdProps & React.RefAttributes<HTMLElement>
  > {
  Abbr: typeof KbdAbbr;
  Content: typeof KbdContent;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  function Kbd(
    {
      size = "md",
      radius,
      keyValue,
      content,
      className,
      children,
      ...props
    },
    ref
  ) {
    const hasAtomic = Boolean(keyValue || content);
    const keyList = cond(
      Array.isArray(keyValue),
      keyValue as string[],
      cond(Boolean(keyValue), [keyValue as string], [])
    );

    return (
      <kbd
        ref={ref}
        className={cn(variants({ size, radius }), className)}
        {...props}
      >
        {cond(
          hasAtomic,
          <>
            {keyList.map((key, index) => (
              <KbdAbbr key={index} keyValue={key} />
            ))}
            {when(Boolean(content), <KbdContent>{content}</KbdContent>)}
            {children}
          </>,
          children
        )}
      </kbd>
    );
  }
) as KbdComponent;

Kbd.displayName = "Kbd";
Kbd.Abbr = KbdAbbr;
Kbd.Content = KbdContent;

export const Kdb = Kbd;
