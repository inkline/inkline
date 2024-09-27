import { IModal } from '@inkline/inkline/components/IModal/index';
import {
    IModalBasicExample,
    IModalFullscreenExample,
    IModalIconExample,
    IModalColorVariantsExample,
    IModalSizeVariantsExample
} from '@inkline/inkline/components/IModal/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IModal,
    title: 'Components/Modal',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(IModalBasicExample);
export const Fullscreen = createStory(IModalFullscreenExample);
export const Icon = createStory(IModalIconExample);
export const ColorVariants = () => IModalColorVariantsExample;
export const SizeVariants = () => IModalSizeVariantsExample;
