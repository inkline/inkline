import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

// Compiled-output guards. Separate from the default `vp test` run because they
// read `.output/` off disk and so need a prior `nuxt build`; invoked via the
// `test:build` script from the Build Website job, against the artifact that job
// just produced.
//
// `root` is pinned here so the run resolves the same way whether it is invoked
// from this directory or from the workspace root with `--config`.
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  test: {
    include: ["test/**/*.build.test.ts"],
  },
});
