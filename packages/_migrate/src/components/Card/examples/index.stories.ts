import Card from '@inkline/inkline/components/Card/Card.vue';
import {
    CardBasicExample,
    CardBodyExample,
    CardHeaderFooterExample,
    CardColorVariantsExample,
    CardImageExample,
    CardSizeVariantsExample
} from '@inkline/inkline/components/Card/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: Card,
    title: 'Components/Card',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(CardBasicExample);
export const Body = createExampleStory(CardBodyExample);
export const HeaderFooter = createExampleStory(CardHeaderFooterExample);
export const ColorVariants = createExampleStory(CardColorVariantsExample);
export const Image = createExampleStory(CardImageExample);
export const SizeVariants = createExampleStory(CardSizeVariantsExample);
