import INav from '../index.vue';
import INavBasicExample from './basic.vue';
import INavColorVariantsExample from './color-variants.vue';
import INavRoutingExample from './routing.vue';
import INavSizeVariantsExample from './size-variants.vue';
import INavStateActiveExample from './state-active.vue';
import INavVerticalExample from './vertical.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: INav,
    title: 'Components/Nav',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(INavBasicExample);
export const ColorVariants = () => INavColorVariantsExample;
export const Routing = () => INavRoutingExample;
export const SizeVariants = () => INavSizeVariantsExample;
export const StateActive = () => INavStateActiveExample;
export const Vertical = () => INavVerticalExample;
