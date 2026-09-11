// Vue codegen for `const { label: text, size: dimension = "md", tone } = props` in the setup body.
// The template reads a prop by its bare name, so each alias must resolve to the PROP name and not
// to the authored local — and the folded default must reach withDefaults.

import { describe, it, expect } from "vitest";
import { compileTo } from "../../../../testing/codegen.ts";

describe("PropsDestructured: plain, renamed, and renamed + defaulted props bindings", () => {
  it("Vue: the template reads the prop names, and the folded default reaches withDefaults", async () => {
    const out = await compileTo("PropsDestructured", "vue");

    expect(out).not.toContain("text");
    expect(out).not.toContain("dimension");

    // withDefaults now wraps the named-type form too — before this it only wrapped the inline
    // literal, so a default on a `defineProps<FooProps>()` component was silently dropped.
    expect(out).toContain(
      'const props = withDefaults(defineProps<PropsDestructuredProps>(), { size: "md" })',
    );
    expect(out).toContain('<h1 :title="label">{{ label }}</h1>');
    expect(out).toContain("<p>{{ size }}</p>");
    expect(out).toContain("<span>{{ tone }}</span>");
  });
});

// The counterpart of the memo limitation: `withDefaults` seeds the default on the props object
// itself, so an alias read inside a computed or a watcher still resolves to the default.
describe("PropsDestructuredMemo: an alias inside a computed or a watcher keeps the folded default", () => {
  it("Vue: withDefaults seeds the default, so the computed and the watcher read it", async () => {
    const out = await compileTo("PropsDestructuredMemo", "vue");

    expect(out).toContain(
      'const props = withDefaults(defineProps<PropsDestructuredMemoProps>(), { size: "md" })',
    );
    expect(out).toContain("const summary = computed(() => `${props.label}:${props.size}`)");
    expect(out).toContain("watchEffect(() => { console.log(props.size); })");
  });
});
