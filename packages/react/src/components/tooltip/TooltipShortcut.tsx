import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { TooltipShortcutProps } from "./types";

export const TooltipShortcut = forwardRef<HTMLElement, TooltipShortcutProps>(
  function TooltipShortcut({ children, className, ...props }, ref) {
    return (
      <kbd
        ref={ref}
        data-slot="shortcut"
        className={cn(
          "inline-flex items-center justify-center font-mono text-[10px] tracking-widest uppercase opacity-75 ml-1.5 px-1.5 py-0.5 rounded-xl border border-current/20 bg-current/10 select-none",
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

TooltipShortcut.displayName = "Tooltip.Shortcut";
