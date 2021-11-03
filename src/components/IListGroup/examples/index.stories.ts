import IListGroup from '../index.vue';
import {
    IListGroupBasicExample,
    IListGroupBorderlessExample,
    IListGroupContentExample,
    IListGroupColorVariantsExample,
    IListGroupSizeVariantsExample,
    IListGroupStateActiveExample,
    IListGroupStateDisabledExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IListGroup,
    title: 'Components/ListGroup',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IListGroupBasicExample
    },
    setup: () => ({ args }),
    template: '<IListGroupBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const Borderless = () => IListGroupBorderlessExample;
export const Content = () => IListGroupContentExample;
export const ColorVariants = () => IListGroupColorVariantsExample;
export const SizeVariants = () => IListGroupSizeVariantsExample;
export const StateActive = () => IListGroupStateActiveExample;
export const StateDisabled = () => IListGroupStateDisabledExample;
