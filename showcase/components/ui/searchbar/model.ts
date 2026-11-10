import type {
  SearchbarRadius,
  SearchbarSize,
  SearchbarVariant,
} from "@homonoid/react";

export interface SearchbarCodeOptions {
  variant: SearchbarVariant;
  size: SearchbarSize;
  radius: SearchbarRadius;
  loading: boolean;
  showLeading: boolean;
  showTrailing: boolean;
  disabled: boolean;
}

export function getSearchbarCode(options: SearchbarCodeOptions): string {
  const {
    variant,
    size,
    radius,
    loading,
    showLeading,
    showTrailing,
    disabled,
  } = options;

  const props: string[] = [];

  if (variant !== "outlined") {
    props.push(`variant="${variant}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (radius !== "lg") {
    props.push(`radius="${radius}"`);
  }
  if (loading) {
    props.push("loading");
  }
  if (disabled) {
    props.push("disabled");
  }

  props.push('placeholder="Search documentation..."');

  const imports = ["Searchbar"];
  if (showTrailing && !loading) {
    imports.push("Kbd");
  }

  const lucideImports: string[] = [];
  if (showLeading) {
    lucideImports.push("Search");
  }

  const lines = [
    `import { ${imports.join(", ")} } from "@homonoid/react";`,
  ];

  if (lucideImports.length > 0) {
    lines.push(`import { ${lucideImports.join(", ")} } from "lucide-react";`);
  }

  lines.push("");
  lines.push("export function Example() {");
  lines.push("  return (");
  lines.push("    <Searchbar");
  for (const prop of props) {
    lines.push(`      ${prop}`);
  }
  if (showLeading) {
    lines.push('      leading={<Search className="size-4" />}');
  }
  if (showTrailing && !loading) {
    lines.push('      trailing={<Kbd size="sm" keyValue="command" content="K" />}');
  }
  lines.push("    />");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

