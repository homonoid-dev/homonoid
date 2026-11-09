"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Eye, Code2, Monitor, Tablet, Smartphone } from "lucide-react";
import { all, cond, when, Heading, Description, Tabs } from "@homonoid/react";
import { Stage } from "./stage";
import { Code } from "./code";
import { useInspector, type InspectorConfig } from "./inspector";

export interface StudioProps {
  title: string;
  description?: string;
  controls?: InspectorConfig;
  code?: string;
  children?: ReactNode;
}

export function Studio({
  title,
  description,
  controls,
  code,
  children,
}: StudioProps) {
  const inspectorContext = useInspector();
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  useEffect(() => {
    if (all(inspectorContext, controls)) {
      inspectorContext?.setConfig(controls ?? null);
      return () => inspectorContext?.setConfig(null);
    }
  }, [inspectorContext, controls]);

  const defaultCode = `import { ${title} } from "@homonoid/react";

export function Example() {
  return (
    <${title} />
  );
}`;

  return (
    <div className="flex flex-col px-layout-x pt-layout-y gap-layout-gap">
      <div className="flex flex-col gap-surface-gap">
        <Heading>{title}</Heading>
        {when(Boolean(description), <Description>{description}</Description>)}
      </div>

      <div className="flex flex-col gap-surface-gap w-full">
        <div className="flex items-center justify-between">
          <Tabs
            value={viewMode}
            onValueChange={(val) => setViewMode(val as "preview" | "code")}
            size="sm"
          >
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

          <Tabs defaultValue="desktop" size="sm">
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

        <Stage
          className={cond(
            viewMode === "code",
            "items-start justify-start overflow-auto p-6",
            undefined
          )}
        >
          {cond(
            viewMode === "code",
            <Code code={code ?? defaultCode} className="w-full" animated />,
            children
          )}
        </Stage>
      </div>
    </div>
  );
}
