import { resolve } from "path";
import { defineConfig } from "vite";
import { configDefaults as vitestConfig } from 'vitest/config';
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({ rollupTypes: true }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src", "index.ts"),
            name: "InklineCore",
            fileName: "core"
        }
    },
    test: {
        globals: true,
        include: ["src/**/*.spec.{ts,tsx}"],
        exclude: vitestConfig.exclude
    }
});
