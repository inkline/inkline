import IToggle from '../index.vue';
import {
    IToggleBasicExample,
    IToggleColorVariantsExample,
    IToggleDisabledExample,
    IToggleReadonlyExample,
    IToggleSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IToggle,
    title: 'Components/Toggle',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-toggle v-bind="args">
        Toggle
    </i-toggle>`,
});

export const Component = Template.bind({});

export const Basic = () => IToggleBasicExample;
export const ColorVariants = () => IToggleColorVariantsExample;
export const Disabled = () => IToggleDisabledExample;
export const Readonly = () => IToggleReadonlyExample;
export const SizeVariants = () => IToggleSizeVariantsExample;
            