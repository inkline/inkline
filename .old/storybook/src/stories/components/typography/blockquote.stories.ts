import './blockquote.preview.css';
import { Blockquote } from '@inkline/component-typography';
import {
    BlockquoteBasicExample,
    BlockquoteAlignExample
} from '@inkline/component-typography/examples';
import { markRaw } from 'vue';
import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Blockquote> = {
    component: markRaw(Blockquote),
    title: 'Typography/Blockquote'
};

export default meta;

export const Basic: StoryFn = () => BlockquoteBasicExample;
export const Align: StoryFn = () => BlockquoteAlignExample;
