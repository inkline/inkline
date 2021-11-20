import IAlert from '../index.vue';
import {
    IAlertBasicExample,
    IAlertColorVariantsExample,
    IAlertDismissibleExample,
    IAlertContentExample,
    IAlertIconExample,
    IAlertSizeVariantsExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IAlert,
    title: 'Components/Alert',
    argTypes: {
        ...colorArgType(['info', 'success', 'warning', 'danger']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IAlertBasicExample);
export const ColorVariants = () => IAlertColorVariantsExample;
export const Dismissible = () => IAlertDismissibleExample;
export const Content = () => IAlertContentExample;
export const Icon = () => IAlertIconExample;
export const SizeVariants = () => IAlertSizeVariantsExample;
