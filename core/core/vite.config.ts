import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      "jsx-runtime": "src/jsx-runtime.ts",
    },
    dts: true,
  },
});
