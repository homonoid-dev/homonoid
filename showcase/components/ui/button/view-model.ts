"use client";

import { useState, useCallback } from "react";
import {
  type ButtonViewModel,
  BUTTON_CONTAINED_CODE_SAMPLE,
  BUTTON_VARIANTS_CODE_SAMPLE,
  BUTTON_OUTLINED_CODE_SAMPLE,
  BUTTON_WITH_ICON_CODE_SAMPLE,
  BUTTON_ICON_ONLY_CODE_SAMPLE,
  BUTTON_LOADING_CODE_SAMPLE,
} from "./model";

export function useButtonViewModel(): ButtonViewModel {
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const resetLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    containedCodeSample: BUTTON_CONTAINED_CODE_SAMPLE,
    variantsCodeSample: BUTTON_VARIANTS_CODE_SAMPLE,
    outlinedCodeSample: BUTTON_OUTLINED_CODE_SAMPLE,
    withIconCodeSample: BUTTON_WITH_ICON_CODE_SAMPLE,
    iconOnlyCodeSample: BUTTON_ICON_ONLY_CODE_SAMPLE,
    loadingCodeSample: BUTTON_LOADING_CODE_SAMPLE,
    isLoading,
    triggerLoading,
    resetLoading,
  };
}
