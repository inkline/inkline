import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { defineCommand } from "citty";
import consola from "consola";
import { type Framework, detectFrameworks } from "../lib/detect-framework.ts";
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

const validFrameworks = new Set<string>(allFrameworks.map((f) => f.value));

export default defineCommand({
  meta: { name: "init", description: "Scaffold inkline.config.ts and an example component" },
  args: {
    target: {
      type: "string",
      description: "Comma-separated target frameworks (react,vue,svelte,solid,angular,qwik,astro)",
    },
  },
  async run({ args }) {
    const cwd = process.cwd();
    const detected = detectFrameworks(cwd);

    let targets: Framework[];

    if (args.target) {
      const parsed = args.target.split(",").map((t) => t.trim());
      const invalid = parsed.filter((t) => !validFrameworks.has(t));
      if (invalid.length > 0) {
        consola.error(
          `Invalid target(s): ${invalid.join(", ")}. Valid: ${[...validFrameworks].join(", ")}`,
        );
        process.exit(1);
      }
      targets = parsed as Framework[];
    } else {
      const selected = await consola.prompt("Select target framework(s):", {
        type: "multiselect",
        options: allFrameworks.map((f) => ({
          value: f.value,
          label: f.label,
          hint: detected.includes(f.value) ? "detected" : undefined,
        })),
        initial: detected,
        required: true,
      });

      if (typeof selected === "symbol") {
        consola.info("Cancelled.");
        return;
      }

      targets = selected as unknown as Framework[];

      if (targets.length === 0) {
        consola.error("At least one target is required.");
        process.exit(1);
      }
    }

    // Step 1: Create inkline.config.ts
    const configPath = resolve(cwd, "inkline.config.ts");
    if (existsSync(configPath)) {
      consola.warn("inkline.config.ts already exists — skipping.");
    } else {
      writeFileSync(configPath, generateInklineConfig(targets));
      consola.success("Created inkline.config.ts");
    }

    // Step 2: Create example component
    const componentPath = resolve(cwd, "src/components/hello-world/HelloWorld.ink.tsx");
    if (existsSync(componentPath)) {
      consola.warn("Example component already exists — skipping.");
    } else {
      mkdirSync(dirname(componentPath), { recursive: true });
      writeFileSync(componentPath, exampleComponentTemplate);
      consola.success("Created src/components/hello-world/HelloWorld.ink.tsx");
    }

    // Step 3: Add scripts to package.json
    const pkgPath = resolve(cwd, "package.json");
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      const scripts = pkg.scripts ?? {};
      let added = false;

      if (!scripts["inkline:build"]) {
        scripts["inkline:build"] = "inkline compile components 'src/**/*.ink.tsx'";
        added = true;
      }
      if (!scripts["inkline:dev"]) {
        scripts["inkline:dev"] = "inkline compile components 'src/**/*.ink.tsx' --watch";
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

    consola.box(`Done! Run "inkline compile components 'src/**/*.ink.tsx'" to compile.`);
  },
});
