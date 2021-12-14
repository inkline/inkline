import IIcon from '../index.vue';
import IIconBasicExample from './basic.vue';
import IIconColorVariantsExample from './color-variants.vue';
import IIconIconsExample from './icons.vue';
import IIconSizeVariantsExample from './size-variants.vue';
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
