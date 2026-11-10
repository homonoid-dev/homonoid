"use client";

import { useMemo, useState } from "react";
import { Copy, Edit3, Trash2, UserPlus } from "lucide-react";
import {
  cond,
  when,
  Button,
  Dropdown,
  Kbd,
  Select,
  Separator,
  type DropdownRadius,
  type DropdownSize,
} from "@homonoid/react";
import type { Placement } from "@floating-ui/react";
import { Studio } from "@/components/ui/studio";
import { getDropdownCode } from "./model";

const PLACEMENT_OPTIONS = [
  { value: "bottom-start", label: "Placement: Bottom Start" },
  { value: "bottom-end", label: "Placement: Bottom End" },
  { value: "top-start", label: "Placement: Top Start" },
  { value: "top-end", label: "Placement: Top End" },
];

export function DropdownView() {
  const [size, setSize] = useState<DropdownSize>("md");
  const [radius, setRadius] = useState<DropdownRadius>("lg");
  const [placement, setPlacement] = useState<Placement>("bottom-start");
  const [showShortcuts, setShowShortcuts] = useState(true);
  const [showDestructive, setShowDestructive] = useState(true);
  const [showGroups, setShowGroups] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const code = useMemo(
    () =>
      getDropdownCode({
        size,
        radius,
        placement: placement as string,
        showShortcuts,
        showDestructive,
        showGroups,
        disabled,
      }),
    [
      size,
      radius,
      placement,
      showShortcuts,
      showDestructive,
      showGroups,
      disabled,
    ]
  );

  return (
    <Studio
      title="Dropdown"
      description="Floating contextual command surface anchored to interactive triggers, featuring keyboard traversal, section headers, and shortcut annotations."
      code={code}
      controls={{
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
            id: "shortcuts",
            label: "Shortcuts",
            description: "Show command shortcut hints",
            checked: showShortcuts,
            onChange: setShowShortcuts,
          },
          {
            id: "destructive",
            label: "Destructive Item",
            description: "Include danger action item",
            checked: showDestructive,
            onChange: setShowDestructive,
          },
          {
            id: "groups",
            label: "Section Groups",
            description: "Categorize items into groups",
            checked: showGroups,
            onChange: setShowGroups,
          },
          {
            id: "disabled",
            label: "Disabled",
            description: "Disable trigger button",
            checked: disabled,
            onChange: setDisabled,
          },
        ],
        children: (
          <Select
            value={placement as string}
            onValueChange={(val) => setPlacement(val as Placement)}
            size="sm"
            placeholder="Placement"
            options={PLACEMENT_OPTIONS}
          />
        ),
      }}
    >
      <div className="flex items-center justify-center p-8">
        <Dropdown
          size={size}
          radius={radius}
          placement={placement}
          disabled={disabled}
        >
          <Dropdown.Trigger>
            <Button variant="outlined" color="surface" size="md">
              Options
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.List>
              {cond(
                showGroups,
                <Dropdown.Group>
                  <Dropdown.Label>Manage</Dropdown.Label>
                  <Dropdown.Item
                    leading={<Edit3 className="size-4" />}
                    trailing={when(showShortcuts, <Kbd size="sm">⌘E</Kbd>)}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    leading={<Copy className="size-4" />}
                    trailing={when(showShortcuts, <Kbd size="sm">⌘C</Kbd>)}
                  >
                    Duplicate
                  </Dropdown.Item>
                  <Dropdown.Item
                    leading={<UserPlus className="size-4" />}
                    trailing={when(showShortcuts, <Kbd size="sm">⌘I</Kbd>)}
                  >
                    Invite
                  </Dropdown.Item>
                </Dropdown.Group>,
                <>
                  <Dropdown.Item
                    leading={<Edit3 className="size-4" />}
                    trailing={when(showShortcuts, <Kbd size="sm">⌘E</Kbd>)}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    leading={<Copy className="size-4" />}
                    trailing={when(showShortcuts, <Kbd size="sm">⌘C</Kbd>)}
                  >
                    Duplicate
                  </Dropdown.Item>
                  <Dropdown.Item
                    leading={<UserPlus className="size-4" />}
                    trailing={when(showShortcuts, <Kbd size="sm">⌘I</Kbd>)}
                  >
                    Invite
                  </Dropdown.Item>
                </>
              )}
              {when(
                showDestructive,
                <>
                  <Separator />
                  <Dropdown.Item
                    color="destructive"
                    leading={<Trash2 className="size-4" />}
                    trailing={when(showShortcuts, <Kbd size="sm">⌫</Kbd>)}
                  >
                    Delete
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.List>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </Studio>
  );
}

