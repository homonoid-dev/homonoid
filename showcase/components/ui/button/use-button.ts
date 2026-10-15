"use client";

import { useContext } from "react";
import { ButtonContext } from "./provider";
import type { ButtonViewModel } from "./model";

export function useButton(): ButtonViewModel {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("useButton must be used within a ButtonProvider");
  }
  return context;
}
