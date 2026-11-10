"use client";

import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import {
  cond,
  Input,
  Kbd,
  type InputRadius,
  type InputSize,
  type InputVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getInputCode } from "./model";

export function InputView() {
  const [variant, setVariant] = useState<InputVariant>("outlined");
  const [size, setSize] = useState<InputSize>("md");
  const [radius, setRadius] = useState<InputRadius>("lg");
  const [floating, setFloating] = useState(false);
  const [showLeading, setShowLeading] = useState(true);
  const [showTrailing, setShowTrailing] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const code = useMemo(
    () =>
      getInputCode({
        variant,
        size,
        radius,
        floating,
        showLeading,
        showTrailing,
        showDescription,
        invalid,
        disabled,
        readOnly,
      }),
    [
      variant,
      size,
      radius,
      floating,
      showLeading,
      showTrailing,
      showDescription,
      invalid,
      disabled,
      readOnly,
    ]
  );

  return (
    <Studio
      title="Input"
      description="Foundational data entry field supporting floating notched labels, leading or trailing accessories, and structured validation feedback."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["outlined", "contained", "plain"],
          onChange: setVariant,
        },
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        radius: {
          value: radius,
          options: ["none", "sm", "md", "lg", "full"],
          onChange: setRadius,
        },
        switches: [
          {
            id: "floating",
            label: "Floating Label",
            description: "Float label into border notch",
            checked: floating,
            onChange: setFloating,
          },
          {
            id: "leading",
            label: "Leading Icon",
            description: "Display contextual envelope glyph",
            checked: showLeading,
            onChange: setShowLeading,
          },
          {
            id: "trailing",
            label: "Trailing Keycap",
            description: "Display shortcut key annotation",
            checked: showTrailing,
            onChange: setShowTrailing,
          },
          {
            id: "description",
            label: "Helper Description",
            description: "Display supportive format instructions",
            checked: showDescription,
            onChange: setShowDescription,
          },
          {
            id: "invalid",
            label: "Invalid State",
            description: "Trigger validation error presentation",
            checked: invalid,
            onChange: setInvalid,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Inactivate text interaction",
            checked: disabled,
            onChange: setDisabled,
          },
          {
            id: "readOnly",
            label: "Read Only",
            description: "Prevent modification while keeping focus",
            checked: readOnly,
            onChange: setReadOnly,
          },
        ],
      }}
    >
      <div className="w-full max-w-sm p-4">
        <Input
          variant={variant}
          size={size}
          radius={radius}
          floating={floating}
          label="Email address"
          placeholder={cond(floating, undefined, "name@example.com")}
          description={cond(showDescription && !invalid, "We will send an authentication link.", undefined)}
          invalid={invalid}
          error={cond(invalid, "Please provide a valid email format.", undefined)}
          disabled={disabled}
          readOnly={readOnly}
          leading={cond(showLeading, <Mail className="size-4" />, undefined)}
          trailing={cond(showTrailing, <Kbd size="sm" keyValue="command" content="K" />, undefined)}
        />
      </div>
    </Studio>
  );
}

