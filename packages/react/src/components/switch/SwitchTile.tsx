"use client";

import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { Tile } from "../tile/Tile";
import { SwitchContext, type SwitchContextValue } from "./SwitchContext";
import { SwitchControl } from "./SwitchControl";
import { SwitchThumb } from "./SwitchThumb";
import type { SwitchTileProps } from "./types";

export const SwitchTile = forwardRef<HTMLInputElement, SwitchTileProps>(
  function SwitchTile(
    {
      variant = "plain",
      color = "surface",
      size = "md",
      radius = "lg",
      checked,
      defaultChecked = false,
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
    const isChecked = cond(isControlled, Boolean(checked), internalChecked);

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

    const contextValue: SwitchContextValue = {
      isChecked,
      disabled,
      invalid,
      size,
      radius: "full",
      inputId,
      labelId,
      descriptionId,
      inputRef: setRefs,
      inputProps,
      handleChange,
    };

    const controlNode = (
      <SwitchControl>
        <SwitchThumb />
      </SwitchControl>
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
      <SwitchContext.Provider value={contextValue}>
        <Tile
          as="label"
          htmlFor={inputId}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          interactive={false}
          selected={isChecked}
          disabled={disabled}
          leading={resolvedLeading}
          label={label}
          description={description}
          trailing={resolvedTrailing}
          className={cn(
            "cursor-pointer transition duration-[var(--motion-duration-normal)] ease-[var(--motion-easing)] active:scale-[var(--motion-press-scale)] has-[:focus-visible]:focus-ring",
            cond(disabled, "cursor-not-allowed opacity-50 active:scale-100", ""),
            className
          )}
        >
          {children}
        </Tile>
      </SwitchContext.Provider>
    );
  }
);

SwitchTile.displayName = "Switch.Tile";

