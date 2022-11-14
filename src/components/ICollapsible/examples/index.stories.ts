import { ICollapsible } from '../index';
import {
    ICollapsibleAccordionExample,
    ICollapsibleBasicExample,
    ICollapsibleColorVariantsExample,
    ICollapsibleDefaultOpenExample,
    ICollapsibleHeaderExample,
    ICollapsibleSizeVariantsExample
} from './index';
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
