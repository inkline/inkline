import './popup.preview.css';
import { Popup } from '@inkline/component-popup';
import {
    PopupBasicExample,
    PopupPlacementExample,
    PopupListenersExample
} from '@inkline/component-popup/examples';
import { markRaw } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Popup> = {
    component: markRaw(Popup),
    title: 'Utils/Popup'
};

export default meta;

export const Basic: StoryFn = () => PopupBasicExample;
export const Placement: StoryFn = () => PopupPlacementExample;
export const Listeners: StoryFn = () => PopupListenersExample;
