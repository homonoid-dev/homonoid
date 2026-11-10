import type {
  TileColor,
  TileRadius,
  TileSize,
  TileVariant,
} from "@homonoid/react";

export interface TileCodeOptions {
  variant: TileVariant;
  color: TileColor;
  size: TileSize;
  radius: TileRadius;
  interactive: boolean;
  selected: boolean;
  disabled: boolean;
  showLeading: boolean;
  showTrailing: boolean;
  showDescription: boolean;
}

export function getTileCode(options: TileCodeOptions): string {
  const {
    variant,
    color,
    size,
    radius,
    interactive,
    selected,
    disabled,
    showLeading,
    showTrailing,
    showDescription,
  } = options;

  const imports: string[] = ['import { Tile } from "@homonoid/react";'];
  const lucideIcons: string[] = [];

  if (showLeading) {
    lucideIcons.push("Sliders");
  }
  if (showTrailing) {
    lucideIcons.push("ChevronRight");
  }
  if (lucideIcons.length > 0) {
    imports.push(`import { ${lucideIcons.join(", ")} } from "lucide-react";`);
  }

  const props: string[] = [];

  if (variant !== "plain") {
    props.push(`variant="${variant}"`);
  }
  if (color !== "surface") {
    props.push(`color="${color}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (radius !== "lg") {
    props.push(`radius="${radius}"`);
  }
  if (interactive) {
    props.push("interactive");
  }
  if (selected) {
    props.push("selected");
  }
  if (disabled) {
    props.push("disabled");
  }

  if (showLeading) {
    props.push('leading={<Sliders className="size-4" />}');
  }

  props.push('label="Security Preferences"');

  if (showDescription) {
    props.push('description="Configure verification credentials and device access."');
  }

  if (showTrailing) {
    props.push('trailing={<ChevronRight className="size-4 text-muted" />}');
  }

  const propsString = props.map((p) => `\n      ${p}`).join("");

  return [
    ...imports,
    "",
    "export function Example() {",
    "  return (",
    `    <Tile${propsString}`,
    "    />",
    "  );",
    "}",
  ].join("\n");
}

