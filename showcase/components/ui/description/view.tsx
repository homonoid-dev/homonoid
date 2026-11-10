"use client";

import { useMemo, useState } from "react";
import {
  cond,
  Description,
  Heading,
  type DescriptionSize,
  type DescriptionVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getDescriptionCode } from "./model";

export function DescriptionView() {
  const [variant, setVariant] = useState<DescriptionVariant>("muted");
  const [size, setSize] = useState<DescriptionSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [paired, setPaired] = useState(true);
  const [extended, setExtended] = useState(false);

  const code = useMemo(
    () =>
      getDescriptionCode({
        variant,
        size,
        disabled,
        paired,
        extended,
      }),
    [variant, size, disabled, paired, extended]
  );

  const text = cond(
    extended,
    "Two factor authentication adds an extra layer of security to your account. In addition to your password, you will need to enter a verification code sent to your authenticated device.",
    "Two factor authentication is enabled across all workspace accounts."
  );

  return (
    <Studio
      title="Description"
      description="Supportive explanatory typography providing secondary guidance and contextual clarification beneath headings, form controls, and cards."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["muted", "surface"],
          onChange: setVariant,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        switches: [
          {
            id: "paired",
            label: "Heading Pairing",
            description: "Display below primary heading",
            checked: paired,
            onChange: setPaired,
          },
          {
            id: "extended",
            label: "Extended Copy",
            description: "Show multiline paragraph text",
            checked: extended,
            onChange: setExtended,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Dim text presentation",
            checked: disabled,
            onChange: setDisabled,
          },
        ],
      }}
    >
      <div className="flex items-center justify-center p-4">
        {cond(
          paired,
          <div className="flex flex-col gap-1 max-w-md w-full text-left">
            <Heading as="h3">Security Overview</Heading>
            <Description variant={variant} size={size} disabled={disabled}>
              {text}
            </Description>
          </div>,
          <div className="max-w-md w-full text-left">
            <Description variant={variant} size={size} disabled={disabled}>
              {text}
            </Description>
          </div>
        )}
      </div>
    </Studio>
  );
}

