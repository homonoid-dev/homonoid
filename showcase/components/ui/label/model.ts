import type { LabelSize } from "@homonoid/react";

export interface LabelCodeOptions {
  size: LabelSize;
  disabled: boolean;
  required: boolean;
  paired: boolean;
  showDescription: boolean;
}

export function getLabelCode(options: LabelCodeOptions): string {
  const { size, disabled, required, paired, showDescription } = options;

  const props: string[] = [];

  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (disabled) {
    props.push("disabled");
  }
  if (paired) {
    props.push('htmlFor="user-email"');
  }

  const propString = props.length > 0 ? ` ${props.join(" ")}` : "";

  if (paired) {
    const imports = ["Label", "Input"];
    if (showDescription) {
      imports.push("Description");
    }

    const lines: string[] = [
      `import { ${imports.join(", ")} } from "@homonoid/react";`,
      "",
      "export function Example() {",
      "  return (",
      '    <div className="flex flex-col gap-1.5 max-w-sm w-full">',
      `      <Label${propString}>`,
      `        Email address${required ? ' <span className="text-destructive">*</span>' : ""}`,
      "      </Label>",
      '      <Input id="user-email" placeholder="name@example.com"' + (disabled ? " disabled" : "") + " />",
    ];

    if (showDescription) {
      lines.push(
        '      <Description size="sm"' + (disabled ? " disabled" : "") + ">"
      );
      lines.push(
        "        We will never share your email address with third parties."
      );
      lines.push("      </Description>");
    }

    lines.push("    </div>");
    lines.push("  );");
    lines.push("}");

    return lines.join("\n");
  }

  if (showDescription) {
    return [
      'import { Label, Description } from "@homonoid/react";',
      "",
      "export function Example() {",
      "  return (",
      '    <div className="flex flex-col gap-1 max-w-sm w-full">',
      `      <Label${propString}>`,
      `        Account Identifier${required ? ' <span className="text-destructive">*</span>' : ""}`,
      "      </Label>",
      '      <Description size="sm"' + (disabled ? " disabled" : "") + ">",
      "        Unique username or verified corporate email handle.",
      "      </Description>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");
  }

  return [
    'import { Label } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Label${propString}>`,
    `      Account Identifier${required ? ' <span className="text-destructive">*</span>' : ""}`,
    "    </Label>",
    "  );",
    "}",
  ].join("\n");
}

