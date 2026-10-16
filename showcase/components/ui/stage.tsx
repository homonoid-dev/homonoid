"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { Button, Card, Tooltip, iff } from "@harmonia/react";
import { Eye, Code2, Copy, Check, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Code } from "@/components/ui/code";
import { cn } from "@harmonia/react/cn";

export interface StageProps {
  code: string;
  children: ReactNode;
  className?: string;
  /** Optional explicit height override for the preview tab */
  previewHeight?: number;
  /** Optional explicit height override for the code tab */
  codeHeight?: number;
  /** Minimum height for the preview canvas (default: 220) */
  minPreviewHeight?: number;
  /** Default active tab */
  defaultTab?: "preview" | "code";
  /** Optional callback to reset component preview state */
  onReset?: () => void;
}

export function Stage({
  code,
  children,
  className,
  previewHeight,
  codeHeight,
  minPreviewHeight = 220,
  defaultTab = "preview",
  onReset,
}: StageProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">(defaultTab);
  const [copied, setCopied] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState<number | "auto">("auto");

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Measures the active tab's entering content dynamically without lagging
  const measurer = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (node) {
      const rect = node.getBoundingClientRect();
      if (rect.height > 0) {
        setMeasuredHeight(rect.height);
      }

      const observer = new ResizeObserver(([entry]) => {
        if (entry) {
          const h =
            entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
          if (h > 0) {
            setMeasuredHeight(h);
          }
        }
      });

      observer.observe(node);
      observerRef.current = observer;
    }
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

  // Use explicit height override if provided, otherwise use measured dynamic height
  const targetHeight =
    activeTab === "preview"
      ? (previewHeight ?? measuredHeight)
      : (codeHeight ?? measuredHeight);

  return (
    <Card className={cn("flex flex-col", className)}>
      {/* Top Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Tooltip side="bottom" content="Preview">
            <Button
              layout="icon"
              variant={iff(activeTab === "preview", "contained", "plain")}
              color="surface"
              shape="circle"
              onClick={() => setActiveTab("preview")}
              aria-label="Preview"
            >
              <Eye className="size-4" />
            </Button>
          </Tooltip>

          <Tooltip side="bottom" content="Code">
            <Button
              layout="icon"
              variant={iff(activeTab === "code", "contained", "plain")}
              color="surface"
              shape="circle"
              onClick={() => setActiveTab("code")}
              aria-label="Code"
            >
              <Code2 className="size-4" />
            </Button>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1">
          {onReset && (
            <Tooltip content="Reset stage">
              <Button
                layout="icon"
                variant="plain"
                color="subtle"
                shape="circle"
                onClick={onReset}
                aria-label="Reset"
              >
                <RotateCcw className="size-4" />
              </Button>
            </Tooltip>
          )}

          <Tooltip side="bottom" content={iff(copied, "Copied to clipboard", "Copy code")}>
            <Button
              layout="icon"
              variant="plain"
              color="subtle"
              shape="circle"
              onClick={handleCopy}
              aria-label={iff(copied, "Copied", "Copy code")}
            >
              {iff(
                copied,
                <Check className="size-4 text-primary" />,
                <Copy className="size-4" />
              )}
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Dynamically Animated Content Area */}
      <motion.div
        initial={false}
        animate={{
          height: targetHeight,
        }}
        transition={{
          duration: 0.3,
          ease: [0.2, 0, 0, 1],
        }}
        className="relative overflow-hidden"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              ref={measurer}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              style={{ minHeight: minPreviewHeight }}
              className="flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center p-6">
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
              ref={measurer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="pt-3"
            >
              <Code code={code} className="-mx-surface px-surface" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
}
