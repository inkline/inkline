import { defineComponent, Slot } from "@inkline/core";
export default defineComponent({ slots: { default: {}, header: { required: false } } }, () => {
  return (
    <div>
      <header>
        <Slot name="header">
          <h1>Header</h1>
        </Slot>
      </header>
      <main>
        <Slot>
          <p>Default content</p>
        </Slot>
      </main>
    </div>
  );
});
