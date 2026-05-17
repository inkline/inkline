import { describe, it } from "vitest";
import { compileSource } from "./compile.ts";
import { assertConformance } from "./conformance.ts";

const BUTTON_SOURCE = `
import { defineComponent } from "@inkline/core";
export default defineComponent((props: { label: string }) => {
  return <button>{props.label}</button>;
});
`;

describe("assertConformance", () => {
  it("passes conformance invariants for all targets", async () => {
    const result = await compileSource(BUTTON_SOURCE);
    assertConformance(result);
  });
});
