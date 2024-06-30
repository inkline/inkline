// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from "path";
import type { UserOptions } from "./src/plugin/types";

const inklineConfig: UserOptions = {
    outputDir: resolve(__dirname, "playground/nuxt/css"),
};

export default defineNuxtConfig({
    rootDir: resolve(__dirname, "playground/nuxt"),
    devServer: {
        port: 8080,
    },
    modules: [[resolve(__dirname, "./src/nuxt.ts"), inklineConfig]],
});
