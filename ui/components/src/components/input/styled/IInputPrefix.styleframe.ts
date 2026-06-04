import { styleframe } from "virtual:styleframe";
import { useInputPrefixRecipe } from "@styleframe/theme";

const s = styleframe();

export const inputPrefix = useInputPrefixRecipe(s);
