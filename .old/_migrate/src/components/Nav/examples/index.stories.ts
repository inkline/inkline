import { Nav } from '@inkline/inkline/components/Nav/index';
import {
    NavBasicExample,
    NavColorVariantsExample,
    NavRoutingExample,
    NavSizeVariantsExample,
    NavStateActiveExample,
    NavVerticalExample
} from '@inkline/inkline/components/Nav/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Nav,
    title: 'Components/Nav',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(NavBasicExample);
export const ColorVariants = () => NavColorVariantsExample;
export const Routing = () => NavRoutingExample;
export const SizeVariants = () => NavSizeVariantsExample;
export const StateActive = () => NavStateActiveExample;
export const Vertical = () => NavVerticalExample;
