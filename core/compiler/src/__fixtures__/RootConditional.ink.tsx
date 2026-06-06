import { defineComponent, Show } from "@inkline/core";

export interface RootConditionalProps {
  textarea?: boolean;
}

// The conditional is the component's *root* render — there is no enclosing element. JSX targets that
// lower `<Show>` to a ternary must emit it bare inside `return (…)`, not wrapped in `{…}` (which would
// parse as an object literal).
export default defineComponent((props: RootConditionalProps) => {
  return (
    <Show when={props.textarea} fallback={<input />}>
      <textarea />
    </Show>
  );
});
