import type {
  SelectRadius,
  SelectSize,
  SelectVariant,
} from "@homonoid/react";

export interface SelectCodeOptions {
  variant: SelectVariant;
  size: SelectSize;
  radius: SelectRadius;
  descriptions: boolean;
  leadingIcons: boolean;
  disabled: boolean;
  invalid: boolean;
}

export function getSelectCode(options: SelectCodeOptions): string {
  const {
    variant,
    size,
    radius,
    descriptions,
    leadingIcons,
    disabled,
    invalid,
  } = options;

  const selectProps: string[] = [];

  if (variant !== "outlined") {
    selectProps.push(`variant="${variant}"`);
  }
  if (size !== "md") {
    selectProps.push(`size="${size}"`);
  }
  if (radius !== "lg") {
    selectProps.push(`radius="${radius}"`);
  }
  if (disabled) {
    selectProps.push("disabled");
  }
  if (invalid) {
    selectProps.push("invalid");
  }

  selectProps.push('placeholder="Choose environment"');

  const imports = ["Select"];
  const lucideImports: string[] = [];
  if (leadingIcons) {
    lucideImports.push("Server", "Cloud", "Cpu");
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
  lines.push("    <Select");
  for (const prop of selectProps) {
    lines.push(`      ${prop}`);
  }
  lines.push("      options={[");
  lines.push("        {");
  lines.push('          value: "prod",');
  lines.push('          label: "Production",');
  if (descriptions) {
    lines.push('          description: "Global high availability cluster",');
  }
  if (leadingIcons) {
    lines.push('          leading: <Server className="size-4" />,');
  }
  lines.push("        },");
  lines.push("        {");
  lines.push('          value: "stage",');
  lines.push('          label: "Staging",');
  if (descriptions) {
    lines.push('          description: "Pre release verification environment",');
  }
  if (leadingIcons) {
    lines.push('          leading: <Cloud className="size-4" />,');
  }
  lines.push("        },");
  lines.push("        {");
  lines.push('          value: "dev",');
  lines.push('          label: "Development",');
  if (descriptions) {
    lines.push('          description: "Local experimental sandbox",');
  }
  if (leadingIcons) {
    lines.push('          leading: <Cpu className="size-4" />,');
  }
  lines.push("        },");
  lines.push("      ]}");
  lines.push("    />");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

