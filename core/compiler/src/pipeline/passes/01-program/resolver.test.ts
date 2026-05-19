import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { resolveSiblings } from "./resolver.ts";

describe("resolveSiblings", () => {
  const tmp = join(tmpdir(), "ink-resolver-test-" + Date.now());

  beforeAll(() => {
    mkdirSync(tmp, { recursive: true });
  });

  afterAll(() => {
    rmSync(tmp, { recursive: true, force: true });
  });

  it("returns empty styles when no sibling CSS exists", () => {
    const result = resolveSiblings(join(tmp, "Counter.ink.tsx"));
    expect(result.styles).toHaveLength(0);
  });

  it("finds sibling .ink.css file", () => {
    const cssPath = join(tmp, "IButton.ink.css");
    writeFileSync(cssPath, ".btn { color: red; }", "utf-8");

    const result = resolveSiblings(join(tmp, "IButton.ink.tsx"));
    expect(result.styles).toHaveLength(1);
    expect(result.styles[0]!.css).toBe(".btn { color: red; }");
    expect(result.styles[0]!.scoped).toBe(true);
    expect(result.styles[0]!.lang).toBe("css");
  });

  it("finds sibling .ink.scss file", () => {
    const scssPath = join(tmp, "Card.ink.scss");
    writeFileSync(scssPath, ".card { &-body { padding: 1rem; } }", "utf-8");

    const result = resolveSiblings(join(tmp, "Card.ink.tsx"));
    expect(result.styles).toHaveLength(1);
    expect(result.styles[0]!.lang).toBe("scss");
  });

  it("collects multiple sibling style files", () => {
    const dir = join(tmp, "multi");
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "Modal.ink.css"), ".modal { display: flex; }", "utf-8");
    writeFileSync(join(dir, "Modal.ink.scss"), "$color: blue;", "utf-8");

    const result = resolveSiblings(join(dir, "Modal.ink.tsx"));
    expect(result.styles).toHaveLength(2);
  });

  it("sets loc.file to the sibling path", () => {
    const cssPath = join(tmp, "Nav.ink.css");
    writeFileSync(cssPath, "nav { }", "utf-8");

    const result = resolveSiblings(join(tmp, "Nav.ink.tsx"));
    expect(result.styles[0]!.loc.file).toBe(cssPath);
  });
});
