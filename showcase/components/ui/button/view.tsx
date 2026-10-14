"use client";

import { useState } from "react";
import { Button, Label, Card } from "@harmonia/react";
import { Description } from "@/components/ui/description";
import { Check, Code2, Copy, Eye, Circle } from "lucide-react";
import GithubIcon from "@/components/icons/github";
import { Code, highlighter } from "@/components/ui/code";
import { motion, AnimatePresence } from "motion/react";

const CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="contained" shape="circle">
      Click me
    </Button>
  );
}`;

const OUTLINED_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="outlined" shape="circle">
      Click me
    </Button>
  );
}`;

export function ButtonView() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copiedCode, setCopiedCode] = useState(false);

  const [outlinedTab, setOutlinedTab] = useState<"preview" | "code">("preview");
  const [copiedOutlinedCode, setCopiedOutlinedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SAMPLE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyOutlinedCode = () => {
    navigator.clipboard.writeText(OUTLINED_CODE_SAMPLE);
    setCopiedOutlinedCode(true);
    setTimeout(() => setCopiedOutlinedCode(false), 2000);
  };

  return (
    <div className="flex flex-col px-layout-x py-layout-y gap-layout-gap max-w-4xl">
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
        <Card className="flex flex-col">
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

          {/* Animated Content Area */}
          <motion.div
            initial={false}
            animate={{
              height: activeTab === "preview" ? 280 : 192,
            }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0, 0, 1],
            }}
            className="relative overflow-hidden"
          >
            <AnimatePresence initial={false}>
              {activeTab === "preview" ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="flex-1 flex items-center justify-center">
                    <Button variant="contained" shape="circle">
                      Click me
                    </Button>
                  </div>
                  {/* Bottom counterbalance matching top toolbar */}
                  <div className="h-control-md shrink-0 pointer-events-none select-none" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="absolute inset-0 pt-3"
                >
                  <Code
                    code={CODE_SAMPLE}
                    className="-mx-surface px-surface"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Card>
      </section>

      {/* Outlined Section */}
      <section className="flex flex-col gap-surface-gap py-layout-y">
        <div className="flex flex-row gap-surface-gap items-center">
          <div className="size-control-md rounded-full border-[0.5px] border-primary-border flex items-center justify-center shrink-0">
            <Circle className="size-4 text-primary" />
          </div>
          <Label size="lg" as="h2">Outlined</Label>
        </div>

        <Card className="flex flex-col">
          {/* Card Top Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                layout="icon"
                variant={outlinedTab === "preview" ? "contained" : "plain"}
                color="surface"
                shape="circle"
                onClick={() => setOutlinedTab("preview")}
                aria-label="Preview"
              >
                <Eye className="size-4" />
              </Button>
              <Button
                layout="icon"
                variant={outlinedTab === "code" ? "contained" : "plain"}
                color="surface"
                shape="circle"
                onClick={() => setOutlinedTab("code")}
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
              onClick={handleCopyOutlinedCode}
              aria-label={copiedOutlinedCode ? "Copied" : "Copy code"}
            >
              {copiedOutlinedCode ? (
                <Check className="size-4 text-primary" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>

          {/* Animated Content Area */}
          <motion.div
            initial={false}
            animate={{
              height: outlinedTab === "preview" ? 280 : 192,
            }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0, 0, 1],
            }}
            className="relative overflow-hidden"
          >
            <AnimatePresence initial={false}>
              {outlinedTab === "preview" ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="flex-1 flex items-center justify-center">
                    <Button variant="outlined" shape="circle">
                      Click me
                    </Button>
                  </div>
                  {/* Bottom counterbalance matching top toolbar */}
                  <div className="h-control-md shrink-0 pointer-events-none select-none" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="absolute inset-0 pt-3"
                >
                  <Code
                    code={OUTLINED_CODE_SAMPLE}
                    className="-mx-surface px-surface"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Card>
      </section>
    </div>
  );
}
