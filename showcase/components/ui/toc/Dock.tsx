"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { cn } from "@homonoid/react/cn";
import { SHOWCASE_COMPONENTS } from "@/config/components";
import { DockPill } from "./DockPill";
import { DockModal } from "./DockModal";
import type { DockProps } from "./types";

export function Dock({ className, children }: DockProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  const openModal = useCallback(() => {
    setIsOpen(true);
    if (typeof window !== "undefined") {
      window.history.pushState({ dockModal: true }, "", "#dock");
    }
  }, []);

  const closeModal = useCallback(() => {
    if (typeof window !== "undefined" && window.location.hash === "#dock") {
      window.history.back();
    } else {
      setIsOpen(false);
    }
  }, []);

  const handleSelect = useCallback((href: string) => {
    setIsOpen(false);
    if (typeof window !== "undefined" && window.location.hash === "#dock") {
      window.history.replaceState(null, "", href);
    }
    router.push(href);
  }, [router]);

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
  }, [isOpen, closeModal]);

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
          <DockPill
            key="dock-pill"
            componentName={componentName}
            onOpen={openModal}
            className={className}
          >
            {children}
          </DockPill>
        ) : (
          <DockModal
            key="dock-modal"
            pathname={pathname}
            onClose={closeModal}
            onSelect={handleSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
