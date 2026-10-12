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
