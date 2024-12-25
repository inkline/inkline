import { Toggle } from '@inkline/inkline/components/Toggle/index';
import {
    ToggleBasicExample,
    ToggleColorVariantsExample,
    ToggleDisabledExample,
    ToggleReadonlyExample,
    ToggleRoundedExample,
    ToggleSizeVariantsExample
} from '@inkline/inkline/components/Toggle/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Toggle,
    title: 'Forms/Toggle',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ToggleBasicExample);
export const ColorVariants = () => ToggleColorVariantsExample;
export const Disabled = () => ToggleDisabledExample;
export const Readonly = () => ToggleReadonlyExample;
export const Rounded = () => ToggleRoundedExample;
export const SizeVariants = () => ToggleSizeVariantsExample;
