import { ITable } from '../index';
import {
    ITableBasicExample,
    ITableBorderedExample,
    ITableColorVariantsExample,
    ITableHoverExample,
    ITableResponsiveExample,
    ITableStripedExample
} from './index';
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
