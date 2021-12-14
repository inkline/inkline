import ITable from '../index.vue';
import ITableBasicExample from './basic.vue';
import ITableBorderedExample from './bordered.vue';
import ITableColorVariantsExample from './color-variants.vue';
import ITableHoverExample from './hover.vue';
import ITableResponsiveExample from './responsive.vue';
import ITableStripedExample from './striped.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ITable,
    title: 'Components/Table',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(ITableBasicExample);
export const Bordered = () => ITableBorderedExample;
export const ColorVariants = () => ITableColorVariantsExample;
export const Hover = () => ITableHoverExample;
export const Responsive = () => ITableResponsiveExample;
export const Striped = () => ITableStripedExample;
