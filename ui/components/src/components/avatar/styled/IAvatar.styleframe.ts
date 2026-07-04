import { styleframe } from "virtual:styleframe";
import { useAvatarRecipe, useAvatarBadgeRecipe } from "@styleframe/theme";

const s = styleframe();

// Both Avatar-family recipes are registered here (the single styled IAvatar consumes both), so
// `virtual:styleframe` exports each recipe and emits its `.avatar` / `.avatar-badge` rules. The theme
// already ships the `.avatar > img` cover rules and the badge's absolute positioning — no local CSS,
// and no `:empty` collapse (the badge is prop-gated, so an empty wrapper is never rendered).
export const avatarRecipe = useAvatarRecipe(s);
export const avatarBadgeRecipe = useAvatarBadgeRecipe(s);
