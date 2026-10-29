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
        lg: "min-h-control-lg px-4 py-3.5 gap-3.5 text-sm"
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
        className: "text-foreground hover:bg-surface-hover active:bg-surface-active focus:bg-surface-hover aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover"
      },
      {
        variant: "plain",
        color: "subtle",
        interactive: true,
        className: "text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active focus:bg-subtle-hover aria-expanded:bg-subtle-hover data-[state=open]:bg-subtle-hover"
      },
      {
        variant: "plain",
        color: "primary",
        interactive: true,
        className: "text-primary hover:bg-subtle active:bg-subtle-active focus:bg-subtle aria-expanded:bg-subtle data-[state=open]:bg-subtle"
      },
      {
        variant: "plain",
        color: "destructive",
        interactive: true,
        className: "text-destructive hover:bg-destructive-hover/5 active:bg-destructive-active/20 focus:bg-destructive-hover/5 aria-expanded:bg-destructive-hover/5 data-[state=open]:bg-destructive-hover/5"
      },

      // Contained Variants (Solid fills matching Button)
      {
        variant: "contained",
        color: "surface",
        className: "bg-surface text-foreground hover:bg-surface-hover active:bg-surface-active focus:bg-surface-hover aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover"
      },
      {
        variant: "contained",
        color: "subtle",
        className: "bg-subtle text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active focus:bg-subtle-hover aria-expanded:bg-subtle-hover data-[state=open]:bg-subtle-hover"
      },
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active focus:bg-primary-hover aria-expanded:bg-primary-hover data-[state=open]:bg-primary-hover"
      },
      {
        variant: "contained",
        color: "destructive",
        className: "bg-destructive text-destructive-foreground hover:bg-destructive-hover active:bg-destructive-active focus:bg-destructive-hover aria-expanded:bg-destructive-hover data-[state=open]:bg-destructive-hover"
      },

      // Outlined Variants (Transparent + Border matching Button)
      {
        variant: "outlined",
        color: "surface",
        className: "border-border text-foreground hover:bg-surface-hover active:bg-surface-active focus:bg-surface-hover aria-expanded:bg-surface-hover data-[state=open]:bg-surface-hover"
      },
      {
        variant: "outlined",
        color: "subtle",
        className: "border-subtle-border text-subtle-foreground hover:bg-subtle-hover active:bg-subtle-active focus:bg-subtle-hover aria-expanded:bg-subtle-hover data-[state=open]:bg-subtle-hover"
      },
      {
        variant: "outlined",
        color: "primary",
        className: "border-primary-border text-primary hover:bg-subtle active:bg-subtle-active focus:bg-subtle aria-expanded:bg-subtle data-[state=open]:bg-subtle"
      },
      {
        variant: "outlined",
        color: "destructive",
        className: "border-destructive-border text-destructive hover:bg-destructive-hover/5 active:bg-destructive-active/20 focus:bg-destructive-hover/5 aria-expanded:bg-destructive-hover/5 data-[state=open]:bg-destructive-hover/5"
      },

      // Selected states
      {
        selected: true,
        color: "surface",
        className: "bg-surface-hover font-medium"
      },
      {
        selected: true,
        color: "subtle",
        className: "bg-subtle-hover font-medium"
      },
      {
        selected: true,
        color: "primary",
        className: "bg-subtle-active font-medium"
      },
      {
        selected: true,
        color: "destructive",
        className: "bg-destructive-hover/10 font-medium"
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
  const isLabel = Component === "label";

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (any(disabled, event.defaultPrevented, isNativeButton, isLabel)) return;
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
      any(isNativeButton, isLabel),
      cond(
        isNativeButton,
        {
          type: "button" as const,
          disabled,
          "aria-disabled": cond(disabled, true, undefined),
          "aria-selected": cond(selected, true, undefined)
        },
        {
          "aria-disabled": cond(disabled, true, undefined)
        }
      ),
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
              className="line-clamp-2 text-inherit opacity-80 font-normal"
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
