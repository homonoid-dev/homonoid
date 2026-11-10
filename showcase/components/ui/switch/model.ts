import type {
  Color,
  Radius,
  Size,
  SwitchPlacement,
  Variant,
} from "@homonoid/react";

export interface SwitchCodeOptions {
  size: Size;
  radius: Radius;
  checked: boolean;
  disabled: boolean;
  invalid: boolean;
  showDescription: boolean;
  tile: boolean;
  tileVariant: Variant;
  tileColor: Color;
  tilePlacement: SwitchPlacement;
}

export function getSwitchCode(options: SwitchCodeOptions): string {
  const {
    size,
    radius,
    checked,
    disabled,
    invalid,
    showDescription,
    tile,
    tileVariant,
    tileColor,
    tilePlacement,
  } = options;

  const props: string[] = [];

  if (tile) {
    if (tileVariant !== "outlined") {
      props.push(`variant="${tileVariant}"`);
    }
    if (tileColor !== "surface") {
      props.push(`color="${tileColor}"`);
    }
    if (tilePlacement !== "trailing") {
      props.push(`placement="${tilePlacement}"`);
    }
  }

  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (radius !== "full") {
    props.push(`radius="${radius}"`);
  }
  if (checked) {
    props.push("defaultChecked");
  }
  if (invalid) {
    props.push("invalid");
  }
  if (disabled) {
    props.push("disabled");
  }

  props.push('label="Airplane Mode"');
  if (showDescription) {
    props.push('description="Disable all wireless connections and network radios."');
  }

  const componentName = tile ? "Switch.Tile" : "Switch";
  const propsString = props.map((p) => `\n      ${p}`).join("");

  return [
    'import { Switch } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    `    <${componentName}${propsString}`,
    "    />",
    "  );",
    "}",
  ].join("\n");
}

