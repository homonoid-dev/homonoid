import type { KbdColor, KbdRadius, KbdSize, KbdVariant } from "@homonoid/react";

export interface KbdCodeOptions {
  variant: KbdVariant;
  color: KbdColor;
  size: KbdSize;
  radius: KbdRadius;
  compound: boolean;
  multiKey: boolean;
}

export function getKbdCode(options: KbdCodeOptions): string {
  const { variant, color, size, radius, compound, multiKey } = options;

  const props: string[] = [];

  if (variant !== "contained") {
    props.push(`variant="${variant}"`);
  }
  if (color !== "surface") {
    props.push(`color="${color}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (radius !== "sm") {
    props.push(`radius="${radius}"`);
  }

  const propString = props.length > 0 ? ` ${props.join(" ")}` : "";

  if (compound) {
    if (multiKey) {
      return [
        'import { Kbd } from "@homonoid/react";',
        "",
        "export function Example() {",
        "  return (",
        `    <Kbd${propString}>`,
        '      <Kbd.Abbr keyValue="command" />',
        '      <Kbd.Abbr keyValue="shift" />',
        "      <Kbd.Content>P</Kbd.Content>",
        "    </Kbd>",
        "  );",
        "}",
      ].join("\n");
    }

    return [
      'import { Kbd } from "@homonoid/react";',
      "",
      "export function Example() {",
      "  return (",
      `    <Kbd${propString}>`,
      '      <Kbd.Abbr keyValue="command" />',
      "      <Kbd.Content>K</Kbd.Content>",
      "    </Kbd>",
      "  );",
      "}",
    ].join("\n");
  }

  if (multiKey) {
    const keyValProp = 'keyValue={["command", "shift"]}';
    const contentProp = 'content="P"';
    const fullProps = props.length > 0 ? ` ${props.join(" ")} ${keyValProp} ${contentProp}` : ` ${keyValProp} ${contentProp}`;
    return [
      'import { Kbd } from "@homonoid/react";',
      "",
      "export function Example() {",
      `  return <Kbd${fullProps} />;`,
      "}",
    ].join("\n");
  }

  const keyValProp = 'keyValue="command"';
  const contentProp = 'content="K"';
  const fullProps = props.length > 0 ? ` ${props.join(" ")} ${keyValProp} ${contentProp}` : ` ${keyValProp} ${contentProp}`;
  return [
    'import { Kbd } from "@homonoid/react";',
    "",
    "export function Example() {",
    `  return <Kbd${fullProps} />;`,
    "}",
  ].join("\n");
}

