"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@harmonia/react/cn";
import type { SidebarDestinationProps } from "./types";

export function SidebarDestination({
  href,
  icon,
  active,
  onClick,
  children,
  className,
}: SidebarDestinationProps) {
  const pathname = usePathname();
  const isSelected =
    active !== undefined ? active : href ? pathname === href : false;

  const content = (
    <>
      <span className="truncate">{children}</span>
      {icon && (
        <span
          className={cn(
            "shrink-0 transition-colors",
            isSelected ? "text-foreground" : "text-muted group-hover:text-foreground"
          )}
        >
          {icon}
        </span>
      )}
    </>
  );

  const classes = cn(
    "group text-sm flex items-center justify-between w-full transition-colors cursor-pointer text-left select-none",
    isSelected ? "text-foreground font-medium" : "text-muted hover:text-foreground",
    className
  );

  if (href && !href.startsWith("#")) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
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
      className={classes}
    >
      {content}
    </a>
  );
}
