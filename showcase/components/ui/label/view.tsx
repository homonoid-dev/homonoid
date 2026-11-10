"use client";

import { useMemo, useState } from "react";
import {
  cond,
  when,
  Description,
  Input,
  Label,
  type LabelSize,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getLabelCode } from "./model";

export function LabelView() {
  const [size, setSize] = useState<LabelSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [paired, setPaired] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  const code = useMemo(
    () =>
      getLabelCode({
        size,
        disabled,
        required,
        paired,
        showDescription,
      }),
    [size, disabled, required, paired, showDescription]
  );

  return (
    <Studio
      title="Label"
      description="Accessible typographic descriptor binding readable control names to interactive inputs, switches, and selection widgets."
      code={code}
      controls={{
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        switches: [
          {
            id: "required",
            label: "Required Field",
            description: "Display mandatory indicator",
            checked: required,
            onChange: setRequired,
          },
          {
            id: "paired",
            label: "Control Association",
            description: "Link to interactive input target",
            checked: paired,
            onChange: setPaired,
          },
          {
            id: "description",
            label: "Helper Description",
            description: "Accompany with secondary caption",
            checked: showDescription,
            onChange: setShowDescription,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Dim typography for inactive state",
            checked: disabled,
            onChange: setDisabled,
          },
        ],
      }}
    >
      <div className="w-full max-w-sm p-4">
        {cond(
          paired,
          <div className="flex flex-col gap-1.5 w-full text-left">
            <Label htmlFor="user-email" size={size} disabled={disabled}>
              Email address
              {when(required, <span className="text-destructive ml-0.5">*</span>)}
            </Label>
            <Input id="user-email" placeholder="name@example.com" disabled={disabled} />
            {when(
              showDescription,
              <Description size="sm" disabled={disabled}>
                We will never share your email address with third parties.
              </Description>
            )}
          </div>,
          <div className="flex flex-col gap-1 w-full text-left">
            <Label size={size} disabled={disabled}>
              Account Identifier
              {when(required, <span className="text-destructive ml-0.5">*</span>)}
            </Label>
            {when(
              showDescription,
              <Description size="sm" disabled={disabled}>
                Unique username or verified corporate email handle.
              </Description>
            )}
          </div>
        )}
      </div>
    </Studio>
  );
}

