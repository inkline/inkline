import { defineComponent, For } from "@inkline/core";
export default defineComponent(() => {
  return (
    <div>
      {/* Deliberately invalid: `<For>` without `each` is the INK0062 diagnostic this fixture
          triggers. `For`'s authoring type marks `each` required, so TypeScript reports TS2741 —
          expected, and the proof the authoring types and the diagnostic agree. */}
      {/* @ts-expect-error -- missing required `each` prop, by design */}
      <For key={(x) => x}>{(item) => <span>{item}</span>}</For>
    </div>
  );
});
