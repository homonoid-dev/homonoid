import type {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import type { Color, Radius, Size } from "../../types";

export type AutocompleteSize = Size;
export type AutocompleteRadius = Radius;
export type AutocompleteColor = Color;

export interface AutocompleteOption {
  value: string;
  label?: string;
  description?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
  radius?: AutocompleteRadius;
}

export interface AutocompleteProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect" | "defaultValue"> {
  ref?: Ref<HTMLDivElement>;

  /**
   * Controlled selected value.
   */
  value?: string;

  /**
   * Default initial selected value.
   */
  defaultValue?: string;

  /**
   * Callback fired when selection changes.
   */
  onValueChange?: (value: string) => void;

  /**
   * Controlled query string in the search input.
   */
  query?: string;

  /**
   * Default query string in the search input.
   */
  defaultQuery?: string;

  /**
   * Callback fired when query string changes.
   */
  onQueryChange?: (query: string) => void;

  /**
   * Controlled open state.
   */
  open?: boolean;

  /**
   * Default open state.
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when open state changes.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Callback fired when an option is selected.
   */
  onSelect?: (value: string, option?: AutocompleteOption) => void;

  /**
   * Whether the autocomplete is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the input is in an invalid error state.
   */
  invalid?: boolean;

  /**
   * Sizing scale for the input and suggestion items.
   */
  size?: AutocompleteSize;

  /**
   * Corner radius curvature.
   */
  radius?: AutocompleteRadius;

  /**
   * Color palette styling.
   */
  color?: AutocompleteColor;

  /**
   * Placeholder string for the search input.
   */
  placeholder?: string;

  /**
   * Declarative options collection for atomic usage.
   */
  options?: AutocompleteOption[];

  /**
   * Whether options are currently being loaded asynchronously.
   */
  loading?: boolean;

  /**
   * Leading accessory element.
   */
  leading?: ReactNode;

  /**
   * Trailing accessory element.
   */
  trailing?: ReactNode;

  /**
   * Custom filter predicate function.
   */
  filter?: (option: AutocompleteOption, query: string) => boolean;

  /**
   * Primary textual or visual label associated with the input.
   */
  label?: ReactNode;

  /**
   * Whether the label transitions smoothly into a floating state upon focus or input content presence.
   * @default false
   */
  floating?: boolean;
}

export interface AutocompleteInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  ref?: Ref<HTMLInputElement>;
  leading?: ReactNode;
  trailing?: ReactNode;

  /**
   * Primary textual or visual label associated with the input.
   */
  label?: ReactNode;

  /**
   * Whether the label transitions smoothly into a floating state upon focus or input content presence.
   * @default false
   */
  floating?: boolean;
}

export interface AutocompleteContentProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface AutocompleteListProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface AutocompleteItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  ref?: Ref<HTMLDivElement>;
  value: string;
  label?: string;
  description?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
  radius?: AutocompleteRadius;
}

export interface AutocompleteGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  heading?: ReactNode;
}

export interface AutocompleteEmptyProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

