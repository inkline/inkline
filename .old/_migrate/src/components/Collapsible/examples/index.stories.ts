import { Collapsible } from '@inkline/inkline/components/Collapsible/index';
import {
    CollapsibleAccordionExample,
    CollapsibleBasicExample,
    CollapsibleColorVariantsExample,
    CollapsibleDefaultOpenExample,
    CollapsibleHeaderExample,
    CollapsibleSizeVariantsExample
} from '@inkline/inkline/components/Collapsible/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Collapsible,
    title: 'Components/Collapsible',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(CollapsibleBasicExample);
export const Accordion = () => CollapsibleAccordionExample;
export const ColorVariants = () => CollapsibleColorVariantsExample;
export const DefaultOpen = () => CollapsibleDefaultOpenExample;
export const Header = () => CollapsibleHeaderExample;
export const SizeVariants = () => CollapsibleSizeVariantsExample;
