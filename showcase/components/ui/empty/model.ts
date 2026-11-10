import type { EmptyBorderStyle, EmptySize, EmptyVariant } from "@homonoid/react";

export interface EmptyCodeOptions {
  variant: EmptyVariant;
  size: EmptySize;
  borderStyle: EmptyBorderStyle;
  showMedia: boolean;
  showDescription: boolean;
  showAction: boolean;
}

export function getEmptyCode(options: EmptyCodeOptions): string {
  const {
    variant,
    size,
    borderStyle,
    showMedia,
    showDescription,
    showAction,
  } = options;

  const props: string[] = [];
  if (variant !== "plain") {
    props.push(`variant="${variant}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (variant === "outlined" && borderStyle !== "dashed") {
    props.push(`borderStyle="${borderStyle}"`);
  }

  const imports = ["Empty"];
  if (showAction) {
    imports.push("Button");
  }

  const lines: string[] = [
    `import { ${imports.join(", ")} } from "@homonoid/react";`,
    'import { FolderSearch } from "lucide-react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Empty${props.length > 0 ? ` ${props.join(" ")}` : ""}`,
  ];

  if (showMedia) {
    lines.push('      icon={<FolderSearch className="size-6" />}');
  }

  lines.push('      title="No projects found"');

  if (showDescription) {
    lines.push(
      '      description="Get started by creating a new workspace project or inviting teammates."'
    );
  }

  if (showAction) {
    lines.push('      action={<Button variant="contained">Create Project</Button>}');
  }

  lines.push("    />");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

