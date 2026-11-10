import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const SPACING_SURFACE = ["surface", "surface-sm", "surface-md", "surface-lg", "surface-gap"];
const SPACING_CONTROL_X = ["control-x", "control-sm-x", "control-md-x", "control-lg-x"];
const SPACING_CONTROL_Y = ["control-y", "control-sm-y", "control-md-y", "control-lg-y"];
const SPACING_CONTROL = [
  "control",
  "control-sm",
  "control-md",
  "control-lg",
  ...SPACING_CONTROL_X,
  ...SPACING_CONTROL_Y,
  "control-gap",
];
const SPACING_LAYOUT = ["layout", "layout-x", "layout-y", "layout-gap"];

const ALL_SPACING = [
  ...SPACING_SURFACE,
  ...SPACING_CONTROL,
  ...SPACING_LAYOUT,
  "badge-circular",
];

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      inset: [{ inset: ["badge-circular"] }],
      top: [{ top: ["badge-circular"] }],
      right: [{ right: ["badge-circular"] }],
      bottom: [{ bottom: ["badge-circular"] }],
      left: [{ left: ["badge-circular"] }],
      p: [{ p: ALL_SPACING }],
      px: [{ px: [...SPACING_CONTROL_X, "layout-x", ...SPACING_SURFACE] }],
      py: [{ py: [...SPACING_CONTROL_Y, "layout-y", ...SPACING_SURFACE] }],
      pt: [{ pt: [...SPACING_CONTROL_Y, "layout-y", ...SPACING_SURFACE] }],
      pb: [{ pb: [...SPACING_CONTROL_Y, "layout-y", ...SPACING_SURFACE] }],
      pl: [{ pl: [...SPACING_CONTROL_X, "layout-x", ...SPACING_SURFACE] }],
      pr: [{ pr: [...SPACING_CONTROL_X, "layout-x", ...SPACING_SURFACE] }],
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
