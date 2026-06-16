import { defineComponent, defineModel, createMemo } from "@inkline/core";

// A `createMemo` that reads a `defineModel` getter. On React the memo body and the `useMemo` deps
// array must both reference the model prop (`props.open`); a bare `open` in the deps array is a
// temporal-dead-zone ReferenceError (the props destructuring is emitted after the memo).
export default defineComponent(() => {
  const [open, setOpen] = defineModel<boolean>("open");
  const label = createMemo(() => (open() ? "Open" : "Closed"));
  return <button onClick={() => setOpen(!open())}>{label()}</button>;
});
