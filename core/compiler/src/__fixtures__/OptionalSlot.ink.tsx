// @ts-nocheck
import { defineComponent } from "@inkline/core";
export default defineComponent({ slots: { default: {}, header: { required: false } } }, () => {
  return (
    <div>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <p>Default content</p>
      </main>
    </div>
  );
});
