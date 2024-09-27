import IAlert from '@inkline/inkline/components/IAlert/IAlert.vue';
import {
    IAlertBasicExample,
    IAlertColorVariantsExample,
    IAlertDismissibleExample,
    IAlertContentExample,
    IAlertIconExample,
    IAlertSizeVariantsExample
} from '@inkline/inkline/components/IAlert/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: IAlert,
    title: 'Components/Alert',
    argTypes: {
        ...colorArgType(['info', 'success', 'warning', 'danger']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IAlertBasicExample);
export const ColorVariants = createExampleStory(IAlertColorVariantsExample);
export const Dismissible = createExampleStory(IAlertDismissibleExample);
export const Content = createExampleStory(IAlertContentExample);
export const Icon = createExampleStory(IAlertIconExample);
export const SizeVariants = createExampleStory(IAlertSizeVariantsExample);
