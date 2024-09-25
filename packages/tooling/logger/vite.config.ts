import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        ssr: true,
        lib: {
            entry: resolve(__dirname, "src", "main.ts"),
            name: "InklineLogger",
            formats: ['es', 'cjs'],
            fileName: "logger"
        }
    }
});
