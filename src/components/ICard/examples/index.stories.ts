import ICard from '../index.vue';
import ICardBasicExample from './basic.vue';
import ICardBodyExample from './card-body.vue';
import ICardHeaderFooterExample from './card-header-footer.vue';
import ICardColorVariantsExample from './color-variants.vue';
import ICardImageExample from './image.vue';
import ICardSizeVariantsExample from './size-variants.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

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
export const Body = () => ICardBodyExample;
export const HeaderFooter = () => ICardHeaderFooterExample;
export const ColorVariants = () => ICardColorVariantsExample;
export const Image = () => ICardImageExample;
export const SizeVariants = () => ICardSizeVariantsExample;
