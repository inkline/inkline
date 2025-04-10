import './popover.preview.css';
import { markRaw } from 'vue';
import { Popover } from '@inkline/component-popover';
import {
    PopoverBasicExample,
    PopoverColorVariantsExample,
    PopoverSizeVariantsExample,
    PopoverHeaderFooterExample,
    PopoverPlacementExample,
    PopoverListenersExample
} from '@inkline/component-popover/examples';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Popover> = {
    component: markRaw(Popover),
    title: 'Feedback Components/Popover'
};

export default meta;

export const Basic: StoryFn = () => PopoverBasicExample;
export const ColorVariants: StoryFn = () => PopoverColorVariantsExample;
export const SizeVariants: StoryFn = () => PopoverSizeVariantsExample;
export const HeaderFooter: StoryFn = () => PopoverHeaderFooterExample;
export const Placement: StoryFn = () => PopoverPlacementExample;
export const Listeners: StoryFn = () => PopoverListenersExample;
