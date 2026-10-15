"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@harmonia/react/cn";
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
  const isSelected =
    active !== undefined ? active : href ? pathname === href : false;

  const isIconKept = keep === "icon";
  const showLabel = !collapsed || keep === "label";
  const showIcon = Boolean(icon && (!collapsed || isIconKept));

  const labelText = typeof children === "string" ? children : undefined;

  const content = (
    <>
      <span
        className={cn(
          "truncate transition-[opacity,max-width] duration-300 ease-in-out whitespace-nowrap",
          showLabel
            ? "max-w-full opacity-100"
            : "max-w-0 opacity-0 overflow-hidden pointer-events-none"
        )}
      >
        {children}
      </span>
      {icon && (
        <span
          className={cn(
            "shrink-0 transition-[opacity,transform,color] duration-300 ease-in-out flex items-center justify-center",
            showIcon
              ? "opacity-100 scale-100"
              : "max-w-0 opacity-0 overflow-hidden pointer-events-none scale-90",
            isSelected
              ? "text-foreground"
              : "text-muted group-hover:text-foreground"
          )}
        >
          {icon}
        </span>
      )}
    </>
  );

  const classes = cn(
    "group text-sm flex items-center transition-all duration-300 cursor-pointer select-none rounded-md",
    collapsed && isIconKept
      ? "justify-center size-9 p-0 hover:bg-surface/50"
      : "justify-between w-full py-1",
    isSelected
      ? collapsed && isIconKept
        ? "text-foreground font-medium bg-surface"
        : "text-foreground font-medium"
      : "text-muted hover:text-foreground",
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
      href={href ?? "#"}
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
