"use client";

import {
  createContext,
  useContext,
  type MutableRefObject,
  type CSSProperties,
  type RefObject,
  type ReactNode,
} from "react";
import type { FloatingContext } from "@floating-ui/react";
import type {
  AutocompleteColor,
  AutocompleteOption,
  AutocompleteRadius,
  AutocompleteSize,
} from "./types";

export interface RegisteredItem {
  id: string;
  value: string;
  label: string;
  description?: string;
  disabled: boolean;
}

export interface AutocompleteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string | undefined;
  setValue: (value: string) => void;
  query: string;
  setQuery: (query: string) => void;
  disabled: boolean;
  invalid: boolean;
  size: AutocompleteSize;
  radius: AutocompleteRadius;
  color: AutocompleteColor;
  placeholder?: string;
  clearable: boolean;
  loading: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  inputId: string;
  listboxId: string;
  floatingStyles: CSSProperties;
  context: FloatingContext;
  setReference: (node: HTMLElement | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  getReferenceProps: (
    userProps?: Record<string, unknown>
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: Record<string, unknown>
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: Record<string, unknown>
  ) => Record<string, unknown>;
  highlightedIndex: number | null;
  setHighlightedIndex: (index: number | null) => void;
  highlightedId: string | undefined;
  registeredItems: RegisteredItem[];
  registerItem: (item: RegisteredItem) => () => void;
  onSelectOption: (val: string, option?: AutocompleteOption) => void;
  clear: () => void;
  customFilter?: (option: AutocompleteOption, query: string) => boolean;
}

export const AutocompleteContext =
  createContext<AutocompleteContextValue | null>(null);

export function useAutocompleteContext(): AutocompleteContextValue {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error(
      "Autocomplete subcomponents must be rendered within an Autocomplete provider"
    );
  }
  return context;
}
