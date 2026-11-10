import type { SeparatorOrientation } from "@homonoid/react";

export interface SeparatorCodeOptions {
  orientation: SeparatorOrientation;
  decorative: boolean;
}

export function getSeparatorCode(options: SeparatorCodeOptions): string {
  const { orientation, decorative } = options;

  const props: string[] = [];
  if (orientation !== "horizontal") {
    props.push(`orientation="${orientation}"`);
  }
  if (!decorative) {
    props.push("decorative={false}");
  }

  const propStr = props.length > 0 ? ` ${props.join(" ")}` : "";

  if (orientation === "vertical") {
    return [
      'import { Separator } from "@homonoid/react";',
      "",
      "export function Example() {",
      "  return (",
      '    <div className="flex items-center gap-3 h-8">',
      '      <span className="text-sm font-medium text-foreground">Overview</span>',
      `      <Separator${propStr} className="h-4" />`,
      '      <span className="text-sm text-muted">Analytics</span>',
      `      <Separator${propStr} className="h-4" />`,
      '      <span className="text-sm text-muted">Settings</span>',
      "    </div>",
      "  );",
      "}",
    ].join("\n");
  }

  return [
    'import { Separator } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    '    <div className="flex flex-col gap-3 max-w-sm w-full">',
    '      <div className="text-sm font-medium text-foreground">Workspace Overview</div>',
    `      <Separator${propStr} />`,
    '      <div className="text-sm text-muted">',
    "        All active repository branches and deployments.",
    "      </div>",
    "    </div>",
    "  );",
    "}",
  ].join("\n");
}

