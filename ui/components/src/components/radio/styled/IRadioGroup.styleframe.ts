import { styleframe } from "virtual:styleframe";
import { useRadioGroupRecipe, useRadioRecipe, useRadioFieldRecipe } from "@styleframe/theme";

const s = styleframe();

// All Radio-family recipes are registered here (the single styled IRadioGroup is the only consumer),
// so `virtual:styleframe` exports each recipe and emits its `.radio-group` / `.radio` / `.radio-field`
// rules. `radio-group` is the flex container, `radio` the label row (layout + typography), and
// `radio-field` the visual control circle.
export const radioGroupRecipe = useRadioGroupRecipe(s);
export const radioRecipe = useRadioRecipe(s);
export const radioFieldRecipe = useRadioFieldRecipe(s);
