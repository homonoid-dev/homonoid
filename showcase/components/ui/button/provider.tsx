"use client";

import { createContext, type ReactNode } from "react";
import type { ButtonViewModel } from "./model";
import { useButtonViewModel } from "./view-model";

export const ButtonContext = createContext<ButtonViewModel | null>(null);

export interface ButtonProviderProps {
  children: ReactNode;
  value?: ButtonViewModel;
}

export function ButtonProvider({ children, value }: ButtonProviderProps) {
  const defaultViewModel = useButtonViewModel();
  const viewModel = value ?? defaultViewModel;

  return (
    <ButtonContext.Provider value={viewModel}>
      {children}
    </ButtonContext.Provider>
  );
}
