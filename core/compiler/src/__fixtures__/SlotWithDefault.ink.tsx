import { defineComponent, Slot } from "@inkline/core";
export default defineComponent({ slots: { default: {}, actions: {} } }, () => {
  return (
    <div>
      <main>
        <Slot>
          <p>Default content</p>
        </Slot>
      </main>
      <footer>
        <Slot name="actions">
          <span>Action area</span>
        </Slot>
      </footer>
    </div>
  );
});
