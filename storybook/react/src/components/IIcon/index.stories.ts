import { IIcon } from '@inkline/inkline/components';
import {
    IIconBasicExample,
    IIconIconsExample,
    IIconColorVariantsExample,
    IIconSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IIcon,
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

export const Basic = createStory(IIconBasicExample);
export const Icons = createStory(IIconIconsExample);
export const ColorVariants = createStory(IIconColorVariantsExample);
export const SizeVariants = createStory(IIconSizeVariantsExample);
