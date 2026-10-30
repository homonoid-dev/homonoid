import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { Size } from "../../types";
import type { LabelProps } from "../label/types";
import type { DescriptionProps } from "../description/types";

export type StepperOrientation = "horizontal" | "vertical";
export type StepperVariant = "circle" | "bar";
export type StepperState = "inactive" | "active" | "completed" | "loading" | "disabled" | "error";

export interface StepperIndicators {
  completed?: ReactNode;
  loading?: ReactNode;
  active?: ReactNode;
  inactive?: ReactNode;
}

export interface StepperStepDefinition {
  value: number | string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Controlled active step value.
   */
  value?: number | string;

  /**
   * Default active step value for uncontrolled usage.
   * @default 1
   */
  defaultValue?: number | string;

  /**
   * Callback fired when active step value changes.
   */
  onValueChange?: (value: number | string) => void;

  /**
   * Layout orientation of the milestone list.
   * @default "horizontal"
   */
  orientation?: StepperOrientation;

  /**
   * Visual indicator style variant.
   * @default "circle"
   */
  variant?: StepperVariant;

  /**
   * Spatial density scale for indicator and typography.
   * @default "md"
   */
  size?: Size;

  /**
   * Whether steps must be traversed in strict sequential order.
   * @default false
   */
  linear?: boolean;

  /**
   * Custom indicators mapped to lifecycle states.
   */
  indicators?: StepperIndicators;

  /**
   * Declarative step array for atomic usage.
   */
  steps?: StepperStepDefinition[];

  /**
   * Compound subcomponents or child nodes.
   */
  children?: ReactNode;
}

export interface StepperListProps extends HTMLAttributes<HTMLOListElement> {
  children?: ReactNode;
}

export interface StepperItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Unique identifier or numerical index of this step milestone.
   */
  step: number | string;

  /**
   * Explicitly marks this step milestone as disabled.
   */
  disabled?: boolean;

  /**
   * Explicitly marks this step milestone as completed.
   */
  completed?: boolean;

  /**
   * Explicitly marks this step milestone as currently loading.
   */
  loading?: boolean;

  /**
   * Explicitly marks this step milestone as having validation errors.
   */
  error?: boolean;

  children?: ReactNode;
}

export interface StepperTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export interface StepperIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export type StepperTitleProps = LabelProps;

export type StepperDescriptionProps = DescriptionProps;

export interface StepperSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface StepperViewProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Step milestone value associated with this content view.
   * When omitted the view renders for any active step.
   */
  value?: number | string;
  children?: ReactNode;
}

