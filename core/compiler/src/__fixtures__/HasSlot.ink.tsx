import { defineComponent, Show, Slot, hasSlot } from "@inkline/core";

// Exercises `hasSlot`: a named slot gated by its presence, the default slot gated by `hasSlot()`,
// and a negated check that renders fallback content only when a slot is empty.
export default defineComponent({ slots: { default: {}, prefix: {}, suffix: {} } }, () => {
  return (
    <div>
      <Show when={hasSlot("prefix")}>
        <span class="prefix">
          <Slot name="prefix" />
        </span>
      </Show>
      <Show when={hasSlot()}>
        <main>
          <Slot />
        </main>
      </Show>
      <Show when={!hasSlot("suffix")}>
        <span class="no-suffix">none</span>
      </Show>
    </div>
  );
});
