"use client";

import { forwardRef, type MouseEvent } from "react";
import { Tile } from "../tile/Tile";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "../../utils/cn";
import { cond, match } from "../../utils/condition";
import type { DropdownItemProps, DropdownRadius } from "./types";

const CONCENTRIC_RADIUS_MAP: Record<DropdownRadius, DropdownRadius> = {
  none: "none",
  sm: "sm",
  md: "sm",
  lg: "md",
  full: "lg",
};

const CONCENTRIC_RADIUS_CLASSES: Record<DropdownRadius, string> = {
  none: "rounded-none",
  sm: "rounded-xs",
  md: "rounded-sm",
  lg: "rounded-lg",
  full: "rounded-xl",
};

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

    const concentricRadius = match(radius, CONCENTRIC_RADIUS_MAP, "sm");
    const concentricRadiusClass = match(radius, CONCENTRIC_RADIUS_CLASSES, "rounded-sm");

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
