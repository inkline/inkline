import IBreadcrumb from '../index.vue';
import IBreadcrumbBasicExample from './basic.vue';
import IBreadcrumbColorVariantsExample from './color-variants.vue';
import IBreadcrumbRoutingExample from './routing.vue';
import IBreadcrumbSizeVariantsExample from './size-variants.vue';
import IBreadcrumbDynamicallyGeneratedExample from './dynamically-generated.vue';
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
