import { styleframe } from "virtual:styleframe";
import { useFieldGroupRecipe } from "@styleframe/theme";

const s = styleframe();

// The field-group recipe joins bordered controls placed as *direct children* into one unit: it
// merges adjacent border radii and collapses the inner border at the seams, and exposes
// `orientation` (horizontal/vertical) and `block` variants. Every target now renders each control
// as a real direct child (Angular via attribute-selector host elements / the flattened input), so
// the recipe's own direct-child seam rules apply uniformly — no reach-through workaround needed.
export const fieldGroupRecipe = useFieldGroupRecipe(s);
