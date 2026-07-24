# @inkline/plugin

## 0.0.1

### Patch Changes

- c12188d: fix(plugin): drop the redundant default export from the barrel

  `src/index.ts` exported `unplugin` as both a named and the default export, so bundling the barrel
  warned `Entry module "src/index.ts" is using named and default exports together`. The default export
  was redundant with the named `unplugin` (and unused — the per-bundler entries `@inkline/plugin/vite`
  etc. supply the default plugins). The barrel now exports only the named `unplugin` / `unpluginFactory`,
  clearing the warning without changing the per-bundler entries' CommonJS interop.

- Updated dependencies [78ea062]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [cb27b40]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [287b326]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [b495727]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [af4684d]
- Updated dependencies [a86ba6d]
- Updated dependencies [287b326]
- Updated dependencies [c12188d]
- Updated dependencies [01a5207]
- Updated dependencies [a86ba6d]
- Updated dependencies [d0c2ef8]
- Updated dependencies [a86ba6d]
- Updated dependencies [420229e]
- Updated dependencies [a161934]
- Updated dependencies [a86ba6d]
- Updated dependencies [1b07d5f]
- Updated dependencies [a86ba6d]
- Updated dependencies [49c624f]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [fcc2bf4]
- Updated dependencies [a86ba6d]
- Updated dependencies [af4684d]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [3a61a4b]
- Updated dependencies [c12188d]
- Updated dependencies [c12188d]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [0688298]
- Updated dependencies [a86ba6d]
  - @inkline/compiler@0.1.0
