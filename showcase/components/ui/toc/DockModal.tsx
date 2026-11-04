"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useDragControls,
  useMotionValue,
  animate,
} from "motion/react";
import { Search } from "lucide-react";
import { Searchbar, Sidebar } from "@homonoid/react";
import { SHOWCASE_COMPONENTS } from "@/config/components";

export interface DockModalProps {
  pathname: string;
  onClose: () => void;
  onSelect: (href: string) => void;
}

export function DockModal({ pathname, onClose, onSelect }: DockModalProps) {
  const dragControls = useDragControls();
  const modalY = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SHOWCASE_COMPONENTS;
    return SHOWCASE_COMPONENTS.filter((component) =>
      component.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    modalY.set(0);
    setSearchQuery("");
  }, [pathname, modalY]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    let startY = 0;
    let startTime = 0;
    let isPullingDown = false;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
      isPullingDown = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;
      const scrollTop = el.scrollTop;

      // When at the very top of the list and pulling downward beyond tap threshold
      if (scrollTop <= 0 && deltaY > 8) {
        isPullingDown = true;
        if (e.cancelable) {
          e.preventDefault();
        }
        modalY.set(deltaY - 8);
      } else if (isPullingDown && deltaY <= 0) {
        modalY.set(0);
        isPullingDown = false;
      }
    };

    const onTouchEnd = () => {
      if (isPullingDown) {
        const currentY = modalY.get();
        const elapsed = Date.now() - startTime;
        const velocity = (currentY / Math.max(elapsed, 1)) * 1000;

        if (currentY > 80 || velocity > 400) {
          onClose();
        } else {
          animate(modalY, 0, {
            type: "spring",
            stiffness: 350,
            damping: 28,
            mass: 0.8,
          });
        }
      }
      isPullingDown = false;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [onClose, modalY]);

  return (
    <motion.div
      layoutId="dock-surface"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation dock"
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.6 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 80 || info.velocity.y > 400) {
          onClose();
        }
      }}
      style={{ y: modalY }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
      className="fixed inset-0 z-50 pointer-events-auto flex flex-col w-full h-full rounded-none overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.08,
              staggerChildren: 0.018,
            },
          },
          exit: {
            opacity: 0,
            transition: { duration: 0.10, ease: "easeOut" },
          },
        }}
        className="flex flex-col w-full h-full overflow-hidden"
      >

        <Sidebar width="w-full">
          <Sidebar.Header
            sticky
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).tagName !== "INPUT") {
                dragControls.start(e);
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 350, damping: 28 },
                },
                exit: { opacity: 0, transition: { duration: 0.08 } },
              }}
            >
              <Searchbar
                size="sm"
                radius="lg"
                placeholder="Search components"
                leading={<Search className="size-3.5 text-muted shrink-0" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full backdrop-blur-sm"

              />
            </motion.div>
          </Sidebar.Header>
          <Sidebar.Content
            ref={contentRef}
          >
            {filteredComponents.map((component) => (
              <motion.div
                key={component.href}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 350, damping: 28 },
                  },
                  exit: { opacity: 0, transition: { duration: 0.08 } },
                }}
              >
                <Sidebar.Item
                  as={Link}
                  href={component.href}
                  active={pathname === component.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchQuery("");
                    onSelect(component.href);
                  }}
                >
                  {component.name}
                </Sidebar.Item>
              </motion.div>
            ))}
          </Sidebar.Content>
        </Sidebar>
      </motion.div>
    </motion.div>
  );
}

