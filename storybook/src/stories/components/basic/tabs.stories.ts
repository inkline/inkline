import './tabs.preview.css';
import { Tabs } from '@inkline/component-tabs';
import {
    TabsBasicExample,
    TabsColorVariantsExample,
    TabsStretchExample
} from '@inkline/component-tabs/examples';
import { markRaw } from 'vue';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Tabs> = {
    component: markRaw(Tabs),
    title: 'Basic Components/Tabs'
};

export default meta;

export const Basic: StoryFn = () => TabsBasicExample;
export const ColorVariants: StoryFn = () => TabsColorVariantsExample;
export const Stretch: StoryFn = () => TabsStretchExample;
