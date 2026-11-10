"use client";

import { useMemo, useState } from "react";
import {
  cond,
  Separator,
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
          <div className="flex flex-col gap-3">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Orientation
            </label>
            <div className="flex rounded-md border border-border p-1 bg-surface">
              <button
                type="button"
                onClick={() => setOrientation("horizontal")}
                className={cond(
                  orientation === "horizontal",
                  "flex-1 px-3 py-1.5 text-xs font-medium rounded-sm bg-background text-foreground shadow-xs transition-colors",
                  "flex-1 px-3 py-1.5 text-xs font-medium rounded-sm text-muted hover:text-foreground transition-colors"
                )}
              >
                Horizontal
              </button>
              <button
                type="button"
                onClick={() => setOrientation("vertical")}
                className={cond(
                  orientation === "vertical",
                  "flex-1 px-3 py-1.5 text-xs font-medium rounded-sm bg-background text-foreground shadow-xs transition-colors",
                  "flex-1 px-3 py-1.5 text-xs font-medium rounded-sm text-muted hover:text-foreground transition-colors"
                )}
              >
                Vertical
              </button>
            </div>
          </div>
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

