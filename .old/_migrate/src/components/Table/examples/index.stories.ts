import { Table } from '@inkline/inkline/components/Table/index';
import {
    TableBasicExample,
    TableBorderedExample,
    TableColorVariantsExample,
    TableHoverableExample,
    TableResponsiveExample,
    TableStripedExample
} from '@inkline/inkline/components/Table/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Table,
    title: 'Components/Table',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(TableBasicExample);
export const Bordered = () => TableBorderedExample;
export const ColorVariants = () => TableColorVariantsExample;
export const Hoverable = () => TableHoverableExample;
export const Responsive = () => TableResponsiveExample;
export const Striped = () => TableStripedExample;
