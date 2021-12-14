import IPagination from '../index.vue';
import IPaginationBasicExample from './basic.vue';
import IPaginationColorVariantsExample from './color-variants.vue';
import IPaginationLimitExample from './limit.vue';
import IPaginationLimitResponsiveExample from './limit-responsive.vue';
import IPaginationQuickLinksExample from './quick-links.vue';
import IPaginationSizeVariantsExample from './size-variants.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IPagination,
    title: 'Components/Pagination',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IPaginationBasicExample);
export const ColorVariants = () => IPaginationColorVariantsExample;
export const Limit = () => IPaginationLimitExample;
export const LimitResponsive = () => IPaginationLimitResponsiveExample;
export const QuickLinks = () => IPaginationQuickLinksExample;
export const SizeVariants = () => IPaginationSizeVariantsExample;
