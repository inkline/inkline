import './modal.preview.css';
import { Modal } from '@inkline/component-modal';
import {
    ModalBasicExample,
    ModalFullscreenExample,
    ModalColorVariantsExample,
    ModalSizeVariantsExample
} from '@inkline/component-modal/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Modal> = {
    component: markRaw(Modal),
    title: 'Feedback Components/Modal'
};

export default meta;

export const Basic: StoryFn = () => ModalBasicExample;
export const Fullscreen: StoryFn = () => ModalFullscreenExample;
export const ColorVariants: StoryFn = () => ModalColorVariantsExample;
export const SizeVariants: StoryFn = () => ModalSizeVariantsExample;
