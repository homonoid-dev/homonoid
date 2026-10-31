"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useMergeRefs } from "@floating-ui/react";
import { Label } from "../label/Label";
import { AccordionContext, type AccordionContextValue } from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";
import type { AccordionProps } from "./types";

function normalizeValues(
  val: string | string[] | undefined,
  isMultiple: boolean
): string[] {
  if (val === undefined || val === null) {
    return [];
  }
  if (Array.isArray(val)) {
    if (isMultiple) {
      return val;
    }
    return val.length > 0 ? [val[0]] : [];
  }
  return [String(val)];
}

interface AccordionComponent
  extends React.ForwardRefExoticComponent<
    AccordionProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
  Label: typeof Label;
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      multiple = false,
      collapsible = true,
      variant = "flush",
      color = "surface",
      size = "md",
      disabled = false,
      headingLevel = "h3",
      items,
      className,
      children,
      ...props
    },
    ref
  ) {
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(() =>
      normalizeValues(defaultValue, multiple)
    );

    const activeValues = useMemo(
      () =>
        cond(
          isControlled,
          normalizeValues(controlledValue, multiple),
          uncontrolledValue
        ),
      [isControlled, controlledValue, uncontrolledValue, multiple]
    );

    const internalRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs([internalRef, ref]);

    const isExpanded = useCallback(
      (itemValue: string) => activeValues.includes(itemValue),
      [activeValues]
    );

    const toggle = useCallback(
      (itemValue: string) => {
        if (disabled) return;

        let nextValues: string[];

        if (multiple) {
          if (activeValues.includes(itemValue)) {
            nextValues = activeValues.filter((v) => v !== itemValue);
          } else {
            nextValues = [...activeValues, itemValue];
          }
          if (!isControlled) {
            setUncontrolledValue(nextValues);
          }
          onValueChange?.(nextValues);
        } else {
          if (activeValues.includes(itemValue)) {
            if (!collapsible) return;
            nextValues = [];
            if (!isControlled) {
              setUncontrolledValue(nextValues);
            }
            onValueChange?.("");
          } else {
            nextValues = [itemValue];
            if (!isControlled) {
              setUncontrolledValue(nextValues);
            }
            onValueChange?.(itemValue);
          }
        }
      },
      [disabled, multiple, activeValues, isControlled, collapsible, onValueChange]
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        const container = internalRef.current;
        if (!container) return;

        const triggers = Array.from(
          container.querySelectorAll<HTMLButtonElement>(
            '[data-accordion-trigger]:not([disabled]):not([aria-disabled="true"])'
          )
        );

        if (triggers.length === 0) return;

        const currentIndex = triggers.indexOf(event.currentTarget);
        if (currentIndex === -1) return;

        if (event.key === "ArrowDown") {
          event.preventDefault();
          const nextIndex = (currentIndex + 1) % triggers.length;
          triggers[nextIndex]?.focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          const prevIndex = (currentIndex - 1 + triggers.length) % triggers.length;
          triggers[prevIndex]?.focus();
        } else if (event.key === "Home") {
          event.preventDefault();
          triggers[0]?.focus();
        } else if (event.key === "End") {
          event.preventDefault();
          triggers[triggers.length - 1]?.focus();
        }
      },
      []
    );

    const contextValue: AccordionContextValue = useMemo(
      () => ({
        value: activeValues,
        toggle,
        isExpanded,
        multiple,
        collapsible,
        variant,
        color,
        size,
        disabled,
        headingLevel,
        containerRef: internalRef,
        handleKeyDown,
      }),
      [
        activeValues,
        toggle,
        isExpanded,
        multiple,
        collapsible,
        variant,
        color,
        size,
        disabled,
        headingLevel,
        handleKeyDown,
      ]
    );

    const rootClasses = cond(
      variant === "bordered",
      "w-full border border-border rounded-2xl overflow-hidden bg-background",
      cond(variant === "separated", "w-full flex flex-col gap-2", "w-full")
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={mergedRef}
          data-orientation="vertical"
          data-variant={variant}
          className={cn(rootClasses, className)}
          {...props}
        >
          {cond(
            Boolean(items && items.length > 0),
            items?.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                <AccordionTrigger
                  leading={item.leading}
                  description={item.description}
                >
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            )),
            children
          )}
        </div>
      </AccordionContext.Provider>
    );
  }
);

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
  Label: Label,
}) as AccordionComponent;
