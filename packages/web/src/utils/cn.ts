import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      px: [{ px: ["control-x"] }],
      py: [{ py: ["control-y"] }],
      p: [{ p: ["control-x", "control-y", "surface", "layout"] }],
      gap: [{ gap: ["control-gap", "surface", "layout"] }],
      h: [{ h: ["control-sm", "control-md", "control-lg"] }],
      w: [{ w: ["control-sm", "control-md", "control-lg"] }],
      size: [{ size: ["control-sm", "control-md", "control-lg"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
