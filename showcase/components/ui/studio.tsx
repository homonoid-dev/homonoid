import type { ReactNode } from "react";
import { Heading, Description } from "@homonoid/react";

export interface StudioProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function Studio({
  title,
  description,
  children,
}: StudioProps) {
  return (
    <div className="flex flex-col px-layout-x pt-layout-y gap-layout-gap w-full">
      <div className="flex flex-col gap-control-gap">
        <Heading size="lg">{title}</Heading>
        {description && (
          <Description>
            {description}
          </Description>
        )}
      </div>

      {children && (
        <div className="flex flex-col w-full">
          {children}
        </div>
      )}
    </div>
  );
}

