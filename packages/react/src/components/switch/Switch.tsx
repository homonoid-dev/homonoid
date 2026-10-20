"use client";

import {
  Children,
  forwardRef,
  isValidElement,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
} from "react";
import { cn } from "../../utils/cn";
import { any, cond, when } from "../../utils/condition";
import { Label } from "../label/Label";
import { Description } from "../description/Description";
import { SwitchContext, type SwitchContextValue } from "./SwitchContext";
import { SwitchControl } from "./SwitchControl";
import { SwitchThumb } from "./SwitchThumb";
import { SwitchContent } from "./SwitchContent";
import type { SwitchProps } from "./types";

export interface SwitchComponent
  extends React.ForwardRefExoticComponent<
    SwitchProps & React.RefAttributes<HTMLInputElement>
  > {
  Control: typeof SwitchControl;
  Thumb: typeof SwitchThumb;
  Content: typeof SwitchContent;
  Label: typeof Label;
  Description: typeof Description;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    size = "md",
    radius = "full",
    checked,
    defaultChecked = false,
    disabled = false,
    invalid = false,
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
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
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

  const hasTextContent = any(Boolean(label), Boolean(description));
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
    radius,
    inputId,
    labelId,
    descriptionId,
    inputRef: setRefs,
    inputProps,
    handleChange,
  };

  let hasControl = false;
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const element = child as ReactElement;
      const displayName = (element.type as { displayName?: string })?.displayName;
      if (cond(element.type === SwitchControl, true, displayName === "Switch.Control")) {
        hasControl = true;
      }
    }
  });

  return (
    <SwitchContext.Provider value={contextValue}>
      <label
        htmlFor={inputId}
        className={cn(
          "group inline-flex items-start gap-2.5 select-none w-fit",
          cond(disabled, "cursor-not-allowed opacity-60", "cursor-pointer"),
          className
        )}
      >
        {cond(
          hasControl,
          children,
          cond(
            Boolean(children),
            <>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchContent>
                <Label id={labelId} as="span" size="sm" className="text-sm font-medium">
                  {children}
                </Label>
              </SwitchContent>
            </>,
            <>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              {when(
                hasTextContent,
                <SwitchContent>
                  {when(
                    label,
                    <Label id={labelId} as="span" size="sm" className="text-sm font-medium">
                      {label}
                    </Label>
                  )}
                  {when(
                    description,
                    <Description id={descriptionId} as="span" variant="muted" className="text-xs">
                      {description}
                    </Description>
                  )}
                </SwitchContent>
              )}
            </>
          )
        )}
      </label>
    </SwitchContext.Provider>
  );
}) as SwitchComponent;

Switch.displayName = "Switch";
Switch.Control = SwitchControl;
Switch.Thumb = SwitchThumb;
Switch.Content = SwitchContent;
Switch.Label = Label;
Switch.Description = Description;
