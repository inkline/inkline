import IAlert from '../index.vue';
import {
    IAlertColorVariantsExample,
    IAlertDismissibleExample,
    IAlertContentExample,
    IAlertIconExample,
    IAlertSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IAlert,
    title: 'Components/Alert',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-alert v-bind="args">
        Alert
    </i-alert>`,
});

export const Component = Template.bind({});

export const ColorVariants = () => IAlertColorVariantsExample;
export const Dismissible = () => IAlertDismissibleExample;
export const Content = () => IAlertContentExample;
export const Icon = () => IAlertIconExample;
export const SizeVariants = () => IAlertSizeVariantsExample;
            