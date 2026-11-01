"use client";

import {
  forwardRef,
  useState,
  useCallback,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { Button } from "../button/Button";
import { useToggleGroupContext } from "./ToggleGroupContext";
import { ToggleGroup } from "./ToggleGroup";
import { ToggleItem } from "./ToggleItem";
import type { ToggleProps } from "./types";

const toggleVariants = cva(
  "transition-colors duration-[var(--motion-duration-fast)]",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "",
        plain: "",
      },
      color: {
        primary: "",
        subtle: "",
        surface: "",
        destructive: "",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "primary",
        className:
          "data-[state=off]:bg-surface data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground hover:data-[state=on]:bg-primary-hover",
      },
      {
        variant: "contained",
        color: "subtle",
        className:
          "data-[state=off]:bg-surface data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-subtle data-[state=on]:text-subtle-foreground hover:data-[state=on]:bg-subtle-hover",
      },
      {
        variant: "contained",
        color: "surface",
        className:
          "data-[state=off]:bg-surface data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-surface-active data-[state=on]:text-foreground hover:data-[state=on]:bg-surface-active",
      },
      {
        variant: "contained",
        color: "destructive",
        className:
          "data-[state=off]:bg-surface data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground hover:data-[state=on]:bg-destructive-hover",
      },
      {
        variant: "outlined",
        color: "primary",
        className:
          "data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-subtle data-[state=on]:text-primary data-[state=on]:border-primary-border",
      },
      {
        variant: "outlined",
        color: "subtle",
        className:
          "data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-subtle data-[state=on]:text-subtle-foreground data-[state=on]:border-subtle-border",
      },
      {
        variant: "outlined",
        color: "surface",
        className:
          "data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-surface-active data-[state=on]:text-foreground data-[state=on]:border-border",
      },
      {
        variant: "outlined",
        color: "destructive",
        className:
          "data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-destructive/15 data-[state=on]:text-destructive data-[state=on]:border-destructive-border",
      },
      {
        variant: "plain",
        color: "primary",
        className:
          "data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-subtle data-[state=on]:text-primary",
      },
      {
        variant: "plain",
        color: "subtle",
        className:
          "data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-subtle data-[state=on]:text-subtle-foreground",
      },
      {
        variant: "plain",
        color: "surface",
        className:
          "data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-surface-active data-[state=on]:text-foreground",
      },
      {
        variant: "plain",
        color: "destructive",
        className:
          "data-[state=off]:text-muted hover:data-[state=off]:text-foreground data-[state=on]:bg-destructive/15 data-[state=on]:text-destructive",
      },
    ],
    defaultVariants: {
      variant: "plain",
      color: "surface",
    },
  }
);

interface ToggleComponent
  extends React.ForwardRefExoticComponent<
    ToggleProps & React.RefAttributes<HTMLButtonElement>
  > {
  Group: typeof ToggleGroup;
  Item: typeof ToggleItem;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  {
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange,
    variant = "plain",
    color = "surface",
    size = "md",
    radius = "full",
    layout = "inline",
    disabled = false,
    value,
    className,
    onClick,
    onKeyDown,
    children,
    ...props
  },
  ref
) {
  const group = useToggleGroupContext();
  const isGrouped = group !== null;

  const isControlled = pressedProp !== undefined;
  const [uncontrolledPressed, setUncontrolledPressed] = useState<boolean>(() =>
    Boolean(defaultPressed)
  );

  const isPressed = cond(
    Boolean(isGrouped && group && value !== undefined),
    Boolean(group?.value.includes(value ?? "")),
    cond(isControlled, Boolean(pressedProp), uncontrolledPressed)
  );

  const effectiveVariant = group?.variant ?? variant;
  const effectiveColor = group?.color ?? color;
  const effectiveSize = group?.size ?? size;
  const effectiveRadius = group?.radius ?? radius;
  const effectiveDisabled = group?.disabled || disabled;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (effectiveDisabled) return;

      if (isGrouped && value !== undefined) {
        group.onItemToggle(value);
      } else {
        const nextPressed = !isPressed;
        if (!isControlled) {
          setUncontrolledPressed(nextPressed);
        }
        onPressedChange?.(nextPressed);
      }

      onClick?.(event);
    },
    [
      effectiveDisabled,
      isGrouped,
      value,
      group,
      isPressed,
      isControlled,
      onPressedChange,
      onClick,
    ]
  );

  const handleKey = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (isGrouped && group.handleKeyDown) {
        group.handleKeyDown(event);
      }
      onKeyDown?.(event);
    },
    [isGrouped, group, onKeyDown]
  );

  const stateStr = cond(isPressed, "on", "off");
  const isSingleGroup = isGrouped && group.type === "single";

  const buttonVariant = cond(
    effectiveVariant === "contained" && !isPressed,
    "plain",
    effectiveVariant
  );

  return (
    <Button
      ref={ref}
      variant={buttonVariant}
      color={effectiveColor}
      size={effectiveSize}
      radius={effectiveRadius}
      layout={layout}
      disabled={effectiveDisabled}
      role={cond(isSingleGroup, "radio", undefined)}
      aria-checked={cond(isSingleGroup, isPressed, undefined)}
      aria-pressed={cond(!isSingleGroup, isPressed, undefined)}
      data-slot="toggle"
      data-state={stateStr}
      data-variant={effectiveVariant}
      data-color={effectiveColor}
      className={cn(
        toggleVariants({ variant: effectiveVariant, color: effectiveColor }),
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKey}
      {...props}
    >
      {children}
    </Button>
  );
}) as ToggleComponent;

Toggle.displayName = "Toggle";
Toggle.Group = ToggleGroup;
Toggle.Item = ToggleItem;
