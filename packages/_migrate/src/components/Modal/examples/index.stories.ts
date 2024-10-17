import { Modal } from '@inkline/inkline/components/Modal/index';
import {
    ModalBasicExample,
    ModalFullscreenExample,
    ModalIconExample,
    ModalColorVariantsExample,
    ModalSizeVariantsExample
} from '@inkline/inkline/components/Modal/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Modal,
    title: 'Components/Modal',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

export const Basic = createStory(ModalBasicExample);
export const Fullscreen = createStory(ModalFullscreenExample);
export const Icon = createStory(ModalIconExample);
export const ColorVariants = () => ModalColorVariantsExample;
export const SizeVariants = () => ModalSizeVariantsExample;
