import IAlert from '../IAlert.vue';
import {
    IAlertBasicExample,
    IAlertColorVariantsExample,
    IAlertDismissibleExample,
    IAlertContentExample,
    IAlertIconExample,
    IAlertSizeVariantsExample
} from '../examples';

export default {
    component: IAlert,
    title: 'Components/Alert'
};

export const Basic = IAlertBasicExample;
export const ColorVariants = IAlertColorVariantsExample;
export const Dismissible = IAlertDismissibleExample;
export const Content = IAlertContentExample;
export const Icon = IAlertIconExample;
export const SizeVariants = IAlertSizeVariantsExample;
