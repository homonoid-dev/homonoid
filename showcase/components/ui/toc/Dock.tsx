"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@homonoid/react/cn";
import type { DockProps } from "./types";

export function Dock({ className, children }: DockProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

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
              "fixed bottom-layout inset-x-layout mx-auto h-10 rounded-full bg-surface/50 backdrop-blur-md border border-border/60 z-30 pointer-events-auto cursor-pointer",
              className
            )}
          >
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
            initial={{ borderRadius: 9999 }}
            animate={{ borderRadius: 0 }}
            exit={{ borderRadius: 9999 }}
            transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
            className="fixed inset-0 z-50 pointer-events-auto flex flex-col w-full h-full bg-surface/50 backdrop-blur-md border border-border/60 overflow-hidden cursor-pointer"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
