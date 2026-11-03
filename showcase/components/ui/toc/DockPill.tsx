"use client";

import { useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { ChevronsUpDown } from "lucide-react";
import { Label, Progress } from "@homonoid/react";
import { cn } from "@homonoid/react/cn";

export interface DockPillProps {
  componentName: string;
  onOpen: () => void;
  className?: string;
  children?: ReactNode;
}

export function DockPill({
  componentName,
  onOpen,
  className,
  children,
}: DockPillProps) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001,
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollProgress(Math.round(latest * 100));
  });

  return (
    <motion.div
      layoutId="dock-surface"
      onClick={onOpen}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
      className={cn(
        "fixed bottom-layout inset-x-layout mx-auto h-10 rounded-full bg-surface/50 backdrop-blur-md border border-border/60 z-30 pointer-events-auto cursor-pointer flex items-center justify-between px-3 overflow-hidden",
        className
      )}
    >
      <motion.div
        layout="position"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -8,
          transition: { duration: 0.10, ease: "easeOut" },
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
          mass: 0.7,
          delay: 0.38,
        }}
        className="flex items-center gap-2 min-w-0"
      >
        <Progress
          value={scrollProgress}
          variant="circular"
          size="sm"
          color="surface"
          aria-hidden="true"
        />
        <Label size="sm" className="truncate select-none">
          {componentName}
        </Label>
      </motion.div>

      <motion.div
        layout="position"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{
          opacity: 0,
          y: -8,
          transition: { duration: 0.10, ease: "easeOut" },
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
          mass: 0.7,
          delay: 0.38,
        }}
        className="flex items-center justify-center size-4 shrink-0 text-muted"
        aria-hidden="true"
      >
        <ChevronsUpDown className="size-4" />
      </motion.div>
      {children}
    </motion.div>
  );
}

