"use client";

import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  type ReactNode,
} from "react";
import { all, cond, match } from "../../utils/condition";
import type { TextareaSize } from "./types";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface UseTextareaNotchedOutlineProps {
  isFloating: boolean;
  isFloated: boolean;
  isOutlined: boolean;
  label?: ReactNode;
  leading?: ReactNode;
  size: TextareaSize;
}

export function useTextareaNotchedOutline({
  isFloating,
  isFloated,
  isOutlined,
  label,
  leading,
  size,
}: UseTextareaNotchedOutlineProps) {
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [notchGeometry, setNotchGeometry] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!isFloating || !isOutlined) return;
    const labelEl = labelRef.current;
    const containerEl = containerRef.current;
    if (!labelEl || !containerEl) return;

    const labelRect = labelEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    const left = Math.round(labelRect.left - containerRect.left);
    const unscaledWidth = labelEl.offsetWidth || labelRect.width;
    const width = Math.round(unscaledWidth * 0.85);

    if (width > 0) {
      setNotchGeometry({ left, width });
    }
  }, [isFloating, isOutlined, label, leading, size]);

  const defaultNotchLeft = cond(
    Boolean(leading),
    match(size, { sm: 32, md: 36, lg: 40 }, 36),
    match(size, { sm: 10, md: 12, lg: 14 }, 12)
  );

  const notchX1 = cond(
    notchGeometry !== null,
    Math.max(0, (notchGeometry?.left ?? defaultNotchLeft) - 5),
    defaultNotchLeft
  );

  const notchX2 = cond(
    notchGeometry !== null,
    notchX1 + (notchGeometry?.width ?? 64) + 7,
    notchX1 + 72
  );

  const notchMid = Math.round((notchX1 + notchX2) / 2);
  const isNotchActive = all(isFloating, isFloated, isOutlined);

  // Symmetrical center-out GPU transition:
  // Open: notch expands symmetrically outward from center to notchX1 and notchX2 with 10px depth
  // Closed: notch contracts symmetrically inward to center and retreats above border with -4px depth
  const clipPath = cond(
    isOutlined,
    cond(
      isNotchActive,
      `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, ${notchX2}px 0%, ${notchX2}px 10px, ${notchX1}px 10px, ${notchX1}px 0%)`,
      `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, ${notchMid}px 0%, ${notchMid}px -4px, ${notchMid}px -4px, ${notchMid}px 0%)`
    ),
    undefined
  );

  return {
    labelRef,
    containerRef,
    clipPath,
  };
}

