import { describe, it, expect } from "vitest";
import {
  runConformanceInvariants,
  requireFileExtension,
  requireContains,
  requireNotContains,
  requireImports,
  requirePropsNotDestructured,
} from "./conformance.ts";
import type { GeneratedFile } from "../codegen/context.ts";

const validFile: GeneratedFile = {
  path: "Counter.tsx",
  contents: 'import { useState } from "react";\nexport function Counter() {}',
};

describe("runConformanceInvariants", () => {
  it("returns empty when all invariants pass", () => {
    const diags = runConformanceInvariants(
      [requireFileExtension(".tsx"), requireContains("useState")],
      validFile,
    );
    expect(diags).toEqual([]);
  });

  it("returns diagnostics from failing invariants", () => {
    const diags = runConformanceInvariants([requireFileExtension(".vue")], validFile);
    expect(diags).toHaveLength(1);
    expect(diags[0]!.title).toContain(".vue");
  });

  it("accumulates diagnostics from multiple invariants", () => {
    const diags = runConformanceInvariants(
      [requireFileExtension(".vue"), requireContains("missing-import")],
      validFile,
    );
    expect(diags).toHaveLength(2);
  });
});

describe("requireFileExtension", () => {
  it("passes for correct extension", () => {
    const inv = requireFileExtension(".tsx");
    expect(inv(validFile)).toEqual([]);
  });

  it("fails for wrong extension", () => {
    const inv = requireFileExtension(".vue");
    expect(inv(validFile)).toHaveLength(1);
  });
});

describe("requireContains", () => {
  it("passes when content contains substring", () => {
    const inv = requireContains("useState");
    expect(inv(validFile)).toEqual([]);
  });

  it("fails when content does not contain substring", () => {
    const inv = requireContains("createSignal");
    expect(inv(validFile)).toHaveLength(1);
  });
});

describe("requireNotContains", () => {
  it("passes when content does not contain substring", () => {
    const inv = requireNotContains("createSignal");
    expect(inv(validFile)).toEqual([]);
  });

  it("fails when content contains substring", () => {
    const inv = requireNotContains("useState");
    expect(inv(validFile)).toHaveLength(1);
  });
});

describe("requireImports", () => {
  it("passes when all imports are present", () => {
    const inv = requireImports("react", ["useState"]);
    expect(inv(validFile)).toEqual([]);
  });

  it("fails when import is missing", () => {
    const inv = requireImports("react", ["useState", "useEffect"]);
    expect(inv(validFile)).toHaveLength(1);
  });
});

describe("requirePropsNotDestructured", () => {
  it("passes when props are not destructured", () => {
    const file: GeneratedFile = {
      path: "X.tsx",
      contents: "export default function X(props: any) { return props.x; }",
    };
    expect(requirePropsNotDestructured(file)).toEqual([]);
  });

  it("fails when props are destructured", () => {
    const file: GeneratedFile = {
      path: "X.tsx",
      contents: "export default function X(props: any) { const { x } = props; return x; }",
    };
    expect(requirePropsNotDestructured(file)).toHaveLength(1);
  });
});
