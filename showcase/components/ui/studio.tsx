"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Eye, Code2, Monitor, Tablet, Smartphone, ChevronLeft, ChevronRight, Maximize, Copy, Check } from "lucide-react";
import { all, cond, when, Heading, Description, Tabs, Button, Breadcrumb } from "@homonoid/react";
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
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code ?? defaultCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap">
      <div className="flex flex-col gap-surface-sm">
        <Breadcrumb size="sm">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link as={Link} href="/components">
                Components
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>{title}</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>

        <div className="flex flex-col gap-1.5">
          <Heading>{title}</Heading>
          {when(Boolean(description), <Description>{description}</Description>)}
        </div>
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

          <div className="flex items-center gap-control-gap">
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
                <Tabs.Tab
                  value="fullscreen"
                  layout="icon"
                  aria-label="Fullscreen"
                  title="Fullscreen"
                >
                  <Maximize className="size-3.5 shrink-0" />
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <Button
              variant="contained"
              color="surface"
              layout="icon"
              aria-label={cond(copied, "Copied code", "Copy code")}
              title={cond(copied, "Copied", "Copy code")}
              onClick={handleCopy}
            >
              {cond(
                copied,
                <Check className="size-3.5 text-primary shrink-0" />,
                <Copy className="size-3.5 shrink-0" />
              )}
            </Button>
          </div>
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
          <nav aria-label="Component pagination" className="flex items-center justify-between w-full pt-surface">
            {when(
              Boolean(prevComponent),
              <Button
                variant="outlined"
                color="surface"
                radius="full"
                leading={<ChevronLeft className="size-3.5 shrink-0" />}
                onClick={() => prevComponent && router.push(prevComponent.href)}
                className="pr-6"
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
                className="pl-6"
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
