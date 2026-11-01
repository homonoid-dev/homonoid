"use client";

import { forwardRef, useEffect, useRef } from "react";
import { cn } from "../../utils/cn";
import { cond } from "../../utils/condition";
import { useAvatarContext } from "./AvatarContext";
import type { AvatarImageProps } from "./types";

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  function AvatarImage(
    {
      src,
      srcSet,
      alt = "",
      className,
      onLoad,
      onError,
      onLoadingStatusChange,
      ...props
    },
    ref
  ) {
    const { imageLoadingStatus, setImageLoadingStatus } = useAvatarContext();
    const internalRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
      if (!src) {
        setImageLoadingStatus("error");
        onLoadingStatusChange?.("error");
        return;
      }

      if (internalRef.current?.complete) {
        const isLoaded = internalRef.current.naturalWidth > 0;
        const nextStatus = cond(isLoaded, "loaded" as const, "error" as const);
        setImageLoadingStatus(nextStatus);
        onLoadingStatusChange?.(nextStatus);
        return;
      }

      setImageLoadingStatus("loading");
      onLoadingStatusChange?.("loading");
    }, [src, setImageLoadingStatus, onLoadingStatusChange]);

    if (!src || imageLoadingStatus === "error") {
      return null;
    }

    return (
      <img
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        src={src}
        srcSet={srcSet}
        alt={alt}
        data-slot="avatar-image"
        className={cn(
          "size-full object-cover transition-opacity duration-200",
          cond(imageLoadingStatus === "loaded", "opacity-100", "opacity-0"),
          className
        )}
        onLoad={(event) => {
          setImageLoadingStatus("loaded");
          onLoadingStatusChange?.("loaded");
          onLoad?.(event);
        }}
        onError={(event) => {
          setImageLoadingStatus("error");
          onLoadingStatusChange?.("error");
          onError?.(event);
        }}
        {...props}
      />
    );
  }
);

AvatarImage.displayName = "AvatarImage";

