export const webTokens = {
  color: {
    surface: {
      primary: "var(--hm-color-surface-primary)",
      primaryHover: "var(--hm-color-surface-primary-hover)",
      primaryActive: "var(--hm-color-surface-primary-active)",
      secondary: "var(--hm-color-surface-secondary)",
      secondaryHover: "var(--hm-color-surface-secondary-hover)",
      secondaryActive: "var(--hm-color-surface-secondary-active)",
      ghostHover: "var(--hm-color-surface-ghost-hover)",
      ghostActive: "var(--hm-color-surface-ghost-active)",
      destructive: "var(--hm-color-surface-destructive)",
      destructiveHover: "var(--hm-color-surface-destructive-hover)",
      destructiveActive: "var(--hm-color-surface-destructive-active)"
    },
    content: {
      onPrimary: "var(--hm-color-content-on-primary)",
      primary: "var(--hm-color-content-primary)",
      secondary: "var(--hm-color-content-secondary)",
      destructive: "var(--hm-color-content-destructive)",
      disabled: "var(--hm-color-content-disabled)"
    },
    border: {
      subtle: "var(--hm-color-border-subtle)",
      strong: "var(--hm-color-border-strong)"
    },
    focusRing: "var(--hm-color-focus-ring)"
  },
  radius: {
    sm: "var(--hm-radius-sm)",
    md: "var(--hm-radius-md)",
    lg: "var(--hm-radius-lg)",
    full: "var(--hm-radius-full)"
  },
  motion: {
    durationFast: "var(--hm-motion-duration-fast)",
    durationNormal: "var(--hm-motion-duration-normal)",
    easingStandard: "var(--hm-motion-easing-standard)",
    pressScale: "var(--hm-motion-press-scale)"
  }
} as const;

export type WebTokens = typeof webTokens;
