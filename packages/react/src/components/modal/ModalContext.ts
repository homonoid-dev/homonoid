"use client";

import { createContext, useContext } from "react";
import type { ModalContextValue } from "./types";

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Modal compound components must be rendered within a Modal component"
    );
  }
  return context;
};
