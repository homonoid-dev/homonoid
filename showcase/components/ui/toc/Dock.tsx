"use client";

import {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  isValidElement,
  type ReactNode,
  type ComponentType,
} from "react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@homonoid/react/cn";
import { cond, when } from "@homonoid/react";
import { TocContext } from "./context";
import type { DockProps, TocItemModel } from "./types";

const EMPTY_ITEMS: TocItemModel[] = [];

function renderIcon(
  icon?: LucideIcon | ComponentType<{ className?: string }> | ReactNode
) {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  const IconComponent = icon as ComponentType<{ className?: string }>;
  return <IconComponent className="size-4" />;
}

export function Dock({
  items: explicitItems,
  className,
  defaultActiveId,
}: DockProps = {}) {
  const context = useContext(TocContext);
  const items = useMemo(
    () => explicitItems ?? context?.items ?? EMPTY_ITEMS,
    [explicitItems, context?.items]
  );

  const [isPointerFine, setIsPointerFine] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mql.matches);
    const update = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const activeId = context?.activeId ?? defaultActiveId ?? items[0]?.id ?? "";
  const isCurrentActiveValid = items.some((item) => item.id === activeId);
  const effectiveActiveId = cond(
    isCurrentActiveValid,
    activeId,
    defaultActiveId ?? items[0]?.id ?? ""
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const [scrollOffset, setScrollOffset] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScrollOffset = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const itemEl = itemRefs.current.get(effectiveActiveId);
    if (!container || !track || !itemEl) return;

    const isLast = items[items.length - 1]?.id === effectiveActiveId;
    const isFirst = items[0]?.id === effectiveActiveId;

    const containerWidth = container.clientWidth;
    const trackWidth = track.scrollWidth;
    const calculatedMax = Math.max(0, trackWidth - containerWidth);
    setMaxScroll(calculatedMax);

    if (calculatedMax <= 0) {
      setScrollOffset(0);
      return;
    }

    let target = 0;
    if (isFirst) {
      target = 0;
    } else if (isLast) {
      target = calculatedMax;
    } else {
      const itemLeft = itemEl.offsetLeft;
      const itemWidth = itemEl.offsetWidth;
      const itemCenter = itemLeft + itemWidth / 2;
      target = itemCenter - containerWidth / 2;
    }

    const clamped = Math.max(0, Math.min(calculatedMax, target));
    setScrollOffset(clamped);
  }, [effectiveActiveId, items]);

  useEffect(() => {
    if (!effectiveActiveId || isPointerFine) return;
    updateScrollOffset();
  }, [effectiveActiveId, isPointerFine, updateScrollOffset]);

  useEffect(() => {
    const handleResize = () => updateScrollOffset();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollOffset]);

  const handleSelect = (id: string) => {
    if (context?.scrollToSection) {
      context.scrollToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        context?.setActiveId?.(id);
        const yOffset = -24;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  if (isPointerFine || !items || items.length === 0) return null;

  return (
    <nav
      data-slot="toc-dock"
      aria-label="Table of contents dock"
      className={cn(
        "fixed bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] left-1/2 -translate-x-1/2 z-30 lg:hidden",
        "max-w-[calc(100vw-2.5rem)] pointer-events-auto select-none",
        className
      )}
    >
      <div className="flex items-center p-1.5 rounded-full bg-surface/90 backdrop-blur-md border-[0.5px] border-border/80 shadow-md overflow-hidden">
        <div
          ref={containerRef}
          className="overflow-hidden max-w-xs sm:max-w-sm md:max-w-md"
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -maxScroll, right: 0 }}
            dragElastic={0.12}
            animate={{ x: -scrollOffset }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className="flex items-center gap-1 px-1 touch-pan-x"
          >
            {items.map((item) => {
              const isSelected = effectiveActiveId === item.id;
              return (
                <motion.button
                  key={item.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.id, el);
                    else itemRefs.current.delete(item.id);
                  }}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-label={item.label}
                  aria-current={cond(isSelected, "location", undefined)}
                  className={cn(
                    "flex items-center rounded-full text-xs font-medium cursor-pointer shrink-0",
                    cond(
                      isSelected,
                      "h-8 px-3 gap-1.5 bg-foreground text-background shadow-xs",
                      "size-8 justify-center text-muted hover:text-foreground hover:bg-surface-hover active:bg-surface-active"
                    )
                  )}
                >
                  {when(
                    Boolean(item.icon),
                    <span className="shrink-0">{renderIcon(item.icon)}</span>
                  )}
                  <AnimatePresence initial={false}>
                    {when(
                      isSelected,
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                          mass: 0.8,
                        }}
                        className="whitespace-nowrap truncate max-w-32 overflow-hidden inline-block"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
