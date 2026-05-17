import { Tabs } from '@inkline/inkline/components/Tabs/index';
import {
    TabsBasicExample,
    TabsAdvancedExample,
    TabsColorVariantsExample,
    TabsSizeVariantsExample,
    TabsStretchExample
} from '@inkline/inkline/components/Tabs/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Tabs,
    title: 'Components/Tabs',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(TabsBasicExample);
export const Advanced = createStory(TabsAdvancedExample);
export const ColorVariants = () => TabsColorVariantsExample;
export const SizeVariants = () => TabsSizeVariantsExample;
export const Stretch = () => TabsStretchExample;
