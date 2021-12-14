import IButtonGroup from '../index.vue';
import IButtonGroupBasicExample from './basic.vue';
import IButtonGroupBlockExample from './block.vue';
import IButtonGroupDisabledExample from './disabled.vue';
import IButtonGroupNestedExample from './nested.vue';
import IButtonGroupNestedBlockExample from './nested-block.vue';
import IButtonGroupSizeVariantsExample from './size-variants.vue';
import IButtonGroupVerticalExample from './vertical.vue';
import IButtonGroupVerticalBlockExample from './vertical-block.vue';
import IButtonGroupVerticalSizeVariantsExample from './vertical-size-variants.vue';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IButtonGroup,
    title: 'Components/ButtonGroup'
};

export const Basic = createStory(IButtonGroupBasicExample);
export const Block = () => IButtonGroupBlockExample;
export const Disabled = () => IButtonGroupDisabledExample;
export const Nested = () => IButtonGroupNestedExample;
export const NestedBlock = () => IButtonGroupNestedBlockExample;
export const SizeVariants = () => IButtonGroupSizeVariantsExample;
export const Vertical = () => IButtonGroupVerticalExample;
export const VerticalBlock = () => IButtonGroupVerticalBlockExample;
export const VerticalSizeVariants = () => IButtonGroupVerticalSizeVariantsExample;
