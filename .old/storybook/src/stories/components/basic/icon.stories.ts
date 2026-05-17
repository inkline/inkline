import './icon.preview.css';
import { Icon } from '@inkline/component-icon';
import {
    IconBasicExample,
    IconIconsExample,
    IconColorVariantsExample,
    IconSizeExample
} from '@inkline/component-icon/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Icon> = {
    component: markRaw(Icon),
    title: 'Basic Components/Icon',
    argTypes: {
        name: {
            type: { name: 'string', required: true },
            defaultValue: 'ink:check',
            control: {
                type: 'text'
            }
        }
    }
};

export default meta;

export const Basic: StoryFn = () => IconBasicExample;
export const Icons: StoryFn = () => IconIconsExample;
export const ColorVariants: StoryFn = () => IconColorVariantsExample;
export const Size: StoryFn = () => IconSizeExample;
