import './alert.preview.scss';
import { Alert } from '@inkline/component-alert';
import {
    AlertBasicExample,
    AlertColorVariantsExample,
    AlertDismissibleExample,
    AlertContentExample,
    AlertIconExample,
    AlertSizeVariantsExample
} from '@inkline/component-alert/examples';
import type { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Alert> = {
    component: markRaw(Alert),
    title: 'Components/Alert'
};

export default meta;

export const Basic: StoryFn = () => AlertBasicExample;
export const ColorVariants: StoryFn = () => AlertColorVariantsExample;
export const Dismissible: StoryFn = () => AlertDismissibleExample;
export const Content: StoryFn = () => AlertContentExample;
export const Icon: StoryFn = () => AlertIconExample;
export const SizeVariants: StoryFn = () => AlertSizeVariantsExample;
