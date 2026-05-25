import styleframe from "styleframe/plugin/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [styleframe()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "InklineComponents",
      fileName: (format) => `inkline.${format}.js`,
    },
  },
});
