
/**
 * Base variant scale.
 * Aligns directly with `@homonoid/tokens` variant scale:
 * - `contained`: Solid background fill.
 * - `outlined`: Transparent background with border outline.
 * - `plain`: Flat plain text/icon button (no background, no border).
 */
export type Variant = "contained" | "outlined" | "plain";

/**
 * Base color scale.
 * Aligns directly with `@homonoid/tokens` color scale:
 * - `primary`: Chroma brand primary.
 * - `subtle`: Chroma subtle.
 * - `surface`: Chroma surface.
 * - `destructive`: Chroma destructive.
 */
export type Color = "primary" | "subtle" | "surface" | "destructive";

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
 * - `full`: Full rounding (`--h-radius-full`)
 */
export type Radius = "none" | "sm" | "md" | "lg" | "full";

