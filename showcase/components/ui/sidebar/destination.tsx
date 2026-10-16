"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@harmonia/react/cn";
import { cond } from "@harmonia/react";
import { useSidebar } from "./context";
import type { SidebarDestinationProps } from "./types";

export function SidebarDestination({
  href,
  icon,
  active,
  keep = "icon",
  onClick,
  children,
  className,
}: SidebarDestinationProps) {
  const { collapsed } = useSidebar();
  const pathname = usePathname();
  const isSelected = cond(
    active !== undefined,
    active,
    cond(Boolean(href), pathname === href, false)
  );

  const isIconKept = keep === "icon";
  const showLabel = !collapsed || keep === "label";
  const showIcon = Boolean(icon && (!collapsed || isIconKept));

  const labelText = cond(typeof children === "string", children as string, undefined);

  const content = (
    <>
      <span
        className={cn(
          "truncate transition-[opacity,max-width] duration-300 ease-in-out whitespace-nowrap",
          cond(
            showLabel,
            "max-w-full opacity-100",
            "max-w-0 opacity-0 overflow-hidden pointer-events-none"
          )
        )}
      >
        {children}
      </span>
      {icon && (
        <span
          className={cn(
            "shrink-0 transition-[opacity,transform,color] duration-300 ease-in-out flex items-center justify-center",
            cond(
              showIcon,
              "opacity-100 scale-100",
              "max-w-0 opacity-0 overflow-hidden pointer-events-none scale-90"
            ),
            cond(
              isSelected,
              "text-foreground",
              "text-muted group-hover:text-foreground"
            )
          )}
        >
          {icon}
        </span>
      )}
    </>
  );

  const classes = cn(
    "group text-sm flex items-center w-full py-1 transition-colors duration-300 cursor-pointer select-none",
    cond(collapsed && isIconKept, "justify-center", "justify-between"),
    cond(
      isSelected,
      "text-foreground font-medium",
      "text-muted hover:text-foreground"
    ),
    className
  );

  if (href && !href.startsWith("#")) {
    return (
      <Link
        href={href}
        onClick={onClick}
        title={labelText}
        aria-label={labelText}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={cond(Boolean(href), href as string, "#")}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      title={labelText}
      aria-label={labelText}
      className={classes}
    >
      {content}
    </a>
  );
}
