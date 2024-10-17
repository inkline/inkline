import './badge.preview.scss';
import { Badge } from '@inkline/component-badge';
import {
    BadgeBasicExample,
    BadgeColorVariantsExample,
    BadgeHeadingExample,
    BadgePillExample,
    BadgeSizeVariantsExample
} from '@inkline/component-badge/examples';
import type { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Badge> = {
    component: markRaw(Badge),
    title: 'Components/Badge'
};

export default meta;

export const Basic: StoryFn = () => BadgeBasicExample;
export const ColorVariants: StoryFn = () => BadgeColorVariantsExample;
export const Heading: StoryFn = () => BadgeHeadingExample;
export const SizeVariants: StoryFn = () => BadgeSizeVariantsExample;
export const Pill: StoryFn = () => BadgePillExample;
