import { defineConfig } from "vite-plus";

// TODO: migrate to ng-packagr for Angular Package Format (partial-Ivy) output
// once the component library matures. See: https://angular.dev/tools/libraries/creating-libraries
export default defineConfig({
  build: {
    target: "es2022",
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [/^@angular\//],
    },
  },
});
