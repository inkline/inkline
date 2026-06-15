import { styleframe } from "virtual:styleframe";
import { useFieldGroupRecipe } from "@styleframe/theme";

const s = styleframe();

// The field-group recipe joins bordered controls placed as *direct children* into one unit: it
// merges adjacent border radii and collapses the inner border at the seams, and exposes
// `orientation` (horizontal/vertical) and `block` variants. All seam/orientation/block CSS comes
// from the recipe, so no hand-written selectors are needed here.
export const fieldGroupRecipe = useFieldGroupRecipe(s);
