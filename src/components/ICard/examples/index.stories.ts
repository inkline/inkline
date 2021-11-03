import ICard from '../index.vue';
import {
    ICardBasicExample,
    ICardBodyExample,
    ICardHeaderFooterExample,
    ICardColorVariantsExample,
    ICardImageExample,
    ICardSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: ICard,
    title: 'Components/Card',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    },
    parameters: {
        layout: 'custom-card'
    }
};

const Template = (args: any) => ({
    components: {
        ICardBasicExample
    },
    setup: () => ({ args }),
    template: '<ICardBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
export const Body = () => ICardBodyExample;
export const HeaderFooter = () => ICardHeaderFooterExample;
export const ColorVariants = () => ICardColorVariantsExample;
export const Image = () => ICardImageExample;
export const SizeVariants = () => ICardSizeVariantsExample;
