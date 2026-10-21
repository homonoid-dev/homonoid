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
        surface: "",
        subtle: "",
        primary: "",
        destructive: ""
      },
      size: {
        sm: "min-h-control-md px-3 py-1.5 gap-2.5 text-xs",
        md: "min-h-control-lg px-3.5 py-2.5 gap-3 text-sm",
        lg: "min-h-14 px-4 py-3.5 gap-3.5 text-base"
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      },
      interactive: {
        true: "transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] aria-expanded:scale-[var(--motion-press-scale)] data-[state=open]:scale-[var(--motion-press-scale)] focus-ring cursor-pointer disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",
        false: ""
      },
      selected: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      // Plain Interactive
      {
        variant: "plain",
        color: "surface",
        interactive: true,
        className: "text-foreground hover:bg-subtle active:bg-subtle-active"
      },
      {
        variant: "plain",
        color: "subtle",
        interactive: true,
        className: "text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active"
      },
      {
        variant: "plain",
        color: "primary",
        interactive: true,
        className: "text-primary hover:bg-primary/10 active:bg-primary/20"
      },
      {
        variant: "plain",
        color: "destructive",
        interactive: true,
        className: "text-destructive hover:bg-destructive-hover/10 active:bg-destructive-active/20"
      },

      // Plain Non Interactive
      {
        variant: "plain",
        color: "surface",
        interactive: false,
        className: "text-foreground"
      },
      {
        variant: "plain",
        color: "subtle",
        interactive: false,
        className: "text-subtle-foreground"
      },
      {
        variant: "plain",
        color: "primary",
        interactive: false,
        className: "text-primary"
      },
      {
        variant: "plain",
        color: "destructive",
        interactive: false,
        className: "text-destructive"
      },

      // Contained Variants
      {
        variant: "contained",
        color: "surface",
        className: "bg-surface text-surface-foreground hover:bg-surface-hover active:bg-surface-active"
      },
      {
        variant: "contained",
        color: "subtle",
        className: "bg-subtle text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active"
      },
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active"
      },
      {
        variant: "contained",
        color: "destructive",
        className: "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active"
      },

      // Outlined Variants
      {
        variant: "outlined",
        color: "surface",
        className: "border-border text-surface-foreground hover:bg-surface-hover active:bg-surface-active"
      },
      {
        variant: "outlined",
        color: "subtle",
        className: "border-subtle-border text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active"
      },
      {
        variant: "outlined",
        color: "primary",
        className: "border-primary-border text-primary hover:bg-primary/10 active:bg-primary/20"
      },
      {
        variant: "outlined",
        color: "destructive",
        className: "border-destructive-border text-destructive hover:bg-destructive-hover/10 active:bg-destructive-active/20"
      },

      // Selected states
      {
        selected: true,
        color: "surface",
        className: "bg-subtle text-foreground font-medium"
      },
      {
        selected: true,
        color: "subtle",
        className: "bg-subtle-hover text-foreground font-medium"
      },
      {
        selected: true,
        color: "primary",
        className: "bg-primary/15 text-primary font-medium"
      },
      {
        selected: true,
        color: "destructive",
        className: "bg-destructive/15 text-destructive font-medium"
      }
    ],
    defaultVariants: {
      variant: "plain",
      color: "surface",
      size: "md",
      radius: "lg",
      interactive: true,
      selected: false
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
          selected
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
            <Label as="span" size={size} className="truncate">
              {labelContent}
            </Label>
          )}
          {when(
            description,
            <Description
              as="span"
              size={cond(size === "lg", "md", "sm")}
              className="line-clamp-2"
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
