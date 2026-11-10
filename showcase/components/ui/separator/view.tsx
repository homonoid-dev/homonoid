"use client";

import { useMemo, useState } from "react";
import {
  cond,
  Separator,
  Tabs,
  type SeparatorOrientation,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getSeparatorCode } from "./model";

export function SeparatorView() {
  const [orientation, setOrientation] = useState<SeparatorOrientation>("horizontal");
  const [decorative, setDecorative] = useState(true);

  const code = useMemo(
    () =>
      getSeparatorCode({
        orientation,
        decorative,
      }),
    [orientation, decorative]
  );

  return (
    <Studio
      title="Separator"
      description="Hairline structural partition dividing layout sections, navigation bars, and control clusters while preserving spatial continuum."
      code={code}
      controls={{
        children: (
          <Tabs
            value={orientation}
            onValueChange={(val) => setOrientation(val as SeparatorOrientation)}
            size="sm"
            radius="lg"
          >
            <Tabs.List className="w-full">
              <Tabs.Tab value="horizontal" className="flex-1">
                Horizontal
              </Tabs.Tab>
              <Tabs.Tab value="vertical" className="flex-1">
                Vertical
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        ),
        switches: [
          {
            id: "decorative",
            label: "Decorative",
            description: "Omit semantic separator role from assistive technology",
            checked: decorative,
            onChange: setDecorative,
          },
        ],
      }}
    >
      <div className="flex items-center justify-center p-12 w-full max-w-sm">
        {cond(
          orientation === "vertical",
          <div className="flex items-center gap-3 h-8">
            <span className="text-sm font-medium text-foreground">Overview</span>
            <Separator orientation="vertical" decorative={decorative} className="h-4" />
            <span className="text-sm text-muted">Analytics</span>
            <Separator orientation="vertical" decorative={decorative} className="h-4" />
            <span className="text-sm text-muted">Settings</span>
          </div>,
          <div className="flex flex-col gap-3 w-full">
            <div className="text-sm font-medium text-foreground">Workspace Overview</div>
            <Separator orientation="horizontal" decorative={decorative} />
            <div className="text-sm text-muted">
              All active repository branches and deployments.
            </div>
          </div>
        )}
      </div>
    </Studio>
  );
}
