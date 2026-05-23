import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import styleframe from "styleframe/plugin/vite";

export default defineConfig({
  plugins: [
    react(),
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
      external: ["react", "react-dom", /^react\//, /^react-dom\//],
    },
  },
});
