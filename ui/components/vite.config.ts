import styleframe from "styleframe/plugin/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [styleframe()],
  build: {
    lib: {
      entry: "styleframe.config.ts",
      formats: ["es"],
    },
  },
});
