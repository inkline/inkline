import { defineComponent, Show, hasSlot } from "@inkline/core";

// The `when` (`!hasSlot`) folds to constant-false on Angular/Qwik; the fallback must then
// render unconditionally rather than orphan an `@else`.
export default defineComponent({ slots: { suffix: {} } }, () => {
  return (
    <div>
      <Show when={!hasSlot("suffix")} fallback={<span class="has-suffix">present</span>}>
        <span class="no-suffix">absent</span>
      </Show>
    </div>
  );
});
