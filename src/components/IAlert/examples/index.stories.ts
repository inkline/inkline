import { Meta } from '@storybook/vue3';
import IAlert from '../index.vue';
import {
    IAlertBasicExample,
    IAlertColorVariantsExample,
    IAlertDismissibleExample,
    IAlertContentExample,
    IAlertIconExample,
    IAlertSizeVariantsExample
} from './index';
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
} as Meta<typeof IAlert>;

export const Basic = createStory(IAlertBasicExample);
export const ColorVariants = createExampleStory(IAlertColorVariantsExample);
export const Dismissible = createExampleStory(IAlertDismissibleExample);
export const Content = createExampleStory(IAlertContentExample);
export const Icon = createExampleStory(IAlertIconExample);
export const SizeVariants = createExampleStory(IAlertSizeVariantsExample);
