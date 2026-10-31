"use client";

import {
  forwardRef,
  useId,
  useMemo,
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import { Label } from "../label/Label";
import { cn } from "../../utils/cn";
import { cond, when } from "../../utils/condition";
import { useAutocompleteContext } from "./AutocompleteContext";
import type { AutocompleteGroupProps } from "./types";

export const AutocompleteGroup = forwardRef<HTMLDivElement, AutocompleteGroupProps>(
  function AutocompleteGroup({ heading, children, className, ...props }, ref) {
    const generatedId = useId();
    const { query, customFilter } = useAutocompleteContext();

    const hasVisibleChildren = useMemo(() => {
      if (!query.trim()) {
        return Children.count(children) > 0;
      }
      let hasMatch = false;
      const q = query.toLowerCase();

      const inspectNode = (node: ReactNode) => {
        if (hasMatch) return;
        Children.forEach(node, (child) => {
          if (hasMatch || !isValidElement(child)) return;
          const p = child.props as Record<string, unknown>;
          if ("value" in p) {
            const val = String(p.value || "");
            const lbl = String(
              p.label || (typeof p.children === "string" ? p.children : val)
            );
            const desc = String(p.description || "");
            if (customFilter) {
              if (customFilter({ value: val, label: lbl, description: desc }, query)) {
                hasMatch = true;
              }
            } else {
              if (
                lbl.toLowerCase().includes(q) ||
                val.toLowerCase().includes(q) ||
                desc.toLowerCase().includes(q)
              ) {
                hasMatch = true;
              }
            }
          } else if (p.children) {
            inspectNode(p.children as ReactNode);
          }
        });
      };

      inspectNode(children);
      return hasMatch;
    }, [children, query, customFilter]);

    if (!hasVisibleChildren) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={cond(Boolean(heading), generatedId, undefined)}
        className={cn("flex flex-col gap-0.5", className)}
        {...props}
      >
        {when(
          heading,
          <Label
            id={generatedId}
            as="span"
            className="px-3 py-1.5 text-xs text-muted font-medium select-none pointer-events-none cursor-default"
          >
            {heading}
          </Label>
        )}
        {children}
      </div>
    );
  }
);

AutocompleteGroup.displayName = "Autocomplete.Group";


