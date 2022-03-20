import { ITabs } from '@inkline/inkline/components';
import {
    ITabsBasicExample,
    ITabsColorVariantsExample,
    ITabsSizeVariantsExample,
    ITabsStretchExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ITabs,
    title: 'Components/Tabs',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ITabsBasicExample);
export const ColorVariants = createStory(ITabsColorVariantsExample);
export const SizeVariants = createStory(ITabsSizeVariantsExample);
export const Stretch = createStory(ITabsStretchExample);
