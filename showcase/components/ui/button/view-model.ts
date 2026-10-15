"use client";

import {
  type ButtonViewModel,
  BUTTON_CONTAINED_CODE_SAMPLE,
  BUTTON_OUTLINED_CODE_SAMPLE,
  BUTTON_ICON_CODE_SAMPLE,
} from "./model";

export function useButtonViewModel(): ButtonViewModel {
  return {
    containedCodeSample: BUTTON_CONTAINED_CODE_SAMPLE,
    outlinedCodeSample: BUTTON_OUTLINED_CODE_SAMPLE,
    iconCodeSample: BUTTON_ICON_CODE_SAMPLE,
  };
}
