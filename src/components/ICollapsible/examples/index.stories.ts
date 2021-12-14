import ICollapsible from '../index.vue';
import ICollapsibleAccordionExample from './accordion.vue';
import ICollapsibleBasicExample from './basic.vue';
import ICollapsibleColorVariantsExample from './color-variants.vue';
import ICollapsibleDefaultOpenExample from './default-open.vue';
import ICollapsibleHeaderExample from './header.vue';
import ICollapsibleSizeVariantsExample from './size-variants.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ICollapsible,
    title: 'Components/Collapsible',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICollapsibleBasicExample);
export const Accordion = () => ICollapsibleAccordionExample;
export const ColorVariants = () => ICollapsibleColorVariantsExample;
export const DefaultOpen = () => ICollapsibleDefaultOpenExample;
export const Header = () => ICollapsibleHeaderExample;
export const SizeVariants = () => ICollapsibleSizeVariantsExample;
