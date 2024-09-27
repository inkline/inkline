import { ITabs } from '@inkline/inkline/components/ITabs/index';
import {
    ITabsBasicExample,
    ITabsAdvancedExample,
    ITabsColorVariantsExample,
    ITabsSizeVariantsExample,
    ITabsStretchExample
} from '@inkline/inkline/components/ITabs/examples/index';
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
export const Advanced = createStory(ITabsAdvancedExample);
export const ColorVariants = () => ITabsColorVariantsExample;
export const SizeVariants = () => ITabsSizeVariantsExample;
export const Stretch = () => ITabsStretchExample;
