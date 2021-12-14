import IListGroup from '../index.vue';
import IListGroupBasicExample from './basic.vue';
import IListGroupBorderlessExample from './borderless.vue';
import IListGroupContentExample from './content.vue';
import IListGroupColorVariantsExample from './color-variants.vue';
import IListGroupSizeVariantsExample from './size-variants.vue';
import IListGroupStateActiveExample from './state-active.vue';
import IListGroupStateDisabledExample from './state-disabled.vue';
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
