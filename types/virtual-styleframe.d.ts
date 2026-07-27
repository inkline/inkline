/**
 * Fallback type declarations for the `virtual:styleframe` module.
 *
 * `virtual:styleframe` is produced at build time by the styleframe Vite plugin, which also emits
 * `<package>/.styleframe/shims.d.ts` with the real, precise recipe prop types. That directory is
 * generated and gitignored, so on a fresh clone — before anything has been built — the module does
 * not resolve and every styled component collapses into a cascade of `TS2307` / `TS2339` errors.
 *
 * This file exists so a fresh clone type-checks after `pnpm install` alone. It is wired up through
 * the `virtual:styleframe` entry in the root `tsconfig.json` `paths` mapping.
 *
 * Precedence is deliberate and load-bearing. The generated `.styleframe/shims.d.ts` declares
 * `virtual:styleframe` as an *ambient* module, and TypeScript resolves ambient module declarations
 * before it consults `paths`. So once a build has run the real recipe prop types win and this file
 * is never pulled into the program. For the same reason this file must stay a plain module
 * declaration: a second ambient `declare module "virtual:styleframe"` would merge with the
 * generated one and raise `TS2300` / `TS2451` on every shared name.
 *
 * It deliberately does not restate the recipe variant keys. Those are derived from the theme at
 * build time and cannot be known statically here, so every recipe accepts `RecipeProps`. Guessing
 * them would trade a loud failure for a quiet lie.
 *
 * The exported recipe names mirror the `export const *Recipe` declarations across
 * `ui/components/src`, which is what the plugin collects into the virtual module.
 * `ui/components/src/virtual-styleframe-fallback.test.ts` fails if the two drift apart.
 */
import type { Styleframe } from "@styleframe/core";

export declare function styleframe(): Styleframe;

/**
 * Placeholder for a recipe's variant props. The real key/value unions are generated per recipe;
 * until a build has run, any variant key is accepted and its value is untyped.
 */
export type RecipeProps = Record<string, any>;

/** Placeholder for a recipe function. Returns the generated class name string. */
export type Recipe = (props?: RecipeProps) => string;

export type BadgeRecipeProps = RecipeProps;
export declare const badgeRecipe: Recipe;

export type ButtonRecipeProps = RecipeProps;
export declare const buttonRecipe: Recipe;

export type CheckboxRecipeProps = RecipeProps;
export declare const checkboxRecipe: Recipe;

export type CheckboxFieldRecipeProps = RecipeProps;
export declare const checkboxFieldRecipe: Recipe;

export type FieldGroupRecipeProps = RecipeProps;
export declare const fieldGroupRecipe: Recipe;

export type HamburgerMenuRecipeProps = RecipeProps;
export declare const hamburgerMenuRecipe: Recipe;

export type InputRecipeProps = RecipeProps;
export declare const inputRecipe: Recipe;

export type InputPrefixRecipeProps = RecipeProps;
export declare const inputPrefixRecipe: Recipe;

export type InputSuffixRecipeProps = RecipeProps;
export declare const inputSuffixRecipe: Recipe;

export type RadioRecipeProps = RecipeProps;
export declare const radioRecipe: Recipe;

export type RadioGroupRecipeProps = RecipeProps;
export declare const radioGroupRecipe: Recipe;

export type RadioFieldRecipeProps = RecipeProps;
export declare const radioFieldRecipe: Recipe;

export type SwitchRecipeProps = RecipeProps;
export declare const switchRecipe: Recipe;

export type SwitchFieldRecipeProps = RecipeProps;
export declare const switchFieldRecipe: Recipe;
