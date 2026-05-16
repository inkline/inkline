import { defineConfig } from "vite-plus";
import { qwikVite } from "@builder.io/qwik/optimizer";

export default defineConfig(() => {
  return {
    plugins: [qwikVite()],
    build: {
      target: "es2020",
      outDir: "dist",
      lib: {
        entry: "./src/index.ts",
        formats: ["es"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        external: [/^@builder\.io\/qwik/],
      },
    },
  };
});
