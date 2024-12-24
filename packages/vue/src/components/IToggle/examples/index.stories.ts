import { IToggle } from '@inkline/inkline/components/IToggle/index';
import {
    IToggleBasicExample,
    IToggleColorVariantsExample,
    IToggleDisabledExample,
    IToggleReadonlyExample,
    IToggleRoundedExample,
    IToggleSizeVariantsExample
} from '@inkline/inkline/components/IToggle/examples/index';
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
export const Rounded = () => IToggleRoundedExample;
export const SizeVariants = () => IToggleSizeVariantsExample;
