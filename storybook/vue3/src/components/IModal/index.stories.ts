import { IModal } from '@inkline/inkline/components';
import {
    IModalBasicExample,
    IModalColorVariantsExample,
    IModalSizeVariantsExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IModal,
    title: 'Components/Modal',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(IModalBasicExample);
export const ColorVariants = createStory(IModalColorVariantsExample);
export const SizeVariants = createStory(IModalSizeVariantsExample);
