import { createSignal, defineComponent, For } from "@inkline/core";

export default defineComponent(() => {
  const [options] = createSignal(["a", "b", "c"]);
  const [value, setValue] = createSignal("b");
  const [open, setOpen] = createSignal(false);

  // Verbatim handler (no args): lifts as-is.
  const onToggle = () => setOpen(!open());

  // Function-declaration handler: emitted as a named function expression on every target.
  function onReset() {
    setValue("a");
  }

  // Parametrized handler closing over the `For` row `option`; bound as `() => onSelect(option)`.
  const onSelect = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  return (
    <div>
      <button id="toggle" onClick={onToggle}>
        {value()}
      </button>
      <button id="reset" onClick={onReset}>
        Reset
      </button>
      <For each={options()} key={(option) => option}>
        {(option) => (
          <div class="option" onClick={() => onSelect(option)}>
            {option}
          </div>
        )}
      </For>
    </div>
  );
});
