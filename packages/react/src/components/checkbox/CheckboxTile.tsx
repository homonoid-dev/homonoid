"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import { any, cond } from "../../utils/condition";
import { Tile } from "../tile/Tile";
import { CheckboxContext, type CheckboxContextValue } from "./CheckboxContext";
import { CheckboxControl } from "./CheckboxControl";
import { CheckboxIndicator } from "./CheckboxIndicator";
import type { CheckboxTileProps } from "./types";

export const CheckboxTile = forwardRef<HTMLInputElement, CheckboxTileProps>(
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
      placement = "trailing",
      leading,
      trailing,
      label,
      description,
      onChange,
      className,
      id,
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

    const setRefs = (element: HTMLInputElement | null) => {
      innerRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as React.RefObject<HTMLInputElement | null>).current = element;
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const nextChecked = event.target.checked;
      if (!isControlled) {
        setInternalChecked(nextChecked);
      }
      onChange?.(nextChecked);
    };

    const currentState = cond(
      isIndeterminate,
      "indeterminate",
      cond(isChecked, "checked", "unchecked")
    );

    const isStringLabel = typeof label === "string";
    const finalAriaLabel = props["aria-label"] || (isStringLabel ? (label as string) : undefined);
    const finalAriaLabelledBy =
      props["aria-labelledby"] || (!isStringLabel && Boolean(label) ? labelId : undefined);

    const userDescribedBy = props["aria-describedby"];
    const finalDescribedBy = cond(
      Boolean(userDescribedBy),
      cond(Boolean(description), `${userDescribedBy} ${descriptionId}`, userDescribedBy),
      cond(Boolean(description), descriptionId, undefined)
    );

    const inputProps = {
      ...props,
      "aria-label": finalAriaLabel,
      "aria-labelledby": finalAriaLabelledBy,
      "aria-describedby": finalDescribedBy,
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
      handleChange,
    };

    const controlNode = (
      <CheckboxControl>
        <CheckboxIndicator />
      </CheckboxControl>
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

    return (
      <CheckboxContext.Provider value={contextValue}>
        <Tile
          as="label"
          htmlFor={inputId}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          interactive={!disabled}
          selected={isChecked}
          disabled={disabled}
          leading={resolvedLeading}
          label={label}
          description={description}
          trailing={resolvedTrailing}
          className={cn(
            "has-[:focus-visible]:focus-ring",
            className
          )}
        >
          {children}
        </Tile>
      </CheckboxContext.Provider>
    );
  }
);

CheckboxTile.displayName = "Checkbox.Tile";

