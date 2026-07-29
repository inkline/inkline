import { defineComponent, For } from "@inkline/core";
export default defineComponent(() => {
  return (
    <div>
      <For key={(x) => x}>{(item) => <span>{item}</span>}</For>
    </div>
  );
});
