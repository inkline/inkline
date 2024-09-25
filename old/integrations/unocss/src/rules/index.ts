import { verticalAlignmentRules } from "./align";
import { borderRules } from "./border";
import { borderRadiusRules } from "./border-radius";
import { colorRules } from "./color";
import { cursorRules } from "./cursor";
import { displayRules } from "./display";
import { embedRules } from "./embed";
import { flexRules } from "./flex";
import { floatRules } from "./float";
import { listRules } from "./list";
import { overflowRules } from "./overflow";
import { overlayRules } from "./overlay";
import { positionRules } from "./position";
import { screenReaderRules } from "./screen-reader";
import { marginRules, paddingRules } from "./spacing";
import { sizingRules } from "./sizing";
import { typographyRules } from "./typography";
import { visibilityRules } from "./visibility";

export const rules = [
    ...borderRules,
    ...borderRadiusRules,
    ...colorRules,
    ...cursorRules,
    ...displayRules,
    ...embedRules,
    ...flexRules,
    ...floatRules,
    ...listRules,
    ...verticalAlignmentRules,
    ...overflowRules,
    ...overlayRules,
    ...positionRules,
    ...screenReaderRules,
    ...marginRules,
    ...paddingRules,
    ...sizingRules,
    ...typographyRules,
    ...visibilityRules,
];
