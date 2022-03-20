import { IPagination } from '@inkline/inkline/components';
import {
    IPaginationBasicExample,
    IPaginationColorVariantsExample,
    IPaginationLimitExample,
    IPaginationLimitResponsiveExample,
    IPaginationQuickLinksExample,
    IPaginationSizeVariantsExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IPagination,
    title: 'Components/Pagination',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IPaginationBasicExample);
export const ColorVariants = createStory(IPaginationColorVariantsExample);
export const Limit = createStory(IPaginationLimitExample);
export const LimitResponsive = createStory(IPaginationLimitResponsiveExample);
export const QuickLinks = createStory(IPaginationQuickLinksExample);
export const SizeVariants = createStory(IPaginationSizeVariantsExample);
