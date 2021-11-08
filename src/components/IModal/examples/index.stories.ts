import IModal from '../index.vue';
import {
    IModalBasicExample,
    IModalColorVariantsExample,
    IModalSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IModal,
    title: 'Components/Modal',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IModalBasicExample
    },
    setup: () => ({ args }),
    template: '<IModalBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const ColorVariants = () => IModalColorVariantsExample;
export const SizeVariants = () => IModalSizeVariantsExample;
