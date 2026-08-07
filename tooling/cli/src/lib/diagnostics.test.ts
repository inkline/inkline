import { describe, it, expect } from "vitest";
import { join, resolve, sep } from "node:path";
import { formatDiagnostic } from "./diagnostics.ts";
import type { Diagnostic } from "@inkline/compiler";

function makeDiag(overrides: Partial<Diagnostic> = {}): Diagnostic {
  return {
    code: "INK001" as Diagnostic["code"],
    severity: "error",
    title: "Something went wrong",
    help: undefined,
    url: "",
    loc: { file: "Button.ink.tsx", line: 10, column: 5, offset: 100, length: 10 },
    ...overrides,
  };
}

/** Builds a `loc` whose offset/line/column all point at the first occurrence of `needle`. */
function locOf(source: string, needle: string, file = "Button.ink.tsx"): Diagnostic["loc"] {
  const offset = source.indexOf(needle);
  if (offset === -1) throw new Error(`fixture does not contain ${needle}`);
  const before = source.slice(0, offset);
  const lineStart = before.lastIndexOf("\n") + 1;
  return {
    file,
    line: before.split("\n").length,
    column: offset - lineStart + 1,
    offset,
    length: needle.length,
  };
}

describe("formatDiagnostic", () => {
  it("formats location, severity, code, and title", () => {
    const msg = formatDiagnostic(makeDiag());
    expect(msg).toBe("Button.ink.tsx:10:5  error  INK001  Something went wrong");
  });

  it("appends help text when present", () => {
    const msg = formatDiagnostic(makeDiag({ help: "Try adding a return type" }));
    expect(msg).toContain("\n    help: Try adding a return type");
  });

  it("appends docs url when present", () => {
    const msg = formatDiagnostic(makeDiag({ url: "https://docs.example.com/INK001" }));
    expect(msg).toContain("\n    docs: https://docs.example.com/INK001");
  });

  it("drops the location prefix for unknown file locations", () => {
    const msg = formatDiagnostic(
      makeDiag({ loc: { file: "<unknown>", line: 0, column: 0, offset: 0, length: 0 } }),
    );
    expect(msg.startsWith("error  INK001  Something went wrong")).toBe(true);
  });

  it("drops the location prefix for an empty file", () => {
    const msg = formatDiagnostic(
      makeDiag({ loc: { file: "", line: 0, column: 0, offset: 0, length: 0 } }),
    );
    expect(msg.startsWith("error  INK001  Something went wrong")).toBe(true);
  });
});

