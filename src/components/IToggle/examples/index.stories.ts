import IToggle from '../index.vue';
import IToggleBasicExample from './basic.vue';
import IToggleColorVariantsExample from './color-variants.vue';
import IToggleDisabledExample from './disabled.vue';
import IToggleReadonlyExample from './readonly.vue';
import IToggleSizeVariantsExample from './size-variants.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IToggle,
    title: 'Forms/Toggle',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IToggleBasicExample);
export const ColorVariants = () => IToggleColorVariantsExample;
export const Disabled = () => IToggleDisabledExample;
export const Readonly = () => IToggleReadonlyExample;
export const SizeVariants = () => IToggleSizeVariantsExample;
