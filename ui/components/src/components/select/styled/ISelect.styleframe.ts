import { styleframe } from "virtual:styleframe";
import {
  useSelectRecipe,
  useSelectPanelRecipe,
  useSelectOptionRecipe,
  useSelectArrowRecipe,
} from "@styleframe/theme";

const s = styleframe();

// All four Select-family recipes are registered here (the single styled ISelect is the only
// consumer), so `virtual:styleframe` exports each recipe and emits its `.select` (trigger),
// `.select-panel` (listbox), `.select-option`, and `.select-arrow` rules.
export const selectRecipe = useSelectRecipe(s);
export const selectPanelRecipe = useSelectPanelRecipe(s);
export const selectOptionRecipe = useSelectOptionRecipe(s);
export const selectArrowRecipe = useSelectArrowRecipe(s);

const { selector } = s;

// Positioning: the recipes style the trigger/panel/option surfaces but leave layout to the
// consumer. Make the container the positioning context and float the panel directly beneath the
// trigger so opening the listbox never shifts surrounding page content.
selector(".select-container", {
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
});
selector(".select-panel", {
  position: "absolute",
  top: "100%",
  left: "0",
  right: "0",
  zIndex: "20",
});

// Keyboard/pointer active row: the recipe styles `aria-selected` (the committed value) but not the
// virtually-focused row. Mark it with the same primary outline the open trigger uses (mode-aware via
// the `@color.primary` token); hovering sets the same `data-active`, so this covers the mouse too.
selector('.select-option[data-active="true"]', {
  outlineWidth: "2px",
  outlineStyle: "solid",
  outlineColor: "@color.primary",
  outlineOffset: "-2px",
});
