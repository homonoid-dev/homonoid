export const webTokens = {
  seed: {
    "seed": "var(--seed)"
  },
  color: {
    primary: "var(--primary)",
    "primary-hover": "var(--primary-hover)",
    "primary-foreground": "var(--primary-foreground)",
    "primary-subtle": "var(--primary-subtle)",
    "primary-border": "var(--primary-border)",
    background: "var(--background)",
    foreground: "var(--foreground)",
    muted: "var(--muted)",
    surface: "var(--surface)",
    "surface-active": "var(--surface-active)",
    "surface-hover": "var(--surface-hover)",
    border: "var(--border)",
    destructive: "var(--destructive)",
    "destructive-hover": "var(--destructive-hover)",
    "destructive-foreground": "var(--destructive-foreground)",
    "destructive-subtle": "var(--destructive-subtle)",
    "destructive-border": "var(--destructive-border)"
  },
  spacing: {
    "h-control-sm": "var(--h-control-sm)",
    "h-control-md": "var(--h-control-md)",
    "h-control-lg": "var(--h-control-lg)",
    "p-control-x": "var(--p-control-x)",
    "p-control-y": "var(--p-control-y)",
    "gap-control": "var(--gap-control)",
    "p-surface": "var(--p-surface)",
    "gap-surface": "var(--gap-surface)",
    "p-layout": "var(--p-layout)",
    "gap-layout": "var(--gap-layout)"
  },
  motion: {
    "duration-fast": "var(--motion-duration-fast)",
    "duration-normal": "var(--motion-duration-normal)",
    "easing-standard": "var(--motion-easing-standard)",
    "press-scale": "var(--motion-press-scale)"
  }
} as const;

export type WebTokens = typeof webTokens;
