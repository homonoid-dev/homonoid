"use client";

import { forwardRef } from "react";
import { useDropdownContext } from "./DropdownContext";
import { cn } from "../../utils/cn";
import type { DropdownListProps } from "./types";

export const DropdownList = forwardRef<HTMLDivElement, DropdownListProps>(
  function DropdownList({ children, className, ...props }, ref) {
    const { menuId, triggerId } = useDropdownContext();

    return (
      <div
        ref={ref}
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        tabIndex={-1}
        className={cn(
          "relative flex max-h-72 flex-col overflow-y-auto p-0.5 gap-0.5 select-none focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownList.displayName = "Dropdown.List";
