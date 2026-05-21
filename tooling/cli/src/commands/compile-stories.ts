import { defineCommand } from "citty";
import { watch } from "node:fs";
import { resolve } from "node:path";
import { generate } from "@inkline/storybook/generator";

export default defineCommand({
  meta: { name: "stories", description: "Generate per-framework story files" },
  args: {
    "core-dir": { type: "string", description: "Single-source story definitions directory" },
    "ui-dir": { type: "string", description: "Root of the ui/<target> packages" },
    watch: { type: "boolean", description: "Regenerate on change", default: false },
  },
  async run({ args }) {
    const coreStoriesDir = resolve(args["core-dir"] ?? "../../ui/core/stories");
    const uiDir = resolve(args["ui-dir"] ?? "../../ui");
    const options = { coreStoriesDir, uiDir };

    try {
      const result = await generate(options);
      console.log(
        `Generated ${result.files.length} story file(s) for ${result.components.length} component(s).`,
      );
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
      process.exitCode = 1;
      return;
    }

    if (args.watch) {
      console.log(`Watching ${coreStoriesDir} for changes...`);
      watch(coreStoriesDir, () => {
        generate(options)
          .then((r) =>
            console.log(
              `Generated ${r.files.length} story file(s) for ${r.components.length} component(s).`,
            ),
          )
          .catch((err: unknown) => console.error(err instanceof Error ? err.message : String(err)));
      });
    }
  },
});
