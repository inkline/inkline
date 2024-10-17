import { Pagination } from '@inkline/inkline/components/Pagination/index';
import {
    PaginationBasicExample,
    PaginationColorVariantsExample,
    PaginationLimitExample,
    PaginationLimitResponsiveExample,
    PaginationQuickLinksExample,
    PaginationSizeVariantsExample
} from '@inkline/inkline/components/Pagination/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Pagination,
    title: 'Components/Pagination',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(PaginationBasicExample);
export const ColorVariants = () => PaginationColorVariantsExample;
export const Limit = () => PaginationLimitExample;
export const LimitResponsive = () => PaginationLimitResponsiveExample;
export const QuickLinks = () => PaginationQuickLinksExample;
export const SizeVariants = () => PaginationSizeVariantsExample;
