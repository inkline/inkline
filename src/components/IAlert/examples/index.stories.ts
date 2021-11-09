import IAlert from '../index.vue';
import {
    IAlertBasicExample,
    IAlertColorVariantsExample,
    IAlertDismissibleExample,
    IAlertContentExample,
    IAlertIconExample,
    IAlertSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IAlert,
    title: 'Components/Alert',
    argTypes: {
        ...colorArgType(['info', 'success', 'warning', 'danger']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IAlertBasicExample
    },
    setup: () => ({ args }),
    template: '<IAlertBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const ColorVariants = () => IAlertColorVariantsExample;
export const Dismissible = () => IAlertDismissibleExample;
export const Content = () => IAlertContentExample;
export const Icon = () => IAlertIconExample;
export const SizeVariants = () => IAlertSizeVariantsExample;
