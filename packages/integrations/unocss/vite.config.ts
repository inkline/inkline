import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import inspect from "vite-plugin-inspect";
import inkline from "@inkline/plugin/vite";
import { resolve } from "path";
import unocss from "unocss/vite";
import { UserOptions } from "./src/types";

const inklineConfig: UserOptions = {
    outputDir: resolve(__dirname, "src/playground/css/config"),
};

// https://vitejs.dev/config/
export default defineConfig({
    root: resolve(__dirname, "src/playground"),
    server: {
        port: 8080,
    },
    plugins: [
        // inspect(), inkline(inklineConfig),
        unocss(),
    ],
    test: {
        globals: true,
        environment: "jsdom",
        exclude: [...configDefaults.exclude, "lib/**"],
    },
});
