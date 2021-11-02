import IAlert from './index.vue';
import {
    IAlertColorVariantsExample,
    IAlertDismissibleExample,
    IAlertContentExample,
    IAlertIconExample,
    IAlertSizeVariantsExample
} from './examples';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IAlert,
    title: 'Components/Alert',
    argTypes: {
        ...colorArgType([
            'info',
            'success',
            'warning',
            'danger'
        ]),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-alert v-bind="args">
      Heads up! This alert needs your attention.
    </i-alert>`,
});

export const Component = Template.bind({});
export const ColorVariants = () => IAlertColorVariantsExample;
export const SizeVariants = () => IAlertSizeVariantsExample;
export const Dismissible = () => IAlertDismissibleExample;
export const Content = () => IAlertContentExample;
export const Icon = () => IAlertIconExample;
