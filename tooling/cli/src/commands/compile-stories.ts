import { defineCommand } from "citty";
import { watch } from "node:fs";
import { resolve } from "node:path";
import { generate } from "@inkline/storybook/generator";

export default defineCommand({
  meta: { name: "stories", description: "Generate per-framework story files" },
  args: {
    "src-dir": { type: "string", description: "Single-source story definitions directory" },
    "root-dir": { type: "string", description: "Root of the ui/<target> packages" },
    watch: { type: "boolean", description: "Regenerate on change", default: false },
  },
  async run({ args }) {
    const srcDir = resolve(args["src-dir"] ?? "../../ui/components/stories");
    const rootDir = resolve(args["root-dir"] ?? "../../ui");
    const options = { srcDir, rootDir };

    if (!args.watch) {
      try {
        const result = await generate(options);
        console.log(
          `Generated ${result.files.length} story file(s) for ${result.components.length} component(s).`,
        );
      } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
        process.exitCode = 1;
      }
      return;
    }

    {
      console.log(`Watching ${srcDir} for changes...`);
      let debounceTimer: ReturnType<typeof setTimeout> | undefined;
      watch(srcDir, { recursive: true }, () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          generate(options)
            .then((r) =>
              console.log(
                `Regenerated ${r.files.length} story file(s) for ${r.components.length} component(s).`,
              ),
            )
            .catch((err: unknown) =>
              console.error(err instanceof Error ? err.message : String(err)),
            );
        }, 150);
      });
    }
  },
});
