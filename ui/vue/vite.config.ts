import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import styleframe from "styleframe/plugin/vite";

export default defineConfig({
  plugins: [
    vue(),
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  build: {
    lib: {
      entry: "generated/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
});
