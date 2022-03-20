import { IBreadcrumb } from '@inkline/inkline/components';
import {
    IBreadcrumbBasicExample,
    IBreadcrumbColorVariantsExample,
    IBreadcrumbRoutingExample,
    IBreadcrumbSizeVariantsExample,
    IBreadcrumbDynamicallyGeneratedExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IBreadcrumb,
    title: 'Components/Breadcrumb',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IBreadcrumbBasicExample);
export const Routing = createStory(IBreadcrumbRoutingExample);
export const ColorVariants = createStory(IBreadcrumbColorVariantsExample);
export const SizeVariants = createStory(IBreadcrumbSizeVariantsExample);
export const DynamicallyGenerated = createStory(IBreadcrumbDynamicallyGeneratedExample);
