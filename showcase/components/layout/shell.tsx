import React, { memo } from "react";
import { cn } from "@homonoid/react/cn";

// ---------------------------------------------------------------------------
// Shell Layout Subcomponents
// ---------------------------------------------------------------------------

/**
 * Shell.Head slot
 * Fixed header pinned at the top of the viewport
 */
export const Header = memo(function Head({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("shrink-0 h-15 w-full", className)}>
      {children}
    </header>
  );
});

/**
 * Shell.Side slot
 * Pinned sticky sidebar column
 */
export const Sidebar = memo(function Side({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="shell-sidebar"
      className={cn(
        "sticky top-0 h-screen shrink-0 hidden md:flex overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
});

/**
 * Shell.Main slot
 * Main content viewport flowing naturally with window scrolling
 */
export const Main = memo(function Main({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("flex-1 min-w-0", className)}>
      {children}
    </main>
  );
});

// ---------------------------------------------------------------------------
// Main Shell Component
// ---------------------------------------------------------------------------

/**
 * Shell
 * Application layout with natural window scrolling and pinned sidebar.
 */
export function Shell({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const items = React.Children.toArray(children);
  const header = items.find(
    (child) => React.isValidElement(child) && child.type === Header
  );
  const body = items.filter((child) => child !== header);

  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col bg-background text-foreground",
        className
      )}
    >
      {header}
      <div className="flex-1 flex min-h-screen">
        {body}
      </div>
    </div>
  );
}

Shell.Header = Header;
Shell.Sidebar = Sidebar;
Shell.Main = Main;
