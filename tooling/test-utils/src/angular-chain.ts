// Prepare a styled component + the headless parts it composes for Angular SSR mounting. The files
// are compiled in isolation, so a shared attribute-selector registry must be built across them
// first — otherwise every styled component classifies as a `wrapper` and silently reverts to `ink-*`
// output. The registry also yields the mount host: a styling directive (`[inkButton]`) renders on
// its native host element with the resolved attribute chain (it can't be reflected for a host tag).

import { readFileSync } from "node:fs";
import {
  analyzeOnly,
  buildAngularRegistry,
  type GeneratedFile,
  type InklineConfig,
} from "@inkline/compiler";
import { compileComponent } from "./compile.ts";
import type { AngularMountHost } from "./mount.ts";

export interface StyledAngularChain {
  readonly entry: GeneratedFile;
  readonly supporting: readonly GeneratedFile[];
  readonly host?: AngularMountHost;
}

export async function prepareStyledAngularChain(
  styledPath: string,
  headlessPaths: readonly string[],
  config?: Partial<InklineConfig>,
): Promise<StyledAngularChain> {
  const allPaths = [styledPath, ...headlessPaths];
  const modules = await Promise.all(
    allPaths.map(async (p) => {
      const analyzed = await analyzeOnly(
        { fileName: p, source: readFileSync(p, "utf-8") },
        { ...config, targets: ["angular"] },
      );
      return analyzed.module;
    }),
  );
  const registry = buildAngularRegistry(modules);
  const filesFor = (p: string) =>
    compileComponent(p, {
      targets: ["angular"],
      config: { ...config, angularRegistry: registry },
    }).then((r) => r.filesFor("angular"));

  // Styled sources import their parts via `../headless/<name>.component`, so lay the generated files
  // out under `styled/` and `headless/` to keep those relative specifiers resolvable in the sandbox.
  const styledFiles = await filesFor(styledPath);
  const [entryFile, ...styledRest] = styledFiles;
  const entry = { ...entryFile!, path: `styled/${entryFile!.path}` };
  const supporting: GeneratedFile[] = styledRest.map((f) => ({ ...f, path: `styled/${f.path}` }));
  for (const hp of headlessPaths) {
    const files = await filesFor(hp);
    supporting.push(...files.map((f) => ({ ...f, path: `headless/${f.path}` })));
  }

  // An attribute-selector entry mounts on its native host element with the resolved chain; a
  // `wrapper` entry falls back to mount.ts's auto-reflection of its `ink-*` selector.
  const entryName = entryFile!.path.replace(/\.component\.ts$/, "");
  const e = registry.get(entryName);
  const host: AngularMountHost | undefined =
    e && (e.kind === "directive" || e.kind === "element") && e.hostTag
      ? {
          tag: e.hostTag,
          attrs: e.attrChain,
          imports: e.chainComponents.map((c) => `${c}Component`),
        }
      : undefined;

  return { entry, supporting, host };
}
