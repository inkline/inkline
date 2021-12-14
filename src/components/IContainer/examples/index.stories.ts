import IContainer from '../index.vue';
import IContainerBasicExample from './basic.vue';
import IContainerFluidExample from './fluid.vue';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IContainer,
    title: 'Layout/Container'
};

export const Basic = createStory(IContainerBasicExample);
export const Fluid = createStory(IContainerFluidExample);
