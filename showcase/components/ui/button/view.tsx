"use client";

import { useState } from "react";
import { Button, Label } from "@harmonia/react";
import { Description } from "@/components/ui/description";
import { Check, Code2, Copy, Eye } from "lucide-react";
import GithubIcon from "@/components/icons/github";

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
    <div className="flex flex-col px-layout-x pt-layout-y gap-layout-gap max-w-4xl">
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
          size="sm"
          leading={<GithubIcon className="size-3.5" />}
        >
          Source
        </Button>
      </a>

      {/* Component Area */}
      <section className="flex flex-col gap-surface-gap">
        {/* Subtle Import Card */}
        <div className="flex items-center justify-between p-4 rounded-3xl bg-subtle text-subtle-foreground border-[0.5px] border-subtle-border font-mono text-xs select-text">
          <code>import &#123; Button &#125; from &quot;@harmonia/react&quot;;</code>
        </div>

        {/* Card */}
        <div className="border-[0.5px] border-border/50 rounded-3xl overflow-hidden">
          {/* Card Top Toolbar */}
          <div className="flex items-center justify-between p-4">
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
            <div className="p-4 md:p-6 overflow-x-auto text-xs font-mono leading-relaxed select-text">
              <pre className="text-foreground">
                <code>
                  <span className="text-primary">import</span> &#123; Button &#125; <span className="text-primary">from</span> <span className="text-muted">&quot;@harmonia/react&quot;</span>;{"\n\n"}
                  <span className="text-primary">export function</span> <span className="text-foreground font-semibold">Example</span>() &#123;{"\n"}
                  {"  "}<span className="text-primary">return</span> ({"\n"}
                  {"    "}&lt;<span className="text-primary font-semibold">Button</span> <span className="text-muted">variant</span>=<span className="text-muted">&quot;contained&quot;</span> <span className="text-muted">shape</span>=<span className="text-muted">&quot;circle&quot;</span>&gt;{"\n"}
                  {"      "}Click me{"\n"}
                  {"    "}&lt;/<span className="text-primary font-semibold">Button</span>&gt;{"\n"}
                  {"  "});{"\n"}
                  &#125;
                </code>
              </pre>
            </div>
          )}

          {/* Bottom height counterbalance matching top toolbar */}
          <div className="p-4 pointer-events-none select-none" aria-hidden="true">
            <div className="h-control-md" />
          </div>
        </div>
      </section>
    </div>
  );
}
