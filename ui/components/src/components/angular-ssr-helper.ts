// Test support: SSR-render a styled component (plus the headless parts it composes) on the
// Angular target and return the real rendered HTML. Styled sources import their parts via
// `../headless/<name>.component`, so the generated files are laid out under `styled/` and
// `headless/` to keep those relative specifiers resolvable in the mount sandbox.

import {
  compileComponent,
  mountForTarget,
  resolveComponent,
  type GeneratedFile,
  type MountResult,
} from "@inkline/test-utils";

// The package tsconfig pulls in `.styleframe/styleframe.d.ts`, which declares the
// `virtual:styleframe` module — without it, props inherited from a recipe-props interface
// (`extends BadgeStylingProps`) are invisible to the compiler and no inputs are generated.
const TSCONFIG = resolveComponent(import.meta.url, "../../tsconfig.json");

const compiled = new Map<string, Promise<readonly GeneratedFile[]>>();

function angularFilesFor(absolutePath: string): Promise<readonly GeneratedFile[]> {
  let pending = compiled.get(absolutePath);
  if (!pending) {
    pending = compileComponent(absolutePath, {
      targets: ["angular"],
      config: { tsconfig: TSCONFIG },
    }).then((r) => r.filesFor("angular"));
    compiled.set(absolutePath, pending);
  }
  return pending;
}

export async function mountStyledOnAngular(
  importMetaUrl: string,
  styledRel: string,
  headlessRels: readonly string[],
  props?: Record<string, unknown>,
): Promise<MountResult> {
  const styledFiles = await angularFilesFor(resolveComponent(importMetaUrl, styledRel));
  const [entryFile, ...styledRest] = styledFiles;
  const entry = { ...entryFile!, path: `styled/${entryFile!.path}` };

  const supporting: GeneratedFile[] = styledRest.map((f) => ({ ...f, path: `styled/${f.path}` }));
  for (const rel of headlessRels) {
    const files = await angularFilesFor(resolveComponent(importMetaUrl, rel));
    supporting.push(...files.map((f) => ({ ...f, path: `headless/${f.path}` })));
  }

  return mountForTarget("angular", entry, props, supporting);
}
