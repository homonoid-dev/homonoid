"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { KbdAbbr, KEY_SYMBOLS } from "./KbdAbbr";
import { KbdContent } from "./KbdContent";
import type { KbdProps } from "./types";

const PALETTES = {
  surface: {
    contained: "bg-surface text-muted border border-border",
    outlined: "bg-transparent text-muted border border-border",
    plain: "bg-transparent text-muted border border-transparent",
  },
  subtle: {
    contained: "bg-subtle text-subtle-foreground border border-subtle-border",
    outlined: "bg-transparent text-subtle-foreground border border-subtle-border",
    plain: "bg-transparent text-subtle-foreground border border-transparent",
  },
  primary: {
    contained: "bg-primary text-primary-foreground border border-primary-border",
    outlined: "bg-transparent text-primary border border-primary-border",
    plain: "bg-transparent text-primary border border-transparent",
  },
  destructive: {
    contained: "bg-destructive text-destructive-foreground border border-destructive-border",
    outlined: "bg-transparent text-destructive border border-destructive-border",
    plain: "bg-transparent text-destructive border border-transparent",
  },
} as const;

type Palette = keyof typeof PALETTES;

const compounds = (Object.keys(PALETTES) as Palette[]).flatMap((color) => [
  { variant: "contained" as const, color, className: PALETTES[color].contained },
  { variant: "outlined" as const, color, className: PALETTES[color].outlined },
  { variant: "plain" as const, color, className: PALETTES[color].plain },
]);

export const variants = cva(
  "inline-flex items-center justify-center leading-none select-none transition-colors",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "",
        plain: "",
      },
      color: {
        surface: "",
        subtle: "",
        primary: "",
        destructive: "",
      },
      size: {
        sm: "text-xs px-1.5 min-w-4 h-4.5 gap-0.5",
        md: "text-sm px-1.5 min-w-5.5 h-5.5 gap-1",
        lg: "text-base px-2 min-w-7 h-7.5 gap-1.5",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-xl",
        lg: "rounded-xl",
        full: "rounded-full px-2",
      },
    },
    compoundVariants: compounds,
    defaultVariants: {
      variant: "contained",
      color: "surface",
      size: "md",
      radius: "sm",
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
      variant = "contained",
      color = "surface",
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
    const keyTitles = keyList.map((k) => KEY_SYMBOLS[k.toLowerCase()]?.title || k);
    const accessibleLabel = props["aria-label"] || cond(
      Boolean(keyTitles.length || content),
      [...keyTitles, content].filter(Boolean).join(" "),
      undefined
    );

    return (
      <kbd
        ref={ref}
        role={cond(Boolean(accessibleLabel), "text", undefined)}
        aria-label={accessibleLabel}
        className={cn(variants({ variant, color, size, radius }), className)}
        {...props}
      >
        <span
          aria-hidden={cond(Boolean(accessibleLabel), true, undefined)}
          className="inline-flex items-center justify-center gap-inherit"
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
        </span>
      </kbd>
    );
  }
) as KbdComponent;

Kbd.displayName = "Kbd";
Kbd.Abbr = KbdAbbr;
Kbd.Content = KbdContent;
