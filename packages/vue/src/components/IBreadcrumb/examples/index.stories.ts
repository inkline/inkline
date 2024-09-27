import IBreadcrumb from '@inkline/inkline/components/IBreadcrumb/IBreadcrumb.vue';
import {
    IBreadcrumbBasicExample,
    IBreadcrumbColorVariantsExample,
    IBreadcrumbRoutingExample,
    IBreadcrumbSizeVariantsExample,
    IBreadcrumbDynamicallyGeneratedExample
} from '@inkline/inkline/components/IBreadcrumb/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: IBreadcrumb,
    title: 'Components/Breadcrumb',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IBreadcrumbBasicExample);
export const Routing = createExampleStory(IBreadcrumbRoutingExample);
export const ColorVariants = createExampleStory(IBreadcrumbColorVariantsExample);
export const SizeVariants = createExampleStory(IBreadcrumbSizeVariantsExample);
export const DynamicallyGenerated = createExampleStory(IBreadcrumbDynamicallyGeneratedExample);
