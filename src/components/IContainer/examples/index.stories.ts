import IContainer from '../index.vue';
import {
    IContainerFluidExample
} from './index';

export default {
    component: IContainer,
    title: 'Components/Container'
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-container v-bind="args">
        Container
    </i-container>`,
});

export const Component = Template.bind({});

export const Fluid = () => IContainerFluidExample;
