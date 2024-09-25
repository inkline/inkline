import type { Meta } from '@storybook/vue3';
import IToast from '@inkline/inkline/components/IToast/IToast.vue';
import {
    IToastBasicExample,
    IToastColorVariantsExample,
    IToastContentExample,
    IToastDismissibleExample,
    IToastDurationExample,
    IToastIconExample,
    IToastSizeVariantsExample,
    IToastVNodeExample
} from '@inkline/inkline/components/IToast/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: IToast,
    title: 'Components/Toast',
    argTypes: {
        ...colorArgType(['light', 'dark', 'info', 'success', 'warning', 'danger']),
        ...sizeArgType()
    }
} as Meta<typeof IToast>;

export const Basic = createStory(IToastBasicExample);
export const ColorVariants = createExampleStory(IToastColorVariantsExample);
export const Content = createExampleStory(IToastContentExample);
export const Dismissible = createExampleStory(IToastDismissibleExample);
export const Duration = createExampleStory(IToastDurationExample);
export const Icon = createExampleStory(IToastIconExample);
export const SizeVariants = createExampleStory(IToastSizeVariantsExample);
export const Vnode = createExampleStory(IToastVNodeExample);
