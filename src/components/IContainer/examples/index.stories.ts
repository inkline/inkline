import IContainer from '../index.vue';
import {
    IContainerBasicExample,
    IContainerFluidExample
} from './index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: IContainer,
    title: 'Components/Container'
};

export const Basic = createStory(IContainerBasicExample);
export const Fluid = createStory(IContainerFluidExample);