describe("formatDiagnostic source frame", () => {
  const source = [
    'import { defineComponent, Show } from "@inkline/core";',
    "",
    "export default defineComponent(() => {",
    "  return <Show>ok</Show>;",
    "});",
    "",
  ].join("\n");

  it("renders the offending line and a caret under the reported span", () => {
    const msg = formatDiagnostic(makeDiag({ loc: locOf(source, "<Show>") }), { source });

    expect(msg).toContain("\n  4 |   return <Show>ok</Show>;\n    |          ^^^^^^");
  });

  it("pads the gutter so the caret line aligns with a multi-digit line number", () => {
    const padded = `${"\n".repeat(9)}  return <Show>ok</Show>;\n`;
    const msg = formatDiagnostic(makeDiag({ loc: locOf(padded, "<Show>") }), { source: padded });

    expect(msg).toContain("\n  10 |   return <Show>ok</Show>;\n     |          ^^^^^^");
  });

  it("omits the frame when no source is supplied", () => {
    const msg = formatDiagnostic(makeDiag({ loc: locOf(source, "<Show>") }));

    expect(msg).not.toContain("|");
  });

  it("omits the frame for a diagnostic with no real location", () => {
    const msg = formatDiagnostic(
      makeDiag({ loc: { file: "<unknown>", line: 0, column: 0, offset: 0, length: 0 } }),
      { source },
    );

    expect(msg).not.toContain("|");
  });

  it("places the frame above help and docs", () => {
    const msg = formatDiagnostic(
      makeDiag({ loc: locOf(source, "<Show>"), help: "Pass a when prop", url: "https://d.ev" }),
      { source },
    );

    expect(msg.indexOf("^^^^^^")).toBeLessThan(msg.indexOf("help:"));
    expect(msg.indexOf("help:")).toBeLessThan(msg.indexOf("docs:"));
  });

  it("clamps a multi-line span to the end of its first line", () => {
    const multi = ["<Transition>", "  <For each={x} />", "</Transition>", ""].join("\n");
    const loc = { ...locOf(multi, "<Transition>"), length: multi.indexOf("</Transition>") + 13 };

    const msg = formatDiagnostic(makeDiag({ loc }), { source: multi });

    // Only the head of the span is underlined; the caret run stops at the newline.
    expect(msg).toContain("\n  1 | <Transition>\n    | ^^^^^^^^^^^^");
    expect(msg).not.toContain("^^^^^^^^^^^^^");
  });

  it("marks the clamp with a continuation line when the span ends on the next line", () => {
    const multi = ["<Show>", "</Show>", ""].join("\n");
    const loc = { ...locOf(multi, "<Show>"), length: multi.indexOf("</Show>") + 7 };

    const msg = formatDiagnostic(makeDiag({ loc }), { source: multi });

    expect(msg).toContain("\n  1 | <Show>\n    | ^^^^^^\n    | ...");
  });

  it("marks the clamp with a single continuation line when the span crosses several lines", () => {
    const multi = ["  <Transition>", "    <For each={x} />", "    <Show />", "  </Transition>", ""];
    const source = multi.join("\n");
    const loc = { ...locOf(source, "<Transition>"), length: source.trimEnd().length - 2 };

    const msg = formatDiagnostic(makeDiag({ loc }), { source });

    // One marker, aligned with the caret run — not one per elided line.
    expect(msg).toContain("\n  1 |   <Transition>\n    |   ^^^^^^^^^^^^\n    |   ...");
    expect(msg.match(/\.\.\./g)).toHaveLength(1);
  });

  it("omits the continuation line for a span ending exactly at the line boundary", () => {
    const multi = ["<Transition>", "  <For each={x} />", ""].join("\n");
    const loc = locOf(multi, "<Transition>");

    const msg = formatDiagnostic(makeDiag({ loc }), { source: multi });

    expect(msg).toContain("\n  1 | <Transition>\n    | ^^^^^^^^^^^^");
    expect(msg).not.toContain("...");
  });

  it("omits the continuation line when an overlong span has no next line to continue into", () => {
    const eof = "const a = 1;";
    const loc = { file: "a.ts", line: 1, column: 1, offset: 0, length: 999 };

    const msg = formatDiagnostic(makeDiag({ loc }), { source: eof });

    expect(msg).not.toContain("...");
  });

  it("renders a single caret for a zero-length span", () => {
    const loc = { ...locOf(source, "<Show>"), length: 0 };
    const msg = formatDiagnostic(makeDiag({ loc }), { source });

    expect(msg).toContain("\n    |          ^");
    expect(msg).not.toContain("^^");
  });

  it("points one past the last character when the span sits at end of file", () => {
    const eof = "const a = 1;";
    const loc = { file: "a.ts", line: 1, column: 13, offset: eof.length, length: 0 };

    const msg = formatDiagnostic(makeDiag({ loc }), { source: eof });

    expect(msg).toContain("\n  1 | const a = 1;\n    |             ^");
  });

  it("renders an empty frame line when the file ends with a newline", () => {
    const trailing = "const a = 1;\n";
    const loc = { file: "a.ts", line: 2, column: 1, offset: trailing.length, length: 0 };

    const msg = formatDiagnostic(makeDiag({ loc }), { source: trailing });

    expect(msg).toContain("\n  2 | \n    | ^");
  });

  it("skips the frame when the offset is past the end of the source", () => {
    const loc = { file: "a.ts", line: 1, column: 1, offset: 999, length: 3 };
    const msg = formatDiagnostic(makeDiag({ loc }), { source: "const a = 1;" });

    expect(msg).not.toContain("|");
  });

  it("keeps tabs in the caret padding so alignment survives any tab width", () => {
    const tabbed = "\t<Show>ok</Show>\n";
    const msg = formatDiagnostic(makeDiag({ loc: locOf(tabbed, "<Show>") }), { source: tabbed });

    expect(msg).toContain("\n  1 | \t<Show>ok</Show>\n    | \t^^^^^^");
  });

  it("strips a carriage return from a CRLF source line", () => {
    const crlf = "const a = 1;\r\nconst b = 2;\r\n";
    const msg = formatDiagnostic(makeDiag({ loc: locOf(crlf, "const b") }), { source: crlf });

    expect(msg).toContain("\n  2 | const b = 2;\n    | ^^^^^^^");
  });
});

describe("formatDiagnostic paths", () => {
  it("prints an absolute path relative to the invocation directory", () => {
    const cwd = process.cwd();
    const file = join(cwd, "src", "Button.ink.tsx");

    const msg = formatDiagnostic(makeDiag({ loc: { ...makeDiag().loc, file } }), { cwd });

    expect(msg.startsWith(join("src", "Button.ink.tsx"))).toBe(true);
    expect(msg).not.toContain(cwd);
  });

  it("leaves an already-relative path alone", () => {
    const msg = formatDiagnostic(makeDiag(), { cwd: process.cwd() });

    expect(msg.startsWith("Button.ink.tsx:10:5")).toBe(true);
  });

  it("keeps the absolute path when climbing out of the tree would be longer", () => {
    const file = resolve(sep, "a.tsx");
    const cwd = resolve(sep, "very", "deeply", "nested", "project", "packages", "cli");

    const msg = formatDiagnostic(makeDiag({ loc: { ...makeDiag().loc, file } }), { cwd });

    expect(msg.startsWith(file)).toBe(true);
  });
});
