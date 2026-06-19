import { defineComponent } from "@inkline/core";

// A headless component whose root is a fragment, not a single static element. Host-extraction can't
// apply, so the Angular target warns (INK0111) and emits only the element-selector wrapper variant.
export default defineComponent({ meta: { headless: true } }, () => {
  return (
    <>
      <span class="a" />
      <span class="b" />
    </>
  );
});
