import { describe, it, expect, vi } from "vitest";
import {
  defineComponent,
  createSignal,
  defineModel,
  defineEmits,
  createMemo,
  createEffect,
  createRef,
  createResource,
  onMount,
  onCleanup,
  batch,
  untrack,
  defineSlot,
  hasSlot,
  Slot,
  Show,
  For,
  Switch,
  Match,
  Transition,
} from "./index.ts";

describe("defineComponent", () => {
  it("returns the setup function unchanged when called with a single setup arg", () => {
    const setup = (props: { value: number }) => props.value;
    const Component = defineComponent(setup);
    expect(Component).toBe(setup);
    expect(Component({ value: 42 })).toBe(42);
  });

  it("returns the setup function when called with (options, setup)", () => {
    const setup = vi.fn((props: { value: number }) => props.value);
    const Component = defineComponent({ name: "Demo", runtime: "client" }, setup);
    expect(Component).toBe(setup);
    Component({ value: 7 });
    expect(setup).toHaveBeenCalledWith({ value: 7 });
  });
});

describe("createSignal", () => {
  it("getter returns the initial value", () => {
    const [get] = createSignal(123);
    expect(get()).toBe(123);
  });

  it("setter updates the value the getter reads", () => {
    const [get, set] = createSignal("a");
    set("b");
    expect(get()).toBe("b");
  });

  it("preserves reference identity for object values", () => {
    const initial = { count: 0 };
    const next = { count: 1 };
    const [get, set] = createSignal(initial);
    expect(get()).toBe(initial);
    set(next);
    expect(get()).toBe(next);
  });
});

describe("defineModel", () => {
  it("getter is undefined until set (default name)", () => {
    const [get, set] = defineModel<string>();
    expect(get()).toBeUndefined();
    set("hello");
    expect(get()).toBe("hello");
  });

  it("accepts an explicit model name", () => {
    const [get, set] = defineModel<number>("count");
    expect(get()).toBeUndefined();
    set(5);
    expect(get()).toBe(5);
  });
});

describe("defineEmits", () => {
  it("returns a no-op emitter when called without names", () => {
    const emit = defineEmits();
    expect(emit("change", 1)).toBeUndefined();
  });

  it("returns a no-op emitter when called with declared event names", () => {
    const emit = defineEmits<{ change: [number] }>(["change"]);
    expect(() => emit("change", 1)).not.toThrow();
  });
});

describe("createMemo", () => {
  it("returns the provided function and forwards its result", () => {
    const fn = () => 42;
    const memo = createMemo(fn);
    expect(memo).toBe(fn);
    expect(memo()).toBe(42);
  });
});

describe("createEffect", () => {
  it("invokes the effect immediately", () => {
    const fn = vi.fn();
    createEffect(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("accepts an effect that returns a cleanup without throwing", () => {
    const cleanup = vi.fn();
    expect(() => createEffect(() => cleanup)).not.toThrow();
  });
});

describe("createRef", () => {
  it("returns a ref object with a null current", () => {
    expect(createRef()).toEqual({ current: null });
  });
});

describe("createResource", () => {
  it("returns a loading tuple without invoking the fetcher", () => {
    const fetcher = vi.fn(async () => "data");
    const [data, meta] = createResource(fetcher);
    expect(data).toBeUndefined();
    expect(meta).toEqual({ loading: true, error: undefined });
    expect(fetcher).not.toHaveBeenCalled();
  });
});

describe("lifecycle stubs", () => {
  it("onMount does not invoke its callback and returns undefined", () => {
    const fn = vi.fn();
    expect(onMount(fn)).toBeUndefined();
    expect(fn).not.toHaveBeenCalled();
  });

  it("onCleanup does not invoke its callback and returns undefined", () => {
    const fn = vi.fn();
    expect(onCleanup(fn)).toBeUndefined();
    expect(fn).not.toHaveBeenCalled();
  });
});

describe("batch / untrack", () => {
  it("batch invokes the callback", () => {
    const fn = vi.fn();
    batch(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("untrack invokes the callback and returns its result", () => {
    expect(untrack(() => 7)).toBe(7);
  });
});

describe("slot stubs", () => {
  it("defineSlot returns null with and without a name", () => {
    expect(defineSlot()).toBeNull();
    expect(defineSlot("footer")).toBeNull();
  });

  it("hasSlot returns false with and without a name", () => {
    expect(hasSlot()).toBe(false);
    expect(hasSlot("footer")).toBe(false);
  });
});

describe("control-flow components", () => {
  it("all render to null at authoring time", () => {
    expect(Slot({ name: "footer" })).toBeNull();
    expect(Show({ when: true })).toBeNull();
    expect(For({ each: [1, 2], children: (item) => item })).toBeNull();
    expect(Switch({})).toBeNull();
    expect(Match({ when: false })).toBeNull();
    expect(Transition({ name: "fade", appear: true })).toBeNull();
  });
});
