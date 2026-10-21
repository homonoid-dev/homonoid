import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { TileTrailingProps } from "./types";

export const TileTrailing = forwardRef<HTMLDivElement, TileTrailingProps>(
  function TileTrailing({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="tile-trailing"
        className={cn(
          "inline-flex shrink-0 items-center justify-center self-center gap-2 text-inherit",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TileTrailing.displayName = "Tile.Trailing";
