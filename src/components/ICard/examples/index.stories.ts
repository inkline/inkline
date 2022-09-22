import ICard from '../index.vue';
import {
    ICardBasicExample,
    ICardBodyExample,
    ICardHeaderFooterExample,
    ICardColorVariantsExample,
    ICardImageExample,
    ICardSizeVariantsExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ICard,
    title: 'Components/Card',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICardBasicExample);
export const Body = () => ICardBodyExample;
export const HeaderFooter = () => ICardHeaderFooterExample;
export const ColorVariants = () => ICardColorVariantsExample;
export const Image = () => ICardImageExample;
export const SizeVariants = () => ICardSizeVariantsExample;
