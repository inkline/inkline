import { IListGroup } from '@inkline/inkline/components';
import {
    IListGroupBasicExample,
    IListGroupBorderlessExample,
    IListGroupContentExample,
    IListGroupColorVariantsExample,
    IListGroupSizeVariantsExample,
    IListGroupStateActiveExample,
    IListGroupStateDisabledExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IListGroup,
    title: 'Components/ListGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IListGroupBasicExample);
export const Borderless = createStory(IListGroupBorderlessExample);
export const Content = createStory(IListGroupContentExample);
export const ColorVariants = createStory(IListGroupColorVariantsExample);
export const SizeVariants = createStory(IListGroupSizeVariantsExample);
export const StateActive = createStory(IListGroupStateActiveExample);
export const StateDisabled = createStory(IListGroupStateDisabledExample);
