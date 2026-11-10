import type { SpinnerAnimation, SpinnerColor, SpinnerSize } from "@homonoid/react";

export interface SpinnerCodeOptions {
  animation: SpinnerAnimation;
  size: SpinnerSize;
  color: SpinnerColor;
  showLabel: boolean;
}

export function getSpinnerCode(options: SpinnerCodeOptions): string {
  const { animation, size, color, showLabel } = options;

  const props: string[] = [];

  if (animation !== "border") {
    props.push(`animation="${animation}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (color !== "primary") {
    props.push(`color="${color}"`);
  }
  if (!showLabel) {
    props.push('label=""');
  }

  const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";

  return [
    'import { Spinner } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Spinner${propsString} />`,
    "  );",
    "}",
  ].join("\n");
}

