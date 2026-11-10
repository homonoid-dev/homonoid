import type {
  PopoverAlign,
  PopoverSide,
  PopoverSize,
  PopoverVariant,
} from "@homonoid/react";

export interface PopoverCodeOptions {
  size: PopoverSize;
  variant: PopoverVariant;
  side: PopoverSide;
  align: PopoverAlign;
  showActions: boolean;
  showDescription: boolean;
}

export function getPopoverCode(options: PopoverCodeOptions): string {
  const { size, variant, side, align, showActions, showDescription } = options;

  const popoverProps: string[] = [];
  if (size !== "md") {
    popoverProps.push(`size="${size}"`);
  }
  if (variant !== "surface") {
    popoverProps.push(`variant="${variant}"`);
  }
  if (side !== "bottom") {
    popoverProps.push(`side="${side}"`);
  }
  if (align !== "center") {
    popoverProps.push(`align="${align}"`);
  }

  const popoverPropStr =
    popoverProps.length > 0 ? ` ${popoverProps.join(" ")}` : "";

  const lines = [
    'import { Popover, Button, Description } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Popover${popoverPropStr}>`,
    '      <Button variant="contained">View Details</Button>',
    '      <Popover.Content className="max-w-xs">',
    "        <Popover.Dialog>",
    '          <Popover.Heading>Branch Deployment</Popover.Heading>',
  ];

  if (showDescription) {
    lines.push(
      '          <Description size="sm" className="mt-1">'
    );
    lines.push(
      "            Preview instance deployed at feature branch commit 4b29f0c."
    );
    lines.push("          </Description>");
  }

  if (showActions) {
    lines.push('          <div className="flex gap-2 mt-3">');
    lines.push('            <Button size="sm" variant="outlined">Dismiss</Button>');
    lines.push('            <Button size="sm" variant="contained">Inspect</Button>');
    lines.push("          </div>");
  }

  lines.push("        </Popover.Dialog>");
  lines.push("      </Popover.Content>");
  lines.push("    </Popover>");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

