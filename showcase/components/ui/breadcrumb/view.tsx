"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Folder, Home, Shield, Sliders } from "lucide-react";
import {
  cond,
  when,
  Breadcrumb,
  Select,
  type BreadcrumbItemData,
  type BreadcrumbSize,
} from "@homonoid/react";
import { Studio } from "@/components/ui/studio";
import {
  BREADCRUMB_ITEMS,
  getBreadcrumbCode,
  type BreadcrumbSeparatorType,
} from "./model";

const SEPARATOR_OPTIONS = [
  { value: "chevron", label: "Chevron (>)" },
  { value: "slash", label: "Slash (/)" },
  { value: "dot", label: "Dot (•)" },
];

const SEPARATOR_NODES: Record<BreadcrumbSeparatorType, ReactNode> = {
  chevron: undefined,
  slash: <span className="text-muted/60">/</span>,
  dot: <span className="size-1 rounded-full bg-current opacity-60" />,
};

export function BreadcrumbView() {
  const [size, setSize] = useState<BreadcrumbSize>("md");
  const [separatorType, setSeparatorType] =
    useState<BreadcrumbSeparatorType>("chevron");
  const [showIcons, setShowIcons] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [compound, setCompound] = useState(false);

  const code = useMemo(
    () =>
      getBreadcrumbCode({
        size,
        separatorType,
        showIcons,
        collapse,
        compound,
      }),
    [size, separatorType, showIcons, collapse, compound]
  );

  const iconClass = cond(
    size === "sm",
    "size-3 shrink-0",
    cond(size === "lg", "size-4 shrink-0", "size-3.5 shrink-0")
  );

  const renderIcon = (name?: string) => {
    if (!showIcons || !name) return undefined;
    if (name === "Home") return <Home className={iconClass} />;
    if (name === "Folder") return <Folder className={iconClass} />;
    if (name === "Sliders") return <Sliders className={iconClass} />;
    if (name === "Shield") return <Shield className={iconClass} />;
    return undefined;
  };

  const atomicItems: BreadcrumbItemData[] = useMemo(
    () =>
      BREADCRUMB_ITEMS.map((item) => ({
        label: item.label,
        href: item.href,
        icon: renderIcon(item.iconName),
      })),
    [showIcons, iconClass]
  );

  const separatorNode = SEPARATOR_NODES[separatorType];

  return (
    <Studio
      title="Breadcrumb"
      description="Hierarchical navigation trails indicating location context within a structured information architecture. Supports atomic data arrays, composable subcomponents, customizable separator glyphs, and responsive intermediate tier truncation."
      code={code}
      controls={{
        size: {
          value: size,
          options: ["sm", "md", "lg"],
          onChange: setSize,
        },
        switches: [
          {
            id: "icons",
            label: "Icons",
            description: "Display leading icons on path segments",
            checked: showIcons,
            onChange: setShowIcons,
          },
          {
            id: "collapse",
            label: "Collapse",
            description: "Truncate intermediate path tiers",
            checked: collapse,
            onChange: setCollapse,
          },
          {
            id: "compound",
            label: "Compound",
            description: "Render using explicit subcomponents",
            checked: compound,
            onChange: setCompound,
          },
        ],
        children: (
          <Select
            value={separatorType}
            onValueChange={(val) =>
              setSeparatorType(val as BreadcrumbSeparatorType)
            }
            size="sm"
            placeholder="Separator style"
            options={SEPARATOR_OPTIONS}
          />
        ),
      }}
    >
      {cond(
        compound,
        <Breadcrumb size={size} separator={separatorNode}>
          <Breadcrumb.List>
            {cond(
              collapse,
              <>
                <Breadcrumb.Item>
                  <Breadcrumb.Link href="/">
                    {when(showIcons, <Home className={iconClass} />)}
                    Home
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />

                <Breadcrumb.Item>
                  <Breadcrumb.Ellipsis />
                </Breadcrumb.Item>
                <Breadcrumb.Separator />

                <Breadcrumb.Item>
                  <Breadcrumb.Page>Authentication</Breadcrumb.Page>
                </Breadcrumb.Item>
              </>,
              <>
                {BREADCRUMB_ITEMS.map((item, index) => {
                  const isLast = index === BREADCRUMB_ITEMS.length - 1;
                  return (
                    <span key={item.label} className="contents">
                      <Breadcrumb.Item>
                        {cond(
                          isLast,
                          <Breadcrumb.Page>
                            {renderIcon(item.iconName)}
                            {item.label}
                          </Breadcrumb.Page>,
                          <Breadcrumb.Link href={item.href}>
                            {renderIcon(item.iconName)}
                            {item.label}
                          </Breadcrumb.Link>
                        )}
                      </Breadcrumb.Item>
                      {when(!isLast, <Breadcrumb.Separator />)}
                    </span>
                  );
                })}
              </>
            )}
          </Breadcrumb.List>
        </Breadcrumb>,
        <Breadcrumb
          size={size}
          separator={separatorNode}
          items={atomicItems}
          maxItems={cond(collapse, 3, undefined)}
        />
      )}
    </Studio>
  );
}

