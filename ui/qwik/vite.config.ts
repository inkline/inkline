import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import { qwikVite } from "@qwik.dev/core/optimizer";
import styleframe from "styleframe/plugin/vite";

export default defineConfig(() => {
  return {
    plugins: [
      qwikVite(),
      styleframe({
        entry: resolve(__dirname, "../components/styleframe.config.ts"),
        include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
      }),
    ],
    build: {
      target: "es2020",
      outDir: "dist",
      lib: {
        entry: {
          index: "./src/index.ts",
          headless: "./src/headless.ts",
          stories: "./src/stories.ts",
        },
        formats: ["es"],
        fileName: (format, entryName) => `${entryName}.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: [/^@inkline\//, /^@qwik\.dev\/core/],
      },
    },
  };
});
