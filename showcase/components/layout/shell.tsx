import React, { memo } from "react";

// ---------------------------------------------------------------------------
// Shell Layout Subcomponents
// ---------------------------------------------------------------------------

/**
 * Shell.Head slot
 * Fixed header pinned at the top of the viewport
 */
export const Head = memo(function Head({
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
 * Dedicated height-locked sidebar column
 */
export const Side = memo(function Side({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="h-full shrink-0 flex overflow-hidden">
      {children}
    </div>
  );
});

/**
 * Shell.Main slot
 * Dedicated height-locked main content viewport with completely independent scroll
 */
export const Main = memo(function Main({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <main className="flex-1 h-full overflow-y-auto min-w-0">
      {children}
    </main>
  );
});

// ---------------------------------------------------------------------------
// Main Shell Component
// ---------------------------------------------------------------------------

/**
 * Shell
 * Application layout with locked viewport and completely independent
 * non-interfering scroll containers for Sidebar and Main.
 */
export function Shell({
  children,
}: {
  children?: React.ReactNode;
}) {
  const items = React.Children.toArray(children);
  const head = items.find(
    (child) => React.isValidElement(child) && child.type === Head
  );
  const body = items.filter((child) => child !== head);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground">
      {head}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {body}
      </div>
    </div>
  );
}

Shell.Head = Head;
Shell.Side = Side;
Shell.Main = Main;