"use client";

import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  type ReactNode,
} from "react";
import { all, cond, match } from "../../utils/condition";
import type { InputSize } from "./types";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface UseInputNotchedOutlineProps {
  isFloating: boolean;
  isFloated: boolean;
  isOutlined: boolean;
  label?: ReactNode;
  leading?: ReactNode;
  size: InputSize;
}

export function useInputNotchedOutline({
  isFloating,
  isFloated,
  isOutlined,
  label,
  leading,
  size,
}: UseInputNotchedOutlineProps) {
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
    match(size, { sm: 34, md: 38, lg: 44 }, 38),
    match(size, { sm: 10, md: 12, lg: 16 }, 12)
  );

  const notchX1 = cond(
    notchGeometry !== null,
    Math.max(0, (notchGeometry?.left ?? defaultNotchLeft) - 4),
    defaultNotchLeft
  );

  const notchX2 = cond(
    notchGeometry !== null,
    notchX1 + (notchGeometry?.width ?? 64) + 8,
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

