import { Media } from '@inkline/component-media';
import {
    MediaAlignmentExample,
    MediaBasicExample,
    MediaNestingExample
} from '@inkline/component-media/examples';
import { markRaw } from 'vue';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Media> = {
    component: markRaw(Media),
    title: 'Components/Media'
};

export default meta;

export const Basic: StoryFn = () => MediaBasicExample;
export const Alignment: StoryFn = () => MediaAlignmentExample;
export const Nesting: StoryFn = () => MediaNestingExample;
