import IPagination from '../index.vue';
import {
    IPaginationBasicExample,
    IPaginationColorVariantsExample,
    IPaginationLimitExample,
    IPaginationLimitResponsiveExample,
    IPaginationQuickLinksExample,
    IPaginationSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IPagination,
    title: 'Components/Pagination',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IPaginationBasicExample
    },
    setup: () => ({ args }),
    template: '<IPaginationBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const ColorVariants = () => IPaginationColorVariantsExample;
export const Limit = () => IPaginationLimitExample;
export const LimitResponsive = () => IPaginationLimitResponsiveExample;
export const QuickLinks = () => IPaginationQuickLinksExample;
export const SizeVariants = () => IPaginationSizeVariantsExample;
