import type {
  CheckboxPlacement,
  CheckboxRadius,
  CheckboxSize,
  Color,
  Variant,
} from "@homonoid/react";

export interface CheckboxCodeOptions {
  size: CheckboxSize;
  radius: CheckboxRadius;
  checked: boolean;
  indeterminate: boolean;
  invalid: boolean;
  disabled: boolean;
  showDescription: boolean;
  tile: boolean;
  tileVariant: Variant;
  tileColor: Color;
  tilePlacement: CheckboxPlacement;
}

export function getCheckboxCode(options: CheckboxCodeOptions): string {
  const {
    size,
    radius,
    checked,
    indeterminate,
    invalid,
    disabled,
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
  if (radius !== "md") {
    props.push(`radius="${radius}"`);
  }
  if (indeterminate) {
    props.push("indeterminate");
  } else if (checked) {
    props.push("defaultChecked");
  }
  if (invalid) {
    props.push("invalid");
  }
  if (disabled) {
    props.push("disabled");
  }

  props.push('label="Accept terms and conditions"');
  if (showDescription) {
    props.push('description="You agree to our privacy policy and service terms."');
  }

  const componentName = tile ? "Checkbox.Tile" : "Checkbox";
  const propsString = props.map((p) => `\n      ${p}`).join("");

  return [
    'import { Checkbox } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    `    <${componentName}${propsString}`,
    "    />",
    "  );",
    "}",
  ].join("\n");
}

