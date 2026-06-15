import { styleframe } from "virtual:styleframe";
import { useInputRecipe, useInputPrefixRecipe, useInputSuffixRecipe } from "@styleframe/theme";

const s = styleframe();

// All Input-family recipes are registered here (the single styled IInput is the only consumer), so
// `virtual:styleframe` exports each recipe and emits its `.input-*` rules.
export const inputRecipe = useInputRecipe(s);
export const inputPrefixRecipe = useInputPrefixRecipe(s);
export const inputSuffixRecipe = useInputSuffixRecipe(s);

// IInput always renders its inline prefix/suffix wrappers on Qwik/Angular (no runtime slot presence),
// so an unused addon shows up as an empty wrapper. This rule makes an empty wrapper invisible, so an
// absent addon leaves no trace. On the other five targets `hasSlot` omits the wrapper entirely, so
// this rule is a harmless no-op.
const { selector } = s;

selector(".input-prefix:empty, .input-suffix:empty", {
  display: "none",
});
