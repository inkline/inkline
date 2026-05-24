import {
  useDesignTokensPreset,
  useGlobalPreset,
  useModifiersPreset,
  useSanitizePreset,
  useUtilitiesPreset,
} from "@styleframe/theme";
import { styleframe } from "styleframe";

const s = styleframe();

useDesignTokensPreset(s);
useSanitizePreset(s);
useGlobalPreset(s);
useUtilitiesPreset(s);
useModifiersPreset(s);

export default s;
