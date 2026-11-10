import type {
  ButtonColor,
  ButtonLayout,
  ButtonRadius,
  ButtonSize,
  ButtonVariant,
} from "@homonoid/react";

export interface ButtonCodeOptions {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  radius: ButtonRadius;
  layout: ButtonLayout;
  loading: boolean;
  disabled: boolean;
  showLeading: boolean;
  showTrailing: boolean;
  label: string;
}

export function getButtonCode(options: ButtonCodeOptions): string {
  const {
    variant,
    color,
    size,
    radius,
    layout,
    loading,
    disabled,
    showLeading,
    showTrailing,
    label,
  } = options;

  const props: string[] = [];

  if (variant !== "contained") {
    props.push(`variant="${variant}"`);
  }
  if (color !== "primary") {
    props.push(`color="${color}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (radius !== "full") {
    props.push(`radius="${radius}"`);
  }
  if (layout !== "inline") {
    props.push(`layout="${layout}"`);
  }
  if (loading) {
    props.push("loading");
  }
  if (disabled) {
    props.push("disabled");
  }

  const iconImports: string[] = [];

  if (layout === "icon") {
    props.push('aria-label="Add item"');
    const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";

    return `import { Button } from "@homonoid/react";
import { Plus } from "lucide-react";

export function Example() {
  return (
    <Button${propsString}>
      <Plus className="size-4" />
    </Button>
  );
}`;
  }

  if (showLeading) {
    iconImports.push("Plus");
    props.push('leading={<Plus className="size-4" />}');
  }

  if (showTrailing) {
    iconImports.push("ArrowRight");
    props.push('trailing={<ArrowRight className="size-4" />}');
  }

  const lines: string[] = ['import { Button } from "@homonoid/react";'];
  if (iconImports.length > 0) {
    lines.push(`import { ${iconImports.join(", ")} } from "lucide-react";`);
  }

  lines.push("");
  lines.push("export function Example() {");
  lines.push("  return (");

  const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";
  lines.push(`    <Button${propsString}>`);
  lines.push(`      ${label}`);
  lines.push("    </Button>");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

