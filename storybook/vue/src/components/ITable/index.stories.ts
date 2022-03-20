import { ITable } from '@inkline/inkline/components';
import {
    ITableBasicExample,
    ITableBorderedExample,
    ITableColorVariantsExample,
    ITableHoverExample,
    ITableResponsiveExample,
    ITableStripedExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ITable,
    title: 'Components/Table',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(ITableBasicExample);
export const Bordered = createStory(ITableBorderedExample);
export const ColorVariants = createStory(ITableColorVariantsExample);
export const Hover = createStory(ITableHoverExample);
export const Responsive = createStory(ITableResponsiveExample);
export const Striped = createStory(ITableStripedExample);
