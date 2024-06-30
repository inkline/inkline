import { defineConfig } from "unocss";
import { createPreset } from "./src/preset";
import type { UserOptions } from "./src/types";
import { resolve } from "path";

const inklineConfig: UserOptions = {
    outputDir: resolve(__dirname, "src/playground/css/config"),
};

export default (async () => {
    const presetInkline = await createPreset(inklineConfig);

    return defineConfig({
        presets: [presetInkline],
    });
})();
