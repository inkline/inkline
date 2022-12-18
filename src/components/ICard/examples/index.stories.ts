import ICard from '../ICard.vue';
import {
    ICardBasicExample,
    ICardBodyExample,
    ICardHeaderFooterExample,
    ICardColorVariantsExample,
    ICardImageExample,
    ICardSizeVariantsExample
} from './index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: ICard,
    title: 'Components/Card',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICardBasicExample);
export const Body = createExampleStory(ICardBodyExample);
export const HeaderFooter = createExampleStory(ICardHeaderFooterExample);
export const ColorVariants = createExampleStory(ICardColorVariantsExample);
export const Image = createExampleStory(ICardImageExample);
export const SizeVariants = createExampleStory(ICardSizeVariantsExample);
