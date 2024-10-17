import { ListGroup } from '@inkline/inkline/components/ListGroup/index';
import {
    ListGroupBasicExample,
    ListGroupBorderlessExample,
    ListGroupContentExample,
    ListGroupColorVariantsExample,
    ListGroupSizeVariantsExample,
    ListGroupStateActiveExample,
    ListGroupStateDisabledExample
} from '@inkline/inkline/components/ListGroup/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ListGroup,
    title: 'Components/ListGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ListGroupBasicExample);
export const Borderless = () => ListGroupBorderlessExample;
export const Content = () => ListGroupContentExample;
export const ColorVariants = () => ListGroupColorVariantsExample;
export const SizeVariants = () => ListGroupSizeVariantsExample;
export const StateActive = () => ListGroupStateActiveExample;
export const StateDisabled = () => ListGroupStateDisabledExample;
