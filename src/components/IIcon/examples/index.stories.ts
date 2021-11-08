import IIcon from '../index.vue';
import {
    IIconBasicExample,
    IIconIconsExample,
    IIconColorVariantsExample,
    IIconSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

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

const Template = (args: any) => ({
    components: {
        IIconBasicExample
    },
    setup: () => ({ args }),
    template: '<IIconBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const Icons = () => IIconIconsExample;
export const ColorVariants = () => IIconColorVariantsExample;
export const SizeVariants = () => IIconSizeVariantsExample;
