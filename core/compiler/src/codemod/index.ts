/**
 * Source-rewriting fixes for authored `.ink.tsx` files.
 *
 * These are the write half of a diagnostic: a rule the compiler can report but not repair leaves
 * the author holding a mechanical edit. Everything here is offered through `inkline fix`, never
 * through the bundler plugin — compilation reads source, it does not mutate it.
 */
export { declareModels } from "./declare-models.ts";
export type { DeclareModelsResult, DeclaredModel, ModelEdit } from "./declare-models.ts";
