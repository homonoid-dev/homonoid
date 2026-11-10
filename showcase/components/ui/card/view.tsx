"use client";

import { useMemo, useState } from "react";
import {
  cond,
  when,
  Badge,
  Button,
  Card,
  Description,
  Heading,
  Select,
  type CardColor,
  type CardPadding,
  type CardVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getCardCode } from "./model";

const PADDING_OPTIONS = [
  { value: "md", label: "Medium (Default)" },
  { value: "sm", label: "Small" },
  { value: "lg", label: "Large" },
  { value: "none", label: "None" },
];

export function CardView() {
  const [variant, setVariant] = useState<CardVariant>("outlined");
  const [color, setColor] = useState<CardColor>("surface");
  const [padding, setPadding] = useState<CardPadding>("md");
  const [border, setBorder] = useState(true);
  const [showBadge, setShowBadge] = useState(true);
  const [showActions, setShowActions] = useState(true);

  const code = useMemo(
    () =>
      getCardCode({
        variant,
        color,
        padding,
        border,
        showBadge,
        showActions,
      }),
    [variant, color, padding, border, showBadge, showActions]
  );

  return (
    <Studio
      title="Card"
      description="Container surfaces grouping related information, editorial previews, and interactive task controls. Delivers continuous border radii, semantic color palettes, optional boundary strokes, and responsive internal padding."
      code={code}
      controls={{
        variant: {
          value: variant,
          options: ["outlined", "filled"],
          onChange: setVariant,
        },
        color: {
          value: color,
          options: ["primary", "subtle", "surface", "destructive"],
          onChange: setColor,
        },
        switches: [
          {
            id: "border",
            label: "Border",
            description: "Show hairline border stroke",
            checked: border,
            onChange: setBorder,
          },
          {
            id: "badge",
            label: "Badge",
            description: "Display status indicator badge",
            checked: showBadge,
            onChange: setShowBadge,
          },
          {
            id: "actions",
            label: "Actions",
            description: "Display interactive action buttons",
            checked: showActions,
            onChange: setShowActions,
          },
        ],
        children: (
          <Select
            value={padding}
            onValueChange={(val) => setPadding(val as CardPadding)}
            size="sm"
            placeholder="Internal padding"
            options={PADDING_OPTIONS}
          />
        ),
      }}
    >
      <div className="w-full max-w-sm">
        <Card
          variant={variant}
          color={color}
          border={border}
          padding={padding}
          className="w-full"
        >
          <div className="flex flex-col gap-surface-sm">
            {when(
              showBadge,
              <div className="flex items-center justify-between">
                <Badge
                  variant="outlined"
                  color={cond(color === "destructive", "destructive", "primary")}
                >
                  Active
                </Badge>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <Heading as="h3">Security Overview</Heading>
              <Description>
                Two factor authentication is enabled across all workspace accounts.
              </Description>
            </div>
            {when(
              showActions,
              <div className="flex items-center gap-control-gap pt-2">
                <Button
                  variant="contained"
                  color={cond(color === "destructive", "destructive", "primary")}
                  size="sm"
                >
                  Manage
                </Button>
                <Button
                  variant="outlined"
                  color="surface"
                  size="sm"
                >
                  Details
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Studio>
  );
}

