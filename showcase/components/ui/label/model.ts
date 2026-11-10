import type { LabelSize } from "@homonoid/react";

export interface LabelCodeOptions {
  size: LabelSize;
  disabled: boolean;
  required: boolean;
  showDescription: boolean;
}

export function getLabelCode(options: LabelCodeOptions): string {
  const { size, disabled, required, showDescription } = options;

  const props: string[] = [];

  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (disabled) {
    props.push("disabled");
  }

  const propString = props.length > 0 ? ` ${props.join(" ")}` : "";

  if (showDescription) {
    return [
      'import { Label, Description } from "@homonoid/react";',
      "",
      "export function Example() {",
      "  return (",
      '    <div className="flex flex-col gap-1 max-w-sm w-full text-left">',
      `      <Label${propString}>`,
      `        Account Identifier${required ? ' <span className="text-destructive ml-0.5">*</span>' : ""}`,
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
    `      Account Identifier${required ? ' <span className="text-destructive ml-0.5">*</span>' : ""}`,
    "    </Label>",
    "  );",
    "}",
  ].join("\n");
}
