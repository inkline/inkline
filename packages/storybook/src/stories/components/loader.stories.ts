import { Loader } from '@inkline/component-loader';
import {
    LoaderBasicExample,
    LoaderColorVariantsExample,
    LoaderSizeAutoExample,
    LoaderSizeVariantsExample,
    LoaderTextExample
} from '@inkline/component-loader/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Loader> = {
    component: markRaw(Loader),
    title: 'Components/Loader'
};

export default meta;

export const Basic: StoryFn = () => LoaderBasicExample;
export const ColorVariants: StoryFn = () => LoaderColorVariantsExample;
export const SizeAuto: StoryFn = () => LoaderSizeAutoExample;
export const SizeVariants: StoryFn = () => LoaderSizeVariantsExample;
export const Text: StoryFn = () => LoaderTextExample;
