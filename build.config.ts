import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: [
        {
            builder: "mkdist",
            format: "esm",
            input: "./src",
            outDir: "./lib",
        },
        {
            builder: "mkdist",
            format: "cjs",
            input: "./src",
            outDir: "./tmp/cjs",
        },
    ],
    clean: false,
    declaration: true,
    failOnWarn: false,
});
