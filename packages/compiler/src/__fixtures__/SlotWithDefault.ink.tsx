// @ts-nocheck
import { defineComponent } from "@inkline/core";
export default defineComponent({ slots: { default: {}, actions: {} } }, () => {
  return (
    <div>
      <main>
        <p>Default content</p>
      </main>
      <footer>
        <span>Action area</span>
      </footer>
    </div>
  );
});
