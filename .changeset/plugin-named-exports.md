---
"@inkline/plugin": patch
---

fix(plugin): drop the redundant default export from the barrel

`src/index.ts` exported `unplugin` as both a named and the default export, so bundling the barrel
warned `Entry module "src/index.ts" is using named and default exports together`. The default export
was redundant with the named `unplugin` (and unused — the per-bundler entries `@inkline/plugin/vite`
etc. supply the default plugins). The barrel now exports only the named `unplugin` / `unpluginFactory`,
clearing the warning without changing the per-bundler entries' CommonJS interop.
