import Toast from '@inkline/inkline/components/Toast/Toast.vue';
import {
    ToastBasicExample,
    ToastColorVariantsExample,
    ToastContentExample,
    ToastDismissibleExample,
    ToastDurationExample,
    ToastIconExample,
    ToastSizeVariantsExample,
    ToastVNodeExample
} from '@inkline/inkline/components/Toast/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: Toast,
    title: 'Components/Toast',
    argTypes: {
        ...colorArgType(['light', 'dark', 'info', 'success', 'warning', 'danger']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ToastBasicExample);
export const ColorVariants = createExampleStory(ToastColorVariantsExample);
export const Content = createExampleStory(ToastContentExample);
export const Dismissible = createExampleStory(ToastDismissibleExample);
export const Duration = createExampleStory(ToastDurationExample);
export const Icon = createExampleStory(ToastIconExample);
export const SizeVariants = createExampleStory(ToastSizeVariantsExample);
export const Vnode = createExampleStory(ToastVNodeExample);
