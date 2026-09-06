import { describe, expect, it } from "vitest";
import { codemodSource } from "../../../../scripts/codemod-define-props.ts";
import { compile } from "../../compile.ts";

function convert(source: string): string {
  const result = codemodSource("Component.ink.tsx", source);
  if (result.kind !== "converted") throw new Error(`expected a conversion, got ${result.reason}`);
  return result.text;
}

function skipReason(source: string): string {
  const result = codemodSource("Component.ink.tsx", source);
  return result.kind === "skipped" ? result.reason : "converted";
}

const ANNOTATED = `import { defineComponent, Slot } from "@inkline/core";

export interface BadgeProps {
  label?: string;
}

export default defineComponent(
  { meta: { headless: true }, slots: { default: {} } },
  (props: BadgeProps) => {
    return (
      <div class="badge">
        <Slot>{props.label}</Slot>
      </div>
    );
  },
);
`;

describe("codemodSource", () => {
  it("moves the annotation into a defineProps type argument", () => {
    expect(convert(ANNOTATED)).toContain("  () => {\n    const props = defineProps<BadgeProps>();");
  });

  it("imports the macro next to defineComponent", () => {
    expect(convert(ANNOTATED)).toContain(
      `import { defineComponent, defineProps, Slot } from "@inkline/core";`,
    );
  });

  it("keeps the local's name, so every read in the body still resolves", () => {
    const converted = convert(ANNOTATED.replace("(props: BadgeProps)", "(_props: BadgeProps)"));

    expect(converted).toContain("const _props = defineProps<BadgeProps>();");
  });

  it("inserts above the first statement's comment, not between them", () => {
    const commented = ANNOTATED.replace(
      "    return (",
      "    // Why the markup is shaped this way.\n    return (",
    );

    expect(convert(commented)).toContain(
      "    const props = defineProps<BadgeProps>();\n\n    // Why the markup is shaped this way.",
    );
  });

  it.each([
    ["a destructured parameter", "({ label }: BadgeProps)", "destructured-parameter"],
    ["an inline union annotation", "(props: BadgeProps | null)", "unsupported-annotation"],
    ["no annotation at all", "()", "no-props-parameter"],
  ])("refuses %s", (_label, parameter, reason) => {
    expect(skipReason(ANNOTATED.replace("(props: BadgeProps)", parameter))).toBe(reason);
  });

  it("refuses a file it has already converted", () => {
    expect(skipReason(convert(ANNOTATED))).toBe("already-macro");
  });
});

describe("the converted component", () => {
  it("compiles to the same props the annotation produced", async () => {
    const both = await Promise.all(
      [ANNOTATED, convert(ANNOTATED)].map((source) =>
        compile({ fileName: "/Badge.ink.tsx", source }, { targets: ["react"] }),
      ),
    );

    for (const result of both) expect(result.diagnostics).toEqual([]);
    const [annotated, macro] = both;
    expect(macro!.files.react?.map((file) => file.contents)).toEqual(
      annotated!.files.react?.map((file) => file.contents),
    );
  });
});
