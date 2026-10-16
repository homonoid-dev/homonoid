import type { LucideIcon } from "lucide-react";
import {
  CheckSquare,
  Ruler,
  Circle,
  Tag,
  Ban,
  Infinity,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface CheckboxSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const CHECKBOX_SECTIONS: Record<string, CheckboxSectionItem> = {
  states: {
    id: "states",
    label: "States",
    icon: CheckSquare,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Ruler,
  },
  shapes: {
    id: "shapes",
    label: "Shapes",
    icon: Circle,
  },
  labelAndHelper: {
    id: "label-and-helper",
    label: "Label & Helper",
    icon: Tag,
  },
  disabled: {
    id: "disabled",
    label: "Disabled",
    icon: Ban,
  },
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Infinity,
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

export const CHECKBOX_SECTIONS_LIST: CheckboxSectionItem[] =
  Object.values(CHECKBOX_SECTIONS);

export const CHECKBOX_DEFAULT_CODE_SAMPLE = `import { Checkbox } from "@harmonia/react";

export function Example() {
  return (
    <Checkbox
      label="I agree to terms and conditions"
      defaultChecked
    />
  );
}`;

export const CHECKBOX_STATES_CODE_SAMPLE = `import { Checkbox } from "@harmonia/react";

export function StatesExample() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Checkbox aria-label="Unchecked option" />
      <Checkbox aria-label="Checked option" defaultChecked />
      <Checkbox aria-label="Indeterminate option" indeterminate />
    </div>
  );
}`;

export const CHECKBOX_SIZES_CODE_SAMPLE = `import { Checkbox } from "@harmonia/react";

export function SizesExample() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Checkbox size="sm" defaultChecked aria-label="Small checkbox" />
      <Checkbox size="md" defaultChecked aria-label="Medium checkbox" />
      <Checkbox size="lg" defaultChecked aria-label="Large checkbox" />
    </div>
  );
}`;

export const CHECKBOX_SHAPES_CODE_SAMPLE = `import { Checkbox } from "@harmonia/react";

export function ShapesExample() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Checkbox defaultChecked aria-label="Standard shape" />
      <Checkbox shape="circle" defaultChecked aria-label="Circle shape" />
      <Checkbox shape="square" defaultChecked aria-label="Square shape" />
    </div>
  );
}`;

export const CHECKBOX_LABEL_HELPER_CODE_SAMPLE = `import { Checkbox } from "@harmonia/react";

export function LabelHelperExample() {
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <Checkbox
        defaultChecked
        label="Subscribe to weekly product digests"
        description="Receive curated feature release notes and ecosystem updates once per week."
      />
    </div>
  );
}`;

export const CHECKBOX_DISABLED_CODE_SAMPLE = `import { Checkbox } from "@harmonia/react";

export function DisabledExample() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Checkbox disabled aria-label="Disabled unchecked" />
      <Checkbox disabled defaultChecked aria-label="Disabled checked" />
      <Checkbox disabled indeterminate aria-label="Disabled indeterminate" />
    </div>
  );
}`;
