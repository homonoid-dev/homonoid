import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { TileLeadingProps } from "./types";

export const TileLeading = forwardRef<HTMLDivElement, TileLeadingProps>(
  function TileLeading({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="tile-leading"
        className={cn(
          "inline-flex shrink-0 items-center justify-center self-center text-inherit",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TileLeading.displayName = "Tile.Leading";
