import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import styleframe from "styleframe/plugin/vite";

// TODO: migrate to ng-packagr for Angular Package Format (partial-Ivy) output
// once the component library matures. See: https://angular.dev/tools/libraries/creating-libraries
export default defineConfig({
  plugins: [
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  build: {
    target: "es2022",
    lib: {
      entry: {
        index: "src/index.ts",
        headless: "src/headless.ts",
        stories: "src/stories.ts",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [/^@inkline\//, /^@angular\//],
    },
  },
});
