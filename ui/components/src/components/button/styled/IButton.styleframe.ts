import { styleframe } from "virtual:styleframe";
import { useButtonRecipe } from "@styleframe/theme";

const s = styleframe();

// Layered on top of the prebuilt recipe (which only styles color/variant/size on `.button`).
s.selector(".button--block", { width: "100%" });

s.keyframes("button-spin", { "100%": { transform: "rotate(360deg)" } });

s.selector(".button-spinner", {
  display: "inline-block",
  width: "1em",
  height: "1em",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "currentColor",
  borderRightColor: "transparent",
  borderRadius: "50%",
  animation: "button-spin 0.6s linear infinite",
});

export const buttonRecipe = useButtonRecipe(s);
