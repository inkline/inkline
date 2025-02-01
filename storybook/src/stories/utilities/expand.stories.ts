import './expand.preview.css';

import { Expand } from '@inkline/component-expand';
import { ExpandBasicExample } from '@inkline/component-expand/examples';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Expand> = {
    component: Expand,
    title: 'Utilities/Expand'
};

export default meta;

export const Basic: StoryFn = () => ExpandBasicExample;
