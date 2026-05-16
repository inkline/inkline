import { defineConfig } from "vite-plus";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: "generated/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["svelte", /^svelte\//],
    },
  },
});
