import { forwardRef, type KeyboardEvent } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import { Label } from "../label/Label";
import { Description } from "../description/Description";
import { TileLeading } from "./TileLeading";
import { TileContent } from "./TileContent";
import { TileTrailing } from "./TileTrailing";
import type { TileProps } from "./types";

export const variants = cva(
  "relative flex w-full items-center text-left select-none subpixel-antialiased overflow-hidden",
  {
    variants: {
      variant: {
        plain: "bg-transparent",
        contained: "",
        outlined: "bg-transparent border-[0.5px]"
      },
      color: {
        surface: "text-foreground",
        subtle: "text-subtle-foreground",
        primary: "text-primary",
        destructive: "text-destructive"
      },
      size: {
        sm: "min-h-control-sm px-3 py-1.5 gap-2.5 text-xs",
        md: "min-h-control-md px-3.5 py-2.5 gap-3 text-sm",
        lg: "min-h-control-lg px-4 py-3.5 gap-3.5 text-base"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full"
      },
      interactive: {
        true: "transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] aria-expanded:scale-[var(--motion-press-scale)] data-[state=open]:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",
        false: ""
      },
      selected: {
        true: "",
        false: ""
      },
      disabled: {
        true: "opacity-40 text-muted pointer-events-none cursor-not-allowed aria-disabled:opacity-40 aria-disabled:text-muted",
        false: ""
      }
    },
    compoundVariants: [
      // Plain Interactive
      {
        variant: "plain",
        color: "surface",
        interactive: true,
        className: "hover:bg-surface-hover active:bg-surface-active aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover"
      },
      {
        variant: "plain",
        color: "subtle",
        interactive: true,
        className: "hover:bg-subtle-hover active:bg-subtle-active"
      },
      {
        variant: "plain",
        color: "primary",
        interactive: true,
        className: "hover:bg-primary/10 active:bg-primary/20"
      },
      {
        variant: "plain",
        color: "destructive",
        interactive: true,
        className: "hover:bg-destructive/10 active:bg-destructive/20"
      },

      // Contained Variants (Aligned with Card's fills)
      {
        variant: "contained",
        color: "surface",
        className: "bg-surface hover:bg-surface-hover active:bg-surface-active"
      },
      {
        variant: "contained",
        color: "subtle",
        className: "bg-primary/10 hover:bg-primary/15 active:bg-primary/20"
      },
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary/25 hover:bg-primary/30 active:bg-primary/35"
      },
      {
        variant: "contained",
        color: "destructive",
        className: "bg-destructive/15 hover:bg-destructive/20 active:bg-destructive/25"
      },

      // Outlined Variants (Aligned with Card's borders)
      {
        variant: "outlined",
        color: "surface",
        className: "border-border hover:bg-surface-hover active:bg-surface-active"
      },
      {
        variant: "outlined",
        color: "subtle",
        className: "border-subtle-border hover:bg-subtle-hover active:bg-subtle-active"
      },
      {
        variant: "outlined",
        color: "primary",
        className: "border-primary-border hover:bg-primary/10 active:bg-primary/20"
      },
      {
        variant: "outlined",
        color: "destructive",
        className: "border-destructive-border hover:bg-destructive-hover/10 active:bg-destructive-active/20"
      },

      // Selected states
      {
        selected: true,
        color: "surface",
        className: "bg-subtle font-medium"
      },
      {
        selected: true,
        color: "subtle",
        className: "bg-primary/15 font-medium"
      },
      {
        selected: true,
        color: "primary",
        className: "bg-primary/30 font-medium"
      },
      {
        selected: true,
        color: "destructive",
        className: "bg-destructive/25 font-medium"
      }
    ],
    defaultVariants: {
      variant: "plain",
      color: "surface",
      size: "md",
      radius: "lg",
      interactive: true,
      selected: false,
      disabled: false
    }
  }
);

export interface TileComponent
  extends React.ForwardRefExoticComponent<
    TileProps & React.RefAttributes<HTMLElement>
  > {
  Leading: typeof TileLeading;
  Content: typeof TileContent;
  Trailing: typeof TileTrailing;
  Label: typeof Label;
  Description: typeof Description;
}

export const Tile = forwardRef<HTMLElement, TileProps>(function Tile(
  {
    as,
    variant = "plain",
    color = "surface",
    size = "md",
    radius = "lg",
    interactive,
    selected = false,
    disabled = false,
    leading,
    label,
    title,
    description,
    trailing,
    className,
    children,
    onClick,
    onKeyDown,
    ...props
  },
  ref
) {
  const isInteractive = cond(
    interactive !== undefined,
    Boolean(interactive),
    any(Boolean(onClick), Boolean((props as { href?: string }).href))
  );

  const defaultTag = cond(isInteractive, "button", "div");
  const Component = as || defaultTag;
  const isNativeButton = Component === "button";

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (any(disabled, event.defaultPrevented, isNativeButton)) return;
    if (any(event.key === "Enter", event.key === " ")) {
      if (event.key === " ") {
        event.preventDefault();
      }
      (event.currentTarget as HTMLElement).click();
    }
  };

  const interactiveAttributes = cond(
    isInteractive,
    cond(
      isNativeButton,
      {
        type: "button" as const,
        disabled,
        "aria-disabled": cond(disabled, true, undefined),
        "aria-selected": cond(selected, true, undefined)
      },
      {
        role: "button",
        tabIndex: cond(disabled, -1, 0),
        "aria-disabled": cond(disabled, true, undefined),
        "aria-selected": cond(selected, true, undefined)
      }
    ),
    {}
  );

  const labelContent = label || title;
  const hasTextContent = any(labelContent, description);

  return (
    <Component
      ref={ref}
      className={cn(
        variants({
          variant,
          color,
          size,
          radius,
          interactive: isInteractive,
          selected,
          disabled
        }),
        className
      )}
      onClick={cond(disabled, undefined, onClick)}
      onKeyDown={handleKeyDown}
      {...interactiveAttributes}
      {...props}
    >
      {when(leading, <TileLeading>{leading}</TileLeading>)}
      {when(
        hasTextContent,
        <TileContent>
          {when(
            labelContent,
            <Label as="span" size={size} className="truncate text-inherit">
              {labelContent}
            </Label>
          )}
          {when(
            description,
            <Description
              as="span"
              size={cond(size === "lg", "md", "sm")}
              className="line-clamp-2 text-inherit opacity-80"
            >
              {description}
            </Description>
          )}
        </TileContent>
      )}
      {when(children, children)}
      {when(trailing, <TileTrailing>{trailing}</TileTrailing>)}
    </Component>
  );
}) as unknown as TileComponent;

Tile.displayName = "Tile";
Tile.Leading = TileLeading;
Tile.Content = TileContent;
Tile.Trailing = TileTrailing;
Tile.Label = Label;
Tile.Description = Description;
