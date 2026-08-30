import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runCommand } from "citty";
import fixCommand from "./fix.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TMP = resolve(__dirname, "..", "..", ".tmp-fix-unit");

function component(options: string | undefined, models: readonly string[]): string {
  const args = options === undefined ? "" : `${options}, `;
  const body = models.map((m) => `  ${m}`).join("\n");
  return `import { defineComponent, defineModel } from "@inkline/core";\n\nexport default defineComponent(${args}() => {\n${body}\n  return <div />;\n});\n`;
}

function write(name: string, source: string): string {
  const path = resolve(TMP, name);
  writeFileSync(path, source);
  return path;
}

let logs: string[];
let errors: string[];

beforeEach(() => {
  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });
  logs = [];
  errors = [];
  vi.spyOn(console, "log").mockImplementation((...args) => void logs.push(args.join(" ")));
  vi.spyOn(console, "error").mockImplementation((...args) => void errors.push(args.join(" ")));
  process.exitCode = undefined;
});

afterEach(() => {
  vi.restoreAllMocks();
  rmSync(TMP, { recursive: true, force: true });
  process.exitCode = undefined;
});

describe("inkline fix", () => {
  it("writes the models key a file is missing", async () => {
    const path = write(
      "A.ink.tsx",
      component("{}", ['const [open, setOpen] = defineModel<boolean>("open");']),
    );

    await runCommand(fixCommand, { rawArgs: [path] });

    expect(readFileSync(path, "utf-8")).toContain("{ models: { open: Boolean } }");
    expect(process.exitCode).toBeUndefined();
  });

  it("corrects and removes stale entries in the same run", async () => {
    const path = write(
      "B.ink.tsx",
      component("{ models: { open: String, gone: Boolean } }", [
        'const [open, setOpen] = defineModel<boolean>("open");',
      ]),
    );

    await runCommand(fixCommand, { rawArgs: [path] });

    expect(readFileSync(path, "utf-8")).toContain("{ models: { open: Boolean } }");
    expect(logs.join("\n")).toContain("~open: String→Boolean");
    expect(logs.join("\n")).toContain("-gone");
  });

  it("leaves an already-correct file byte-identical and reports nothing to do", async () => {
    const source = component("{ models: { open: Boolean } }", [
      'const [open, setOpen] = defineModel<boolean>("open");',
    ]);
    const path = write("C.ink.tsx", source);

    await runCommand(fixCommand, { rawArgs: [path] });

    expect(readFileSync(path, "utf-8")).toBe(source);
    expect(logs.join("\n")).toContain("options.models is up to date");
  });

  describe("--check", () => {
    it("writes nothing and fails when a file needs fixing", async () => {
      const source = component("{}", ['const [open, setOpen] = defineModel<boolean>("open");']);
      const path = write("D.ink.tsx", source);

      await runCommand(fixCommand, { rawArgs: [path, "--check"] });

      expect(readFileSync(path, "utf-8")).toBe(source);
      expect(logs.join("\n")).toContain("Would update 1 file(s)");
      expect(process.exitCode).toBe(1);
    });

    it("passes when every file already agrees", async () => {
      const path = write(
        "E.ink.tsx",
        component("{ models: { open: Boolean } }", [
          'const [open, setOpen] = defineModel<boolean>("open");',
        ]),
      );

      await runCommand(fixCommand, { rawArgs: [path, "--check"] });

      expect(process.exitCode).toBeUndefined();
    });
  });

  it("exits with the usage code when no file matches", async () => {
    await runCommand(fixCommand, { rawArgs: [resolve(TMP, "nothing-*.ink.tsx")] });

    expect(errors.join("\n")).toContain("no files matched");
    expect(process.exitCode).toBe(2);
  });
});
