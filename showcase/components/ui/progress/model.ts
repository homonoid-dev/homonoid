import type {
  ProgressColor,
  ProgressSize,
  ProgressVariant,
} from "@homonoid/react";

export interface ProgressCodeOptions {
  variant: ProgressVariant;
  size: ProgressSize;
  color: ProgressColor;
  indeterminate: boolean;
  showValue: boolean;
}

export function getProgressCode(options: ProgressCodeOptions): string {
  const { variant, size, color, indeterminate, showValue } = options;

  const props: string[] = [];

  if (variant !== "circular") {
    props.push(`variant="${variant}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (color !== "primary") {
    props.push(`color="${color}"`);
  }
  if (!indeterminate) {
    props.push("value={65}");
  }

  const propStr = props.length > 0 ? ` ${props.join(" ")}` : "";

  if (showValue && !indeterminate) {
    if (variant === "linear") {
      return [
        'import { Progress, Label } from "@homonoid/react";',
        "",
        "export function Example() {",
        "  return (",
        '    <div className="flex flex-col gap-2 max-w-sm w-full">',
        '      <div className="flex items-center justify-between">',
        '        <Label size="sm">Uploading assets</Label>',
        '        <span className="text-xs text-muted font-medium">65%</span>',
        "      </div>",
        `      <Progress${propStr} />`,
        "    </div>",
        "  );",
        "}",
      ].join("\n");
    }

    return [
      'import { Progress } from "@homonoid/react";',
      "",
      "export function Example() {",
      "  return (",
      '    <div className="flex items-center gap-3">',
      `      <Progress${propStr} />`,
      '      <span className="text-sm text-muted font-medium">65%</span>',
      "    </div>",
      "  );",
      "}",
    ].join("\n");
  }

  return [
    'import { Progress } from "@homonoid/react";',
    "",
    "export function Example() {",
    `  return <Progress${propStr} />;`,
    "}",
  ].join("\n");
}

