import { Grid } from '@inkline/component-grid';
import {
    GridBasicExample,
    GridDirectionExample,
    GridResponsiveExample,
    GridOffsetExample
} from '@inkline/component-grid/examples';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Grid> = {
    component: Grid,
    title: 'Layout/Grid'
};

export default meta;

export const Basic: StoryFn = () => GridBasicExample;
export const Direction: StoryFn = () => GridDirectionExample;
export const Responsive: StoryFn = () => GridResponsiveExample;
export const Offset: StoryFn = () => GridOffsetExample;
