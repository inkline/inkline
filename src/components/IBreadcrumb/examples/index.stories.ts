import IBreadcrumb from '../index.vue';
import {
    IBreadcrumbBasicExample,
    IBreadcrumbColorVariantsExample,
    IBreadcrumbSizeVariantsExample,
    IBreadcrumbDynamicallyGeneratedExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IBreadcrumb,
    title: 'Components/Breadcrumb',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IBreadcrumbBasicExample
    },
    setup: () => ({ args }),
    template: '<IBreadcrumbBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const ColorVariants = () => IBreadcrumbColorVariantsExample;
export const SizeVariants = () => IBreadcrumbSizeVariantsExample;
export const DynamicallyGenerated = () => IBreadcrumbDynamicallyGeneratedExample;
