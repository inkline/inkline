import styleframe from "styleframe/plugin/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [styleframe()],
  build: {
    lib: {
      entry: "src/components/index.ts",
      formats: ["es"],
    },
  },
});
