import type {
  ElementType,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import type { Color, Radius, Size } from "../../types";

export type AvatarVariant = "contained" | "outlined" | "plain";
export type AvatarColor = Color;
export type AvatarSize = Size;
export type AvatarRadius = Radius;

export type AvatarStatus = "online" | "away" | "busy" | "offline";
export type AvatarPlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

export interface AvatarProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  as?: ElementType;
  variant?: AvatarVariant;
  color?: AvatarColor;
  size?: AvatarSize;
  radius?: AvatarRadius;
  src?: string;
  srcSet?: string;
  alt?: string;
  name?: string;
  status?: AvatarStatus;
  statusPlacement?: AvatarPlacement;
  children?: ReactNode;
}

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  ref?: Ref<HTMLImageElement>;
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  delayMs?: number;
  children?: ReactNode;
}

export interface AvatarIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  status?: AvatarStatus;
  placement?: AvatarPlacement;
  color?: AvatarColor;
  size?: AvatarSize;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  max?: number;
  size?: AvatarSize;
  radius?: AvatarRadius;
  children?: ReactNode;
}

