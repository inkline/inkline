import { styleframe } from "virtual:styleframe";
import { useInputRecipe, useInputPrefixRecipe, useInputSuffixRecipe } from "@styleframe/theme";

const s = styleframe();

// All Input-family recipes are registered here (the single styled IInput is the only consumer), so
// `virtual:styleframe` still exports every recipe and emits every `.input-*` rule after the per-part
// styled components were removed.
export const inputRecipe = useInputRecipe(s);
export const inputPrefixRecipe = useInputPrefixRecipe(s);
export const inputSuffixRecipe = useInputSuffixRecipe(s);

// IInput always renders its addon and group wrappers on Qwik/Angular (no runtime slot presence), so an
// unused addon shows up as an empty wrapper. These rules make an empty wrapper invisible — collapsing it
// and restoring the field's corners/border so an absent addon leaves no trace. The `:empty` pseudo-class
// also raises specificity above the theme's join rules, so the restores win. On the other five targets
// `hasSlot` omits the wrapper entirely, so these rules are harmless no-ops.
const { selector } = s;

selector(".input-prefix:empty, .input-suffix:empty, .input-prepend:empty, .input-append:empty", {
  display: "none",
});

// An empty prepend must not flatten the field's leading corners (theme joins `.input-prepend + .input`).
selector(".input-group .input-prepend:empty + .input", {
  borderTopLeftRadius: "@border-radius.md",
  borderBottomLeftRadius: "@border-radius.md",
  borderLeftWidth: "@border-width.thin",
});

// An empty append must not flatten the field's trailing corners (theme joins `.input:has(+ .input-append)`).
selector(".input-group .input:has(+ .input-append:empty)", {
  borderTopRightRadius: "@border-radius.md",
  borderBottomRightRadius: "@border-radius.md",
  borderRightWidth: "@border-width.thin",
});

// With no real addon, the always-present group must not change the field's own layout.
selector(".input-group:not(:has(:is(.input-prepend, .input-append):not(:empty)))", {
  display: "contents",
});
