import type { ReactNode } from "react";
import {
  Button,
  type ButtonSize,
  type ButtonVariant,
  type ButtonColor,
  type ButtonShape,
} from "@homonoid/react";
import GithubIcon from "@/components/icons/github";
import FigmaIcon from "@/components/icons/figma";

const GITHUB_REPO_URL = "https://github.com/lumunar/homonoid/tree/main";

export type ResourceType = "github" | "figma" | "npm";

export interface ResourceProps {
  /**
   * Resource platform type.
   */
  type: ResourceType;

  /**
   * Component directory name within packages/react (e.g. "button", "card", "label").
   * Automatically resolves to packages/react/src/components/{component} for GitHub.
   */
  component?: string;

  /**
   * Relative path from repository root (e.g. "packages/react").
   */
  path?: string;

  /**
   * Full URL target. Required for "figma" resources.
   */
  href?: string;

  /**
   * Custom leading icon. Defaults to platform icon if omitted.
   */
  icon?: ReactNode;

  /**
   * Button label content.
   * Defaults to "Source" for GitHub, "Figma" for Figma, and "npm" for npm.
   */
  children?: ReactNode;

  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  shape?: ButtonShape;
  className?: string;
}

export function Resource({
  type,
  component,
  path,
  href,
  icon,
  children,
  size = "md",
  variant = "outlined",
  color = "surface",
  shape = "circle",
  className,
}: ResourceProps) {
  let targetUrl = href;

  if (!targetUrl) {
    if (type === "github") {
      if (component) {
        targetUrl = `${GITHUB_REPO_URL}/packages/react/src/components/${component}`;
      } else if (path) {
        targetUrl = `${GITHUB_REPO_URL}/${path.replace(/^\//, "")}`;
      } else {
        targetUrl = `${GITHUB_REPO_URL}/packages/react`;
      }
    } else if (type === "npm") {
      targetUrl = `https://www.npmjs.com/package/${component ? `@homonoid/${component}` : "@homonoid/react"}`;
    }
  }

  // Resolve platform default label
  const label =
    children ??
    (type === "github" ? "Source" : type === "figma" ? "Figma" : "npm");

  // Resolve platform default icon
  const leadingIcon =
    icon ??
    (type === "github" ? (
      <GithubIcon className="size-3.5" />
    ) : type === "figma" ? (
      <FigmaIcon className="size-3.5" />
    ) : undefined);

  return (
    <a
      href={targetUrl ?? "#"}
      target="_blank"
      rel="noreferrer"
      className="w-fit"
    >
      <Button
        variant={variant}
        color={color}
        shape={shape}
        size={size}
        className={className}
        leading={leadingIcon}
      >
        {label}
      </Button>
    </a>
  );
}
