import './card.preview.css';
import { Card } from '@inkline/component-card';
import {
    CardBasicExample,
    CardColorVariantsExample,
    CardImageExample,
    CardHeaderFooterExample
} from '@inkline/component-card/examples';
import { markRaw } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Card> = {
    component: markRaw(Card),
    title: 'Basic Components/Card'
};

export default meta;

export const Basic: StoryFn = () => CardBasicExample;
export const ColorVariants: StoryFn = () => CardColorVariantsExample;
export const HeaderFooter: StoryFn = () => CardHeaderFooterExample;
export const Image: StoryFn = () => CardImageExample;
