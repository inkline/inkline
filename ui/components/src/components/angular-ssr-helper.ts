// Test support: SSR-render a styled component (plus the headless parts it composes) on the
// Angular target and return the real rendered HTML. Styled sources import their parts via
// `../headless/<name>.component`, so the generated files are laid out under `styled/` and
// `headless/` to keep those relative specifiers resolvable in the mount sandbox.

import {
  compileComponent,
  coverInkViaReact,
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
  componentName?: string,
): Promise<MountResult> {
  // Drive the same component (same props) through the React target so V8 coverage attributes the
  // executed `.ink.tsx` logic back to its authored source. A no-op unless a coverage run is active,
  // so a normal `vp test` pays nothing; when active it runs concurrently with the Angular SSR mount
  // that performs the behavioral assertions, and can never fail it (render errors are warnings).
  const coverage = coverInkViaReact(importMetaUrl, styledRel, headlessRels, props ?? {}, {
    tsconfig: TSCONFIG,
  });

  const styledFiles = await angularFilesFor(resolveComponent(importMetaUrl, styledRel));
  const [entryFile, ...styledRest] = styledFiles;
  const entry = { ...entryFile!, path: `styled/${entryFile!.path}` };

  const supporting: GeneratedFile[] = styledRest.map((f) => ({ ...f, path: `styled/${f.path}` }));
  for (const rel of headlessRels) {
    const files = await angularFilesFor(resolveComponent(importMetaUrl, rel));
    supporting.push(...files.map((f) => ({ ...f, path: `headless/${f.path}` })));
  }

  const result = await mountForTarget("angular", entry, props, supporting, { componentName });
  const { warnings } = await coverage;
  return warnings.length > 0 ? { ...result, warnings: [...result.warnings, ...warnings] } : result;
}
