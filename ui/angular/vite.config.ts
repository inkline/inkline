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
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [/^@angular\//],
    },
  },
});
