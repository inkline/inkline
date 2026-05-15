// @ts-nocheck
import { createSignal, defineComponent, For } from "@inkline/core";
export default defineComponent(() => {
  const [grid] = createSignal([
    [1, 2],
    [3, 4],
  ]);
  return (
    <div>
      <For each={grid()} key={(_, i) => i}>
        {(row) => (
          <div>
            <For each={row} key={(_, j) => j}>
              {(cell) => <span>{cell}</span>}
            </For>
          </div>
        )}
      </For>
    </div>
  );
});
