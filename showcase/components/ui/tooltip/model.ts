import type {
  TooltipAlign,
  TooltipSide,
  TooltipSize,
  TooltipVariant,
} from "@homonoid/react";

export interface TooltipCodeOptions {
  variant: TooltipVariant;
  size: TooltipSize;
  side: TooltipSide;
  align: TooltipAlign;
  showShortcut: boolean;
  disabled: boolean;
}

export function getTooltipCode(options: TooltipCodeOptions): string {
  const {
    variant,
    size,
    side,
    align,
    showShortcut,
    disabled,
  } = options;

  const props: string[] = [];

  if (variant !== "inverted") {
    props.push(`variant="${variant}"`);
  }
  if (size !== "sm") {
    props.push(`size="${size}"`);
  }
  if (side !== "top") {
    props.push(`side="${side}"`);
  }
  if (align !== "center") {
    props.push(`align="${align}"`);
  }
  if (disabled) {
    props.push("disabled");
  }

  const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";

  return [
    'import { Tooltip, Button } from "@homonoid/react";',
    'import { Archive } from "lucide-react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Tooltip${propsString}>`,
    '      <Button variant="outlined" size="sm" layout="icon" aria-label="Archive conversation">',
    '        <Archive className="size-4" />',
    "      </Button>",
    "      <Tooltip.Content>",
    "        Archive conversation",
    ...(showShortcut
      ? ['        <Tooltip.Shortcut keyValue="command" content="E" />']
      : []),
    "      </Tooltip.Content>",
    "    </Tooltip>",
    "  );",
    "}",
  ].join("\n");
}

