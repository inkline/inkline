import IPagination from './index.vue';
import {
    IPaginationBasicExample,
    IPaginationColorVariantsExample,
    IPaginationLimitExample,
    IPaginationLimitResponsiveExample,
    IPaginationQuickLinksExample,
    IPaginationSizeVariantsExample
} from './examples';
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
    setup: () => ({ args }),
    template: `<i-pagination v-bind="args">
        Pagination
    </i-pagination>`,
});

export const Component = Template.bind({});

export const Basic = () => IPaginationBasicExample;
export const ColorVariants = () => IPaginationColorVariantsExample;
export const Limit = () => IPaginationLimitExample;
export const LimitResponsive = () => IPaginationLimitResponsiveExample;
export const QuickLinks = () => IPaginationQuickLinksExample;
export const SizeVariants = () => IPaginationSizeVariantsExample;
            