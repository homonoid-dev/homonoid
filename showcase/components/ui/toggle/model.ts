import type {
  ToggleColor,
  ToggleRadius,
  ToggleSize,
  ToggleVariant,
} from "@homonoid/react";

export interface ToggleCodeOptions {
  variant: ToggleVariant;
  color: ToggleColor;
  size: ToggleSize;
  radius: ToggleRadius;
  group: boolean;
  docked: boolean;
  disabled: boolean;
  pressed: boolean;
}

export function getToggleCode(options: ToggleCodeOptions): string {
  const {
    variant,
    color,
    size,
    radius,
    group,
    docked,
    disabled,
    pressed,
  } = options;

  if (group) {
    const props: string[] = ['type="multiple"'];

    if (variant !== "contained") {
      props.push(`variant="${variant}"`);
    }
    if (color !== "surface") {
      props.push(`color="${color}"`);
    }
    if (size !== "md") {
      props.push(`size="${size}"`);
    }
    if (radius !== "lg") {
      props.push(`radius="${radius}"`);
    }
    if (docked) {
      props.push("docked");
    }
    if (disabled) {
      props.push("disabled");
    }

    const propsString = props.map((p) => `\n      ${p}`).join("");

    return [
      'import { Toggle } from "@homonoid/react";',
      'import { Bold, Italic, Underline } from "lucide-react";',
      "",
      "export function Example() {",
      "  return (",
      `    <Toggle.Group${propsString}`,
      "    >",
      '      <Toggle.Item value="bold" aria-label="Toggle bold">',
      '        <Bold className="size-4" />',
      "      </Toggle.Item>",
      '      <Toggle.Item value="italic" aria-label="Toggle italic">',
      '        <Italic className="size-4" />',
      "      </Toggle.Item>",
      '      <Toggle.Item value="underline" aria-label="Toggle underline">',
      '        <Underline className="size-4" />',
      "      </Toggle.Item>",
      "    </Toggle.Group>",
      "  );",
      "}",
    ].join("\n");
  }

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
  if (radius !== "lg") {
    props.push(`radius="${radius}"`);
  }
  if (pressed) {
    props.push("defaultPressed");
  }
  if (disabled) {
    props.push("disabled");
  }

  props.push('aria-label="Toggle pin"');

  const propsString = props.map((p) => `\n      ${p}`).join("");

  return [
    'import { Toggle } from "@homonoid/react";',
    'import { Pin } from "lucide-react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Toggle${propsString}`,
    "    >",
    '      <Pin className="size-4" />',
    "    </Toggle>",
    "  );",
    "}",
  ].join("\n");
}

