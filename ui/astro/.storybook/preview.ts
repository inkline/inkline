// @ts-expect-error virtual module resolved by styleframe Vite plugin
import "virtual:styleframe.css";
import { sharedParameters } from "@inkline/storybook/preset/parameters";

export default { parameters: sharedParameters };
