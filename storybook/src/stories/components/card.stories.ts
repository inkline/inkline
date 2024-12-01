import './card.preview.css';
import { Card } from '@inkline/component-card';
import {
    CardBasicExample,
    CardBodyExample,
    CardHeaderFooterExample,
    CardColorVariantsExample,
    CardImageExample,
    CardSizeVariantsExample
} from '@inkline/component-card/examples';
import { markRaw } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Card> = {
    component: markRaw(Card),
    title: 'Components/Card'
};

export default meta;

export const Basic: StoryFn = () => CardBasicExample;
export const Body: StoryFn = () => CardBodyExample;
export const HeaderFooter: StoryFn = () => CardHeaderFooterExample;
export const ColorVariants: StoryFn = () => CardColorVariantsExample;
export const Image: StoryFn = () => CardImageExample;
export const SizeVariants: StoryFn = () => CardSizeVariantsExample;
