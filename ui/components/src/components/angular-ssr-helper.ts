// Test support: SSR-render a styled component (plus the headless parts it composes) on the Angular
// target and return the real rendered HTML. The registry build + chain layout live in
// `@inkline/test-utils` (prepareStyledAngularChain); here we just resolve the package-relative paths,
// cache the prepared chain, and mount it with per-call props.

import {
  mountForTarget,
  prepareStyledAngularChain,
  resolveComponent,
  type MountResult,
  type StyledAngularChain,
} from "@inkline/test-utils";

// The package tsconfig pulls in `.styleframe/styleframe.d.ts`, which declares the
// `virtual:styleframe` module — without it, props inherited from a recipe-props interface
// (`extends BadgeStylingProps`) are invisible to the compiler and no inputs are generated.
const TSCONFIG = resolveComponent(import.meta.url, "../../tsconfig.json");

const prepared = new Map<string, Promise<StyledAngularChain>>();

export async function mountStyledOnAngular(
  importMetaUrl: string,
  styledRel: string,
  headlessRels: readonly string[],
  props?: Record<string, unknown>,
): Promise<MountResult> {
  const styledPath = resolveComponent(importMetaUrl, styledRel);
  const headlessPaths = headlessRels.map((r) => resolveComponent(importMetaUrl, r));
  const key = [styledPath, ...headlessPaths].join("|");
  let pending = prepared.get(key);
  if (!pending) {
    pending = prepareStyledAngularChain(styledPath, headlessPaths, { tsconfig: TSCONFIG });
    prepared.set(key, pending);
  }
  const { entry, supporting, host } = await pending;
  return mountForTarget("angular", entry, props, supporting, host);
}
