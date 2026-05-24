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
        entry: "./src/index.ts",
        formats: ["es"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: [/^@qwik\.dev\/core/],
      },
    },
  };
});
