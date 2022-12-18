import {
    BorderAddExample,
    BorderColorBrandExample,
    BorderColorNeutralExample,
    BorderColorStateExample,
    BorderRadiusExample,
    BorderRemoveExample
} from './index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    title: 'Utilities/Border'
};

export const Add = createStory(BorderAddExample);
export const ColorBrand = createStory(BorderColorBrandExample);
export const ColorNeutral = createStory(BorderColorNeutralExample);
export const ColorState = createStory(BorderColorStateExample);
export const Radius = createStory(BorderRadiusExample);
export const Remove = createStory(BorderRemoveExample);
