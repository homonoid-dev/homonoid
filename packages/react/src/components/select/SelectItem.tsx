"use client";

import { forwardRef, useEffect, type MouseEvent } from "react";
import { Tile } from "../tile/Tile";
import { useSelectContext } from "./SelectContext";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import type { SelectItemProps } from "./types";

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem(
    {
      value,
      disabled = false,
      leading,
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
        radius={radius}
        disabled={disabled}
        interactive={!disabled}
        selected={isSelected}
        leading={leading}
        label={labelContent}
        description={description}
        trailing={when(
          isSelected,
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="size-4 shrink-0 text-primary"
          >
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        className={cn(
          "cursor-pointer select-none",
          cond(isSelected, "bg-surface-hover font-medium", ""),
          cond(disabled, "opacity-40 text-muted pointer-events-none cursor-not-allowed", ""),
          className
        )}
        {...itemProps}
        {...props}
      >
        {tileChildren}
      </Tile>
    );
  }
);

SelectItem.displayName = "Select.Item";
