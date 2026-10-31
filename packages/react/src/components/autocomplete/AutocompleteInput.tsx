"use client";

import {
  forwardRef,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { useMergeRefs } from "@floating-ui/react";
import { Input } from "../input/Input";
import { Spinner } from "../spinner/Spinner";
import { cond } from "../../utils/condition";
import { useAutocompleteContext } from "./AutocompleteContext";
import type { AutocompleteInputProps } from "./types";

export const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  function AutocompleteInput(
    {
      leading,
      trailing,
      placeholder,
      value,
      onChange,
      onFocus,
      onKeyDown,
      className,
      ...props
    },
    ref
  ) {
    const {
      open,
      setOpen,
      query,
      setQuery,
      disabled,
      invalid,
      size,
      radius,
      placeholder: contextPlaceholder,
      clearable,
      loading,
      inputRef,
      inputId,
      listboxId,
      setReference,
      getReferenceProps,
      highlightedIndex,
      setHighlightedIndex,
      highlightedId,
      registeredItems,
      onSelectOption,
      clear,
    } = useAutocompleteContext();

    const mergedInputRef = useMergeRefs([inputRef, ref]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (!open && !disabled) {
        setOpen(true);
      }
      onChange?.(e);
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      if (!open && !disabled) {
        setOpen(true);
      }
      onFocus?.(e);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        if (registeredItems.length === 0) return;
        setHighlightedIndex(
          highlightedIndex === null || highlightedIndex >= registeredItems.length - 1
            ? 0
            : highlightedIndex + 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        if (registeredItems.length === 0) return;
        setHighlightedIndex(
          highlightedIndex === null || highlightedIndex <= 0
            ? registeredItems.length - 1
            : highlightedIndex - 1
        );
      } else if (e.key === "Enter") {
        if (open && highlightedIndex !== null && registeredItems[highlightedIndex]) {
          e.preventDefault();
          const target = registeredItems[highlightedIndex];
          if (!target.disabled) {
            onSelectOption(target.value, {
              value: target.value,
              label: target.label,
              description: target.description,
            });
          }
        }
      } else if (e.key === "Escape") {
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
      } else if (e.key === "Tab") {
        if (open) {
          setOpen(false);
        }
      }

      onKeyDown?.(e);
    };

    const referenceProps = getReferenceProps({
      id: inputId,
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-expanded": open,
      "aria-controls": listboxId,
      "aria-activedescendant": highlightedId,
      disabled,
      value: cond(value !== undefined, value, query),
      placeholder: placeholder || contextPlaceholder,
      onChange: handleChange,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      ...props,
    });

    return (
      <div ref={setReference} className="w-full">
        <Input
          ref={mergedInputRef}
          size={size}
          radius={radius}
          invalid={invalid}
          disabled={disabled}
          leading={leading}
          trailing={cond(loading, <Spinner size="sm" aria-hidden="true" />, trailing)}
          className={className}
          {...referenceProps}
        />
      </div>
    );
  }
);

AutocompleteInput.displayName = "Autocomplete.Input";

