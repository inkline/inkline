import { ICollapsible } from '@inkline/inkline/components';
import {
    ICollapsibleAccordionExample,
    ICollapsibleBasicExample,
    ICollapsibleColorVariantsExample,
    ICollapsibleDefaultOpenExample,
    ICollapsibleHeaderExample,
    ICollapsibleSizeVariantsExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ICollapsible,
    title: 'Components/Collapsible',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICollapsibleBasicExample);
export const Accordion = createStory(ICollapsibleAccordionExample);
export const ColorVariants = createStory(ICollapsibleColorVariantsExample);
export const DefaultOpen = createStory(ICollapsibleDefaultOpenExample);
export const Header = createStory(ICollapsibleHeaderExample);
export const SizeVariants = createStory(ICollapsibleSizeVariantsExample);
