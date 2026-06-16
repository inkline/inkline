// React reactivity codegen: signal/memo/effect dependency wiring across
// chained, diamond, conditional, batched, and out-of-order signal graphs.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("Counter: signal + memo + effect dependency wiring", () => {
  it("React: useState/useMemo/useEffect with correct deps", async () => {
    const out = await compileTo("Counter", "react");
    expect(out).toContain("const [count, setCount] = useState(0)");
    expect(out).toContain("const doubled = useMemo(() => count * 2, [count])");
    expect(out).toContain('useEffect(() => { console.log("count:", count); }, [count])');
  });
});

describe("MemoChain: memo referencing memo referencing signal", () => {
  it("React: linear chain threads deps base->doubled->quadrupled->label", async () => {
    const out = await compileTo("MemoChain", "react");
    expect(out).toContain("const doubled = useMemo(() => base * 2, [base])");
    expect(out).toContain("const quadrupled = useMemo(() => doubled * 2, [doubled])");
    expect(out).toContain("const label = useMemo(() => `Value: ${quadrupled}`, [quadrupled])");
  });
});

describe("DiamondMemo: two memos over one signal, joined by a third", () => {
  it("React: combined memo depends on both left and right", async () => {
    const out = await compileTo("DiamondMemo", "react");
    expect(out).toContain("const left = useMemo(() => base * 2, [base])");
    expect(out).toContain("const right = useMemo(() => base * 3, [base])");
    expect(out).toContain("const combined = useMemo(() => left + right, [left, right])");
  });
});

describe("BatchUpdates: batch() helper inside an event handler", () => {
  it("React: the handler collapses to a block; no undefined `batch` reference", async () => {
    const out = await compileTo("BatchUpdates", "react");
    expect(out).toContain("onClick={() => { setX(x + 1); setY(y + 1); }}");
    expect(out).not.toContain("batch");
  });
});

describe("ConditionalRead: memo with a conditional over three signals", () => {
  it("React: ternary memo lists all three reads as deps", async () => {
    const out = await compileTo("ConditionalRead", "react");
    expect(out).toContain("const value = useMemo(() => (flag ? a : b), [flag, a, b])");
  });
});

describe("LateSignal: memo declared before the signal it reads", () => {
  it("React: hoists state so memo dep resolves despite source order", async () => {
    const out = await compileTo("LateSignal", "react");
    expect(out).toContain("const [count, setCount] = useState(5)");
    expect(out).toContain("const doubled = useMemo(() => count * 2, [count])");
  });
});

describe("MemoModel: memo reading a defineModel getter", () => {
  it("React: useMemo deps reference props.<name>, not a temporal-dead-zone bare local", async () => {
    const out = await compileTo("MemoModel", "react");
    // Body and deps must agree on `props.open`; a bare `open` in the deps array references the
    // props destructuring emitted *after* the memo → ReferenceError at runtime.
    expect(out).toContain(
      'const label = useMemo(() => (props.open ? "Open" : "Closed"), [props.open])',
    );
    expect(out).not.toContain(", [open])");
  });
});
