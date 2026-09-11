import { defineComponent, defineProps, createMemo, createEffect } from "@inkline/core";

export interface PropsDestructuredMemoProps {
  label: string;
  size?: string;
}

// Pins the one accepted limitation of props-destructuring aliases: inside a memo or an effect,
// React and Qwik rewrite an alias to `props.<prop>` rather than to the destructured local that
// carries the folded default, because that local is declared below them. The render body reads
// the local, so the same alias reads "md" there and `undefined` inside the memo on those two.
//
// The root is a fragment for the same reason as `PropsDestructured`: it keeps the fixture out of
// the Solid attribute-passthrough defect quarantined in `typecheck-fixtures.ts`.
export default defineComponent(() => {
  const props = defineProps<PropsDestructuredMemoProps>();
  const { label: text, size: dimension = "md" } = props;
  const summary = createMemo(() => `${text}:${dimension}`);
  createEffect(() => {
    console.log(dimension);
  });
  return (
    <>
      <h1>{summary()}</h1>
      <p>{dimension}</p>
    </>
  );
});
