// INK-35 regression: proves the styled Select's Qwik codegen renders on the server instead of
// throwing `[object Promise]`.
//
// The defect was in the Qwik target's setup-body handler emission: hoisted handler locals were bound
// as `onToggle$={$(onToggle)}` (a `$()` wrapping a bare identifier, which the optimizer rejects) and
// captured inside inline handlers (`$(() => onSelect(row))`) as plain — not serializable — functions.
// Qwik's optimizer turned the failed extraction into a rejected Promise, so SSR of the default story
// (listbox closed) produced an `errored-host` and logged `Unknown Error: [object Promise]`.
//
// `test/generate-fixtures.ts` (globalSetup) compiles the real Select tree to Qwik under
// `test/__generated__/select/`; importing the styled root routes it through qwikVite — the same QRL
// extraction a production build runs. On a broken build the render throws and the assertions below
// fail loudly.
import { describe, it, expect, beforeAll } from "vitest";
import { component$, useSignal, $, type Component } from "@qwik.dev/core";
import { renderToString } from "@qwik.dev/core/server";

const GENERATED_SELECT = "./__generated__/select/styled/ISelect.tsx";
let ISelect: Component<Record<string, unknown>>;

beforeAll(async () => {
  ({ ISelect } = await import(GENERATED_SELECT));
});

/** The default story: a Select with a bound value and the listbox closed (its crashing state). */
function DefaultStory() {
  return component$(() => {
    const value = useSignal("apple");
    return (
      <ISelect
        id="select-default"
        label="Fruit"
        value={value.value}
        options={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
        onUpdateValue$={$((v: string) => (value.value = v))}
      />
    );
  });
}

describe("Qwik Select — SSR render (INK-35)", () => {
  it("renders select--default (listbox closed) without throwing [object Promise]", async () => {
    const Story = DefaultStory();
    const { html } = await renderToString(<Story />, { containerTagName: "div" });

    // A real combobox is in the DOM — not Qwik's error boundary.
    expect(html).not.toContain("errored-host");
    expect(html).not.toContain("[object Promise]");
    expect(html).toContain('role="combobox"');
    expect(html).toContain("select-container");
  });
});
