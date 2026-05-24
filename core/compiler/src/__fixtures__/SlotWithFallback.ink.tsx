import { defineComponent, Slot } from "@inkline/core";
export default defineComponent(() => {
  return (
    <div>
      <Slot name="header">
        <h1>Default Header</h1>
      </Slot>
      <Slot>Default body content</Slot>
    </div>
  );
});
