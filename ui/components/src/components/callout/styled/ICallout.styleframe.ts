import { styleframe } from "virtual:styleframe";
import { useCalloutRecipe } from "@styleframe/theme";

const s = styleframe();

// Layered on top of the prebuilt recipe (which only styles color/variant/size/orientation on
// `.callout`). The recipe's `display: flex` outranks the UA `[hidden]` rule, so dismissal needs an
// explicit collapse.
s.selector(".callout[hidden]", { display: "none" });

s.selector(".callout-icon", { display: "inline-flex", flexShrink: "0" });

// Qwik/Angular have no runtime slot presence and always render the gated icon wrapper.
s.selector(".callout-icon:empty", { display: "none" });

s.selector(".callout-content", { flex: "1 1 auto" });

s.selector(".callout-dismiss", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: "0",
  marginInlineStart: "auto",
  padding: "0",
  borderWidth: "0",
  background: "none",
  color: "inherit",
  font: "inherit",
  lineHeight: "1",
  cursor: "pointer",
});

export const calloutRecipe = useCalloutRecipe(s);
