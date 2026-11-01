"use client";

import { Children, forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { cond, match, when } from "../../utils/condition";
import type { AvatarGroupProps, AvatarRadius, AvatarSize } from "./types";

const groupVariants = cva("flex items-center [&>[data-slot=avatar]]:ring-2 [&>[data-slot=avatar]]:ring-background", {
  variants: {
    size: {
      sm: "-space-x-2",
      md: "-space-x-2.5",
      lg: "-space-x-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    { max, size = "md", radius = "full", className, children, ...props },
    ref
  ) {
    const childArray = Children.toArray(children);
    const hasOverflow = cond(
      Boolean(max && max > 0),
      childArray.length > (max ?? 0),
      false
    );
    const visibleChildren = cond(
      hasOverflow,
      childArray.slice(0, max),
      childArray
    );
    const excessCount = childArray.length - visibleChildren.length;

    const sizeClass = match<AvatarSize, string>(
      size,
      {
        sm: "size-control-sm text-[11px]",
        md: "size-control-md text-xs",
        lg: "size-control-lg text-sm",
      },
      "size-control-md text-xs"
    );

    const radiusClass = match<AvatarRadius, string>(
      radius,
      {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
      },
      "rounded-full"
    );

    return (
      <div
        ref={ref}
        role="group"
        data-slot="avatar-group"
        className={cn(groupVariants({ size }), className)}
        {...props}
      >
        {visibleChildren}
        {when(hasOverflow, (
          <div
            data-slot="avatar-group-overflow"
            className={cn(
              "relative inline-flex items-center justify-center font-medium select-none bg-subtle text-subtle-foreground ring-2 ring-background shrink-0",
              sizeClass,
              radiusClass
            )}
          >
            +{excessCount}
          </div>
        ))}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

