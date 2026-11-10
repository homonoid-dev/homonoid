"use client";

import { useMemo, useState } from "react";
import { Bell, Zap } from "lucide-react";
import {
  any,
  cond,
  when,
  Avatar,
  Badge,
  Button,
  Select,
  type BadgeColor,
  type BadgePlacement,
  type BadgeRadius,
  type BadgeSize,
  type BadgeVariant,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import { getBadgeCode, type BadgeAnchorTarget } from "./model";

const PLACEMENT_OPTIONS = [
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
];

const TARGET_OPTIONS = [
  { value: "avatar", label: "Avatar" },
  { value: "button", label: "Button" },
];

const COUNT_OPTIONS = [
  { value: "5", label: "Count: 5" },
  { value: "42", label: "Count: 42" },
  { value: "128", label: "Overflow: 128 (99+)" },
];

export function BadgeView() {
  const [variant, setVariant] = useState<BadgeVariant>("contained");
  const [color, setColor] = useState<BadgeColor>("primary");
  const [size, setSize] = useState<BadgeSize>("md");
  const [radius, setRadius] = useState<BadgeRadius>("full");
  const [dot, setDot] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [countValue, setCountValue] = useState(5);
  const [anchor, setAnchor] = useState(false);
  const [anchorTarget, setAnchorTarget] = useState<BadgeAnchorTarget>("avatar");
  const [placement, setPlacement] = useState<BadgePlacement>("top-right");
  const [label] = useState("Featured");

  const code = useMemo(
    () =>
      getBadgeCode({
        variant,
        color,
        size,
        radius,
        dot,
        showIcon,
        showCount,
        countValue,
        anchor,
        anchorTarget,
        placement,
        label,
      }),
    [
      variant,
      color,
      size,
      radius,
      dot,
      showIcon,
      showCount,
      countValue,
      anchor,
      anchorTarget,
      placement,
      label,
    ]
  );

  return (
    <Studio
      title="Badge"
      description="Compact semantic indicators communicating status categories, numeric counts, and auxiliary entity metadata. Delivers continuous border radii, presence status dots, numeric notification badges, and anchored corner overlays."
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
            id: "anchor",
            label: "Anchor",
            description: "Overlay corner on target element",
            checked: anchor,
            onChange: setAnchor,
          },
          {
            id: "dot",
            label: "Dot",
            description: "Render presence indicator dot",
            checked: dot,
            onChange: setDot,
            disabled: any(anchor, showCount),
          },
          {
            id: "icon",
            label: "Icon",
            description: "Display leading decorative icon",
            checked: showIcon,
            onChange: setShowIcon,
            disabled: any(anchor, showCount),
          },
          {
            id: "count",
            label: "Count",
            description: "Display numeric notification count",
            checked: showCount,
            onChange: setShowCount,
          },
        ],
        children: any(anchor, showCount) ? (
          <>
            {when(
              anchor,
              <Select
                value={placement}
                onValueChange={(val) => setPlacement(val as BadgePlacement)}
                size="sm"
                placeholder="Anchor placement"
                options={PLACEMENT_OPTIONS}
              />
            )}
            {when(
              anchor,
              <Select
                value={anchorTarget}
                onValueChange={(val) => setAnchorTarget(val as BadgeAnchorTarget)}
                size="sm"
                placeholder="Anchor target"
                options={TARGET_OPTIONS}
              />
            )}
            {when(
              showCount,
              <Select
                value={String(countValue)}
                onValueChange={(val) => setCountValue(Number(val))}
                size="sm"
                placeholder="Count threshold"
                options={COUNT_OPTIONS}
              />
            )}
          </>
        ) : undefined,
      }}
    >
      {cond(
        anchor,
        cond(
          anchorTarget === "button",
          <Badge
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            placement={placement}
            dot={cond(showCount, false, true)}
            count={cond(showCount, countValue, undefined)}
          >
            <Button
              variant="outlined"
              color="surface"
              size="md"
              layout="icon"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </Button>
          </Badge>,
          <Badge
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            placement={placement}
            dot={cond(showCount, false, true)}
            count={cond(showCount, countValue, undefined)}
          >
            <Avatar
              name="Alex Rivera"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              size="lg"
            />
          </Badge>
        ),
        cond(
          showCount,
          <Badge
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            count={countValue}
          />,
          <Badge
            variant={variant}
            color={color}
            size={size}
            radius={radius}
            dot={dot}
            leading={when(
              showIcon,
              <Zap
                className={cond(
                  size === "sm",
                  "size-3",
                  cond(size === "lg", "size-4", "size-3.5")
                )}
              />
            )}
          >
            {label}
          </Badge>
        )
      )}
    </Studio>
  );
}
