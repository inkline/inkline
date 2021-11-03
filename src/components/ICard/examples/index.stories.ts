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
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-card v-bind="args">
        Card
    </i-card>`,
});

export const Component = Template.bind({});

export const Basic = () => ICardBasicExample;
export const Body = () => ICardBodyExample;
export const HeaderFooter = () => ICardHeaderFooterExample;
export const ColorVariants = () => ICardColorVariantsExample;
export const Image = () => ICardImageExample;
export const SizeVariants = () => ICardSizeVariantsExample;
            