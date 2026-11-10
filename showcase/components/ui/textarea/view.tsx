"use client";

import { useMemo, useState } from "react";
import {
  cond,
  Textarea,
  type TextareaRadius,
  type TextareaSize,
  type TextareaVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getTextareaCode } from "./model";

export function TextareaView() {
  const [variant, setVariant] = useState<TextareaVariant>("outlined");
  const [size, setSize] = useState<TextareaSize>("md");
  const [radius, setRadius] = useState<TextareaRadius>("lg");
  const [floating, setFloating] = useState(false);
  const [autoResize, setAutoResize] = useState(false);
  const [showDescription, setShowDescription] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const code = useMemo(
    () =>
      getTextareaCode({
        variant,
        size,
        radius,
        floating,
        autoResize,
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
      autoResize,
      showDescription,
      invalid,
      disabled,
      readOnly,
    ]
  );

  return (
    <Studio
      title="Textarea"
      description="Multi line text entry control supporting dynamic auto expansion, notched floating labels, and structured validation feedback."
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
          options: ["full", "lg", "md", "sm", "none"],
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
            id: "autoResize",
            label: "Auto Resize",
            description: "Expand height dynamically with content",
            checked: autoResize,
            onChange: setAutoResize,
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
        <Textarea
          variant={variant}
          size={size}
          radius={radius}
          floating={floating}
          autoResize={autoResize}
          label="Feedback"
          placeholder={cond(floating, undefined, "Share your observations or notes...")}
          description={cond(
            showDescription && !invalid,
            "Markdown formatting is supported.",
            undefined
          )}
          invalid={invalid}
          error={cond(invalid, "Message must contain at least 10 characters.", undefined)}
          disabled={disabled}
          readOnly={readOnly}
          minRows={3}
          maxRows={8}
        />
      </div>
    </Studio>
  );
}

