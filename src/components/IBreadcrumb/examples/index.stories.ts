import IBreadcrumb from '../index.vue';
import {
    IBreadcrumbBasicExample,
    IBreadcrumbColorVariantsExample,
    IBreadcrumbRoutingExample,
    IBreadcrumbSizeVariantsExample,
    IBreadcrumbDynamicallyGeneratedExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IBreadcrumb,
    title: 'Components/Breadcrumb',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IBreadcrumbBasicExample);
export const Routing = () => IBreadcrumbRoutingExample;
export const ColorVariants = () => IBreadcrumbColorVariantsExample;
export const SizeVariants = () => IBreadcrumbSizeVariantsExample;
export const DynamicallyGenerated = () => IBreadcrumbDynamicallyGeneratedExample;
