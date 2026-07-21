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

// Keyboard virtual-focus row: the recipe styles `aria-selected` (the committed value) but not the
// virtually-focused row. Mark it with the same primary outline the open trigger uses (mode-aware via
// the `@color.primary` token). Pointer hover also sets `data-active` (the mouse drives the same
// virtual focus), so exclude `:hover` here — an outline on a hovered row reads as a stuck focus ring.
// The hovered row gets a subtle background affordance below instead.
selector('.select-option[data-active="true"]:not(:hover)', {
  outlineWidth: "2px",
  outlineStyle: "solid",
  outlineColor: "@color.primary",
  outlineOffset: "-2px",
});

// Pointer hover affordance: the option recipe ships no `:hover` styling upstream, so once the
// outline is suppressed for the mouse the hovered row would have zero feedback. Give it a subtle
// surface. A translucent `currentColor` overlay is mode-agnostic by construction — the option's
// text colour already flips with the theme (dark in light mode, light in dark mode), so an 8%
// tint reads as a soft neutral highlight in both without hand-rolling a dark variant. Disabled
// options set `pointer-events: none`, so they never receive hover.
selector(".select-option:hover", {
  background: "color-mix(in srgb, currentColor 8%, transparent)",
});
