/**
 * Standard Homonoid spatial control scale.
 * Aligns directly with `@homonoid/tokens` control scale:
 * - `sm`: Small density / 32px frame (`--h-control-sm`)
 * - `md`: Default density / 40px frame (`--h-control-md`)
 * - `lg`: Prominent density / 48px frame (`--h-control-lg`)
 */
export type Size = "sm" | "md" | "lg";

/**
 * Standard Homonoid corner radius scale.
 * Aligns directly with `@homonoid/tokens` radius scale:
 * - `none`: No rounding (`--h-radius-none`)
 * - `sm`: Small rounding (`--h-radius-sm`)
 * - `md`: Medium rounding (`--h-radius-md`)
 * - `lg`: Large rounding (`--h-radius-lg`)
 * - `xl`: Extra large rounding (`--h-radius-xl`)
 * - `full`: Full rounding (`--h-radius-full`)
 */
export type Radius = "none" | "sm" | "md" | "lg" | "xl" | "full";

