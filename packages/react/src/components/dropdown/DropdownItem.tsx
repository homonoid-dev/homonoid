"use client";

import { forwardRef, type MouseEvent } from "react";
import { Tile } from "../tile/Tile";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import type { DropdownItemProps } from "./types";

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  function DropdownItem(
    {
      onSelect,
      onClick,
      disabled = false,
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

    return (
      <Tile
        ref={ref}
        as="div"
        role="menuitem"
        aria-disabled={cond(disabled, true, undefined)}
        variant="plain"
        color={color}
        size={size}
        radius={radius}
        disabled={disabled}
        interactive={!disabled}
        leading={leading}
        label={labelContent}
        description={description}
        trailing={trailing}
        className={cn("w-full select-none", className)}
        {...itemProps}
        {...props}
      >
        {tileChildren}
      </Tile>
    );
  }
);

DropdownItem.displayName = "Dropdown.Item";
