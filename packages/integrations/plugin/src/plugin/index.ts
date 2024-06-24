import { createUnplugin, UnpluginFactory } from "unplugin";
import { UserOptions } from "./types";
import { watch } from "./watch";
import { build } from "./build";

export const unpluginFactory: UnpluginFactory<UserOptions | undefined> = (
    options = {},
    meta,
) => ({
    name: "inkline",
    buildStart: async () => {
        let isDevMode = options.watch || false;
        if (!isDevMode && meta.framework === "vite") {
            isDevMode = !process.argv.includes("build");
        }

        if (isDevMode) {
            await watch(options);
        } else {
            await build(options);
        }
    },
});

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;

export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
export const rspackPlugin = unplugin.rspack;
export const farmPlugin = unplugin.farm;
