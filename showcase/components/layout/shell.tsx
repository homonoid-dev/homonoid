import React, { memo } from "react";

// ---------------------------------------------------------------------------
// Shell Layout Subcomponents
// ---------------------------------------------------------------------------

/**
 * Shell.Head slot
 * Fixed header pinned at the top of the viewport
 */
export const Header = memo(function Head({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className="shrink-0 h-15 w-full">
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
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 h-screen shrink-0 flex overflow-hidden">
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
}: {
  children?: React.ReactNode;
}) {
  return (
    <main className="flex-1 min-w-0">
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
}: {
  children?: React.ReactNode;
}) {
  const items = React.Children.toArray(children);
  const header = items.find(
    (child) => React.isValidElement(child) && child.type === Header
  );
  const body = items.filter((child) => child !== header);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground">
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