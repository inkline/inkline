import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineCommand } from "citty";
import consola from "consola";
import { detectPackageManager, getPackageManagerRunner } from "../lib/detect-package-manager.ts";
import { type Framework, detectFrameworks } from "../lib/detect-framework.ts";
import { detectBundler } from "../lib/detect-bundler.ts";
import { addBuildPlugin, getManualPluginInstructions } from "../lib/add-build-plugin.ts";
import { styleframeConfigTemplate } from "../lib/styleframe-config.ts";

const allFrameworks: { value: Framework; label: string }[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "angular", label: "Angular" },
  { value: "qwik", label: "Qwik" },
  { value: "astro", label: "Astro" },
];

export default defineCommand({
  meta: { name: "init", description: "Initialize an Inkline project" },
  args: {
    framework: {
      type: "string",
      description: "Target framework (react, vue, svelte, solid, angular, qwik, astro)",
    },
  },
  async run({ args }) {
    const cwd = process.cwd();
    const pm = detectPackageManager(cwd);
    const runner = getPackageManagerRunner(pm);
    const detected = detectFrameworks(cwd);

    let framework: Framework;

    if (args.framework) {
      const valid = allFrameworks.map((f) => f.value);
      if (!valid.includes(args.framework as Framework)) {
        consola.error(`Invalid framework "${args.framework}". Valid options: ${valid.join(", ")}`);
        process.exit(1);
      }
      framework = args.framework as Framework;
    } else {
      const initial = detected.length > 0 ? detected[0] : undefined;
      const selected = await consola.prompt("Select a framework:", {
        type: "select",
        options: allFrameworks.map((f) => ({
          value: f.value,
          label: f.label,
          hint: detected.includes(f.value) ? "detected" : undefined,
        })),
        initial,
      });

      if (typeof selected === "symbol") {
        consola.info("Cancelled.");
        return;
      }

      framework = selected as Framework;
    }

    consola.info(`Package manager: ${pm}`);

    // Step 1: Initialize styleframe
    consola.start("Initializing styleframe...");
    try {
      execSync(`${runner} styleframe init`, { cwd, stdio: "pipe" });
      consola.success("Initialized styleframe");
    } catch {
      consola.warn("Failed to run styleframe init — you may need to run it manually.");
    }

    // Step 2: Seed styleframe.config.ts with Inkline presets
    const styleframeConfigPath = resolve(cwd, "styleframe.config.ts");
    writeFileSync(styleframeConfigPath, styleframeConfigTemplate);
    consola.success("Configured styleframe.config.ts with Inkline presets");

    // Step 3: Install dependencies
    consola.start("Installing dependencies...");
    try {
      execSync(`${pm} add inkline @styleframe/runtime`, { cwd, stdio: "pipe" });
      consola.success("Installed inkline and @styleframe/runtime");
    } catch {
      consola.warn(
        `Failed to install dependencies. Run manually: ${pm} add inkline @styleframe/runtime`,
      );
    }

    // Step 4: Wire build plugin
    const bundlerResult = detectBundler(cwd);
    if (bundlerResult) {
      try {
        await addBuildPlugin(bundlerResult.configPath, bundlerResult.bundler, framework);
        consola.success(`Added inkline plugin to ${bundlerResult.bundler} config`);
      } catch {
        consola.warn("Could not automatically modify your build config.");
        consola.info(getManualPluginInstructions(bundlerResult.bundler, framework));
      }
    } else {
      consola.warn("No bundler config found (vite, webpack, or rollup).");
      consola.info(getManualPluginInstructions("vite", framework));
    }

    consola.box(`Done! Import components from "inkline/${framework}".`);
  },
});
