import { resolve } from "node:path";
import { defineConfig } from "vite-plus";
import vue from "@vitejs/plugin-vue";
import styleframe from "styleframe/plugin/vite";
import { readFileSync, writeFileSync } from "node:fs";

function virtualStyleframeShim() {
  const dtsPath = resolve(__dirname, ".styleframe/styleframe.d.ts");
  const shimPath = resolve(__dirname, ".styleframe/virtual-styleframe.d.ts");

  return {
    name: "virtual:styleframe",
    buildStart() {
      const dts = readFileSync(dtsPath, "utf-8");
      const match = dts.match(/declare module "virtual:styleframe" \{([\s\S]*?)\n\}/);
      if (!match) return;
      const body = match[1].replace(/^ {4}/gm, "");
      writeFileSync(shimPath, `// Auto-generated shim - DO NOT EDIT\n${body.trim()}\n`);
    },
  };
}

export default defineConfig({
  plugins: [
    virtualStyleframeShim(),
    vue() as any,
    styleframe({
      entry: resolve(__dirname, "../components/styleframe.config.ts"),
      include: [resolve(__dirname, "../components/src/**/*.styleframe.ts")],
    }),
  ],
  build: {
    lib: {
      entry: "./.inkline/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
    },
  },
});
