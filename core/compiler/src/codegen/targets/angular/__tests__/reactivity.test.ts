// Angular reactivity codegen: signal/computed/effect dependency wiring,
// class-body reads through `this`, and handler statement bindings.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Counter: signal + memo + effect dependency wiring", () => {
  it("Angular: class-body memo reads dependencies via this.", async () => {
    const out = await compileTo("Counter", "angular");
    expect(out).toContain("count = signal(0)");
    // class-body computed/effect must reach sibling signals through `this`
    expect(out).toContain("doubled = computed(() => this.count() * 2)");
    // string literals inside the class body are single-quoted; the effect is
    // consolidated into the constructor and reads the signal via `this`
    expect(out).toContain(
      "constructor() { effect(() => { console.log('count:', this.count()); }) }",
    );
  });
});

describe("MemoChain: memo referencing memo referencing signal", () => {
  it("Angular: chained computed reads each upstream memo via this.", async () => {
    const out = await compileTo("MemoChain", "angular");
    expect(out).toContain("doubled = computed(() => this.base() * 2)");
    expect(out).toContain("quadrupled = computed(() => this.doubled() * 2)");
    expect(out).toContain("label = computed(() => `Value: ${this.quadrupled()}`)");
  });
});

describe("DiamondMemo: two memos over one signal, joined by a third", () => {
  it("Angular: diamond join reads both branch memos via this.", async () => {
    const out = await compileTo("DiamondMemo", "angular");
    expect(out).toContain("combined = computed(() => this.left() + this.right())");
  });
});

describe("BatchUpdates: batch() helper inside an event handler", () => {
  it("Angular: the handler unwraps to a `;`-separated statement binding", async () => {
    const out = await compileTo("BatchUpdates", "angular");
    expect(out).toContain('(click)="x.set(x() + 1); y.set(y() + 1);"');
    expect(out).not.toContain("batch");
  });
});

describe("ConditionalRead: memo with a conditional over three signals", () => {
  it("Angular: ternary memo reads all three signals via this.", async () => {
    const out = await compileTo("ConditionalRead", "angular");
    expect(out).toContain("value = computed(() => (this.flag() ? this.a() : this.b()))");
  });
});

describe("LateSignal: memo declared before the signal it reads", () => {
  it("Angular: late signal still wired via this. in the computed", async () => {
    const out = await compileTo("LateSignal", "angular");
    expect(out).toContain("count = signal(5)");
    expect(out).toContain("doubled = computed(() => this.count() * 2)");
  });
});

describe("DynamicAccess: computed indexing one signal by another", () => {
  it("Angular: dynamic key access reads both signals via this.", async () => {
    const out = await compileTo("DynamicAccess", "angular");
    expect(out).toContain("value = computed(() => this.obj()[this.key()])");
  });
});
