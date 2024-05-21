import { ITable } from '@inkline/inkline/components/ITable/index';
import {
    ITableBasicExample,
    ITableBorderedExample,
    ITableColorVariantsExample,
    ITableHoverableExample,
    ITableResponsiveExample,
    ITableStripedExample
} from '@inkline/inkline/components/ITable/examples/index';
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
export const Hoverable = () => ITableHoverableExample;
export const Responsive = () => ITableResponsiveExample;
export const Striped = () => ITableStripedExample;
