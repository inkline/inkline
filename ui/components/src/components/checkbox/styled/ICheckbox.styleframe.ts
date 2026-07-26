import { styleframe } from "virtual:styleframe";
import { useCheckboxRecipe, useCheckboxFieldRecipe } from "@styleframe/theme";

const s = styleframe();

// Both Checkbox-family recipes are registered here (the single styled ICheckbox is the only
// consumer), so `virtual:styleframe` exports each recipe and emits its rules. `checkboxRecipe` owns
// the `<label>` wrapper (size + the `:has(.checkbox-field:disabled)` label-dim rule via its own
// setup); `checkboxFieldRecipe` owns the `<input>` box (color + size, plus the
// `:checked`/`:indeterminate`/`:focus-visible`/`:disabled` pseudo-class states).
export const checkboxRecipe = useCheckboxRecipe(s);
export const checkboxFieldRecipe = useCheckboxFieldRecipe(s);
