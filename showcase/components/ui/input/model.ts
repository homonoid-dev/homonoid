import type { LucideIcon } from "lucide-react";
import {
  Layers,
  Ruler,
  AtSign,
  Tag,
  AlertCircle,
  Ban,
  Sparkles,
  Palette,
  BookOpen,
} from "lucide-react";
import type { TocItem } from "@/components/ui/toc";

export interface InputSectionItem extends TocItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const INPUT_SECTIONS: Record<string, InputSectionItem> = {
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
  adornments: {
    id: "adornments",
    label: "Adornments",
    icon: AtSign,
  },
  labelAndHelper: {
    id: "label-and-helper",
    label: "Label & Helper",
    icon: Tag,
  },
  validation: {
    id: "validation",
    label: "Validation",
    icon: AlertCircle,
  },
  disabled: {
    id: "disabled",
    label: "Disabled",
    icon: Ban,
  },
  continuity: {
    id: "object-continuity",
    label: "Continuity",
    icon: Sparkles,
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

export const INPUT_SECTIONS_LIST: InputSectionItem[] =
  Object.values(INPUT_SECTIONS);

export const INPUT_DEFAULT_CODE_SAMPLE = `import { Input } from "@harmonia/react";

export function Example() {
  return <Input placeholder="Enter text..." className="max-w-sm" />;
}`;

export const INPUT_VARIANTS_CODE_SAMPLE = `import { Input } from "@harmonia/react";

export function VariantsExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-sm">
      <Input variant="outlined" placeholder="Outlined input" />
      <Input variant="filled" placeholder="Filled input" />
      <Input variant="plain" placeholder="Plain input" />
    </div>
  );
}`;

export const INPUT_SIZES_CODE_SAMPLE = `import { Input } from "@harmonia/react";

export function SizesExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-sm">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  );
}`;

export const INPUT_ADORNMENTS_CODE_SAMPLE = `import { Input } from "@harmonia/react";
import { Search, Mail, Eye } from "lucide-react";

export function AdornmentsExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-sm">
      <Input
        leading={<Search className="size-4 text-muted" />}
        placeholder="Search components..."
      />
      <Input
        leading={<Mail className="size-4 text-muted" />}
        placeholder="Email address"
      />
      <Input
        type="password"
        trailing={<Eye className="size-4 text-muted cursor-pointer" />}
        placeholder="Password"
      />
    </div>
  );
}`;

export const INPUT_LABEL_HELPER_CODE_SAMPLE = `import { Input } from "@harmonia/react";

export function LabelHelperExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-sm">
      <Input
        label="Email Address"
        description="We will only use this to send transaction receipts."
        placeholder="name@company.com"
      />
    </div>
  );
}`;

export const INPUT_VALIDATION_CODE_SAMPLE = `import { Input } from "@harmonia/react";

export function ValidationExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-sm">
      <Input
        invalid
        label="Username"
        error="This username is already taken."
        defaultValue="lumunar"
      />
    </div>
  );
}`;

export const INPUT_DISABLED_CODE_SAMPLE = `import { Input } from "@harmonia/react";

export function DisabledExample() {
  return (
    <div className="flex flex-col gap-surface-gap w-full max-w-sm">
      <Input
        disabled
        label="Account ID"
        defaultValue="acc_983142"
        description="System managed identifier cannot be modified."
      />
    </div>
  );
}`;
