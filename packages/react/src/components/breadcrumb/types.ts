import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardRefExoticComponent,
  MouseEvent,
  ReactNode,
  RefAttributes,
} from "react";
import type { Size } from "../../types";

export type BreadcrumbSize = Size;

export interface BreadcrumbComponent
  extends ForwardRefExoticComponent<
    BreadcrumbProps & RefAttributes<HTMLElement>
  > {
  List: ForwardRefExoticComponent<
    BreadcrumbListProps & RefAttributes<HTMLOListElement>
  >;
  Item: ForwardRefExoticComponent<
    BreadcrumbItemProps & RefAttributes<HTMLLIElement>
  >;
  Link: ForwardRefExoticComponent<
    BreadcrumbLinkProps & RefAttributes<HTMLAnchorElement>
  >;
  Page: ForwardRefExoticComponent<
    BreadcrumbPageProps & RefAttributes<HTMLSpanElement>
  >;
  Separator: ForwardRefExoticComponent<
    BreadcrumbSeparatorProps & RefAttributes<HTMLLIElement>
  >;
  Ellipsis: ForwardRefExoticComponent<
    BreadcrumbEllipsisProps & RefAttributes<HTMLSpanElement>
  >;
}

export interface BreadcrumbItemData {
  /**
   * The text label or node for this breadcrumb level.
   */
  label: ReactNode;

  /**
   * Target destination URL. If omitted or if item is the terminal page, renders as text.
   */
  href?: string;

  /**
   * Optional leading icon or glyph for this level.
   */
  icon?: ReactNode;

  /**
   * Explicitly marks this item as the active destination page.
   */
  current?: boolean;

  /**
   * Whether this link is disabled.
   */
  disabled?: boolean;

  /**
   * Optional click handler for programmatic navigation.
   */
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbProps extends ComponentPropsWithoutRef<"nav"> {
  /**
   * Structured array of items for zero boilerplate atomic usage.
   */
  items?: BreadcrumbItemData[];

  /**
   * Custom separator node rendered between items.
   * @default <ChevronRight className="size-3.5" />
   */
  separator?: ReactNode;

  /**
   * Maximum number of visible items before collapsing intermediate tiers into an ellipsis.
   */
  maxItems?: number;

  /**
   * Number of items retained at the beginning when collapsed.
   * @default 1
   */
  itemsBeforeCollapse?: number;

  /**
   * Number of items retained at the end when collapsed.
   * @default 1
   */
  itemsAfterCollapse?: number;

  /**
   * Typography scale and spacing density.
   * @default "md"
   */
  size?: BreadcrumbSize;

  /**
   * Custom child elements when using compound subcomponents.
   */
  children?: ReactNode;
}

export interface BreadcrumbListProps extends ComponentPropsWithoutRef<"ol"> {
  children?: ReactNode;
}

export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<"li"> {
  children?: ReactNode;
}

export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<"a"> {
  /**
   * Polymorphic element component override (e.g. Next.js Link).
   */
  as?: ElementType;

  /**
   * Whether to pass props down to the child element directly.
   */
  asChild?: boolean;

  /**
   * Whether the link is disabled.
   */
  disabled?: boolean;

  children?: ReactNode;
}

export interface BreadcrumbPageProps extends ComponentPropsWithoutRef<"span"> {
  children?: ReactNode;
}

export interface BreadcrumbSeparatorProps extends ComponentPropsWithoutRef<"li"> {
  children?: ReactNode;
}

export interface BreadcrumbEllipsisProps extends ComponentPropsWithoutRef<"span"> {
  /**
   * Optional click handler when the ellipsis trigger is interactive.
   */
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}
