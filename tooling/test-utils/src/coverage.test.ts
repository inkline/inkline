import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { TraceMap, eachMapping } from "@jridgewell/trace-mapping";
import { compileSource } from "./compile.ts";
import {
  transformReactFileToMjs,
  renderForCoverage,
  coverInkViaReact,
  findPackageRoot,
} from "./coverage.ts";

// Authored as strings + written to a gitignored dir at runtime: `.ink.tsx` files under src would be
// type-checked by the lint pass (no inkline jsx/types config here), and oxlint skips gitignored paths.
const CHILD_SRC = `import { defineComponent, Slot } from "@inkline/core";

export interface CovChildProps {
  label?: string;
}

export default defineComponent({ slots: { default: {} } }, (props: CovChildProps) => {
  return (
    <span class="cov-child">
      <Slot>{props.label}</Slot>
    </span>
  );
});
`;

const PARENT_SRC = `import { defineComponent, Slot } from "@inkline/core";
import CovChild, { type CovChildProps } from "../headless/CovChild.ink.tsx";

export interface CovParentProps extends CovChildProps {
  active?: boolean;
}

export default defineComponent({ slots: { default: {} } }, (props: CovParentProps) => {
  return (
    <CovChild class={props.active ? "cov-on" : "cov-off"}>
      <Slot>{props.label}</Slot>
    </CovChild>
  );
});
`;

const here = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(here, "..", ".coverage-fixtures");
const FIXTURES_URL = pathToFileURL(join(FIXTURES_DIR, "index.ts")).href;
const PARENT = "./styled/CovParent.ink.tsx";
const CHILD = "./headless/CovChild.ink.tsx";

const coverageActive =
  (globalThis as { __vitest_worker__?: { config?: { coverage?: { enabled?: boolean } } } })
    .__vitest_worker__?.config?.coverage?.enabled === true;

beforeAll(() => {
  mkdirSync(join(FIXTURES_DIR, "styled"), { recursive: true });
  mkdirSync(join(FIXTURES_DIR, "headless"), { recursive: true });
  writeFileSync(join(FIXTURES_DIR, "styled", "CovParent.ink.tsx"), PARENT_SRC, "utf-8");
  writeFileSync(join(FIXTURES_DIR, "headless", "CovChild.ink.tsx"), CHILD_SRC, "utf-8");
});

afterAll(() => rmSync(FIXTURES_DIR, { recursive: true, force: true }));

function decodeInlineMap(code: string): string {
  const m = code.match(/sourceMappingURL=data:application\/json;base64,([A-Za-z0-9+/=]+)/);
  if (!m) throw new Error("no inline source map found");
  return Buffer.from(m[1]!, "base64").toString("utf-8");
}

describe("transformReactFileToMjs", () => {
  it("composes a single js → .ink.tsx map and inlines it into the module", async () => {
    const result = await compileSource(PARENT_SRC, {
      targets: ["react"],
      fileName: "CovParent.ink.tsx",
    });
    const reactFile = result.filesFor("react").find((f) => f.path.endsWith(".tsx"))!;

    const code = transformReactFileToMjs(reactFile);
    expect(code).toContain("sourceMappingURL=data:application/json;base64,");

    const map = JSON.parse(decodeInlineMap(code)) as { sources: string[] };
    // The chain resolves all the way to the original .ink.tsx — not the intermediate react .tsx.
    expect(map.sources.some((s) => s.endsWith("CovParent.ink.tsx"))).toBe(true);
    expect(map.sources.some((s) => s.endsWith(".tsx") && !s.endsWith(".ink.tsx"))).toBe(false);

    // A generated position must trace back to the ternary on line 10 of the source (line 9 is `return (`).
    const tracer = new TraceMap(decodeInlineMap(code));
    const inkLines: number[] = [];
    eachMapping(tracer, (m) => {
      if (m.source?.endsWith("CovParent.ink.tsx") && m.originalLine != null) {
        inkLines.push(m.originalLine);
      }
    });
    expect(inkLines.length).toBeGreaterThan(0);
    expect(inkLines).toContain(10);
  });

  it("emits no inline map when the React file carries no source map", () => {
    const code = transformReactFileToMjs({
      path: "Bare.tsx",
      contents: "export const Bare = () => null;\n",
    });
    expect(code).not.toContain("sourceMappingURL");
    expect(code).toContain("Bare");
  });
});

describe("findPackageRoot", () => {
  it("returns the nearest package.json directory", () => {
    const root = findPackageRoot(fileURLToPath(import.meta.url));
    expect(existsSync(join(root, "package.json"))).toBe(true);
  });

  it("falls back to the filesystem root when no package.json ancestor exists", () => {
    const root = findPackageRoot("/__inkline_no_pkg__/a/b/c.ts");
    expect(dirname(root)).toBe(root); // reached the filesystem root
  });
});

describe("renderForCoverage (ungated core)", () => {
  it("renders a multi-file styled component and lays out .mjs artifacts", async () => {
    const r = await renderForCoverage(FIXTURES_URL, PARENT, [CHILD], { label: "Hi", active: true });

    expect(r.warnings).toEqual([]);
    expect(r.html).toContain("cov-child");
    expect(r.html).toContain("cov-on"); // the ternary's true arm flowed through to the rendered class

    const workerId = process.env.VITEST_WORKER_ID ?? "0";
    const subdir = join(here, "..", ".coverage-artifacts", `w${workerId}`, "CovParent_ink_tsx");
    expect(existsSync(join(subdir, "styled", "CovParent.mjs"))).toBe(true);
    expect(existsSync(join(subdir, "headless", "CovChild.mjs"))).toBe(true);
  });

  it("projects the default slot as children without erroring", async () => {
    const r = await renderForCoverage(FIXTURES_URL, PARENT, [CHILD], {
      __slots: { default: "slotted" },
      label: "L",
    });
    expect(r.warnings).toEqual([]);
    expect(r.html).toContain("cov-child");
  });

  it("reports a warning instead of throwing when the component cannot be resolved", async () => {
    const r = await renderForCoverage(FIXTURES_URL, "./styled/DoesNotExist.ink.tsx", []);
    expect(r.html).toBe("");
    expect(r.warnings.length).toBeGreaterThan(0);
  });
});

describe("coverInkViaReact (gated)", () => {
  it("no-ops without coverage, runs the render with coverage", async () => {
    const r = await coverInkViaReact(FIXTURES_URL, PARENT, [CHILD], { label: "x", active: false });
    if (coverageActive) {
      expect(r.html).toContain("cov-child");
    } else {
      expect(r).toEqual({ html: "", warnings: [] });
    }
  });
});
