"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import {
  cond,
  when,
  Button,
  Select,
  type ButtonColor,
  type ButtonLayout,
  type ButtonRadius,
  type ButtonSize,
  type ButtonVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getButtonCode } from "./model";

const LAYOUT_OPTIONS = [
  { value: "inline", label: "Inline" },
  { value: "full", label: "Full Width" },
  { value: "icon", label: "Icon Only" },
];

export function ButtonView() {
  const [variant, setVariant] = useState<ButtonVariant>("contained");
  const [color, setColor] = useState<ButtonColor>("primary");
  const [size, setSize] = useState<ButtonSize>("md");
  const [radius, setRadius] = useState<ButtonRadius>("full");
  const [layout, setLayout] = useState<ButtonLayout>("inline");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showLeading, setShowLeading] = useState(false);
  const [showTrailing, setShowTrailing] = useState(false);
  const [label] = useState("Continue");

  const code = useMemo(
    () =>
      getButtonCode({
        variant,
        color,
        size,
        radius,
        layout,
        loading,
        disabled,
        showLeading,
        showTrailing,
        label,
      }),
    [
      variant,
      color,
      size,
      radius,
      layout,
      loading,
      disabled,
      showLeading,
      showTrailing,
      label,
    ]
  );

  const iconClass = cond(
    size === "sm",
    "size-3.5 shrink-0",
    cond(size === "lg", "size-4.5 shrink-0", "size-4 shrink-0")
  );

  const isIconLayout = layout === "icon";

  return (
    <Studio
      title="Button"
      description="Interactive trigger surfaces executing direct commands, page actions, and workflow transitions. Delivers continuous border radii, semantic color palettes, dimensional stability during loading states, and icon layouts."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["contained", "outlined", "plain"],
          onChange: setVariant,
        },
        color: {
          value: color,
          options: ["primary", "surface", "subtle", "destructive"],
          onChange: setColor,
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
            id: "loading",
            label: "Loading",
            description: "Display animated loading spinner",
            checked: loading,
            onChange: setLoading,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Disable pointer interactions",
            checked: disabled,
            onChange: setDisabled,
          },
          {
            id: "leading",
            label: "Leading Icon",
            description: "Display leading icon before label",
            checked: showLeading,
            onChange: setShowLeading,
            disabled: isIconLayout,
          },
          {
            id: "trailing",
            label: "Trailing Icon",
            description: "Display trailing icon after label",
            checked: showTrailing,
            onChange: setShowTrailing,
            disabled: isIconLayout,
          },
        ],
        children: (
          <Select
            value={layout}
            onValueChange={(val) => setLayout(val as ButtonLayout)}
            size="sm"
            placeholder="Layout style"
            options={LAYOUT_OPTIONS}
          />
        ),
      }}
    >
      <div className={cond(layout === "full", "w-full max-w-xs", "inline-flex")}>
        <Button
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          layout={layout}
          loading={loading}
          disabled={disabled}
          aria-label={cond(isIconLayout, "Add item", undefined)}
          leading={when(showLeading && !isIconLayout, <Plus className={iconClass} />)}
          trailing={when(showTrailing && !isIconLayout, <ArrowRight className={iconClass} />)}
        >
          {cond(isIconLayout, <Plus className={iconClass} />, label)}
        </Button>
      </div>
    </Studio>
  );
}
