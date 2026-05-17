// @ts-nocheck
import { createSignal, defineComponent } from "@inkline/core";
export default defineComponent(() => {
  const [submitted, setSubmitted] = createSignal(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <button type="submit">Submit</button>
      <span>{submitted() ? "Done" : "Pending"}</span>
    </form>
  );
});
