import type { CardColor, CardPadding, CardVariant } from "@homonoid/react";

export interface CardCodeOptions {
  variant: CardVariant;
  color: CardColor;
  padding: CardPadding;
  border: boolean;
  showBadge: boolean;
  showActions: boolean;
}

export function getCardCode(options: CardCodeOptions): string {
  const { variant, color, padding, border, showBadge, showActions } = options;

  const props: string[] = [];

  if (variant !== "outlined") {
    props.push(`variant="${variant}"`);
  }
  if (color !== "surface") {
    props.push(`color="${color}"`);
  }
  if (padding !== "surface") {
    props.push(`padding="${padding}"`);
  }
  if (!border) {
    props.push("border={false}");
  }

  const imports = ["Card", "Heading", "Description"];
  if (showBadge) {
    imports.push("Badge");
  }
  if (showActions) {
    imports.push("Button");
  }

  const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";

  const lines: string[] = [
    `import { ${imports.join(", ")} } from "@homonoid/react";`,
    "",
    "export function Example() {",
    "  return (",
    `    <Card${propsString}>`,
    '      <div className="flex flex-col gap-surface-sm">',
  ];

  if (showBadge) {
    lines.push('        <div className="flex items-center justify-between">');
    lines.push('          <Badge variant="outlined" color="primary">Active</Badge>');
    lines.push("        </div>");
  }

  lines.push('        <div className="flex flex-col gap-1">');
  lines.push('          <Heading as="h3">Security Overview</Heading>');
  lines.push(
    "          <Description>Two factor authentication is enabled across all workspace accounts.</Description>"
  );
  lines.push("        </div>");

  if (showActions) {
    lines.push('        <div className="flex items-center gap-control-gap pt-2">');
    lines.push(
      '          <Button variant="contained" color="primary" size="sm">Manage</Button>'
    );
    lines.push(
      '          <Button variant="outlined" color="surface" size="sm">Details</Button>'
    );
    lines.push("        </div>");
  }

  lines.push("      </div>");
  lines.push("    </Card>");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

