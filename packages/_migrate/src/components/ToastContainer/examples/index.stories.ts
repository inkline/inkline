import ToastContainer from '@inkline/inkline/components/ToastContainer/ToastContainer.vue';
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
} from '@inkline/inkline/components/ToastContainer/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: ToastContainer,
    title: 'Services/Toast'
};

export const Basic = createStory(ToastContainerBasicExample);
export const ColorVariants = createStory(ToastContainerColorVariantsExample);
export const SizeVariants = createStory(ToastContainerSizeVariantsExample);
export const Position = createStory(ToastContainerPositionExample);
export const Dismissible = createStory(ToastContainerDismissibleExample);
export const DurationTimed = createStory(ToastContainerDurationTimedExample);
export const DurationSticky = createStory(ToastContainerDurationStickyExample);
export const Hide = createStory(ToastContainerHideExample);
export const HideAll = createStory(ToastContainerHideAllExample);
export const Vnode = createStory(ToastContainerVNodeExample);
export const Custom = createStory(ToastContainerCustomExample);
