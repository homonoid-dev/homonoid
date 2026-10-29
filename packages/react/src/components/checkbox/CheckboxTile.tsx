"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import { Tile } from "../tile/Tile";
import { CheckboxContext, type CheckboxContextValue } from "./CheckboxContext";
import { CheckboxControl } from "./CheckboxControl";
import { CheckboxIndicator } from "./CheckboxIndicator";
import type { CheckboxTileProps } from "./types";

export const CheckboxTile = forwardRef<HTMLDivElement, CheckboxTileProps>(
  function CheckboxTile(
    {
      variant = "plain",
      color = "surface",
      size = "md",
      radius = "lg",
      checked,
      defaultChecked = false,
      indeterminate = false,
      disabled = false,
      invalid = false,
      selected,
      placement = "trailing",
      leading,
      trailing,
      label,
      description,
      onChange,
      onClick,
      onKeyDown,
      className,
      id,
      name,
      value,
      children,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const labelId = `${inputId}-label`;
    const descriptionId = `${inputId}-desc`;
    const innerRef = useRef<HTMLInputElement | null>(null);

    const [internalChecked, setInternalChecked] = useState(Boolean(defaultChecked));
    const isControlled = checked !== undefined;

    const isIndeterminate = any(checked === "indeterminate", Boolean(indeterminate));
    const isChecked = cond(isControlled, checked === true, internalChecked);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

    const toggle = () => {
      if (disabled) return;
      const nextChecked = !isChecked;
      if (!isControlled) {
        setInternalChecked(nextChecked);
      }
      onChange?.(nextChecked);
    };

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(event);
      if (!event.defaultPrevented) {
        toggle();
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (disabled || event.defaultPrevented) return;
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        toggle();
      }
    };

    const currentState = cond(
      isIndeterminate,
      "indeterminate",
      cond(isChecked, "checked", "unchecked")
    );

    const isStringLabel = typeof label === "string";
    const ariaLabel = props["aria-label"] || (isStringLabel ? (label as string) : undefined);

    const inputProps = {
      name,
      value,
      tabIndex: -1,
      "aria-hidden": true as const,
      className: "sr-only pointer-events-none",
    };

    const setRefs = (element: HTMLInputElement | null) => {
      innerRef.current = element;
    };

    const contextValue: CheckboxContextValue = {
      isChecked,
      isIndeterminate,
      currentState,
      disabled,
      invalid,
      size,
      radius: cond(radius === "full", "full", "md"),
      inputId,
      labelId,
      descriptionId,
      inputRef: setRefs,
      inputProps,
      handleChange: () => { },
    };

    const controlNode = (
      <span aria-hidden="true" className="pointer-events-none inline-flex shrink-0">
        <CheckboxControl>
          <CheckboxIndicator />
        </CheckboxControl>
      </span>
    );

    const resolvedLeading = cond(
      placement === "leading",
      cond(
        Boolean(leading),
        <span className="flex items-center gap-2">
          {controlNode}
          {leading}
        </span>,
        controlNode
      ),
      leading
    );

    const resolvedTrailing = cond(
      placement === "trailing",
      cond(
        Boolean(trailing),
        <span className="flex items-center gap-2">
          {trailing}
          {controlNode}
        </span>,
        controlNode
      ),
      trailing
    );

    const isTileSelected = cond(selected !== undefined, Boolean(selected), false);

    return (
      <CheckboxContext.Provider value={contextValue}>
        <Tile
          ref={ref}
          as="div"
          role="checkbox"
          tabIndex={cond(disabled, -1, 0)}
          aria-checked={cond(isIndeterminate, "mixed", isChecked)}
          aria-labelledby={cond(Boolean(label), labelId, undefined)}
          aria-describedby={cond(Boolean(description), descriptionId, undefined)}
          aria-label={ariaLabel}
          aria-disabled={cond(disabled, true, undefined)}
          aria-invalid={cond(invalid, true, undefined)}
          aria-selected={undefined}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          interactive={!disabled}
          selected={isTileSelected}
          disabled={disabled}
          leading={resolvedLeading}
          label={
            when(
              label,
              <span id={labelId}>{label}</span>
            )
          }
          description={
            when(
              description,
              <span id={descriptionId}>{description}</span>
            )
          }
          trailing={resolvedTrailing}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            "cursor-pointer select-none",
            cond(disabled, "cursor-not-allowed opacity-50 active:scale-100", ""),
            className
          )}
          {...props}
        >
          {children}
        </Tile>
      </CheckboxContext.Provider>
    );
  }
);

CheckboxTile.displayName = "Checkbox.Tile";
