import './modal.preview.css';
import { ModalContainer } from '@inkline/component-modal';
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
} from '@inkline/component-modal/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof ModalContainer> = {
    component: markRaw(ModalContainer),
    title: 'Services/Modal'
};

export default meta;

export const Basic: StoryFn = () => ModalContainerBasicExample;
export const ColorVariants: StoryFn = () => ModalContainerColorVariantsExample;
export const SizeVariants: StoryFn = () => ModalContainerSizeVariantsExample;
export const Dismissible: StoryFn = () => ModalContainerDismissibleExample;
export const Hide: StoryFn = () => ModalContainerHideExample;
export const Icon: StoryFn = () => ModalContainerIconExample;
export const Vnode: StoryFn = () => ModalContainerVNodeExample;

export const Alert: StoryFn = () => ModalContainerAlertExample;
export const Confirm: StoryFn = () => ModalContainerConfirmExample;
export const Prompt: StoryFn = () => ModalContainerPromptExample;
