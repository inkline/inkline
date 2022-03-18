import IIcon from '../../index';
import {
    IIconBasicExample,
    IIconIconsExample,
    IIconColorVariantsExample,
    IIconSizeVariantsExample
} from './index';
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
    }
};

export const Basic = createStory(IIconBasicExample);
export const Icons = createStory(IIconIconsExample);
export const ColorVariants = createStory(IIconColorVariantsExample);
export const SizeVariants = createStory(IIconSizeVariantsExample);
