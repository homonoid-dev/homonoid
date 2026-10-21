import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { TileContentProps } from "./types";

export const TileContent = forwardRef<HTMLDivElement, TileContentProps>(
  function TileContent({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="tile-content"
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-center text-left gap-0.5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TileContent.displayName = "Tile.Content";
