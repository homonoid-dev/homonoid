/**
 * Evaluates whether any of the provided conditions are truthy.
 * Safely handles boolean, undefined, and null values.
 */
export const any = (...flags: (boolean | undefined | null)[]): boolean =>
  flags.some(Boolean);

/**
 * Evaluates whether all of the provided conditions are truthy.
 * Safely handles boolean, undefined, and null values.
 */
export const all = (...flags: (boolean | undefined | null)[]): boolean =>
  flags.every(Boolean);

/**
 * Evaluates a condition and returns the thenBranch if truthy, otherwise elseBranch.
 * Functional replacement for inline ternary expressions.
 */
export const iff = <T, F>(
  condition: boolean | undefined | null,
  thenBranch: T,
  elseBranch: F
): T | F => (Boolean(condition) ? thenBranch : elseBranch);

/**
 * Alias for iff (conditional selection).
 */
export const cond = iff;
