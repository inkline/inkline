import IIcon from './index.vue';
import {
    IIconBasicExample,
    IIconColorVariantsExample,
    IIconSizeVariantsExample
} from './examples';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IIcon,
    title: 'Components/Icon',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-icon v-bind="args">
        Icon
    </i-icon>`,
});

export const Component = Template.bind({});

export const Basic = () => IIconBasicExample;
export const ColorVariants = () => IIconColorVariantsExample;
export const SizeVariants = () => IIconSizeVariantsExample;
            