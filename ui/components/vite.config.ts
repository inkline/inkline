import styleframe from "styleframe/plugin/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [styleframe()],
  build: {
    lib: {
      entry: "src/components/index.ts",
      formats: ["es"],
    },
  },
  test: {
    coverage: {
      provider: "v8",
      // `coverInkViaReact` (wired into `mountStyledOnAngular`) renders each component through the
      // React target; V8 instruments the generated `.mjs` and the inlined source maps remap that
      // coverage back onto the authored `.ink.tsx`. We deliberately do NOT set `include`:
      // coverage-v8 only runs its file-parsing "uncovered files" pass when `include` is set, and
      // that pass chokes on `.ink.tsx` (not a real module) with a PARSE_ERROR. With `include`
      // unset, only executed code is reported and the remap introduces the authored sources.
      reportsDirectory: "./coverage",
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/.styleframe/**",
        "**/*.config.*",
        "**/*.test.{ts,tsx}",
        // The generated styleframe stub carries no source map, so it would surface as its own
        // `.mjs` row. The component artifacts under `.coverage-artifacts/` MUST stay includable
        // (their maps remap execution back to `.ink.tsx`) — so exclude only the stub by name,
        // never the whole directory.
        "**/__styleframe__.mjs",
        // Test infrastructure, not product source.
        "**/angular-ssr-helper.ts",
      ],
    },
  },
});
