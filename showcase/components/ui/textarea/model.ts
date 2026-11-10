import type {
  TextareaRadius,
  TextareaSize,
  TextareaVariant,
} from "@homonoid/react";

export interface TextareaCodeOptions {
  variant: TextareaVariant;
  size: TextareaSize;
  radius: TextareaRadius;
  floating: boolean;
  autoResize: boolean;
  showDescription: boolean;
  invalid: boolean;
  disabled: boolean;
  readOnly: boolean;
}

export function getTextareaCode(options: TextareaCodeOptions): string {
  const {
    variant,
    size,
    radius,
    floating,
    autoResize,
    showDescription,
    invalid,
    disabled,
    readOnly,
  } = options;

  const props: string[] = [];

  if (variant !== "outlined") {
    props.push(`variant="${variant}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (radius !== "lg") {
    props.push(`radius="${radius}"`);
  }
  if (floating) {
    props.push("floating");
  }
  if (autoResize) {
    props.push("autoResize");
  }

  props.push('label="Feedback"');

  if (!floating) {
    props.push('placeholder="Share your observations or notes..."');
  }

  if (invalid) {
    props.push("invalid");
    props.push('error="Message must contain at least 10 characters."');
  } else if (showDescription) {
    props.push('description="Markdown formatting is supported."');
  }

  if (disabled) {
    props.push("disabled");
  }
  if (readOnly) {
    props.push("readOnly");
  }

  props.push("minRows={3}");
  props.push("maxRows={8}");

  const propsString = props.map((p) => `\n      ${p}`).join("");

  return [
    'import { Textarea } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Textarea${propsString}`,
    "    />",
    "  );",
    "}",
  ].join("\n");
}

