import { IToggle } from '@inkline/inkline/components';
import {
    IToggleBasicExample,
    IToggleColorVariantsExample,
    IToggleDisabledExample,
    IToggleReadonlyExample,
    IToggleSizeVariantsExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IToggle,
    title: 'Forms/Toggle',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IToggleBasicExample);
export const ColorVariants = createStory(IToggleColorVariantsExample);
export const Disabled = createStory(IToggleDisabledExample);
export const Readonly = createStory(IToggleReadonlyExample);
export const SizeVariants = createStory(IToggleSizeVariantsExample);
