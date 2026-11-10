import type { ReactNode } from "react";

export interface PageProps {
  children?: ReactNode;
}

export function Page({ children: _children }: PageProps = {}) {
  return null;
}

