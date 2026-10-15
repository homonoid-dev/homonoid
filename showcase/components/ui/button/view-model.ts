"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  type ButtonTab,
  type ButtonViewModel,
  BUTTON_CODE_SAMPLE,
  BUTTON_OUTLINED_CODE_SAMPLE,
  PREVIEW_CARD_HEIGHT,
  CODE_CARD_HEIGHT,
} from "./model";

export function useButtonViewModel(): ButtonViewModel {
  const [activeTab, setActiveTab] = useState<ButtonTab>("preview");
  const [copiedCode, setCopiedCode] = useState(false);

  const [outlinedTab, setOutlinedTab] = useState<ButtonTab>("preview");
  const [copiedOutlinedCode, setCopiedOutlinedCode] = useState(false);

  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const outlinedCopyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      if (outlinedCopyTimeoutRef.current) clearTimeout(outlinedCopyTimeoutRef.current);
    };
  }, []);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(BUTTON_CODE_SAMPLE);
    setCopiedCode(true);

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedCode(false);
    }, 2000);
  }, []);

  const handleCopyOutlinedCode = useCallback(() => {
    navigator.clipboard.writeText(BUTTON_OUTLINED_CODE_SAMPLE);
    setCopiedOutlinedCode(true);

    if (outlinedCopyTimeoutRef.current) {
      clearTimeout(outlinedCopyTimeoutRef.current);
    }
    outlinedCopyTimeoutRef.current = setTimeout(() => {
      setCopiedOutlinedCode(false);
    }, 2000);
  }, []);

  const activeCardHeight = activeTab === "preview" ? PREVIEW_CARD_HEIGHT : CODE_CARD_HEIGHT;
  const outlinedCardHeight = outlinedTab === "preview" ? PREVIEW_CARD_HEIGHT : CODE_CARD_HEIGHT;

  return {
    activeTab,
    copiedCode,
    outlinedTab,
    copiedOutlinedCode,
    activeCardHeight,
    outlinedCardHeight,
    codeSample: BUTTON_CODE_SAMPLE,
    outlinedCodeSample: BUTTON_OUTLINED_CODE_SAMPLE,
    setActiveTab,
    setOutlinedTab,
    handleCopyCode,
    handleCopyOutlinedCode,
  };
}
