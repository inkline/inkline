import { IListGroup } from '../index';
import {
    IListGroupBasicExample,
    IListGroupBorderlessExample,
    IListGroupContentExample,
    IListGroupColorVariantsExample,
    IListGroupSizeVariantsExample,
    IListGroupStateActiveExample,
    IListGroupStateDisabledExample
} from './index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IListGroup,
    title: 'Components/ListGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IListGroupBasicExample);
export const Borderless = () => IListGroupBorderlessExample;
export const Content = () => IListGroupContentExample;
export const ColorVariants = () => IListGroupColorVariantsExample;
export const SizeVariants = () => IListGroupSizeVariantsExample;
export const StateActive = () => IListGroupStateActiveExample;
export const StateDisabled = () => IListGroupStateDisabledExample;
