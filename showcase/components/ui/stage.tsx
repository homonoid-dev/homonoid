"use client";

import { useState, useCallback, useRef, useEffect, type ReactNode } from "react";
import { Button, Card } from "@harmonia/react";
import { Eye, Code2, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Code } from "@/components/ui/code";
import { cn } from "@harmonia/react/cn";

export interface StageProps {
  code: string;
  children: ReactNode;
  className?: string;
  previewHeight?: number;
  codeHeight?: number;
  defaultTab?: "preview" | "code";
}

export function Stage({
  code,
  children,
  className,
  previewHeight = 280,
  codeHeight = 192,
  defaultTab = "preview",
}: StageProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">(defaultTab);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [code]);

  return (
    <Card className={cn("flex flex-col", className)}>
      {/* Top Toolbar */}
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
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
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
          height: activeTab === "preview" ? previewHeight : codeHeight,
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
                {children}
              </div>
              {/* Bottom counterbalance matching top toolbar */}
              <div
                className="h-control-md shrink-0 pointer-events-none select-none"
                aria-hidden="true"
              />
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
              <Code code={code} className="-mx-surface px-surface" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
}
