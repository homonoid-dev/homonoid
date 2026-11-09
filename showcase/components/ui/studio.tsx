"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Eye, Code2, Monitor, Tablet, Smartphone, ChevronLeft, ChevronRight } from "lucide-react";
import { all, cond, when, Heading, Description, Tabs, Button } from "@homonoid/react";
import { COMPONENTS } from "@/config/components";
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
  const pathname = usePathname();
  const router = useRouter();

  const currentIndex = COMPONENTS.findIndex(
    (c) => c.href === pathname || c.name.toLowerCase() === title.toLowerCase()
  );

  const prevComponent = cond(currentIndex > 0, COMPONENTS[currentIndex - 1], undefined);
  const nextComponent = cond(
    currentIndex >= 0 && currentIndex < COMPONENTS.length - 1,
    COMPONENTS[currentIndex + 1],
    undefined
  );

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
    <div className="flex flex-col px-layout-x pt-layout-y pb-layout-y gap-layout-gap">
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
            "block p-0 overflow-hidden",
            undefined
          )}
        >
          {cond(
            viewMode === "code",
            <Code code={code ?? defaultCode} className="w-full" animated />,
            children
          )}
        </Stage>

        {when(
          Boolean(prevComponent || nextComponent),
          <nav aria-label="Component pagination" className="flex items-center w-full pt-surface">
            {when(
              Boolean(prevComponent),
              <Button
                variant="outlined"
                color="surface"
                radius="full"
                leading={<ChevronLeft className="size-3.5 shrink-0" />}
                onClick={() => prevComponent && router.push(prevComponent.href)}
              >
                {prevComponent?.name}
              </Button>
            )}

            {when(
              Boolean(nextComponent),
              <Button
                variant="outlined"
                color="surface"
                radius="full"
                trailing={<ChevronRight className="size-3.5 shrink-0" />}
                onClick={() => nextComponent && router.push(nextComponent.href)}
                className="ml-auto"
              >
                {nextComponent?.name}
              </Button>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
