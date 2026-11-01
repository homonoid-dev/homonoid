"use client";

import { createContext, useContext } from "react";
import type {
  AvatarColor,
  AvatarRadius,
  AvatarSize,
  AvatarVariant,
  ImageLoadingStatus,
} from "./types";

export interface AvatarContextValue {
  variant?: AvatarVariant;
  color?: AvatarColor;
  size?: AvatarSize;
  radius?: AvatarRadius;
  imageLoadingStatus: ImageLoadingStatus;
  setImageLoadingStatus: (status: ImageLoadingStatus) => void;
}

export const AvatarContext = createContext<AvatarContextValue>({
  variant: "contained",
  color: "surface",
  size: "md",
  radius: "full",
  imageLoadingStatus: "idle",
  setImageLoadingStatus: () => {},
});

export function useAvatarContext(): AvatarContextValue {
  return useContext(AvatarContext);
}

