"use client";

import { forwardRef } from "react";
import { Toggle } from "./Toggle";
import type { ToggleItemProps } from "./types";

export const ToggleItem = forwardRef<HTMLButtonElement, ToggleItemProps>(
  function ToggleItem(props, ref) {
    return <Toggle ref={ref} data-slot="toggle-item" {...props} />;
  }
);

ToggleItem.displayName = "Toggle.Item";

