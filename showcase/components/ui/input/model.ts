import type { InputRadius, InputSize, InputVariant } from "@homonoid/react";

export interface InputCodeOptions {
  variant: InputVariant;
  size: InputSize;
  radius: InputRadius;
  floating: boolean;
  showLeading: boolean;
  showTrailing: boolean;
  showDescription: boolean;
  invalid: boolean;
  disabled: boolean;
  readOnly: boolean;
}

export function getInputCode(options: InputCodeOptions): string {
  const {
    variant,
    size,
    radius,
    floating,
    showLeading,
    showTrailing,
    showDescription,
    invalid,
    disabled,
    readOnly,
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
  if (floating) {
    props.push("floating");
    props.push('label="Email address"');
  } else {
    props.push('label="Email address"');
    props.push('placeholder="name@example.com"');
  }
  if (showDescription && !invalid) {
    props.push('description="We will send an authentication link."');
  }
  if (invalid) {
    props.push("invalid");
    props.push('error="Please provide a valid email format."');
  }
  if (disabled) {
    props.push("disabled");
  }
  if (readOnly) {
    props.push("readOnly");
  }

  const imports = ["Input"];
  if (showTrailing) {
    imports.push("Kbd");
  }

  const lucideImports: string[] = [];
  if (showLeading) {
    lucideImports.push("Mail");
  }

  const lines: string[] = [
    `import { ${imports.join(", ")} } from "@homonoid/react";`,
  ];

  if (lucideImports.length > 0) {
    lines.push(`import { ${lucideImports.join(", ")} } from "lucide-react";`);
  }

  lines.push("");
  lines.push("export function Example() {");
  lines.push("  return (");
  lines.push(`    <Input`);
  for (const prop of props) {
    lines.push(`      ${prop}`);
  }
  if (showLeading) {
    lines.push('      leading={<Mail className="size-4" />}');
  }
  if (showTrailing) {
    lines.push('      trailing={<Kbd size="sm" keyValue="command" content="K" />}');
  }
  lines.push("    />");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

