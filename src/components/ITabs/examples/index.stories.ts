import { ITabs } from '../index';
import {
    ITabsBasicExample,
    ITabsColorVariantsExample,
    ITabsSizeVariantsExample,
    ITabsStretchExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ITabs,
    title: 'Components/Tabs',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ITabsBasicExample);
export const ColorVariants = () => ITabsColorVariantsExample;
export const SizeVariants = () => ITabsSizeVariantsExample;
export const Stretch = () => ITabsStretchExample;
