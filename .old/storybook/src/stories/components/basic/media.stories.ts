import { Media } from '@inkline/component-media';
import { MediaBasicExample, MediaNestingExample } from '@inkline/component-media/examples';
import { markRaw } from 'vue';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Media> = {
    component: markRaw(Media),
    title: 'Basic Components/Media'
};

export default meta;

export const Basic: StoryFn = () => MediaBasicExample;
export const Nesting: StoryFn = () => MediaNestingExample;
