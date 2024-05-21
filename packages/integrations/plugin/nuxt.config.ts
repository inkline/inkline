// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { resolve } from "pathe";
import { UserOptions } from "./src/plugin/types";

const inklineConfig: UserOptions = {
    outputDir: resolve(__dirname, "src/playground/nuxt/css"),
};

export default defineNuxtConfig({
    rootDir: resolve(__dirname, "src/playground/nuxt"),
    devServer: {
        port: 8080,
    },
    modules: [[resolve(__dirname, "./src/nuxt.ts"), inklineConfig]],
});
