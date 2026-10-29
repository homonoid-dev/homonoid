import type { LucideIcon } from "lucide-react";
import {
  ToggleLeft,
  Ruler,
  Tag,
  Square,
  Ban,
  LayoutList,
  Infinity,
  Accessibility,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface SwitchSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const SWITCH_SECTIONS: Record<string, SwitchSectionItem> = {
  states: {
    id: "states",
    label: "States",
    icon: ToggleLeft,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Ruler,
  },
  labelAndHelper: {
    id: "label-and-helper",
    label: "Label & Helper",
    icon: Tag,
  },
  radius: {
    id: "radius",
    label: "Radius",
    icon: Square,
  },
  disabled: {
    id: "disabled",
    label: "Disabled",
    icon: Ban,
  },
  tile: {
    id: "tile",
    label: "Tile",
    icon: LayoutList,
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

export const SWITCH_SECTIONS_LIST: SwitchSectionItem[] =
  Object.values(SWITCH_SECTIONS);

export const SWITCH_DEFAULT_CODE_SAMPLE = `import { Switch, Label, Description } from "@homonoid/react";

export function Example() {
  return (
    <Switch defaultChecked>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Content>
        <Label>Airplane Mode</Label>
        <Description>Disable connections</Description>
      </Switch.Content>
    </Switch>
  );
}`;

export const SWITCH_STATES_CODE_SAMPLE = `import { Switch } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Switch aria-label="Inactive switch" />
      <Switch defaultChecked aria-label="Active switch" />
      <Switch invalid aria-label="Invalid inactive switch" />
      <Switch invalid defaultChecked aria-label="Invalid active switch" />
    </div>
  );
}`;

export const SWITCH_SIZES_CODE_SAMPLE = `import { Switch } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Switch size="sm" defaultChecked aria-label="Small switch" />
      <Switch size="md" defaultChecked aria-label="Medium switch" />
      <Switch size="lg" defaultChecked aria-label="Large switch" />
    </div>
  );
}`;

export const SWITCH_LABEL_HELPER_CODE_SAMPLE = `import { Switch, Label, Description } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Switch defaultChecked>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label>Automatic updates</Label>
          <Description>
            Download and install platform patches as soon as they become available.
          </Description>
        </Switch.Content>
      </Switch>
    </div>
  );
}`;

export const SWITCH_RADIUS_CODE_SAMPLE = `import { Switch } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Switch radius="full" defaultChecked aria-label="Pill radius switch" />
      <Switch radius="lg" defaultChecked aria-label="Large radius switch" />
      <Switch radius="md" defaultChecked aria-label="Medium radius switch" />
      <Switch radius="sm" defaultChecked aria-label="Small radius switch" />
      <Switch radius="none" defaultChecked aria-label="Sharp radius switch" />
    </div>
  );
}`;

export const SWITCH_DISABLED_CODE_SAMPLE = `import { Switch } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Switch disabled aria-label="Disabled inactive switch" />
      <Switch disabled defaultChecked aria-label="Disabled active switch" />
    </div>
  );
}`;

export const SWITCH_TILE_CODE_SAMPLE = `import { Switch } from "@homonoid/react";

export function Example() {
  return (
    <div className="flex flex-col gap-control-gap w-full max-w-sm">
      <Switch.Tile
        variant="contained"
        label="Airplane Mode"
        description="Disable all wireless connections"
        defaultChecked
      />
      <Switch.Tile
        variant="outlined"
        label="Do Not Disturb"
        description="Silence calls and notifications"
      />
      <Switch.Tile
        placement="leading"
        label="Leading Toggle"
        description="Switch control aligned to the leading slot"
      />
    </div>
  );
}`;

