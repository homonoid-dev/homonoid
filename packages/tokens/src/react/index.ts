export const tokens = {
  seed: {
    seed: "var(--seed)"
  },
  color: {
    primary: "var(--primary)",
    "primary-hover": "var(--primary-hover)",
    "primary-foreground": "var(--primary-foreground)",
    "primary-active": "var(--primary-active)",
    "primary-border": "var(--primary-border)",
    subtle: "var(--subtle)",
    "subtle-hover": "var(--subtle-hover)",
    "subtle-active": "var(--subtle-active)",
    "subtle-foreground": "var(--subtle-foreground)",
    "subtle-border": "var(--subtle-border)",
    background: "var(--background)",
    foreground: "var(--foreground)",
    muted: "var(--muted)",
    surface: "var(--surface)",
    "surface-active": "var(--surface-active)",
    "surface-hover": "var(--surface-hover)",
    border: "var(--border)",
    destructive: "var(--destructive)",
    "destructive-hover": "var(--destructive-hover)",
    "destructive-active": "var(--destructive-active)",
    "destructive-foreground": "var(--destructive-foreground)",
    "destructive-border": "var(--destructive-border)"
  },
  spacing: {
    "h-control-sm": "var(--h-control-sm)",
    "h-control-md": "var(--h-control-md)",
    "h-control-lg": "var(--h-control-lg)",
    "p-control-x": "var(--p-control-x)",
    "p-control-y": "var(--p-control-y)",
    "gap-control": "var(--gap-control)",
    "p-surface-sm": "var(--p-surface-sm)",
    "p-surface-md": "var(--p-surface-md)",
    "p-surface-lg": "var(--p-surface-lg)",
    "p-surface": "var(--p-surface)",
    "gap-surface": "var(--gap-surface)",
    "p-layout": "var(--p-layout)",
    "p-layout-x": "var(--p-layout-x)",
    "p-layout-y": "var(--p-layout-y)",
    "gap-layout": "var(--gap-layout)"
  },
  motion: {
    "duration-instant": "var(--motion-duration-instant)",
    "duration-fast": "var(--motion-duration-fast)",
    "duration-normal": "var(--motion-duration-normal)",
    "duration-slow": "var(--motion-duration-slow)",
    easing: "var(--motion-easing)",
    "press-scale": "var(--motion-press-scale)"
  }
} as const;

export type Tokens = typeof tokens;
