"use client";

import { forwardRef, useEffect, type MouseEvent } from "react";
import { Tile } from "../tile/Tile";
import { useSelectContext } from "./SelectContext";
import { cond, match } from "../../utils/condition";
import { cn } from "../../utils/cn";
import type { SelectItemProps, SelectRadius } from "./types";

const CONCENTRIC_RADIUS_MAP: Record<SelectRadius, SelectRadius> = {
  none: "none",
  sm: "sm",
  md: "md",
  lg: "lg",
  full: "lg",
};

const CONCENTRIC_RADIUS_CLASSES: Record<SelectRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-2xl",
};

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(
    {
      value,
      disabled = false,
      leading,
      trailing,
      label,
      description,
      children,
      className,
      onClick,
      ...props
    },
    ref
  ) {
    const {
      value: selectedValue,
      setValue,
      setOpen,
      setSelectedLabel,
      size,
      radius,
      getItemProps,
      registerItem,
    } = useSelectContext();

    const isSelected = selectedValue === value;
    const labelContent = label || cond(typeof children === "string", children, undefined);
    const tileChildren = cond(typeof children === "string", null, children);
    const itemLabel = labelContent || children || value;

    useEffect(() => {
      if (registerItem) {
        return registerItem(value, itemLabel);
      }
    }, [registerItem, value, itemLabel]);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
      if (disabled) return;
      onClick?.(event as unknown as MouseEvent<HTMLDivElement>);
      setValue(value);
      setSelectedLabel(itemLabel);
      setOpen(false);
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
        role="option"
        aria-selected={isSelected}
        aria-disabled={cond(disabled, true, undefined)}
        variant="plain"
        color="surface"
        size={size}
        radius={concentricRadius}
        disabled={disabled}
        interactive={!disabled}
        selected={isSelected}
        leading={leading}
        label={labelContent}
        description={description}
        trailing={trailing}
        className={cn(concentricRadiusClass, className)}
        {...itemProps}
        {...props}
      >
        {tileChildren}
      </Tile>
    );
  }
);

SelectItem.displayName = "Select.Item";
