"use client";

import { createContext, useContext } from "react";
import type { BadgeColor, BadgeRadius, BadgeSize, BadgeVariant } from "./types";

export interface BadgeContextValue {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  radius?: BadgeRadius;
}

export const BadgeContext = createContext<BadgeContextValue>({
  variant: "contained",
  color: "primary",
  size: "md",
  radius: "full",
});

export function useBadgeContext(): BadgeContextValue {
  return useContext(BadgeContext);
}

