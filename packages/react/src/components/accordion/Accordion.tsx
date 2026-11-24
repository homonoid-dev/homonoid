"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useMemo,
  useRef,
  type KeyboardEvent,
} from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useMergeRefs } from "@floating-ui/react";
import {
  AccordionContext,
  resolveIndicator,
  type AccordionContextValue,
} from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";
import { AccordionIndicator } from "./AccordionIndicator";
import type { AccordionProps } from "./types";

export const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      plain: "",
      outlined: "border border-border rounded-xl overflow-hidden bg-background",
      contained: "flex flex-col gap-surface-gap",
    },
  },
  defaultVariants: {
    variant: "plain",
  },
});

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
  Indicator: typeof AccordionIndicator;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      multiple = false,
      collapsible = true,
      variant = "plain",
      size = "md",
      disabled = false,
      indicator,
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

    const resolvedIndicator = useMemo(
      () => resolveIndicator(indicator),
      [indicator]
    );

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

        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          return;
        }

        const triggers = Array.from(
          container.querySelectorAll(
            '[data-accordion-trigger]:not([disabled]):not([aria-disabled="true"])'
          ) as NodeListOf<HTMLButtonElement>
        );

        if (triggers.length === 0) return;

        const currentIndex = triggers.indexOf(event.currentTarget);
        if (currentIndex === -1) return;

        event.preventDefault();

        if (event.key === "ArrowDown") {
          const nextIndex = (currentIndex + 1) % triggers.length;
          triggers[nextIndex]?.focus();
        } else if (event.key === "ArrowUp") {
          const prevIndex = (currentIndex - 1 + triggers.length) % triggers.length;
          triggers[prevIndex]?.focus();
        } else if (event.key === "Home") {
          triggers[0]?.focus();
        } else if (event.key === "End") {
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
        size,
        disabled,
        indicator: resolvedIndicator,
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
        size,
        disabled,
        resolvedIndicator,
        handleKeyDown,
      ]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={mergedRef}
          data-orientation="vertical"
          data-variant={variant}
          className={cn(accordionVariants({ variant }), className)}
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
                  trailing={item.trailing}
                  indicator={item.indicator}
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
) as AccordionComponent;

Accordion.displayName = "Accordion";
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
Accordion.Indicator = AccordionIndicator;
