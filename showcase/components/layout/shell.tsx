import React, { memo } from "react";

// ---------------------------------------------------------------------------
// Shell Layout Subcomponents
// ---------------------------------------------------------------------------

/**
 * Shell.Head slot
 * Sticky header region pinned to the top of the viewport
 */
export const Head = memo(function Head({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 shrink-0">
      {children}
    </header>
  );
});

/**
 * Shell.Side slot
 * Sticky sidebar region pinned below the header with dedicated viewport height
 */
export const Side = memo(function Side({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="sticky top-15 h-[calc(100vh-3.75rem)] shrink-0 overflow-hidden">
      {children}
    </div>
  );
});

/**
 * Shell.Main slot
 * Primary natural-scrolling content column that flows beneath the sticky header
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
 * Standard documentation layout frame with sticky frosted header,
 * pinned sticky sidebar, and natural document-level page scrolling.
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
    <div className="min-h-screen flex flex-col bg-background text-foreground select-none">
      {head}
      <div className="flex-1 flex w-full">
        {body}
      </div>
    </div>
  );
}

Shell.Head = Head;
Shell.Side = Side;
Shell.Main = Main;