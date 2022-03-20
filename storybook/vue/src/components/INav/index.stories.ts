import { INav } from '@inkline/inkline/components';
import {
    INavBasicExample,
    INavColorVariantsExample,
    INavRoutingExample,
    INavSizeVariantsExample,
    INavStateActiveExample,
    INavVerticalExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: INav,
    title: 'Components/Nav',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(INavBasicExample);
export const ColorVariants = createStory(INavColorVariantsExample);
export const Routing = createStory(INavRoutingExample);
export const SizeVariants = createStory(INavSizeVariantsExample);
export const StateActive = createStory(INavStateActiveExample);
export const Vertical = createStory(INavVerticalExample);
