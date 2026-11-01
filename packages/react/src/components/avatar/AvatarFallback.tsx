"use client";

import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { useAvatarContext } from "./AvatarContext";
import type { AvatarFallbackProps } from "./types";

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback({ delayMs, className, children, ...props }, ref) {
    const { imageLoadingStatus } = useAvatarContext();
    const [canRender, setCanRender] = useState(delayMs === undefined);

    useEffect(() => {
      if (delayMs === undefined) return;
      const timer = setTimeout(() => setCanRender(true), delayMs);
      return () => clearTimeout(timer);
    }, [delayMs]);

    if (imageLoadingStatus === "loaded" || !canRender) {
      return null;
    }

    return (
      <span
        ref={ref}
        data-slot="avatar-fallback"
        className={cn(
          "flex size-full items-center justify-center font-medium select-none uppercase leading-none",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

AvatarFallback.displayName = "AvatarFallback";

