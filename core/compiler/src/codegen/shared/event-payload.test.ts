// Lowering of a declared emit payload tuple to each target's event-channel typing.
import { describe, it, expect } from "vitest";
import type { IREventDeclaration } from "../../ir/render/nodes.ts";
import { loc, mockType } from "../../testing/codegen.ts";
import {
  angularOutputTypeArgument,
  eventCallbackType,
  packedPayloadEvents,
  vueEmitsTypeArgument,
} from "./event-payload.ts";

/** An event declared as `defineEmits<{ <name>: <payload> }>()`, or untyped when `payload` is omitted. */
function event(name: string, payload?: string): IREventDeclaration {
  return { name, payloadType: payload === undefined ? undefined : mockType(payload), loc };
}

describe("angularOutputTypeArgument", () => {
  it("unwraps a single-element tuple to the one value an output carries", () => {
    expect(angularOutputTypeArgument(event("change", "[value: string]"))).toBe("<string>");
    expect(angularOutputTypeArgument(event("change", "[string]"))).toBe("<string>");
  });

  it("types a valueless event as void", () => {
    expect(angularOutputTypeArgument(event("submit", "[]"))).toBe("<void>");
  });

  it("keeps a multi-value payload as a tuple — an output cannot carry two values", () => {
    expect(angularOutputTypeArgument(event("move", "[a: string, b: number]"))).toBe(
      "<[a: string, b: number]>",
    );
  });

  it("leaves an untyped event's output generic-free", () => {
    expect(angularOutputTypeArgument(event("change"))).toBe("");
  });
});

describe("eventCallbackType", () => {
  it("takes the payload tuple as the callback's parameter list", () => {
    expect(eventCallbackType(event("change", "[value: string]"))).toBe("(value: string) => void");
    expect(eventCallbackType(event("move", "[a: string, b: number]"))).toBe(
      "(a: string, b: number) => void",
    );
  });

  it("names unlabelled tuple elements positionally", () => {
    expect(eventCallbackType(event("change", "[string]"))).toBe("(arg0: string) => void");
  });

  it("takes no parameters for a valueless event", () => {
    expect(eventCallbackType(event("submit", "[]"))).toBe("() => void");
  });

  it("falls back to a variadic any for an untyped event", () => {
    expect(eventCallbackType(event("change"))).toBe("(...args: any[]) => void");
  });
});

describe("vueEmitsTypeArgument", () => {
  it("rebuilds the declaration Vue's macro takes", () => {
    expect(vueEmitsTypeArgument([event("change", "[value: string]"), event("submit", "[]")])).toBe(
      "{ change: [value: string]; submit: [] }",
    );
  });

  it("quotes a name that is not a bare identifier", () => {
    expect(vueEmitsTypeArgument([event("update:value", "[value: string]")])).toBe(
      `{ "update:value": [value: string] }`,
    );
  });

  it("falls back to the runtime array form when any event is untyped", () => {
    expect(vueEmitsTypeArgument([event("change", "[value: string]"), event("submit")])).toBe(
      undefined,
    );
    expect(vueEmitsTypeArgument([])).toBe(undefined);
  });
});

describe("packedPayloadEvents", () => {
  it("selects only the multi-value events", () => {
    const packed = packedPayloadEvents([
      event("move", "[a: string, b: number]"),
      event("change", "[value: string]"),
      event("submit", "[]"),
      event("untyped"),
    ]);
    expect([...packed]).toEqual(["move"]);
  });
});
