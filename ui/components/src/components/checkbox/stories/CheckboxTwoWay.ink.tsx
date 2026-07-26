import { createSignal, defineComponent } from "@inkline/core";
import ICheckbox from "../styled/ICheckbox.ink.tsx";

// Two-way binding: toggling the box updates `agreed`, reflected live below.
export default defineComponent(() => {
  const [agreed, _setAgreed] = createSignal(false);
  return (
    <div id="story">
      <ICheckbox name="terms" label="I accept the terms" $bind:checked={agreed} />
      <p>{agreed() ? "Thanks for accepting!" : "Please accept to continue."}</p>
    </div>
  );
});
