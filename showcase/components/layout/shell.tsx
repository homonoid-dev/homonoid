import React, { memo } from "react";

// ---------------------------------------------------------------------------
// Shell Layout Subcomponents
// ---------------------------------------------------------------------------

/**
 * Shell.Head slot
 * Fixed header/topbar region for global navigation, breadcrumbs, or toolbars
 */
export const Head = memo(function Head({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <header className="shrink-0">
            {children}
        </header>
    );
});

/**
 * Shell.Sidebar slot
 * Houses any sidebar layout right or left (e.g. Navigation tabs, inspector)
 */
export const Side = memo(function Side({
    children,
}: {
    children?: React.ReactNode;
}) {
    return <>{children}</>;
});

/**
 * Shell.Main slot
 * Primary viewport column that flexes to fill available horizontal space
 */
export const Main = memo(function Main({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <main className="flex-1 flex flex-col overflow-y-auto min-w-0">
            {children}
        </main>
    );
});

// ---------------------------------------------------------------------------
// Main Shell Component
// ---------------------------------------------------------------------------

/**
 * Shell
 * Optimized layout frame that locks viewport dimensions and orchestrates
 * headers, sidebars, and main regions with zero unnecessary re-renders.
 */
export function Shell({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground select-none">
            {children}
        </div>
    );
}

Shell.Head = Head;
Shell.Side = Side;
Shell.Main = Main;