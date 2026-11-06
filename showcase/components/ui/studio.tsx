"use client";

import type { ReactNode } from "react";
import { Eye, Code2, Monitor, Tablet, Smartphone } from "lucide-react";
import { Heading, Description, Tabs } from "@homonoid/react";

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
    <div className="flex flex-col px-layout-x pt-layout-y gap-layout-gap">
      <div className="flex flex-col gap-surface-gap">
        <Heading size="lg">{title}</Heading>
        {description && (
          <Description>
            {description}
          </Description>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="preview">
          <Tabs.List>
            <Tabs.Tab
              value="preview"
              layout="icon"
              aria-label="Preview"
              title="Preview"
            >
              <Eye className="size-3.5 shrink-0" />
            </Tabs.Tab>
            <Tabs.Tab
              value="code"
              layout="icon"
              aria-label="Code"
              title="Code"
            >
              <Code2 className="size-3.5 shrink-0" />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        <Tabs defaultValue="desktop">
          <Tabs.List>
            <Tabs.Tab
              value="desktop"
              layout="icon"
              aria-label="Desktop viewport"
              title="Desktop"
            >
              <Monitor className="size-3.5 shrink-0" />
            </Tabs.Tab>
            <Tabs.Tab
              value="tablet"
              layout="icon"
              aria-label="Tablet viewport"
              title="Tablet"
            >
              <Tablet className="size-3.5 shrink-0" />
            </Tabs.Tab>
            <Tabs.Tab
              value="mobile"
              layout="icon"
              aria-label="Mobile viewport"
              title="Mobile"
            >
              <Smartphone className="size-3.5 shrink-0" />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>

      {children && (
        <div className="flex flex-col w-full">
          {children}
        </div>
      )}
    </div>
  );
}

