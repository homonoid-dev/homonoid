"use client";

import {
  type ButtonViewModel,
  BUTTON_CONTAINED_CODE_SAMPLE,
  BUTTON_VARIANTS_CODE_SAMPLE,
  BUTTON_OUTLINED_CODE_SAMPLE,
  BUTTON_WITH_ICON_CODE_SAMPLE,
  BUTTON_ICON_ONLY_CODE_SAMPLE,
} from "./model";

export function useButtonViewModel(): ButtonViewModel {
  return {
    containedCodeSample: BUTTON_CONTAINED_CODE_SAMPLE,
    variantsCodeSample: BUTTON_VARIANTS_CODE_SAMPLE,
    outlinedCodeSample: BUTTON_OUTLINED_CODE_SAMPLE,
    withIconCodeSample: BUTTON_WITH_ICON_CODE_SAMPLE,
    iconOnlyCodeSample: BUTTON_ICON_ONLY_CODE_SAMPLE,
  };
}
