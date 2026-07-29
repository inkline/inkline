import { defineComponent, Show } from "@inkline/core";
export default defineComponent(() => {
  return (
    <div>
      {/* Deliberately invalid: `<Show>` without `when` is the INK0060 diagnostic this fixture
          triggers. `Show`'s authoring type marks `when` required, so TypeScript reports TS2741 —
          expected, and the proof the authoring types and the diagnostic agree. */}
      {/* @ts-expect-error -- missing required `when` prop, by design */}
      <Show>
        <span>Missing when prop</span>
      </Show>
    </div>
  );
});
