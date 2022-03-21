import { IContainer } from '@inkline/inkline/components';
import {
    IContainerBasicExample,
    IContainerFluidExample
} from './index';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IContainer,
    title: 'Layout/Container'
};

export const Basic = createStory(IContainerBasicExample);
export const Fluid = createStory(IContainerFluidExample);
