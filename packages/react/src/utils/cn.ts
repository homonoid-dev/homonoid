import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const SPACING_SURFACE = ["surface", "surface-sm", "surface-md", "surface-lg", "surface-gap"];
const SPACING_CONTROL = ["control", "control-sm", "control-md", "control-lg", "control-x", "control-y", "control-gap"];
const SPACING_LAYOUT = ["layout", "layout-x", "layout-y", "layout-gap"];

const ALL_SPACING = [
  ...SPACING_SURFACE,
  ...SPACING_CONTROL,
  ...SPACING_LAYOUT,
];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      p: [{ p: ALL_SPACING }],
      px: [{ px: ["control-x", "layout-x", ...SPACING_SURFACE] }],
      py: [{ py: ["control-y", "layout-y", ...SPACING_SURFACE] }],
      pt: [{ pt: ["control-y", "layout-y", ...SPACING_SURFACE] }],
      pb: [{ pb: ["control-y", "layout-y", ...SPACING_SURFACE] }],
      pl: [{ pl: ["control-x", "layout-x", ...SPACING_SURFACE] }],
      pr: [{ pr: ["control-x", "layout-x", ...SPACING_SURFACE] }],
      gap: [{ gap: ["control-gap", "surface-gap", "surface", "layout-gap", "layout"] }],
      "gap-x": [{ "gap-x": ["control-gap", "surface-gap", "surface", "layout-gap", "layout"] }],
      "gap-y": [{ "gap-y": ["control-gap", "surface-gap", "surface", "layout-gap", "layout"] }],
      h: [{ h: ["control-sm", "control-md", "control-lg", "control"] }],
      "min-h": [{ "min-h": ["control-sm", "control-md", "control-lg", "control"] }],
      "max-h": [{ "max-h": ["control-sm", "control-md", "control-lg", "control"] }],
      w: [{ w: ["control-sm", "control-md", "control-lg", "control"] }],
      "min-w": [{ "min-w": ["control-sm", "control-md", "control-lg", "control"] }],
      "max-w": [{ "max-w": ["control-sm", "control-md", "control-lg", "control"] }],
      size: [{ size: ["control-sm", "control-md", "control-lg", "control"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
