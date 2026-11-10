"use client";

import { useMemo, useState } from "react";
import {
  when,
  Description,
  Label,
  type LabelSize,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getLabelCode } from "./model";

export function LabelView() {
  const [size, setSize] = useState<LabelSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  const code = useMemo(
    () =>
      getLabelCode({
        size,
        disabled,
        required,
        showDescription,
      }),
    [size, disabled, required, showDescription]
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
            id: "description",
            label: "Description",
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
      </div>
    </Studio>
  );
}
