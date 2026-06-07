import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import styleframe from "styleframe/plugin/vite";

export default defineConfig({
  plugins: [
    vue() as any,
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: "./.inkline/index.ts",
        headless: "./.inkline/headless.ts",
        stories: "./.inkline/stories.ts",
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [/^@inkline\//, "vue"],
    },
  },
});
