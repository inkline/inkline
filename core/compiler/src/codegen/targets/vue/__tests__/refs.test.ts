// Vue codegen: template refs (element refs) and their lifecycle wiring.
// Vue expresses element refs as ref(null) + a string `ref="name"` binding, read via .value.
import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

// ---------------------------------------------------------------------------
// ElementRef: a single createRef() bound to <input>, focused in onMount.
// Vue -> ref(null) + string ref="inputRef", .value in the hook
// ---------------------------------------------------------------------------
describe("ElementRef: single template ref bound + focused on mount", () => {
  it("Vue: ref(null) in <script setup>, string ref binding, onMounted using .value", async () => {
    const out = await compileTo("ElementRef", "vue");
    expect(out).toContain("const inputRef = ref(null)");
    expect(out).toContain("onMounted(() => { inputRef.value?.focus(); })");
    // Vue binds template refs by name, not by expression.
    expect(out).toContain('<input placeholder="auto-focus" ref="inputRef" />');
  });
});
