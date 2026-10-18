import type { LucideIcon } from "lucide-react";
import {
  Sliders,
  Ruler,
  Activity,
  Infinity,
  Accessibility,
  MousePointerClick,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";
import type { InteractiveStateItem } from "@/components/ui/interactive-states";

export interface OrbSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const ORB_SECTIONS: Record<string, OrbSectionItem> = {
  themes: {
    id: "themes",
    label: "Themes",
    icon: Sliders,
  },
  states: {
    id: "states",
    label: "States",
    icon: Activity,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Ruler,
  },
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Infinity,
  },
  accessibility: {
    id: "accessibility",
    label: "Accessibility",
    icon: Accessibility,
  },
  interactiveStates: {
    id: "interactive-states",
    label: "Interactive States",
    icon: MousePointerClick,
  },
  tokens: {
    id: "design-tokens",
    label: "Design Tokens",
    icon: Palette,
  },
  styleReference: {
    id: "style-reference",
    label: "Style Reference",
    icon: BookOpen,
  },
};

export const ORB_SECTIONS_LIST: OrbSectionItem[] = Object.values(ORB_SECTIONS);

export const ORB_INTERACTIVE_STATES: InteractiveStateItem[] = [
  {
    label: "Idle",
    selectors: ['data-state="idle"', 'aria-label="Voice assistant idle"'],
    note: "calm ambient baseline awaiting speech",
  },
  {
    label: "Connecting",
    selectors: ['data-state="connecting"', 'aria-label="Voice assistant connecting"'],
    note: "handshake sequence wave cadence",
  },
  {
    label: "Listening",
    selectors: ['data-state="listening"', 'aria-label="Voice assistant listening"'],
    note: "receptive breathing responsive to input",
  },
  {
    label: "Thinking",
    selectors: ['data-state="thinking"', 'aria-label="Voice assistant thinking"'],
    note: "harmonic wave and swirling motion",
  },
  {
    label: "Speaking",
    selectors: ['data-state="speaking"', 'aria-label="Voice assistant speaking"'],
    note: "audio reactive equalization bounce",
  },
  {
    label: "Error",
    selectors: ['data-state="error"', 'aria-label="Voice assistant error"'],
    note: "destructive alert tone and pulsing jitter",
  },
];

export const ORB_DEFAULT_CODE_SAMPLE = `import { Orb } from "@harmonia/react";

export function Example() {
  return <Orb theme="cloud" size="lg" state="listening" />;
}`;

export const ORB_THEMES_CODE_SAMPLE = `import { Orb } from "@harmonia/react";

export function ThemesExample() {
  return (
    <div className="flex flex-row items-center gap-12">
      <div className="flex flex-col items-center gap-3">
        <Orb theme="cloud" state="listening" size="md" />
        <span className="text-xs text-muted">Cloud</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Orb theme="bars" state="listening" size="md" />
        <span className="text-xs text-muted">Bars</span>
      </div>
    </div>
  );
}`;

export const ORB_STATES_CODE_SAMPLE = `import { Orb } from "@harmonia/react";

export function StatesExample() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <Orb theme="cloud" state="idle" size="sm" />
      <Orb theme="cloud" state="connecting" size="sm" />
      <Orb theme="cloud" state="listening" size="sm" />
      <Orb theme="cloud" state="thinking" size="sm" />
      <Orb theme="cloud" state="speaking" volume={0.7} size="sm" />
      <Orb theme="cloud" state="error" size="sm" />
    </div>
  );
}`;

export const ORB_SIZES_CODE_SAMPLE = `import { Orb } from "@harmonia/react";

export function SizesExample() {
  return (
    <div className="flex flex-row items-center gap-8">
      <Orb theme="cloud" size="sm" state="listening" />
      <Orb theme="cloud" size="md" state="listening" />
      <Orb theme="cloud" size="lg" state="listening" />
    </div>
  );
}`;
