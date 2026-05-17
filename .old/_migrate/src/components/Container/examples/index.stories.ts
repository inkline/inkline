import { Container } from '@inkline/inkline/components/Container/index';
import {
    ContainerBasicExample,
    ContainerFluidExample
} from '@inkline/inkline/components/Container/examples/index';
import { createStory } from '@inkline/inkline/__storybook__';

export default {
    component: Container,
    title: 'Layout/Container'
};

export const Basic = createStory(ContainerBasicExample);
export const Fluid = createStory(ContainerFluidExample);
