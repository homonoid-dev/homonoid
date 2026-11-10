import type { BreadcrumbSize } from "@homonoid/react";

export type BreadcrumbSeparatorType = "chevron" | "slash" | "dot";

export interface DemoBreadcrumbItem {
  label: string;
  href?: string;
  iconName?: "Home" | "Folder" | "Sliders" | "Shield";
}

export const BREADCRUMB_ITEMS: DemoBreadcrumbItem[] = [
  { label: "Home", href: "/", iconName: "Home" },
  { label: "Workspace", href: "/workspace", iconName: "Folder" },
  { label: "Settings", href: "/workspace/settings", iconName: "Sliders" },
  { label: "Security", href: "/workspace/settings/security", iconName: "Shield" },
  { label: "Authentication" },
];

export interface BreadcrumbCodeOptions {
  size: BreadcrumbSize;
  separatorType: BreadcrumbSeparatorType;
  showIcons: boolean;
  collapse: boolean;
  compound: boolean;
}

export function getBreadcrumbCode(options: BreadcrumbCodeOptions): string {
  const { size, separatorType, showIcons, collapse, compound } = options;

  const props: string[] = [];
  if (size !== "md") {
    props.push(`size="${size}"`);
  }
  if (separatorType === "slash") {
    props.push("separator={<span>/</span>}");
  } else if (separatorType === "dot") {
    props.push(
      'separator={<span className="size-1 rounded-full bg-current opacity-60" />}'
    );
  }

  const iconImports: string[] = [];
  if (showIcons) {
    iconImports.push("Home", "Folder", "Sliders", "Shield");
  }

  if (compound) {
    const lines: string[] = [];
    lines.push('import { Breadcrumb } from "@homonoid/react";');
    if (iconImports.length > 0) {
      lines.push(`import { ${iconImports.join(", ")} } from "lucide-react";`);
    }
    lines.push("");
    lines.push("export function Example() {");
    lines.push("  return (");

    const breadcrumbTag =
      props.length > 0 ? `    <Breadcrumb ${props.join(" ")}>` : "    <Breadcrumb>";
    lines.push(breadcrumbTag);
    lines.push("      <Breadcrumb.List>");

    if (collapse) {
      // First item
      lines.push("        <Breadcrumb.Item>");
      lines.push('          <Breadcrumb.Link href="/">');
      if (showIcons) {
        lines.push('            <Home className="size-3.5" />');
      }
      lines.push("            Home");
      lines.push("          </Breadcrumb.Link>");
      lines.push("        </Breadcrumb.Item>");
      lines.push("        <Breadcrumb.Separator />");

      // Ellipsis
      lines.push("        <Breadcrumb.Item>");
      lines.push("          <Breadcrumb.Ellipsis />");
      lines.push("        </Breadcrumb.Item>");
      lines.push("        <Breadcrumb.Separator />");

      // Last item
      lines.push("        <Breadcrumb.Item>");
      lines.push("          <Breadcrumb.Page>");
      lines.push("            Authentication");
      lines.push("          </Breadcrumb.Page>");
      lines.push("        </Breadcrumb.Item>");
    } else {
      BREADCRUMB_ITEMS.forEach((item, index) => {
        const isLast = index === BREADCRUMB_ITEMS.length - 1;
        lines.push("        <Breadcrumb.Item>");
        if (isLast) {
          lines.push("          <Breadcrumb.Page>");
          lines.push(`            ${item.label}`);
          lines.push("          </Breadcrumb.Page>");
        } else {
          lines.push(`          <Breadcrumb.Link href="${item.href}">`);
          if (showIcons && item.iconName) {
            lines.push(`            <${item.iconName} className="size-3.5" />`);
          }
          lines.push(`            ${item.label}`);
          lines.push("          </Breadcrumb.Link>");
        }
        lines.push("        </Breadcrumb.Item>");
        if (!isLast) {
          lines.push("        <Breadcrumb.Separator />");
        }
      });
    }

    lines.push("      </Breadcrumb.List>");
    lines.push("    </Breadcrumb>");
    lines.push("  );");
    lines.push("}");

    return lines.join("\n");
  }

  // Atomic mode
  if (collapse) {
    props.push("maxItems={3}");
  }

  const lines: string[] = [];
  lines.push('import { Breadcrumb } from "@homonoid/react";');
  if (showIcons) {
    lines.push(`import { ${iconImports.join(", ")} } from "lucide-react";`);
  }
  lines.push("");
  lines.push("const items = [");
  BREADCRUMB_ITEMS.forEach((item) => {
    const fields: string[] = [`label: "${item.label}"`];
    if (item.href) {
      fields.push(`href: "${item.href}"`);
    }
    if (showIcons && item.iconName) {
      fields.push(`icon: <${item.iconName} className="size-3.5" />`);
    }
    lines.push(`  { ${fields.join(", ")} },`);
  });
  lines.push("];");
  lines.push("");
  lines.push("export function Example() {");
  lines.push("  return (");
  const propsString = props.length > 0 ? ` ${props.join(" ")}` : "";
  lines.push(`    <Breadcrumb items={items}${propsString} />`);
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

