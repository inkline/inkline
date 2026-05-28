import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { defineCommand } from "citty";
import consola from "consola";
import { detectPackageManager, getPackageManagerRunner } from "../lib/detect-package-manager.ts";
import { type Framework, detectFrameworks } from "../lib/detect-framework.ts";
import { detectBundler } from "../lib/detect-bundler.ts";
import { addBuildPlugin, getManualPluginInstructions } from "../lib/add-build-plugin.ts";
import { styleframeConfigTemplate } from "../lib/styleframe-config.ts";
import { generateInklineConfig, exampleComponentTemplate } from "../lib/inkline-config-template.ts";

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
    compiler: {
      type: "boolean",
      description: "Also scaffold inkline.config.ts, example component, and build scripts",
      default: false,
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

    if (args.compiler) {
      await scaffoldCompiler(cwd, [framework]);
    }

    consola.box(`Done! Import components from "inkline/${framework}".`);
  },
});

export async function scaffoldCompiler(cwd: string, targets: Framework[]): Promise<void> {
  const configPath = resolve(cwd, "inkline.config.ts");
  if (existsSync(configPath)) {
    consola.warn("inkline.config.ts already exists — skipping.");
  } else {
    writeFileSync(configPath, generateInklineConfig(targets));
    consola.success("Created inkline.config.ts");
  }

  const componentPath = resolve(cwd, "src/components/hello-world/HelloWorld.ink.tsx");
  if (existsSync(componentPath)) {
    consola.warn("Example component already exists — skipping.");
  } else {
    mkdirSync(dirname(componentPath), { recursive: true });
    writeFileSync(componentPath, exampleComponentTemplate);
    consola.success("Created src/components/hello-world/HelloWorld.ink.tsx");
  }

  const pkgPath = resolve(cwd, "package.json");
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    const scripts = pkg.scripts ?? {};
    let added = false;

    if (!scripts["inkline:build"]) {
      scripts["inkline:build"] = "inkline compile 'src/**/*.ink.tsx'";
      added = true;
    }
    if (!scripts["inkline:dev"]) {
      scripts["inkline:dev"] = "inkline compile 'src/**/*.ink.tsx' --watch";
      added = true;
    }

    if (added) {
      pkg.scripts = scripts;
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
      consola.success("Added inkline:build and inkline:dev scripts to package.json");
    } else {
      consola.warn("inkline:build and inkline:dev scripts already exist — skipping.");
    }
  }

  consola.box(`Run "inkline compile 'src/**/*.ink.tsx'" to compile.`);
}
