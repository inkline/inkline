import { styleframe } from "virtual:styleframe";
import { useFieldGroupRecipe } from "@styleframe/theme";

const s = styleframe();

// The field-group recipe joins bordered controls placed as *direct children* into one unit: it
// merges adjacent border radii and collapses the inner border at the seams, and exposes
// `orientation` (horizontal/vertical) and `block` variants.
export const fieldGroupRecipe = useFieldGroupRecipe(s);

// PROTOTYPE (Phase 3) — reach-through seam fix for component-wrapping targets (Angular).
// The recipe collapses seams with `.field-group.-vertical|-horizontal > :not(:last|first-child)`
// — direct-child selectors that remove the inner border + square the inner corners. On Angular each
// control is nested inside `display: contents` `ink-*` host elements, so those rules land on the
// (boxless) host and the real control keeps its full border → a doubled border at every seam (+2px).
// Re-apply the exact same border removal reaching the control through the wrappers. This is a no-op
// where the control is already the direct child (React/Vue/Svelte/Solid), so it's purely additive.
const CONTROL = ":where(.button, .input, .select, .textarea)";

s.selector(`.field-group.-vertical > *:not(:last-child) ${CONTROL}`, {
  borderBottomLeftRadius: "0",
  borderBottomRightRadius: "0",
  borderBottomWidth: "0",
});
s.selector(`.field-group.-vertical > *:not(:first-child) ${CONTROL}`, {
  borderTopLeftRadius: "0",
  borderTopRightRadius: "0",
});
s.selector(`.field-group.-horizontal > *:not(:last-child) ${CONTROL}`, {
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",
  borderRightWidth: "0",
});
s.selector(`.field-group.-horizontal > *:not(:first-child) ${CONTROL}`, {
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
});
