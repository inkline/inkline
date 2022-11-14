import { IIcon } from '../index';
import {
    IIconBasicExample,
    IIconIconsExample,
    IIconColorVariantsExample,
    IIconSizeVariantsExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

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
export const Icons = () => IIconIconsExample;
export const ColorVariants = () => IIconColorVariantsExample;
export const SizeVariants = () => IIconSizeVariantsExample;
