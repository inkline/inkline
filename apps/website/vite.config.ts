import { defineConfig } from "vite-plus";

// Test config only. Nuxt does not read `vite.config.ts` — its Vite options live
// under the `vite` key in `nuxt.config.ts` — so this file is `vp test`'s alone.
export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    // Compiled-output guards read `.output/` off disk, so they fail — correctly
    // — in a run that never built anything. They run via the `test:build`
    // script (see `vite.build.config.ts`) from the Build Website CI job.
    exclude: ["**/node_modules/**", "**/.output/**", "**/.nuxt/**", "test/**/*.build.test.ts"],
  },
});
