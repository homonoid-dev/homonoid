"use client";

import { useState } from "react";
import { Button, Label } from "@harmonia/react";
import { Description } from "@/components/ui/description";
import { Check, Code2, Copy, Eye, Infinity as InfinityIcon, Layers } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import { Code, highlighter } from "@/components/ui/code";

const CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="contained" shape="circle">
      Click me
    </Button>
  );
}`;

export function ButtonView() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SAMPLE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col px-layout-x pt-layout-y gap-layout-gap max-w-4xl pb-16">
      {/* View Header */}
      <div className="flex flex-col gap-control-gap">
        <Label size="lg">Button</Label>
        <Description>
          A button communicates an action and allows users to trigger that action with a single interaction.
        </Description>
      </div>

      <a
        href="https://github.com/lumunar/harmonia/tree/main/packages/react"
        target="_blank"
        rel="noreferrer"
        className="w-fit"
      >
        <Button
          variant="outlined"
          color="surface"
          shape="circle"
          leading={<GithubIcon className="size-3.5" />}
        >
          Source
        </Button>
      </a>

      {/* Component Area */}
      <section className="flex flex-col gap-surface-gap">
        {/* Subtle Import Card */}
        <div className="flex items-center justify-between p-surface rounded-3xl bg-subtle text-subtle-foreground border-[0.5px] border-subtle-border font-mono text-xs select-text">
          <code>{highlighter('import { Button } from "@harmonia/react";')}</code>
        </div>

        {/* Card */}
        <div className="border-[0.5px] p-surface border-border/50 rounded-3xl overflow-hidden">
          {/* Card Top Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                layout="icon"
                variant={activeTab === "preview" ? "contained" : "plain"}
                color="surface"
                shape="circle"
                onClick={() => setActiveTab("preview")}
                aria-label="Preview"
              >
                <Eye className="size-4" />
              </Button>
              <Button
                layout="icon"
                variant={activeTab === "code" ? "contained" : "plain"}
                color="surface"
                shape="circle"
                onClick={() => setActiveTab("code")}
                aria-label="Code"
              >
                <Code2 className="size-4" />
              </Button>
            </div>

            <Button
              layout="icon"
              variant="plain"
              color="subtle"
              shape="circle"
              onClick={handleCopyCode}
              aria-label={copiedCode ? "Copied" : "Copy code"}
            >
              {copiedCode ? (
                <Check className="size-4 text-primary" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>

          {/* Stage */}
          {activeTab === "preview" ? (
            <div className="p-8 md:p-14 flex items-center justify-center min-h-[220px]">
              <Button variant="contained" shape="circle">
                Click me
              </Button>
            </div>
          ) : (
            <Code code={CODE_SAMPLE} />
          )}

        </div>

        {/* Hierarchy & Continuity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-surface-gap">
          <div className="flex flex-col gap-4 p-surface rounded-3xl border-[0.5px] border-border/50">
            <div className="size-control-md rounded-full border border-border flex items-center justify-center shrink-0">
              <Layers className="size-4" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label size="md">Hierarchy</Label>
              <Description className="text-sm text-muted leading-relaxed">
                Contained, outlined, and plain variants define clear visual priority, anchoring primary calls to action while keeping secondary tasks balanced.
              </Description>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-surface rounded-3xl border-[0.5px] border-border/50">
            <div className="size-control-md rounded-full border border-border flex items-center justify-center shrink-0">
              <InfinityIcon className="size-4" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label size="md">Continuity</Label>
              <Description className="text-sm text-muted leading-relaxed">
                State transitions preserve component identity and dimensional stability. Actions evolve smoothly across hover, pressed, and loading states without layout shifts.
              </Description>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
