import { INav } from '../index';
import {
    INavBasicExample,
    INavColorVariantsExample,
    INavRoutingExample,
    INavSizeVariantsExample,
    INavStateActiveExample,
    INavVerticalExample
} from './index';
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
