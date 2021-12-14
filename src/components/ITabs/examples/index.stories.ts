import ITabs from '../index.vue';
import ITabsBasicExample from './basic.vue';
import ITabsColorVariantsExample from './color-variants.vue';
import ITabsSizeVariantsExample from './size-variants.vue';
import ITabsStretchExample from './stretch.vue';
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
