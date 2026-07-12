import { styleframe } from "virtual:styleframe";
import { useSwitchRecipe, useSwitchFieldRecipe } from "@styleframe/theme";

const s = styleframe();

// Both Switch-family recipes are registered here (the single styled ISwitch is the only consumer),
// so `virtual:styleframe` exports each recipe and emits its `.switch` / `.switch-field` rules.
export const switchRecipe = useSwitchRecipe(s);
export const switchFieldRecipe = useSwitchFieldRecipe(s);

// ISwitch always renders its text-label wrapper (no `hasSlot` gate), so an unlabelled switch would
// otherwise show a trailing gap from the shell's flex layout. Collapsing the empty wrapper removes
// the label — and its gap — entirely, on every target.
const { selector } = s;

selector(".switch-label:empty", {
  display: "none",
});
