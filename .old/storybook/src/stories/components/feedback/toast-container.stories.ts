import { ToastContainer } from '@inkline/component-toast';
import {
    ToastContainerBasicExample,
    ToastContainerCustomExample,
    ToastContainerColorVariantsExample,
    ToastContainerSizeVariantsExample,
    ToastContainerDismissibleExample,
    ToastContainerDurationTimedExample,
    ToastContainerDurationStickyExample,
    ToastContainerHideExample,
    ToastContainerHideAllExample,
    ToastContainerPositionExample,
    ToastContainerVNodeExample
} from '@inkline/component-toast/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof ToastContainer> = {
    component: markRaw(ToastContainer),
    title: 'Services/Toast'
};

export default meta;

export const Basic: StoryFn = () => ToastContainerBasicExample;
export const ColorVariants: StoryFn = () => ToastContainerColorVariantsExample;
export const SizeVariants: StoryFn = () => ToastContainerSizeVariantsExample;
export const Position: StoryFn = () => ToastContainerPositionExample;
export const Dismissible: StoryFn = () => ToastContainerDismissibleExample;
export const DurationTimed: StoryFn = () => ToastContainerDurationTimedExample;
export const DurationSticky: StoryFn = () => ToastContainerDurationStickyExample;
export const Hide: StoryFn = () => ToastContainerHideExample;
export const HideAll: StoryFn = () => ToastContainerHideAllExample;
export const Vnode: StoryFn = () => ToastContainerVNodeExample;
export const Custom: StoryFn = () => ToastContainerCustomExample;
