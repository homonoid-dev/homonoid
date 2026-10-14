"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Search, Sun, Moon } from "lucide-react";

function subscribeTheme(callback: () => void) {
    if (typeof window === "undefined") {
        return () => { };
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", callback);
    window.addEventListener("storage", callback);
    return () => {
        media.removeEventListener("change", callback);
        window.removeEventListener("storage", callback);
    };
}

function getThemeSnapshot() {
    if (typeof document === "undefined") {
        return false;
    }
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
        return true;
    }
    if (stored === "light") {
        return false;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot() {
    return false;
}

export function Header() {
    const isDark = useSyncExternalStore(
        subscribeTheme,
        getThemeSnapshot,
        getServerSnapshot
    );

    const toggleTheme = () => {
        const nextDark = !isDark;
        if (nextDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand & Left Navigation */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
                    >
                        {/* Harmonia Monogram / Glyph */}
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 3v18" />
                                <path d="M6 8v8" />
                                <path d="M18 8v8" />
                                <path d="M2 11v2" />
                                <path d="M22 11v2" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold tracking-tight text-foreground">
                                Harmonia
                            </span>
                            <span className="rounded-full border border-subtle-border bg-subtle px-2 py-0.5 text-[10px] font-medium text-subtle-foreground">
                                Showcase
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Items */}
                    <nav className="hidden items-center gap-6 md:flex">
                        <Link
                            href="/"
                            className="text-xs font-medium text-foreground transition-colors hover:text-foreground"
                        >
                            Components
                        </Link>
                        <Link
                            href="/foundations"
                            className="text-xs font-medium text-muted transition-colors hover:text-foreground"
                        >
                            Foundations
                        </Link>
                        <Link
                            href="https://github.com/lumunar/harmonia/tree/main/docs"
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-medium text-muted transition-colors hover:text-foreground"
                        >
                            Documentation
                        </Link>
                    </nav>
                </div>

                {/* Right Actions: Search trigger, GitHub, Theme Toggle */}
                <div className="flex items-center gap-2.5">
                    {/* Quick Search Trigger */}
                    <button
                        type="button"
                        className="flex h-8 items-center gap-2 rounded-md border border-border bg-surface px-2.5 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                        <Search className="h-3.5 w-3.5 text-muted" />
                        <span className="hidden sm:inline">Search components...</span>
                        <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline-block">
                            ⌘K
                        </kbd>
                    </button>

                    {/* GitHub Source Link */}
                    <Link
                        href="https://github.com/lumunar/harmonia"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Repository"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                    >
                        <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                        </svg>
                    </Link>

                    {/* Theme Mode Switcher */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                    >
                        {isDark ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}