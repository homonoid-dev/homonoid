"use client";

import {
  Children,
  forwardRef,
  isValidElement,
  useMemo,
  useState,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, match, when } from "../../utils/condition";
import { AvatarContext, type AvatarContextValue } from "./AvatarContext";
import { AvatarImage } from "./AvatarImage";
import { AvatarFallback } from "./AvatarFallback";
import { AvatarIndicator } from "./AvatarIndicator";
import { AvatarGroup } from "./AvatarGroup";
import type { AvatarProps, ImageLoadingStatus } from "./types";

const PALETTES = {
  primary: {
    solid: "bg-primary text-primary-foreground border-transparent",
    ghost: "text-primary border-primary-border bg-transparent",
    plain: "text-primary border-transparent bg-transparent",
  },
  subtle: {
    solid: "bg-subtle text-subtle-foreground border-transparent",
    ghost: "text-subtle-foreground border-subtle-border bg-transparent",
    plain: "text-subtle-foreground border-transparent bg-transparent",
  },
  surface: {
    solid: "bg-surface text-foreground border-border",
    ghost: "text-foreground border-border bg-transparent",
    plain: "text-foreground border-transparent bg-transparent",
  },
  destructive: {
    solid: "bg-destructive text-destructive-foreground border-transparent",
    ghost: "text-destructive border-destructive-border bg-transparent",
    plain: "text-destructive border-transparent bg-transparent",
  },
} as const;

type PaletteColor = keyof typeof PALETTES;

const compounds = (Object.keys(PALETTES) as PaletteColor[]).flatMap((color) => [
  { variant: "contained" as const, color, className: PALETTES[color].solid },
  { variant: "outlined" as const, color, className: PALETTES[color].ghost },
  { variant: "plain" as const, color, className: PALETTES[color].plain },
]);

export const avatarVariants = cva(
  "relative inline-flex items-center justify-center font-medium select-none shrink-0 ring-2 ring-background",
  {
    variants: {
      variant: {
        contained: "border border-transparent",
        outlined: "border",
        plain: "border-transparent",
      },
      color: {
        primary: "",
        subtle: "",
        surface: "",
        destructive: "",
      },
      size: {
        sm: "size-control-sm text-xs",
        md: "size-control-md text-sm",
        lg: "size-control-lg text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    compoundVariants: compounds,
    defaultVariants: {
      variant: "contained",
      color: "surface",
      size: "md",
      radius: "full",
    },
  }
);

function getInitials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "";
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function DefaultUserIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function isIndicatorElement(node: ReactNode): boolean {
  if (!isValidElement(node)) return false;
  const type = node.type as { displayName?: string; name?: string };
  return (
    type?.displayName === "AvatarIndicator" ||
    type?.name === "AvatarIndicator"
  );
}

export interface AvatarComponent
  extends ForwardRefExoticComponent<AvatarProps & RefAttributes<HTMLElement>> {
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
  Indicator: typeof AvatarIndicator;
  Group: typeof AvatarGroup;
}

export const Avatar = forwardRef<HTMLElement, AvatarProps>(function Avatar(
  {
    as: Component = "span",
    variant = "contained",
    color = "surface",
    size = "md",
    radius = "full",
    src,
    srcSet,
    alt,
    name,
    status,
    statusPlacement = "bottom-right",
    className,
    children,
    ...props
  },
  ref
) {
  const [imageLoadingStatus, setImageLoadingStatus] =
    useState<ImageLoadingStatus>(cond(Boolean(src), "loading", "idle"));

  const contextValue = useMemo<AvatarContextValue>(
    () => ({
      variant,
      color,
      size,
      radius,
      imageLoadingStatus,
      setImageLoadingStatus,
    }),
    [variant, color, size, radius, imageLoadingStatus]
  );

  const radiusClass = match(
    radius,
    {
      none: "rounded-none",
      sm: "rounded-md",
      md: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    },
    "rounded-full"
  );

  const isAtomic = !Boolean(children);
  const initials = getInitials(name);
  const accessibleLabel = alt ?? name ?? "Avatar";

  const childNodes = Children.toArray(children);
  const contentChildren = childNodes.filter((child) => !isIndicatorElement(child));
  const indicatorChildren = childNodes.filter(isIndicatorElement);

  return (
    <AvatarContext.Provider value={contextValue}>
      <Component
        ref={ref}
        role="img"
        aria-label={accessibleLabel}
        data-slot="avatar"
        data-variant={variant}
        data-color={color}
        data-size={size}
        className={cn(
          avatarVariants({ variant, color, size, radius }),
          className
        )}
        {...props}
      >
        <span
          data-slot="avatar-content"
          className={cn(
            "flex size-full items-center justify-center overflow-hidden",
            radiusClass
          )}
        >
          {cond(
            isAtomic,
            <>
              {when(Boolean(src), (
                <AvatarImage src={src} srcSet={srcSet} alt={accessibleLabel} />
              ))}
              <AvatarFallback>
                {cond(
                  Boolean(initials),
                  initials,
                  <DefaultUserIcon className="size-1/2 opacity-70" />
                )}
              </AvatarFallback>
            </>,
            contentChildren
          )}
        </span>

        {cond(
          isAtomic,
          when(Boolean(status), (
            <AvatarIndicator
              status={status}
              placement={statusPlacement}
            />
          )),
          indicatorChildren
        )}
      </Component>
    </AvatarContext.Provider>
  );
}) as AvatarComponent;

Avatar.displayName = "Avatar";
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;
Avatar.Indicator = AvatarIndicator;
Avatar.Group = AvatarGroup;

