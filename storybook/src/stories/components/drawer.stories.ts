import './drawer.preview.css';
import { Drawer } from '@inkline/component-drawer';
import {
    DrawerBasicExample,
    DrawerPositionExample,
    DrawerColorVariantsExample,
    DrawerSizeVariantsExample
} from '@inkline/component-drawer/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Drawer> = {
    component: markRaw(Drawer),
    title: 'Components/Drawer'
};

export default meta;

export const Basic: StoryFn = () => DrawerBasicExample;
export const Position: StoryFn = () => DrawerPositionExample;
export const ColorVariants: StoryFn = () => DrawerColorVariantsExample;
export const SizeVariants: StoryFn = () => DrawerSizeVariantsExample;
