import { describe, it, expect } from "vitest";
import { declareModels } from "./declare-models.ts";

function fix(source: string): string {
  return declareModels("Test.ink.tsx", source).output;
}

function edits(source: string) {
  return declareModels("Test.ink.tsx", source).edits;
}

/** A `defineComponent` call with the given options text and `defineModel` calls in its setup. */
function component(options: string | undefined, body: string): string {
  const args = options === undefined ? "" : `${options}, `;
  return `import { defineComponent, defineModel } from "@inkline/core";\n\nexport default defineComponent(${args}() => {\n${body}\n  return <div />;\n});\n`;
}

describe("declareModels", () => {
  describe("adding", () => {
    it("writes the key into an options object that has none", () => {
      const out = fix(
        component(
          "{ meta: { headless: true } }",
          '  const [open, setOpen] = defineModel<boolean>("open");',
        ),
      );
      expect(out).toContain(
        "defineComponent({ models: { open: Boolean }, meta: { headless: true } }",
      );
    });

    it("introduces an options object when the call has none", () => {
      const out = fix(component(undefined, '  const [v, setV] = defineModel<string>("value");'));
      expect(out).toContain("defineComponent({ models: { value: String } }, () =>");
    });

    it("writes into an empty options object", () => {
      const out = fix(component("{}", '  const [v, setV] = defineModel<number>("count");'));
      expect(out).toContain("defineComponent({ models: { count: Number } }");
    });

    it("declares a type no PropDeclaration can spell as Object", () => {
      const out = fix(component("{}", '  const [v, setV] = defineModel<"a" | "b">("mode");'));
      expect(out).toContain("{ models: { mode: Object } }");
    });
  });

  describe("updating", () => {
    it("corrects an entry whose type no longer matches its defineModel call", () => {
      const out = fix(
        component(
          "{ models: { open: String } }",
          '  const [open, setOpen] = defineModel<boolean>("open");',
        ),
      );
      expect(out).toContain("{ models: { open: Boolean } }");
      expect(
        edits(
          component(
            "{ models: { open: String } }",
            '  const [open, setOpen] = defineModel<boolean>("open");',
          ),
        ),
      ).toEqual([{ kind: "update", name: "open", from: "String", to: "Boolean" }]);
    });

    it("adds a model the key is missing while keeping the ones it has", () => {
      const out = fix(
        component(
          "{ models: { open: Boolean } }",
          '  const [open, setOpen] = defineModel<boolean>("open");\n  const [v, setV] = defineModel<string>("value");',
        ),
      );
      expect(out).toContain("{ models: { open: Boolean, value: String } }");
    });

    it("drops an entry the setup body no longer creates", () => {
      const out = fix(
        component(
          "{ models: { open: Boolean, expanded: Boolean } }",
          '  const [open, setOpen] = defineModel<boolean>("open");',
        ),
      );
      expect(out).toContain("{ models: { open: Boolean } }");
    });

    it("rewrites a hand-written full prop shape into the canonical spelling", () => {
      const out = fix(
        component(
          "{ models: { open: { type: Boolean } } }",
          '  const [open, setOpen] = defineModel<boolean>("open");',
        ),
      );
      expect(out).toContain("{ models: { open: Boolean } }");
    });

    it("leaves the rest of the options object byte-identical", () => {
      const source = component(
        "{ models: { open: String }, meta: { headless: true } }",
        '  const [open, setOpen] = defineModel<boolean>("open");',
      );
      expect(fix(source)).toBe(source.replace("open: String", "open: Boolean"));
    });
  });

  describe("removing", () => {
    it("drops the key when the setup body creates no models", () => {
      const out = fix(
        component("{ models: { open: Boolean }, meta: { headless: true } }", "  const x = 1;"),
      );
      expect(out).toContain("defineComponent({ meta: { headless: true } }");
      expect(out).not.toContain("models");
    });

    it("drops the options object entirely when models was its only key", () => {
      const out = fix(component("{ models: { open: Boolean } }", "  const x = 1;"));
      expect(out).toContain("defineComponent(() => {");
    });

    it("drops a trailing key together with its preceding separator", () => {
      const out = fix(
        component("{ meta: { headless: true }, models: { open: Boolean } }", "  const x = 1;"),
      );
      expect(out).toContain("defineComponent({ meta: { headless: true } }");
    });

    it("reports the removal", () => {
      expect(edits(component("{ models: { open: Boolean } }", "  const x = 1;"))).toEqual([
        { kind: "remove", name: "open" },
      ]);
    });
  });

  describe("idempotence", () => {
    it("is a no-op on a file that already agrees", () => {
      const source = component(
        "{ models: { open: Boolean } }",
        '  const [open, setOpen] = defineModel<boolean>("open");',
      );
      expect(fix(source)).toBe(source);
      expect(edits(source)).toEqual([]);
    });

    it("is a no-op on a second run", () => {
      const once = fix(component("{}", '  const [open, setOpen] = defineModel<boolean>("open");'));
      expect(fix(once)).toBe(once);
    });

    it("recognises a formatter-wrapped block as agreeing", () => {
      const source = `import { defineComponent, defineModel } from "@inkline/core";

export default defineComponent(
  {
    models: {
      open: Boolean,
      value: String,
    },
  },
  () => {
    const [open, setOpen] = defineModel<boolean>("open");
    const [value, setValue] = defineModel<string>("value");
    return <div />;
  },
);
`;
      expect(fix(source)).toBe(source);
    });

    it("does not rewrite for order alone", () => {
      const source = component(
        "{ models: { value: String, open: Boolean } }",
        '  const [open, setOpen] = defineModel<boolean>("open");\n  const [value, setValue] = defineModel<string>("value");',
      );
      expect(fix(source)).toBe(source);
    });

    it("leaves a file with no models untouched", () => {
      const source = component("{ meta: { headless: true } }", "  const x = 1;");
      expect(fix(source)).toBe(source);
    });
  });

  it("does not attribute a nested component's models to its parent", () => {
    const source = `import { defineComponent, defineModel } from "@inkline/core";

const Inner = defineComponent(() => {
  const [v, setV] = defineModel<string>("value");
  return <div />;
});

export default defineComponent(() => {
  const [open, setOpen] = defineModel<boolean>("open");
  return <Inner />;
});
`;
    const out = fix(source);
    expect(out).toContain("const Inner = defineComponent({ models: { value: String } }, () =>");
    expect(out).toContain("export default defineComponent({ models: { open: Boolean } }, () =>");
  });

  it("refuses an options argument it cannot read rather than guessing", () => {
    const source = `import { defineComponent, defineModel } from "@inkline/core";
import { options } from "./options.ts";

export default defineComponent(options, () => {
  const [open, setOpen] = defineModel<boolean>("open");
  return <div />;
});
`;
    expect(() => fix(source)).toThrow(/not an object literal/);
  });
});
