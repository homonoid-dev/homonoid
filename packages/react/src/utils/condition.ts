/**
 * Evaluates whether any of the provided conditions are truthy.
 * Safely handles boolean, undefined, and null values.
 */
export const any = (...flags: unknown[]): boolean =>
  flags.some(Boolean);

/**
 * Evaluates whether all of the provided conditions are truthy.
 * Safely handles boolean, undefined, null, or arbitrary values.
 */
export const all = (...flags: unknown[]): boolean =>
  flags.every(Boolean);

/**
 * Evaluates whether none of the provided conditions are truthy.
 * Safely handles boolean, undefined, null, or arbitrary values.
 */
export const none = (...flags: unknown[]): boolean =>
  flags.every((flag) => !Boolean(flag));

/**
 * Evaluates a condition and returns the thenBranch if truthy, otherwise elseBranch.
 * Functional replacement for inline ternary expressions.
 */
export const cond = <T, F>(
  condition: unknown,
  thenBranch: T,
  elseBranch: F
): T | F => (Boolean(condition) ? thenBranch : elseBranch);

/**
 * Returns a value based on matching a key against a branches dictionary.
 * Falls back to the provided fallback value if the key is not present.
 */
export const match = <K extends string | number | symbol, T>(
  key: K,
  branches: Partial<Record<K, T>>,
  fallback: T
): T => (key in branches ? (branches[key] as T) : fallback);

/**
 * Conditionally executes or returns a node or value when truthy, otherwise null.
 * Prevents unwanted 0 or NaN leakage into JSX output and supports lazy execution via callback.
 */
export const when = <T>(
  condition: unknown,
  nodeOrFactory: T | (() => T)
): T | null => {
  if (!Boolean(condition)) return null;
  return typeof nodeOrFactory === "function"
    ? (nodeOrFactory as () => T)()
    : nodeOrFactory;
};
