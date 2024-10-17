import { Icon } from '@inkline/inkline/components/Icon/index';
import {
    IconBasicExample,
    IconIconsExample,
    IconColorVariantsExample,
    IconSizeVariantsExample
} from '@inkline/inkline/components/Icon/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Icon,
    title: 'Components/Icon',
    argTypes: {
        name: {
            type: { name: 'string', required: true },
            defaultValue: 'ink-check',
            control: {
                type: 'text'
            }
        },
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IconBasicExample);
export const Icons = () => IconIconsExample;
export const ColorVariants = () => IconColorVariantsExample;
export const SizeVariants = () => IconSizeVariantsExample;
