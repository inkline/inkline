import { defineComponent, Slot } from "@inkline/core";
import { plainRecipe } from "virtual:styleframe";

// Regression fixture: a zero-arg call to an imported styleframe recipe bound on `class` — the exact
// shape of the styled `IInputAppend` component. `plainRecipe` is an imported function, NOT a
// reactive signal, so every target must keep the call `plainRecipe()`. The bug treated any zero-arg
// call as a signal read and stripped the `()` (or emitted `.value`), inlining the recipe's source
// into the class attribute.
export default defineComponent({ slots: { default: {} } }, () => (
  <div class={plainRecipe()}>
    <Slot />
  </div>
));
