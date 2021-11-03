import IBreadcrumb from '../index.vue';
import {
    IBreadcrumbBasicExample,
    IBreadcrumbColorVariantsExample,
    IBreadcrumbSizeVariantsExample,
    IBreadcrumbDynamicallyGeneratedExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IBreadcrumb,
    title: 'Components/Breadcrumb',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-breadcrumb v-bind="args">
        <i-breadcrumb-item>Home</i-breadcrumb-item>
        <i-breadcrumb-item active>Breadcrumbs</i-breadcrumb-item>
    </i-breadcrumb>`,
});

export const Component = Template.bind({});

export const Basic = () => IBreadcrumbBasicExample;
export const ColorVariants = () => IBreadcrumbColorVariantsExample;
export const SizeVariants = () => IBreadcrumbSizeVariantsExample;
export const DynamicallyGenerated = () => IBreadcrumbDynamicallyGeneratedExample;
