import './tooltip.preview.css';
import { Tooltip } from '@inkline/component-tooltip';
import {
    TooltipBasicExample,
    TooltipColorVariantsExample,
    TooltipFreeformExample,
    TooltipListenersExample,
    TooltipPlacementExample,
    TooltipSizeVariantsExample,
    TooltipSlotsExample
} from '@inkline/component-tooltip/examples';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Tooltip> = {
    component: Tooltip,
    title: 'Components/Tooltip'
};

export default meta;

export const Basic: StoryFn = () => TooltipBasicExample;
export const Slots: StoryFn = () => TooltipSlotsExample;
export const Freeform: StoryFn = () => TooltipFreeformExample;
export const Placement: StoryFn = () => TooltipPlacementExample;
export const ColorVariants: StoryFn = () => TooltipColorVariantsExample;
export const SizeVariants: StoryFn = () => TooltipSizeVariantsExample;
export const Listeners: StoryFn = () => TooltipListenersExample;
