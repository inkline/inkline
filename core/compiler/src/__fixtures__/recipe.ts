/**
 * Module-level styling recipe imported by `StyledRecipe.ink.tsx`. Stands in for a styleframe recipe:
 * a plain function the compiler must forward as a module import and call, never treat as a signal.
 */
export function badge(variants: { color?: string; size?: string }): string {
  return `badge-${variants.color ?? "primary"}-${variants.size ?? "md"}`;
}
