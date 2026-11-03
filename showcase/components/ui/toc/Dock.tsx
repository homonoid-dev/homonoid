"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { ChevronsUpDown } from "lucide-react";
import { Label } from "@homonoid/react";
import { cn } from "@homonoid/react/cn";
import { SHOWCASE_COMPONENTS } from "@/config/components";
import type { DockProps } from "./types";

export function Dock({ className, children }: DockProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const componentItem = useMemo(
    () => SHOWCASE_COMPONENTS.find((item) => item.href === pathname),
    [pathname]
  );
  const componentName = useMemo(() => {
    if (componentItem?.name) return componentItem.name;
    const segment = pathname?.split("/").filter(Boolean).pop();
    if (!segment) return "Components";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  }, [componentItem, pathname]);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001,
  });

  const openModal = () => {
    setIsOpen(true);
    if (typeof window !== "undefined") {
      window.history.pushState({ dockModal: true }, "", "#dock");
    }
  };

  const closeModal = () => {
    if (typeof window !== "undefined" && window.location.hash === "#dock") {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setIsOpen(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className={cn("md:hidden pointer-events-none", className)}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            key="dock-pill"
            layoutId="dock-surface"
            onClick={openModal}
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
              initial={{ opacity: 0, x: -56 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: -36,
                transition: { duration: 0.10, ease: "easeOut" },
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
                mass: 0.7,
                delay: 0.25,
              }}
              className="flex items-center gap-2 min-w-0"
            >
              {/* Smooth spring scroll progress indicator */}
              <div className="flex items-center justify-center size-4 shrink-0 text-foreground" aria-hidden="true">
                <svg
                  className="w-full h-full -rotate-90 origin-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="opacity-20"
                  />
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="9.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ pathLength: smoothProgress }}
                  />
                </svg>
              </div>

              {/* Component Name Label */}
              <Label size="sm" className="truncate leading-none select-none">
                {componentName}
              </Label>
            </motion.div>

            {/* Expand indicator with up and down arrows */}
            <motion.div
              layout="position"
              initial={{ opacity: 0, x: 56 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: 36,
                transition: { duration: 0.10, ease: "easeOut" },
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
                mass: 0.7,
                delay: 0.25,
              }}
              className="flex items-center justify-center size-4 shrink-0 text-muted"
              aria-hidden="true"
            >
              <ChevronsUpDown className="size-4" />
            </motion.div>
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="dock-modal"
            layoutId="dock-surface"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 400) {
                closeModal();
              }
            }}
            onClick={closeModal}
            transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
            className="fixed inset-0 z-50 pointer-events-auto flex flex-col w-full h-full rounded-none bg-surface overflow-hidden cursor-pointer"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
