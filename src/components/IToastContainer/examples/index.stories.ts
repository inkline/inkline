import { Meta } from '@storybook/vue3';
import IToastContainer from '@inkline/inkline/components/IToastContainer/IToastContainer.vue';
import {
    IToastContainerBasicExample,
    IToastContainerCustomExample,
    IToastContainerColorVariantsExample,
    IToastContainerSizeVariantsExample,
    IToastContainerDismissibleExample,
    IToastContainerDurationExample,
    IToastContainerDurationPersistentExample,
    IToastContainerHideExample,
    IToastContainerHideAllExample,
    IToastContainerVNodeExample
} from '@inkline/inkline/components/IToastContainer/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IToastContainer,
    title: 'Services/Toast'
} as Meta<typeof IToastContainer>;

export const Basic = createStory(IToastContainerBasicExample);
export const ColorVariants = createStory(IToastContainerColorVariantsExample);
export const SizeVariants = createStory(IToastContainerSizeVariantsExample);
export const Dismissible = createStory(IToastContainerDismissibleExample);
export const Duration = createStory(IToastContainerDurationExample);
export const DurationPersistent = createStory(IToastContainerDurationPersistentExample);
export const Hide = createStory(IToastContainerHideExample);
export const HideAll = createStory(IToastContainerHideAllExample);
export const Vnode = createStory(IToastContainerVNodeExample);
export const Custom = createStory(IToastContainerCustomExample);
