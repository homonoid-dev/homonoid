import type { DropdownRadius, DropdownSize } from "@homonoid/react";

export interface DropdownCodeOptions {
  size: DropdownSize;
  radius: DropdownRadius;
  placement: string;
  showShortcuts: boolean;
  showDestructive: boolean;
  showGroups: boolean;
  disabled: boolean;
}

export function getDropdownCode(options: DropdownCodeOptions): string {
  const {
    size,
    radius,
    placement,
    showShortcuts,
    showDestructive,
    showGroups,
    disabled,
  } = options;

  const props: string[] = [];
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (radius !== "lg") {
    props.push(`radius="${radius}"`);
  }
  if (placement !== "bottom-start") {
    props.push(`placement="${placement}"`);
  }
  if (disabled) {
    props.push("disabled");
  }

  const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";

  const imports = ["Dropdown", "Button"];
  if (showShortcuts) {
    imports.push("Kbd");
  }
  if (showDestructive || showGroups) {
    imports.push("Separator");
  }

  const lines: string[] = [
    `import { ${imports.join(", ")} } from "@homonoid/react";`,
    'import { Copy, Edit3, Trash2, UserPlus } from "lucide-react";',
    "",
    "export function Example() {",
    "  return (",
    `    <Dropdown${propsString}>`,
    "      <Dropdown.Trigger>",
    '        <Button variant="outlined">Options</Button>',
    "      </Dropdown.Trigger>",
    "      <Dropdown.Content>",
    "        <Dropdown.List>",
  ];

  if (showGroups) {
    lines.push("          <Dropdown.Group>");
    lines.push("            <Dropdown.Label>Manage</Dropdown.Label>");
  }

  const shortcutEdit = showShortcuts ? ' trailing={<Kbd size="sm">⌘E</Kbd>}' : "";
  const shortcutCopy = showShortcuts ? ' trailing={<Kbd size="sm">⌘C</Kbd>}' : "";
  const shortcutInvite = showShortcuts ? ' trailing={<Kbd size="sm">⌘I</Kbd>}' : "";
  const shortcutDelete = showShortcuts ? ' trailing={<Kbd size="sm">⌫</Kbd>}' : "";

  lines.push(`          <Dropdown.Item leading={<Edit3 className="size-4" />}${shortcutEdit}>Edit</Dropdown.Item>`);
  lines.push(`          <Dropdown.Item leading={<Copy className="size-4" />}${shortcutCopy}>Duplicate</Dropdown.Item>`);
  lines.push(`          <Dropdown.Item leading={<UserPlus className="size-4" />}${shortcutInvite}>Invite</Dropdown.Item>`);

  if (showGroups) {
    lines.push("          </Dropdown.Group>");
  }

  if (showDestructive) {
    lines.push("          <Separator />");
    lines.push(`          <Dropdown.Item color="destructive" leading={<Trash2 className="size-4" />}${shortcutDelete}>Delete</Dropdown.Item>`);
  }

  lines.push("        </Dropdown.List>");
  lines.push("      </Dropdown.Content>");
  lines.push("    </Dropdown>");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

