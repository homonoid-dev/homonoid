"use client";

import { forwardRef, type MouseEvent } from "react";
import { Tile } from "../tile/Tile";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "../../utils/cn";
import { cond, match } from "../../utils/condition";
import type { DropdownItemProps } from "./types";

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  function DropdownItem(
    {
      onSelect,
      onClick,
      disabled = false,
      selected = false,
      color = "surface",
      closeOnSelect = true,
      leading,
      trailing,
      label,
      description,
      children,
      className,
      ...props
    },
    ref
  ) {
    const { setOpen, size, radius, getItemProps } = useDropdownContext();

    const labelContent = label || cond(typeof children === "string", children, undefined);
    const tileChildren = cond(typeof children === "string", null, children);

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(event);
      onSelect?.(event.nativeEvent);
      if (closeOnSelect) {
        setOpen(false);
      }
    };

    const itemProps = getItemProps({
      onClick: handleClick,
    });

    const concentricRadius = match(
      radius,
      {
        none: "none" as const,
        sm: "sm" as const,
        md: "md" as const,
        lg: "lg" as const,
        full: "xl" as const,
      },
      "sm" as const
    );

    const concentricRadiusClass = match(
      radius,
      {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-concentric-full",
      },
      "rounded-sm"
    );

    return (
      <Tile
        ref={ref}
        as="div"
        role="menuitem"
        aria-disabled={cond(disabled, true, undefined)}
        variant="plain"
        color={color}
        size={size}
        radius={concentricRadius}
        selected={selected}
        disabled={disabled}
        interactive={!disabled}
        leading={leading}
        label={labelContent}
        description={description}
        trailing={trailing}
        className={cn("w-full select-none", concentricRadiusClass, className)}
        {...itemProps}
        {...props}
      >
        {tileChildren}
      </Tile>
    );
  }
);

DropdownItem.displayName = "Dropdown.Item";
