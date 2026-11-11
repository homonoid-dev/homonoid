"use client";

import {
  forwardRef,
  useId,
  useRef,
  useEffect,
  useMemo,
  type MouseEvent,
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { Tile } from "../tile/Tile";
import { all, any, cond, match } from "../../utils/condition";
import { cn } from "../../utils/cn";
import { useAutocompleteContext } from "./AutocompleteContext";
import type { AutocompleteItemProps } from "./types";

export const AutocompleteItem = forwardRef<HTMLDivElement, AutocompleteItemProps>(
  function AutocompleteItem(
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
      radius: propRadius,
      ...props
    },
    ref
  ) {
    const {
      query,
      value: selectedValue,
      onSelectOption,
      size,
      radius: contextRadius,
      color,
      disabled: rootDisabled,
      registerItem,
      highlightedIndex,
      setHighlightedIndex,
      registeredItems,
      customFilter,
    } = useAutocompleteContext();

    const localRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs([localRef, ref]);
    const generatedId = useId();
    const itemId = `autocomplete-item-${generatedId}`;

    const labelContent = cond(
      Boolean(label),
      label,
      cond(typeof children === "string", children, undefined)
    );
    const tileChildren = cond(typeof children === "string", null, children);
    const itemLabel: string = cond(
      Boolean(label),
      label ?? "",
      cond(typeof children === "string", children as string, value)
    );

    const isMatch = useMemo(() => {
      if (!query.trim()) return true;
      if (customFilter) {
        return customFilter({ value, label: itemLabel, description }, query);
      }
      const q = query.toLowerCase();
      const text = itemLabel.toLowerCase();
      const desc = (description || "").toLowerCase();
      return any(text.includes(q), desc.includes(q));
    }, [query, customFilter, value, itemLabel, description]);

    useEffect(() => {
      if (!isMatch) return;
      const unregister = registerItem({
        id: itemId,
        value,
        label: itemLabel,
        description,
        disabled: Boolean(disabled || rootDisabled),
      });
      return unregister;
    }, [isMatch, itemId, value, itemLabel, description, disabled, rootDisabled, registerItem]);

    const isSelected = any(
      all(Boolean(selectedValue), selectedValue === value),
      all(Boolean(query.trim()), query.trim().toLowerCase() === itemLabel.toLowerCase())
    );
    const currentIndex = registeredItems.findIndex((item) => item.id === itemId);
    const isHighlighted = highlightedIndex !== null && currentIndex === highlightedIndex;

    useEffect(() => {
      if (isHighlighted && localRef.current) {
        localRef.current.scrollIntoView({ block: "nearest" });
      }
    }, [isHighlighted]);

    if (!isMatch) {
      return null;
    }

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
      if (disabled || rootDisabled) return;
      onClick?.(e);
      onSelectOption(value, {
        value,
        label: itemLabel,
        description,
        leading,
        trailing,
      });
    };

    const handleMouseEnter = () => {
      if (disabled || rootDisabled) return;
      if (currentIndex !== -1) {
        setHighlightedIndex(currentIndex);
      }
    };

    const concentricRadius = match(
      contextRadius,
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
      contextRadius,
      {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-concentric-full",
      },
      "rounded-sm"
    );
    const effectiveRadius = propRadius ?? concentricRadius;
    const effectiveRadiusClass = cond(Boolean(propRadius), undefined, concentricRadiusClass);

    return (
      <Tile
        ref={mergedRef}
        id={itemId}
        as="div"
        role="option"
        aria-selected={isSelected}
        aria-disabled={cond(disabled || rootDisabled, true, undefined)}
        data-highlighted={cond(isHighlighted, "", undefined)}
        data-selected={cond(isSelected, "true", undefined)}
        variant="plain"
        color={color}
        size={size}
        radius={effectiveRadius}
        disabled={disabled || rootDisabled}
        interactive={!disabled && !rootDisabled}
        selected={isSelected}
        leading={leading}
        label={labelContent}
        description={description}
        trailing={trailing}
        className={cn(
          "shrink-0 cursor-pointer select-none",
          effectiveRadiusClass,
          cond(isSelected, "bg-surface-hover font-medium", cond(isHighlighted, "bg-surface-hover/50", "")),
          className
        )}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {tileChildren}
      </Tile>
    );
  }
);

AutocompleteItem.displayName = "Autocomplete.Item";
