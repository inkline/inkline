import IModalContainer from '@inkline/inkline/components/IModalContainer/IModalContainer.vue';
import {
    IModalContainerBasicExample,
    IModalContainerColorVariantsExample,
    IModalContainerSizeVariantsExample,
    IModalContainerDismissibleExample,
    IModalContainerHideExample,
    IModalContainerIconExample,
    IModalContainerVNodeExample,
    IModalContainerAlertExample,
    IModalContainerConfirmExample,
    IModalContainerPromptExample
} from '@inkline/inkline/components/IModalContainer/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IModalContainer,
    title: 'Services/Modal'
};

export const Basic = createStory(IModalContainerBasicExample);
export const ColorVariants = createStory(IModalContainerColorVariantsExample);
export const SizeVariants = createStory(IModalContainerSizeVariantsExample);
export const Dismissible = createStory(IModalContainerDismissibleExample);
export const Hide = createStory(IModalContainerHideExample);
export const Icon = createStory(IModalContainerIconExample);
export const Vnode = createStory(IModalContainerVNodeExample);

export const Alert = createStory(IModalContainerAlertExample);
export const Confirm = createStory(IModalContainerConfirmExample);
export const Prompt = createStory(IModalContainerPromptExample);
