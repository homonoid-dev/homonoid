"use client";

import {
  Children,
  forwardRef,
  isValidElement,
  useEffect,
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
import { CheckboxContext, type CheckboxContextValue } from "./CheckboxContext";
import { CheckboxControl } from "./CheckboxControl";
import { CheckboxIndicator } from "./CheckboxIndicator";
import { CheckboxContent } from "./CheckboxContent";
import type { CheckboxProps } from "./types";

export interface CheckboxComponent
  extends React.ForwardRefExoticComponent<
    CheckboxProps & React.RefAttributes<HTMLInputElement>
  > {
  Control: typeof CheckboxControl;
  Indicator: typeof CheckboxIndicator;
  Content: typeof CheckboxContent;
  Label: typeof Label;
  Description: typeof Description;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    size = "md",
    radius = "md",
    checked,
    defaultChecked = false,
    indeterminate = false,
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

  const contextValue: CheckboxContextValue = {
    isChecked,
    isIndeterminate,
    currentState,
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
      if (cond(element.type === CheckboxControl, true, displayName === "Checkbox.Control")) {
        hasControl = true;
      }
    }
  });

  return (
    <CheckboxContext.Provider value={contextValue}>
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
              <CheckboxControl>
                <CheckboxIndicator />
              </CheckboxControl>
              <CheckboxContent>
                <Label id={labelId} as="span" size={size}>
                  {children}
                </Label>
              </CheckboxContent>
            </>,
            <>
              <CheckboxControl>
                <CheckboxIndicator />
              </CheckboxControl>
              {when(
                hasTextContent,
                <CheckboxContent>
                  {when(
                    label,
                    <Label id={labelId} as="span" size={size}>
                      {label}
                    </Label>
                  )}
                  {when(
                    description,
                    <Description id={descriptionId} as="span" size={cond(size === "lg", "md", "sm")}>
                      {description}
                    </Description>
                  )}
                </CheckboxContent>
              )}
            </>
          )
        )}
      </label>
    </CheckboxContext.Provider>
  );
}) as CheckboxComponent;

Checkbox.displayName = "Checkbox";
Checkbox.Control = CheckboxControl;
Checkbox.Indicator = CheckboxIndicator;
Checkbox.Content = CheckboxContent;
Checkbox.Label = Label;
Checkbox.Description = Description;
