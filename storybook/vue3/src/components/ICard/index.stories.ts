import { ICard } from '@inkline/inkline/components';
import {
    ICardBasicExample,
    ICardBodyExample,
    ICardHeaderFooterExample,
    ICardColorVariantsExample,
    ICardImageExample,
    ICardSizeVariantsExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

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

export const Basic = createStory(ICardBasicExample);
export const Body = createStory(ICardBodyExample);
export const HeaderFooter = createStory(ICardHeaderFooterExample);
export const ColorVariants = createStory(ICardColorVariantsExample);
export const Image = createStory(ICardImageExample);
export const SizeVariants = createStory(ICardSizeVariantsExample);
