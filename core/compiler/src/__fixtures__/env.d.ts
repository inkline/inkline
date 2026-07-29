/**
 * Ambient declarations for modules the fixtures import but that only exist at compile time.
 *
 * The fixtures are type-checked (see `core/compiler/tsconfig.json` — they are deliberately not
 * excluded, so a bad upstream JSX bump shows up as a type error rather than silently). Nothing here
 * describes runtime behavior; these are the compile-time stand-ins that let `tsc` resolve the import
 * specifiers the compiler itself synthesizes.
 */

/** Virtual module produced by the styleframe bundler plugin; recipes are `(variants?) => string`. */
declare module "virtual:styleframe" {
  export const plainRecipe: (variants?: Record<string, unknown>) => string;
}
