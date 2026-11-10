import type { DescriptionSize, DescriptionVariant } from "@homonoid/react";

export interface DescriptionCodeOptions {
  variant: DescriptionVariant;
  size: DescriptionSize;
  disabled: boolean;
  paired: boolean;
  extended: boolean;
}

export function getDescriptionCode(options: DescriptionCodeOptions): string {
  const { variant, size, disabled, paired, extended } = options;

  const props: string[] = [];
  if (variant !== "muted") {
    props.push(`variant="${variant}"`);
  }
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (disabled) {
    props.push("disabled");
  }

  const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";
  const text = extended
    ? "Two factor authentication adds an extra layer of security to your account. In addition to your password, you will need to enter a verification code sent to your authenticated device."
    : "Two factor authentication is enabled across all workspace accounts.";

  if (paired) {
    return [
      'import { Heading, Description } from "@homonoid/react";',
      "",
      "export function Example() {",
      "  return (",
      '    <div className="flex flex-col gap-1">',
      '      <Heading as="h3">Security Overview</Heading>',
      `      <Description${propsString}>`,
      `        ${text}`,
      "      </Description>",
      "    </div>",
      "  );",
      "}",
    ].join("\n");
  }

  return [
    'import { Description } from "@homonoid/react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Description${propsString}>`,
    `      ${text}`,
    "    </Description>",
    "  );",
    "}",
  ].join("\n");
}

