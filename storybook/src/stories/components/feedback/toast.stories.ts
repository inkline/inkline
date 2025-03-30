import './toast.preview.css';
import { Toast } from '@inkline/component-toast';
import {
    ToastBasicExample,
    ToastColorVariantsExample,
    ToastContentExample,
    ToastDismissibleExample,
    ToastDurationExample,
    ToastIconExample,
    ToastSizeVariantsExample,
    ToastVNodeExample
} from '@inkline/component-toast/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Toast> = {
    component: markRaw(Toast),
    title: 'Feedback Components/Toast'
};

export default meta;

export const Basic: StoryFn = () => ToastBasicExample;
export const ColorVariants: StoryFn = () => ToastColorVariantsExample;
export const Content: StoryFn = () => ToastContentExample;
export const Dismissible: StoryFn = () => ToastDismissibleExample;
export const Duration: StoryFn = () => ToastDurationExample;
export const Icon: StoryFn = () => ToastIconExample;
export const SizeVariants: StoryFn = () => ToastSizeVariantsExample;
export const Vnode: StoryFn = () => ToastVNodeExample;
