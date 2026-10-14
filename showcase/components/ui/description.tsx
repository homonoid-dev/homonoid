import type { HTMLAttributes } from "react";
import { cn } from "@harmonia/react/cn";

export type DescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function Description({ className, children, ...props }: DescriptionProps) {
  return (
    <p className={cn("text-muted", className)} {...props}>
      {children}
    </p>
  );
}
