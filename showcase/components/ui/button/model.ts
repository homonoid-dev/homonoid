import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Circle,
  ArrowRight,
  Plus,
  Loader2,
  Ruler,
  Ban,
  StretchHorizontal,
  Sparkles,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface ButtonSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const BUTTON_SECTIONS: Record<string, ButtonSectionItem> = {
  variants: {
    id: "variants",
    label: "Variants",
    icon: Layers,
  },
  sizes: {
    id: "sizes",
    label: "Sizes",
    icon: Ruler,
  },
  outlined: {
    id: "outlined",
    label: "Outlined",
    icon: Circle,
  },
  withIcon: {
    id: "with-icon",
    label: "With Icon",
    icon: ArrowRight,
  },
  iconOnly: {
    id: "icon-only",
    label: "Icon Only",
    icon: Plus,
  },
  loading: {
    id: "loading",
    label: "Loading",
    icon: Loader2,
  },
  disabled: {
    id: "disabled",
    label: "Disabled",
    icon: Ban,
  },
  fullWidth: {
    id: "full-width",
    label: "Full Width",
    icon: StretchHorizontal,
  },
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Sparkles,
  },
};

export const BUTTON_SECTIONS_LIST: ButtonSectionItem[] =
  Object.values(BUTTON_SECTIONS);

export const BUTTON_CONTAINED_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="contained" shape="circle">
      Click me
    </Button>
  );
}`;

export const BUTTON_VARIANTS_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Button variant="contained" color="primary" shape="circle">
        Primary
      </Button>
      <Button variant="contained" color="subtle" shape="circle">
        Subtle
      </Button>
      <Button variant="outlined" shape="circle">
        Outline
      </Button>
      <Button variant="plain" shape="circle">
        Ghost
      </Button>
      <Button variant="contained" color="destructive" shape="circle">
        Destructive
      </Button>
    </div>
  );
}`;

export const BUTTON_OUTLINED_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="outlined" shape="circle">
      Click me
    </Button>
  );
}`;

export const BUTTON_WITH_ICON_CODE_SAMPLE = `import { Button } from "@harmonia/react";
import { ArrowRight } from "lucide-react";

export function Example() {
  return (
    <Button
      variant="contained"
      shape="circle"
      leading={<ArrowRight className="size-4" />}
    >
      Click me
    </Button>
  );
}`;

export const BUTTON_ICON_ONLY_CODE_SAMPLE = `import { Button } from "@harmonia/react";
import { Plus } from "lucide-react";

export function Example() {
  return (
    <Button
      layout="icon"
      variant="contained"
      shape="circle"
      aria-label="Add item"
    >
      <Plus className="size-4" />
    </Button>
  );
}`;

export const BUTTON_LOADING_CODE_SAMPLE = `import { useState } from "react";
import { Button } from "@harmonia/react";

export function Example() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      variant="contained"
      shape="circle"
      loading={loading}
      onClick={() => setLoading(true)}
    >
      Click me
    </Button>
  );
}`;

export const BUTTON_SIZES_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Button variant="contained" shape="circle" size="sm">
        Small
      </Button>
      <Button variant="contained" shape="circle" size="md">
        Medium
      </Button>
      <Button variant="contained" shape="circle" size="lg">
        Large
      </Button>
    </div>
  );
}`;

export const BUTTON_DISABLED_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-surface-gap">
      <Button variant="contained" shape="circle" disabled>
        Contained
      </Button>
      <Button variant="outlined" shape="circle" disabled>
        Outlined
      </Button>
      <Button variant="plain" shape="circle" disabled>
        Plain
      </Button>
    </div>
  );
}`;

export const BUTTON_FULL_WIDTH_CODE_SAMPLE = `import { Button } from "@harmonia/react";

export function Example() {
  return (
    <Button variant="contained" shape="circle" layout="full">
      Full Width
    </Button>
  );
}`;

export interface ButtonViewModel {
  containedCodeSample: string;
  variantsCodeSample: string;
  sizesCodeSample: string;
  outlinedCodeSample: string;
  withIconCodeSample: string;
  iconOnlyCodeSample: string;
  loadingCodeSample: string;
  disabledCodeSample: string;
  fullWidthCodeSample: string;
  sections: Record<string, ButtonSectionItem>;
  sectionsList: ButtonSectionItem[];
  isLoading: boolean;
  triggerLoading: () => void;
  resetLoading: () => void;
}