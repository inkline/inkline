import { Breadcrumb } from '@inkline/component-breadcrumb';
import {
    BreadcrumbBasicExample,
    BreadcrumbColorVariantsExample,
    BreadcrumbRoutingExample,
    BreadcrumbSizeVariantsExample,
    BreadcrumbDynamicallyGeneratedExample
} from '@inkline/component-breadcrumb/examples';
import type { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Breadcrumb> = {
    component: markRaw(Breadcrumb),
    title: 'Components/Breadcrumb'
};

export default meta;

export const Basic: StoryFn = () => BreadcrumbBasicExample;
export const Routing: StoryFn = () => BreadcrumbRoutingExample;
export const ColorVariants: StoryFn = () => BreadcrumbColorVariantsExample;
export const SizeVariants: StoryFn = () => BreadcrumbSizeVariantsExample;
export const DynamicallyGenerated: StoryFn = () => BreadcrumbDynamicallyGeneratedExample;
