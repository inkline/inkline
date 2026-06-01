// @ts-expect-error virtual module resolved by styleframe Vite plugin
import "virtual:styleframe.css";
// @ts-expect-error CSS side-effect import resolved by Vite at build time
import "@inkline/storybook/preset/preview.css";
import { sharedParameters } from "@inkline/storybook/preset/parameters";

export default { parameters: sharedParameters };
