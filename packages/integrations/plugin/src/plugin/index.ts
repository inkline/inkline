import { createUnplugin } from "unplugin";
import { UserOptions } from "./types";
import { watch } from "./watch";
import { build } from "./build";

export const plugin = createUnplugin<UserOptions>((options = {}, meta) => {
    let isDevMode = options.watch || false;
    if (!isDevMode && meta.framework === "vite") {
        isDevMode = !process.argv.includes("build");
    }

    if (isDevMode) {
        void watch(options);
    } else {
        void build(options);
    }

    return {
        name: "inkline",
    };
});

export const vitePlugin = plugin.vite;
export const rollupPlugin = plugin.rollup;
export const webpackPlugin = plugin.webpack;
export const esbuildPlugin = plugin.esbuild;
