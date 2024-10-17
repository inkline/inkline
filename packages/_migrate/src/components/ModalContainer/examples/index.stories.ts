import ModalContainer from '@inkline/inkline/components/ModalContainer/ModalContainer.vue';
import {
    ModalContainerBasicExample,
    ModalContainerColorVariantsExample,
    ModalContainerSizeVariantsExample,
    ModalContainerDismissibleExample,
    ModalContainerHideExample,
    ModalContainerIconExample,
    ModalContainerVNodeExample,
    ModalContainerAlertExample,
    ModalContainerConfirmExample,
    ModalContainerPromptExample
} from '@inkline/inkline/components/ModalContainer/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: ModalContainer,
    title: 'Services/Modal'
};

export const Basic = createStory(ModalContainerBasicExample);
export const ColorVariants = createStory(ModalContainerColorVariantsExample);
export const SizeVariants = createStory(ModalContainerSizeVariantsExample);
export const Dismissible = createStory(ModalContainerDismissibleExample);
export const Hide = createStory(ModalContainerHideExample);
export const Icon = createStory(ModalContainerIconExample);
export const Vnode = createStory(ModalContainerVNodeExample);

export const Alert = createStory(ModalContainerAlertExample);
export const Confirm = createStory(ModalContainerConfirmExample);
export const Prompt = createStory(ModalContainerPromptExample);
